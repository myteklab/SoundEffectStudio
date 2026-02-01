// Sound Effect Studio - UI Controller
// Handles all UI interactions and connects to the sound engine

class UIController {
    constructor() {
        this.selectedLayerId = null;
        this.visualizerAnimation = null;
        this.dragOverlay = null;
        this.previewWaveform = null;
        this.previewUpdatePending = false;
        this.previewUpdateTimeout = null;
        this.init();
    }

    init() {
        // Initialize sound engine
        soundEngine.initialize();

        // Setup event listeners
        this.setupEventListeners();

        // Initialize reverb to 0% (dry signal only)
        soundEngine.setReverbMix(0);

        // Start visualizer
        this.startVisualizer();

        // Setup drag and drop
        this.setupDragAndDrop();

        // Add initial layer
        this.addLayer();
    }

    setupEventListeners() {
        // Mode toggle
        this.simpleMode = true; // Start in simple mode for students
        document.body.classList.add('simple-mode');

        document.getElementById('modeToggle').addEventListener('click', () => {
            this.simpleMode = !this.simpleMode;
            const btn = document.getElementById('modeToggle');
            if (this.simpleMode) {
                document.body.classList.add('simple-mode');
                btn.textContent = '🎓 Simple Mode';
                btn.title = 'Click for Advanced Mode with more controls';
            } else {
                document.body.classList.remove('simple-mode');
                btn.textContent = '🔧 Advanced Mode';
                btn.title = 'Click for Simple Mode with fewer controls';
            }
        });

        // Layer management
        document.getElementById('addLayerBtn').addEventListener('click', () => this.addLayer());

        // Playback controls
        document.getElementById('playBtn').addEventListener('click', () => this.play());
        document.getElementById('stopBtn').addEventListener('click', () => this.stop());

        // Export
        document.getElementById('exportBtn').addEventListener('click', () => this.exportWAV());

        // Clear
        document.getElementById('clearBtn').addEventListener('click', () => this.clearAll());

        // Import Sample
        const importSampleBtn = document.getElementById('importSampleBtn');
        if (importSampleBtn) {
            importSampleBtn.addEventListener('click', () => this.openImportModal());
        }

        // File input for sample upload
        const sampleFileInput = document.getElementById('sampleFileInput');
        if (sampleFileInput) {
            sampleFileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    this.handleFileImport(e.target.files[0]);
                    e.target.value = ''; // Reset for next selection
                }
            });
        }

        // Upload button triggers file input
        const uploadSampleBtn = document.getElementById('uploadSampleBtn');
        if (uploadSampleBtn) {
            uploadSampleBtn.addEventListener('click', () => {
                document.getElementById('sampleFileInput')?.click();
            });
        }

        // URL import button
        const urlImportBtn = document.getElementById('urlImportBtn');
        if (urlImportBtn) {
            urlImportBtn.addEventListener('click', () => {
                const url = document.getElementById('sampleUrlInput')?.value;
                if (url) {
                    this.handleUrlImport(url);
                }
            });
        }

        // Master effects
        document.getElementById('masterVolume').addEventListener('input', (e) => {
            const value = e.target.value / 100;
            soundEngine.setMasterVolume(value);
            document.getElementById('masterVolumeValue').textContent = e.target.value + '%';
            if (typeof markDirty === 'function') markDirty();
            this.updatePreviewWaveform();
        });

        document.getElementById('reverbMix').addEventListener('input', (e) => {
            const value = e.target.value / 100;
            soundEngine.setReverbMix(value);
            document.getElementById('reverbMixValue').textContent = e.target.value + '%';
            if (typeof markDirty === 'function') markDirty();
            this.updatePreviewWaveform();
        });

        document.getElementById('filterFreq').addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            soundEngine.setFilterFrequency(value);
            const displayValue = value >= 1000 ? (value / 1000).toFixed(1) + 'kHz' : value.toFixed(0) + 'Hz';
            document.getElementById('filterFreqValue').textContent = displayValue;
            if (typeof markDirty === 'function') markDirty();
            this.updatePreviewWaveform();
        });

        document.getElementById('distortion').addEventListener('input', (e) => {
            const value = e.target.value / 100;
            soundEngine.setDistortion(value);
            document.getElementById('distortionValue').textContent = e.target.value + '%';
            if (typeof markDirty === 'function') markDirty();
            this.updatePreviewWaveform();
        });

        // Presets
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const preset = e.target.dataset.preset;
                this.loadPreset(preset);
            });
        });
    }

    addLayer(config = {}) {
        const layer = soundEngine.addLayer(config);
        this.renderLayers();
        this.selectLayer(layer.id);
        this.updatePreviewWaveform();
        if (typeof markDirty === 'function') markDirty();
    }

    removeLayer(layerId) {
        soundEngine.removeLayer(layerId);
        this.renderLayers();
        this.updatePreviewWaveform();
        if (typeof markDirty === 'function') markDirty();
        if (this.selectedLayerId === layerId) {
            this.selectedLayerId = null;
        }
    }

    selectLayer(layerId) {
        this.selectedLayerId = layerId;
        this.renderLayers();
    }

    renderLayers() {
        const layersList = document.getElementById('layersList');
        layersList.innerHTML = '';

        soundEngine.layers.forEach((layer, index) => {
            const layerElement = this.createLayerElement(layer, index);
            layersList.appendChild(layerElement);
        });

        if (soundEngine.layers.length === 0) {
            layersList.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No layers. Click "+ Add Layer" to start.</p>';
        }
    }

    createLayerElement(layer, index) {
        const div = document.createElement('div');
        div.className = 'layer';
        if (layer.id === this.selectedLayerId) {
            div.classList.add('active');
        }

        // Add sample-specific class
        if (layer.type === 'sample') {
            div.classList.add('sample-layer');
            div.innerHTML = this.createSampleLayerHTML(layer, index);

            // Add event listeners for sample layer
            div.addEventListener('click', (e) => {
                // Don't trigger layer selection when interacting with form controls
                if (!e.target.classList.contains('delete-btn') &&
                    e.target.tagName !== 'SELECT' &&
                    e.target.tagName !== 'INPUT' &&
                    e.target.tagName !== 'OPTION') {
                    this.selectLayer(layer.id);
                }
            });

            div.querySelector('.delete-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                this.removeLayer(layer.id);
            });

            // Handle both range sliders and number inputs for sample layer
            const handleSampleInputChange = (e) => {
                const layerId = parseFloat(e.target.dataset.id);
                const property = e.target.dataset.property;
                let value = parseFloat(e.target.value);

                // Clamp to min/max
                const min = parseFloat(e.target.min);
                const max = parseFloat(e.target.max);
                if (!isNaN(min) && value < min) value = min;
                if (!isNaN(max) && value > max) value = max;

                // Convert percentage values back to 0-1 range for engine
                let engineValue = value;
                if (property === 'volume') {
                    engineValue = value / 100;
                }

                soundEngine.updateLayer(layerId, property, engineValue);

                // Sync the other input (range <-> number)
                const container = e.target.closest('.slider-with-input');
                if (container) {
                    const rangeInput = container.querySelector('input[type="range"]');
                    const numberInput = container.querySelector('input[type="number"]');

                    if (e.target.type === 'range' && numberInput) {
                        if (property === 'volume') {
                            numberInput.value = Math.round(value);
                        } else {
                            numberInput.value = value.toFixed(2);
                        }
                    } else if (e.target.type === 'number' && rangeInput) {
                        rangeInput.value = value;
                    }
                }

                // Update sample info text
                const sampleInfo = div.querySelector('.sample-info');
                if (sampleInfo) {
                    const layerData = soundEngine.layers.find(l => l.id === layerId);
                    if (layerData) {
                        const originalDuration = layerData.originalDuration || 1;
                        const trimStart = layerData.trimStart || 0;
                        const trimEnd = layerData.trimEnd || originalDuration;
                        const pitch = layerData.pitch || 1.0;
                        sampleInfo.textContent = `Original: ${originalDuration.toFixed(2)}s | Trimmed: ${(trimEnd - trimStart).toFixed(2)}s | Effective: ${((trimEnd - trimStart) / pitch).toFixed(2)}s`;
                    }
                }

                // Redraw waveform if trim changed
                if (property === 'trimStart' || property === 'trimEnd') {
                    setTimeout(() => this.drawSampleWaveform(layerId), 50);
                }

                if (typeof markDirty === 'function') markDirty();
                this.updatePreviewWaveform();
            };

            div.querySelectorAll('input[type="range"], input[type="number"]').forEach(input => {
                input.addEventListener('input', handleSampleInputChange);
            });

            // Draw waveform after element is added to DOM
            setTimeout(() => this.drawSampleWaveform(layer.id), 50);

            return div;
        }

        div.innerHTML = `
            <div class="layer-header">
                <span class="layer-name">Layer ${index + 1}</span>
                <button class="delete-btn" data-id="${layer.id}">Delete</button>
            </div>
            <div class="layer-controls">
                <div class="control-group">
                    <label>Wave Type <span class="help-icon" onclick="openHelpModal('waveType'); event.stopPropagation();">?</span></label>
                    <select data-id="${layer.id}" data-property="type">
                        <option value="sine" ${layer.type === 'sine' ? 'selected' : ''}>Sine (Smooth)</option>
                        <option value="square" ${layer.type === 'square' ? 'selected' : ''}>Square (8-bit)</option>
                        <option value="sawtooth" ${layer.type === 'sawtooth' ? 'selected' : ''}>Sawtooth (Buzzy)</option>
                        <option value="triangle" ${layer.type === 'triangle' ? 'selected' : ''}>Triangle (Mellow)</option>
                        <option value="noise" ${layer.type === 'noise' ? 'selected' : ''}>Noise (Static)</option>
                    </select>
                    <div class="help-text">Choose the basic sound texture</div>
                </div>
                <div class="control-group">
                    <label>Start Pitch <span class="help-icon" onclick="openHelpModal('pitch'); event.stopPropagation();">?</span></label>
                    <div class="slider-with-input">
                        <input type="range" min="20" max="2000" value="${layer.frequency}"
                               data-id="${layer.id}" data-property="frequency" step="1">
                        <input type="number" min="20" max="2000" value="${layer.frequency.toFixed(0)}"
                               data-id="${layer.id}" data-property="frequency" step="1">
                        <span style="color: #888; font-size: 11px;">Hz</span>
                    </div>
                    <div class="help-text">Starting frequency of the sound</div>
                </div>
                <div class="control-group">
                    <label>End Pitch <span class="help-icon" onclick="openHelpModal('frequencyEnd'); event.stopPropagation();">?</span></label>
                    <div class="slider-with-input">
                        <input type="range" min="0" max="2000" value="${layer.frequencyEnd || 0}"
                               data-id="${layer.id}" data-property="frequencyEnd" step="1">
                        <input type="number" min="0" max="2000" value="${(layer.frequencyEnd || 0).toFixed(0)}"
                               data-id="${layer.id}" data-property="frequencyEnd" step="1">
                        <span style="color: #888; font-size: 11px;">Hz</span>
                    </div>
                    <div class="help-text">End frequency (0 = no sweep). Higher = rising sound, Lower = falling</div>
                </div>
                <div class="control-group">
                    <label>Volume <span class="help-icon" onclick="openHelpModal('volume'); event.stopPropagation();">?</span></label>
                    <div class="slider-with-input">
                        <input type="range" min="0" max="100" value="${layer.volume * 100}"
                               data-id="${layer.id}" data-property="volume" step="1">
                        <input type="number" min="0" max="100" value="${Math.round(layer.volume * 100)}"
                               data-id="${layer.id}" data-property="volume" step="1">
                        <span style="color: #888; font-size: 11px;">%</span>
                    </div>
                    <div class="help-text">How loud this layer sounds</div>
                </div>
                <div class="control-group">
                    <label>Duration <span class="help-icon" onclick="openHelpModal('layerDuration'); event.stopPropagation();">?</span></label>
                    <div class="slider-with-input">
                        <input type="range" min="0.01" max="5" value="${layer.duration || soundEngine.duration}"
                               data-id="${layer.id}" data-property="duration" step="0.01">
                        <input type="number" min="0.01" max="5" value="${(layer.duration || soundEngine.duration).toFixed(2)}"
                               data-id="${layer.id}" data-property="duration" step="0.01">
                        <span style="color: #888; font-size: 11px;">s</span>
                    </div>
                    <div class="help-text">How long this layer plays</div>
                </div>
                <div class="control-group">
                    <label>Delay <span class="help-icon" onclick="openHelpModal('delay'); event.stopPropagation();">?</span></label>
                    <div class="slider-with-input">
                        <input type="range" min="0" max="2" value="${layer.delay || 0}"
                               data-id="${layer.id}" data-property="delay" step="0.01">
                        <input type="number" min="0" max="2" value="${(layer.delay || 0).toFixed(2)}"
                               data-id="${layer.id}" data-property="delay" step="0.01">
                        <span style="color: #888; font-size: 11px;">s</span>
                    </div>
                    <div class="help-text">Time before this layer starts (for sequential sounds)</div>
                </div>
                <div class="control-group advanced-control">
                    <label>Attack <span class="help-icon" onclick="openHelpModal('attack'); event.stopPropagation();">?</span></label>
                    <div class="slider-with-input">
                        <input type="range" min="0.001" max="1" value="${layer.attack}"
                               data-id="${layer.id}" data-property="attack" step="0.001">
                        <input type="number" min="0.001" max="1" value="${layer.attack.toFixed(3)}"
                               data-id="${layer.id}" data-property="attack" step="0.001">
                        <span style="color: #888; font-size: 11px;">s</span>
                    </div>
                    <div class="help-text">How quickly sound starts</div>
                </div>
                <div class="control-group advanced-control">
                    <label>Decay <span class="help-icon" onclick="openHelpModal('decay'); event.stopPropagation();">?</span></label>
                    <div class="slider-with-input">
                        <input type="range" min="0.001" max="1" value="${layer.decay}"
                               data-id="${layer.id}" data-property="decay" step="0.001">
                        <input type="number" min="0.001" max="1" value="${layer.decay.toFixed(3)}"
                               data-id="${layer.id}" data-property="decay" step="0.001">
                        <span style="color: #888; font-size: 11px;">s</span>
                    </div>
                    <div class="help-text">How quickly sound fades after start</div>
                </div>
                <div class="control-group advanced-control">
                    <label>Sustain <span class="help-icon" onclick="openHelpModal('sustain'); event.stopPropagation();">?</span></label>
                    <div class="slider-with-input">
                        <input type="range" min="0" max="100" value="${layer.sustain * 100}"
                               data-id="${layer.id}" data-property="sustain" step="1">
                        <input type="number" min="0" max="100" value="${Math.round(layer.sustain * 100)}"
                               data-id="${layer.id}" data-property="sustain" step="1">
                        <span style="color: #888; font-size: 11px;">%</span>
                    </div>
                    <div class="help-text">How long sound stays at this level</div>
                </div>
                <div class="control-group advanced-control">
                    <label>Release <span class="help-icon" onclick="openHelpModal('release'); event.stopPropagation();">?</span></label>
                    <div class="slider-with-input">
                        <input type="range" min="0.001" max="2" value="${layer.release}"
                               data-id="${layer.id}" data-property="release" step="0.001">
                        <input type="number" min="0.001" max="2" value="${layer.release.toFixed(3)}"
                               data-id="${layer.id}" data-property="release" step="0.001">
                        <span style="color: #888; font-size: 11px;">s</span>
                    </div>
                    <div class="help-text">How long sound takes to fade out</div>
                </div>
            </div>
        `;

        // Add event listeners
        div.addEventListener('click', (e) => {
            // Don't trigger layer selection when interacting with form controls
            if (!e.target.classList.contains('delete-btn') &&
                e.target.tagName !== 'SELECT' &&
                e.target.tagName !== 'INPUT' &&
                e.target.tagName !== 'OPTION') {
                this.selectLayer(layer.id);
            }
        });

        div.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.removeLayer(layer.id);
        });

        div.querySelectorAll('select').forEach(select => {
            select.addEventListener('change', (e) => {
                const layerId = parseFloat(e.target.dataset.id);
                const property = e.target.dataset.property;
                soundEngine.updateLayer(layerId, property, e.target.value);
                if (typeof markDirty === 'function') markDirty();
                this.updatePreviewWaveform();
            });
        });

        // Handle both range sliders and number inputs
        const handleInputChange = (e) => {
            const layerId = parseFloat(e.target.dataset.id);
            const property = e.target.dataset.property;
            let value = parseFloat(e.target.value);

            // Clamp to min/max
            const min = parseFloat(e.target.min);
            const max = parseFloat(e.target.max);
            if (!isNaN(min) && value < min) value = min;
            if (!isNaN(max) && value > max) value = max;

            // Convert percentage values back to 0-1 range for engine
            let engineValue = value;
            if (property === 'volume' || property === 'sustain') {
                engineValue = value / 100;
            }

            soundEngine.updateLayer(layerId, property, engineValue);

            // Sync the other input (range <-> number)
            const container = e.target.closest('.slider-with-input');
            if (container) {
                const rangeInput = container.querySelector('input[type="range"]');
                const numberInput = container.querySelector('input[type="number"]');

                if (e.target.type === 'range' && numberInput) {
                    // Format number based on property type
                    if (property === 'frequency' || property === 'frequencyEnd' || property === 'volume' || property === 'sustain') {
                        numberInput.value = Math.round(value);
                    } else if (property === 'duration') {
                        numberInput.value = value.toFixed(2);
                    } else {
                        numberInput.value = value.toFixed(3);
                    }
                } else if (e.target.type === 'number' && rangeInput) {
                    rangeInput.value = value;
                }
            }

            if (typeof markDirty === 'function') markDirty();
            this.updatePreviewWaveform();
        };

        div.querySelectorAll('input[type="range"], input[type="number"]').forEach(input => {
            input.addEventListener('input', handleInputChange);
        });

        return div;
    }

    play() {
        soundEngine.play();
    }

    stop() {
        soundEngine.stop();
    }

    async exportWAV() {
        try {
            const blob = await soundEngine.exportToWAV();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `sound-effect-${Date.now()}.wav`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Export failed:', error);
            alert('Failed to export sound effect. Please try again.');
        }
    }

    createSampleLayerHTML(layer, index) {
        const originalDuration = layer.originalDuration || 1;
        const trimStart = layer.trimStart || 0;
        const trimEnd = layer.trimEnd || originalDuration;
        const pitch = layer.pitch || 1.0;
        const volume = layer.volume || 0.8;

        return `
            <div class="layer-header">
                <span class="layer-name">🎵 ${layer.sampleName || 'Sample'}</span>
                <button class="delete-btn" data-id="${layer.id}">Delete</button>
            </div>
            <div class="layer-controls">
                <div class="waveform-container">
                    <canvas class="sample-waveform" id="waveform-${layer.id}"></canvas>
                </div>
                <div class="control-group">
                    <label>Pitch <span class="help-icon" onclick="openHelpModal('pitch'); event.stopPropagation();">?</span></label>
                    <div class="slider-with-input">
                        <input type="range" min="0.25" max="4" value="${pitch}" step="0.05"
                               data-id="${layer.id}" data-property="pitch">
                        <input type="number" min="0.25" max="4" value="${pitch.toFixed(2)}"
                               data-id="${layer.id}" data-property="pitch" step="0.05">
                        <span style="color: #888; font-size: 11px;">x</span>
                    </div>
                    <div class="help-text">Speed/pitch: 0.5x = slower/lower, 2x = faster/higher</div>
                </div>
                <div class="control-group">
                    <label>Trim Start</label>
                    <div class="slider-with-input">
                        <input type="range" min="0" max="${originalDuration}"
                               value="${trimStart}" step="0.01"
                               data-id="${layer.id}" data-property="trimStart">
                        <input type="number" min="0" max="${originalDuration}"
                               value="${trimStart.toFixed(2)}" step="0.01"
                               data-id="${layer.id}" data-property="trimStart">
                        <span style="color: #888; font-size: 11px;">s</span>
                    </div>
                    <div class="help-text">Where to start playing</div>
                </div>
                <div class="control-group">
                    <label>Trim End</label>
                    <div class="slider-with-input">
                        <input type="range" min="0" max="${originalDuration}"
                               value="${trimEnd}" step="0.01"
                               data-id="${layer.id}" data-property="trimEnd">
                        <input type="number" min="0" max="${originalDuration}"
                               value="${trimEnd.toFixed(2)}" step="0.01"
                               data-id="${layer.id}" data-property="trimEnd">
                        <span style="color: #888; font-size: 11px;">s</span>
                    </div>
                    <div class="help-text">Where to stop playing</div>
                </div>
                <div class="control-group">
                    <label>Volume <span class="help-icon" onclick="openHelpModal('volume'); event.stopPropagation();">?</span></label>
                    <div class="slider-with-input">
                        <input type="range" min="0" max="100" value="${volume * 100}" step="1"
                               data-id="${layer.id}" data-property="volume">
                        <input type="number" min="0" max="100" value="${Math.round(volume * 100)}"
                               data-id="${layer.id}" data-property="volume" step="1">
                        <span style="color: #888; font-size: 11px;">%</span>
                    </div>
                    <div class="help-text">How loud this layer sounds</div>
                </div>
                <div class="sample-info" style="font-size: 11px; color: #888; margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(138, 43, 226, 0.2);">
                    Original: ${originalDuration.toFixed(2)}s | Trimmed: ${(trimEnd - trimStart).toFixed(2)}s | Effective: ${((trimEnd - trimStart) / pitch).toFixed(2)}s
                </div>
            </div>
        `;
    }

    clearAll() {
        if (confirm('Clear all layers? This cannot be undone.')) {
            soundEngine.clearAll();
            this.renderLayers();
            this.updatePreviewWaveform();
            if (typeof markDirty === 'function') markDirty();
        }
    }

    // ===== Sample Import Methods =====

    openImportModal() {
        const modal = document.getElementById('sampleImportModal');
        if (modal) {
            modal.classList.add('active');
        }
    }

    closeImportModal() {
        const modal = document.getElementById('sampleImportModal');
        if (modal) {
            modal.classList.remove('active');
        }
        const urlInput = document.getElementById('sampleUrlInput');
        if (urlInput) {
            urlInput.value = '';
        }
    }

    async handleFileImport(file) {
        // Validate file type
        const validTypes = ['audio/wav', 'audio/x-wav', 'audio/mpeg', 'audio/mp3', 'audio/ogg'];
        const isValid = validTypes.some(type => file.type.includes(type)) ||
                       /\.(wav|mp3|ogg)$/i.test(file.name);

        if (!isValid) {
            showToast('Please select a valid audio file (WAV, MP3, OGG)', 'error');
            return;
        }

        // Check file size (10MB max)
        if (file.size > 10 * 1024 * 1024) {
            showToast('File too large. Maximum size is 10MB.', 'error');
            return;
        }

        try {
            showToast('Loading sample...', 'info');
            const layer = await soundEngine.loadSample(file);
            this.closeImportModal();
            this.renderLayers();
            this.selectLayer(layer.id);

            // Draw waveform after a short delay to ensure DOM is ready
            setTimeout(() => this.drawSampleWaveform(layer.id), 100);

            soundEngine.play(); // Preview the sample
            if (typeof markDirty === 'function') markDirty();
            this.updatePreviewWaveform();
            showToast(`Imported: ${layer.sampleName}`, 'success');
        } catch (error) {
            console.error('Import failed:', error);
            showToast('Failed to import sample: ' + error.message, 'error');
        }
    }

    async handleUrlImport(url) {
        if (!url.trim()) {
            showToast('Please enter a URL', 'error');
            return;
        }

        // Basic URL validation
        try {
            new URL(url);
        } catch (e) {
            showToast('Please enter a valid URL', 'error');
            return;
        }

        try {
            showToast('Fetching audio from URL...', 'info');
            const layer = await soundEngine.loadSample(url);
            this.closeImportModal();
            this.renderLayers();
            this.selectLayer(layer.id);

            // Draw waveform after a short delay to ensure DOM is ready
            setTimeout(() => this.drawSampleWaveform(layer.id), 100);

            soundEngine.play(); // Preview the sample
            if (typeof markDirty === 'function') markDirty();
            this.updatePreviewWaveform();
            showToast(`Imported: ${layer.sampleName}`, 'success');
        } catch (error) {
            console.error('URL import failed:', error);
            showToast('Failed to fetch audio: ' + error.message, 'error');
        }
    }

    setupDragAndDrop() {
        const body = document.body;

        // Create drag overlay
        this.dragOverlay = document.createElement('div');
        this.dragOverlay.id = 'dragOverlay';
        this.dragOverlay.innerHTML = `
            <div class="drag-overlay-content">
                <div class="drag-icon">📁</div>
                <div class="drag-text">Drop audio file here</div>
                <div class="drag-subtext">WAV, MP3, OGG supported</div>
            </div>
        `;
        this.dragOverlay.style.display = 'none';
        document.body.appendChild(this.dragOverlay);

        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            body.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        // Show overlay on drag enter
        let dragCounter = 0;
        body.addEventListener('dragenter', (e) => {
            dragCounter++;
            if (e.dataTransfer.types.includes('Files')) {
                this.dragOverlay.style.display = 'flex';
            }
        });

        body.addEventListener('dragleave', (e) => {
            dragCounter--;
            if (dragCounter === 0) {
                this.dragOverlay.style.display = 'none';
            }
        });

        // Handle drop
        body.addEventListener('drop', async (e) => {
            dragCounter = 0;
            this.dragOverlay.style.display = 'none';

            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const file = files[0];
                const validTypes = ['audio/wav', 'audio/x-wav', 'audio/mpeg', 'audio/mp3', 'audio/ogg'];
                const isValid = validTypes.some(type => file.type.includes(type)) ||
                               /\.(wav|mp3|ogg)$/i.test(file.name);

                if (isValid) {
                    await this.handleFileImport(file);
                } else {
                    showToast('Please drop an audio file (WAV, MP3, OGG)', 'error');
                }
            }
        });
    }

    // Draw waveform for sample layer
    drawSampleWaveform(layerId) {
        const layer = soundEngine.layers.find(l => l.id === layerId);
        if (!layer || !layer.audioBuffer) return;

        const canvas = document.getElementById(`waveform-${layerId}`);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const buffer = layer.audioBuffer;
        const data = buffer.getChannelData(0); // Left channel

        // Size canvas
        canvas.width = canvas.offsetWidth || 300;
        canvas.height = canvas.offsetHeight || 60;

        const width = canvas.width;
        const height = canvas.height;
        const step = Math.ceil(data.length / width);
        const amp = height / 2;

        // Clear with dark background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, width, height);

        // Draw waveform
        ctx.beginPath();
        ctx.strokeStyle = '#bb86fc';
        ctx.lineWidth = 1;

        for (let i = 0; i < width; i++) {
            let min = 1.0;
            let max = -1.0;
            for (let j = 0; j < step; j++) {
                const idx = (i * step) + j;
                if (idx < data.length) {
                    const datum = data[idx];
                    if (datum < min) min = datum;
                    if (datum > max) max = datum;
                }
            }
            ctx.moveTo(i, (1 + min) * amp);
            ctx.lineTo(i, (1 + max) * amp);
        }
        ctx.stroke();

        // Draw trim regions (dimmed outside trim area)
        const trimStart = layer.trimStart || 0;
        const trimEnd = layer.trimEnd || buffer.duration;
        const trimStartX = (trimStart / buffer.duration) * width;
        const trimEndX = (trimEnd / buffer.duration) * width;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(0, 0, trimStartX, height);
        ctx.fillRect(trimEndX, 0, width - trimEndX, height);

        // Draw trim markers
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(trimStartX, 0);
        ctx.lineTo(trimStartX, height);
        ctx.moveTo(trimEndX, 0);
        ctx.lineTo(trimEndX, height);
        ctx.stroke();
    }

    startVisualizer() {
        const canvas = document.getElementById('visualizerCanvas');
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const draw = () => {
            const data = soundEngine.getAnalyserData();

            // Clear canvas
            ctx.fillStyle = '#0d1117';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            if (data && soundEngine.isPlaying) {
                // Live waveform during playback
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#bb86fc';
                ctx.beginPath();

                const sliceWidth = canvas.width / data.length;
                let x = 0;

                for (let i = 0; i < data.length; i++) {
                    const v = data[i] / 128.0;
                    const y = (v * canvas.height) / 2;

                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }

                    x += sliceWidth;
                }

                ctx.stroke();
            } else if (this.previewWaveform && this.previewWaveform.data) {
                // Show preview waveform when not playing
                const waveData = this.previewWaveform.data;
                const centerY = canvas.height / 2;

                // Draw waveform as filled area for better visibility
                ctx.fillStyle = 'rgba(187, 134, 252, 0.3)';
                ctx.strokeStyle = '#bb86fc';
                ctx.lineWidth = 1.5;

                // Draw positive half
                ctx.beginPath();
                ctx.moveTo(0, centerY);
                for (let i = 0; i < waveData.length; i++) {
                    const x = (i / waveData.length) * canvas.width;
                    const amplitude = Math.abs(waveData[i]) * centerY * 0.9;
                    ctx.lineTo(x, centerY - amplitude);
                }
                ctx.lineTo(canvas.width, centerY);
                ctx.closePath();
                ctx.fill();

                // Draw negative half (mirror)
                ctx.beginPath();
                ctx.moveTo(0, centerY);
                for (let i = 0; i < waveData.length; i++) {
                    const x = (i / waveData.length) * canvas.width;
                    const amplitude = Math.abs(waveData[i]) * centerY * 0.9;
                    ctx.lineTo(x, centerY + amplitude);
                }
                ctx.lineTo(canvas.width, centerY);
                ctx.closePath();
                ctx.fill();

                // Draw center line and outline
                ctx.beginPath();
                for (let i = 0; i < waveData.length; i++) {
                    const x = (i / waveData.length) * canvas.width;
                    const amplitude = Math.abs(waveData[i]) * centerY * 0.9;
                    if (i === 0) {
                        ctx.moveTo(x, centerY - amplitude);
                    } else {
                        ctx.lineTo(x, centerY - amplitude);
                    }
                }
                ctx.stroke();

                ctx.beginPath();
                for (let i = 0; i < waveData.length; i++) {
                    const x = (i / waveData.length) * canvas.width;
                    const amplitude = Math.abs(waveData[i]) * centerY * 0.9;
                    if (i === 0) {
                        ctx.moveTo(x, centerY + amplitude);
                    } else {
                        ctx.lineTo(x, centerY + amplitude);
                    }
                }
                ctx.stroke();

                // Draw duration label
                ctx.fillStyle = 'rgba(187, 134, 252, 0.7)';
                ctx.font = '11px sans-serif';
                ctx.textAlign = 'right';
                ctx.fillText(this.previewWaveform.duration.toFixed(2) + 's', canvas.width - 5, canvas.height - 5);
            } else {
                // Draw idle state - flat line
                ctx.strokeStyle = 'rgba(187, 134, 252, 0.3)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(0, canvas.height / 2);
                ctx.lineTo(canvas.width, canvas.height / 2);
                ctx.stroke();

                // Show "No layers" text if empty
                if (soundEngine.layers.length === 0) {
                    ctx.fillStyle = 'rgba(187, 134, 252, 0.5)';
                    ctx.font = '12px sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText('Add a layer to see preview', canvas.width / 2, canvas.height / 2 + 20);
                }
            }

            this.visualizerAnimation = requestAnimationFrame(draw);
        };

        draw();

        // Generate initial preview
        this.updatePreviewWaveform();
    }

    // Update the preview waveform (debounced)
    updatePreviewWaveform() {
        // Debounce to avoid too many renders
        if (this.previewUpdateTimeout) {
            clearTimeout(this.previewUpdateTimeout);
        }

        this.previewUpdateTimeout = setTimeout(async () => {
            if (soundEngine.layers.length === 0) {
                this.previewWaveform = null;
                return;
            }

            try {
                const preview = await soundEngine.generatePreviewWaveform(400);
                this.previewWaveform = preview;
            } catch (error) {
                console.error('Failed to generate preview:', error);
                this.previewWaveform = null;
            }
        }, 150); // 150ms debounce
    }

    loadPreset(presetName) {
        // Clear existing layers
        soundEngine.clearAll();

        // Load preset configuration
        const presets = {
            // ===== MOVEMENT =====
            jump: {
                // Classic platform game jump - short upward sweep with boing
                layers: [
                    { type: 'square', frequency: 150, frequencyEnd: 600, attack: 0.001, decay: 0.05, sustain: 0.0, release: 0.08, volume: 0.9 },
                    { type: 'sine', frequency: 300, frequencyEnd: 400, attack: 0.01, decay: 0.08, sustain: 0.0, release: 0.05, volume: 0.5 }
                ],
                duration: 0.2,
                masterVolume: 100,
                filterFreq: 8000,
                distortion: 0
            },
            land: {
                // Landing thud after jump
                layers: [
                    { type: 'square', frequency: 120, attack: 0.001, decay: 0.08, sustain: 0.0, release: 0.1, volume: 0.9 },
                    { type: 'noise', frequency: 400, attack: 0.001, decay: 0.05, sustain: 0.0, release: 0.08, volume: 0.6 }
                ],
                duration: 0.15,
                masterVolume: 100,
                filterFreq: 5000,
                distortion: 15
            },
            dash: {
                // Quick dash/sprint burst
                layers: [
                    { type: 'noise', frequency: 2000, frequencyEnd: 800, attack: 0.001, decay: 0.04, sustain: 0.0, release: 0.08, volume: 0.9 },
                    { type: 'square', frequency: 200, frequencyEnd: 350, attack: 0.001, decay: 0.05, sustain: 0.0, release: 0.1, volume: 0.7 }
                ],
                duration: 0.15,
                masterVolume: 100,
                filterFreq: 10000,
                distortion: 20
            },
            bounce: {
                // Bouncy spring sound
                layers: [
                    { type: 'sine', frequency: 200, frequencyEnd: 400, attack: 0.001, decay: 0.06, sustain: 0.0, release: 0.1, volume: 0.85 },
                    { type: 'triangle', frequency: 400, frequencyEnd: 300, attack: 0.05, decay: 0.08, sustain: 0.0, release: 0.12, volume: 0.6 }
                ],
                duration: 0.25,
                masterVolume: 100,
                filterFreq: 8000,
                distortion: 0
            },

            // ===== COMBAT / EXPLOSIONS =====
            explosion: {
                // Slow-building explosion - initial crack with building rumble
                layers: [
                    { type: 'noise', frequency: 3000, attack: 0.001, decay: 0.05, sustain: 0.0, release: 0.2, volume: 1.0 },
                    { type: 'noise', frequency: 1500, attack: 0.15, decay: 0.1, sustain: 0.15, release: 0.4, volume: 0.95 },
                    { type: 'noise', frequency: 700, attack: 0.3, decay: 0.15, sustain: 0.25, release: 0.5, volume: 0.9 },
                    { type: 'noise', frequency: 350, attack: 0.45, decay: 0.2, sustain: 0.3, release: 0.6, volume: 0.85 }
                ],
                duration: 2.0,
                masterVolume: 100,
                filterFreq: 9000,
                distortion: 50
            },
            coin: {
                // Classic Mario-style two-tone coin pickup
                layers: [
                    { type: 'square', frequency: 988, attack: 0.001, decay: 0.06, sustain: 0.0, release: 0.02, volume: 0.7, delay: 0 },
                    { type: 'square', frequency: 1319, attack: 0.001, decay: 0.08, sustain: 0.0, release: 0.03, volume: 0.8, delay: 0.06 }
                ],
                duration: 0.12,
                masterVolume: 100,
                filterFreq: 18000,
                distortion: 0
            },
            sword: {
                // Sword slash/swing
                layers: [
                    { type: 'noise', frequency: 3000, frequencyEnd: 1000, attack: 0.001, decay: 0.06, sustain: 0.0, release: 0.12, volume: 0.85 },
                    { type: 'sawtooth', frequency: 800, frequencyEnd: 400, attack: 0.001, decay: 0.08, sustain: 0.0, release: 0.15, volume: 0.7 }
                ],
                duration: 0.2,
                masterVolume: 100,
                filterFreq: 12000,
                distortion: 25
            },
            hit: {
                // Punch/hit impact
                layers: [
                    { type: 'noise', frequency: 1200, attack: 0.001, decay: 0.04, sustain: 0.0, release: 0.06, volume: 1.0 },
                    { type: 'square', frequency: 150, attack: 0.001, decay: 0.05, sustain: 0.0, release: 0.08, volume: 0.8 }
                ],
                duration: 0.1,
                masterVolume: 100,
                filterFreq: 7000,
                distortion: 40
            },
            laser: {
                layers: [
                    { type: 'sawtooth', frequency: 1200, frequencyEnd: 300, attack: 0.001, decay: 0.15, sustain: 0.0, release: 0.05, volume: 0.8 },
                    { type: 'square', frequency: 1200, frequencyEnd: 300, attack: 0.001, decay: 0.15, sustain: 0.0, release: 0.05, volume: 0.6 }
                ],
                duration: 0.25,
                masterVolume: 100,
                filterFreq: 6000,
                distortion: 10
            },
            // ===== PICKUPS / COLLECTIBLES =====
            powerup: {
                // Triumphant ascending powerup sound
                layers: [
                    { type: 'square', frequency: 262, frequencyEnd: 523, attack: 0.001, decay: 0.05, sustain: 0.8, release: 0.15, volume: 0.8 },
                    { type: 'triangle', frequency: 330, frequencyEnd: 659, attack: 0.005, decay: 0.06, sustain: 0.75, release: 0.18, volume: 0.7 },
                    { type: 'sine', frequency: 392, frequencyEnd: 784, attack: 0.01, decay: 0.07, sustain: 0.7, release: 0.2, volume: 0.6 }
                ],
                duration: 0.6,
                masterVolume: 100,
                filterFreq: 15000,
                distortion: 0
            },
            hurt: {
                layers: [
                    { type: 'sawtooth', frequency: 400, frequencyEnd: 100, attack: 0.001, decay: 0.1, sustain: 0.0, release: 0.05, volume: 0.9 },
                    { type: 'noise', frequency: 600, frequencyEnd: 150, attack: 0.001, decay: 0.08, sustain: 0.0, release: 0.04, volume: 0.6 }
                ],
                duration: 0.3,
                masterVolume: 100,
                filterFreq: 4000,
                distortion: 25
            },
            click: {
                // Lower pitched, punchier UI click
                layers: [
                    { type: 'sine', frequency: 400, frequencyEnd: 200, attack: 0.001, decay: 0.02, sustain: 0.0, release: 0.01, volume: 0.8 },
                    { type: 'noise', frequency: 800, attack: 0.001, decay: 0.015, sustain: 0.0, release: 0.005, volume: 0.3 }
                ],
                duration: 0.05,
                masterVolume: 100,
                filterFreq: 6000,
                distortion: 0
            },
            whoosh: {
                // Actual air whoosh sound - softer attack, wind-like
                layers: [
                    { type: 'noise', frequency: 2000, frequencyEnd: 500, attack: 0.1, decay: 0.15, sustain: 0.4, release: 0.3, volume: 0.8 },
                    { type: 'noise', frequency: 1200, frequencyEnd: 300, attack: 0.05, decay: 0.2, sustain: 0.35, release: 0.35, volume: 0.6 }
                ],
                duration: 0.8,
                masterVolume: 100,
                filterFreq: 8000,
                distortion: 0
            },
            shot: {
                // Gunshot - sharp crack with quick echo
                layers: [
                    { type: 'noise', frequency: 4000, frequencyEnd: 800, attack: 0.001, decay: 0.06, sustain: 0.0, release: 0.15, volume: 1.0 },
                    { type: 'noise', frequency: 1200, frequencyEnd: 400, attack: 0.001, decay: 0.1, sustain: 0.0, release: 0.25, volume: 0.9 },
                    { type: 'noise', frequency: 600, frequencyEnd: 200, attack: 0.005, decay: 0.12, sustain: 0.0, release: 0.3, volume: 0.75 }
                ],
                duration: 0.5,
                masterVolume: 100,
                filterFreq: 10000,
                distortion: 55
            },

            health: {
                // Health pickup - soft positive chime
                layers: [
                    { type: 'sine', frequency: 523, frequencyEnd: 659, attack: 0.001, decay: 0.08, sustain: 0.0, release: 0.15, volume: 0.8 },
                    { type: 'triangle', frequency: 659, frequencyEnd: 784, attack: 0.02, decay: 0.1, sustain: 0.0, release: 0.2, volume: 0.65 }
                ],
                duration: 0.35,
                masterVolume: 100,
                filterFreq: 14000,
                distortion: 0
            },
            gem: {
                // Gem/star pickup - sparkly high pitched
                layers: [
                    { type: 'triangle', frequency: 1568, frequencyEnd: 2093, attack: 0.001, decay: 0.06, sustain: 0.0, release: 0.12, volume: 0.75 },
                    { type: 'sine', frequency: 2637, attack: 0.01, decay: 0.08, sustain: 0.0, release: 0.15, volume: 0.6 },
                    { type: 'sine', frequency: 3136, attack: 0.02, decay: 0.1, sustain: 0.0, release: 0.18, volume: 0.45 }
                ],
                duration: 0.4,
                masterVolume: 100,
                filterFreq: 18000,
                distortion: 0
            },

            // ===== DAMAGE / NEGATIVE =====
            death: {
                // Death/game over - descending doom
                layers: [
                    { type: 'sawtooth', frequency: 400, frequencyEnd: 100, attack: 0.001, decay: 0.2, sustain: 0.3, release: 0.5, volume: 0.9 },
                    { type: 'square', frequency: 200, frequencyEnd: 50, attack: 0.005, decay: 0.25, sustain: 0.35, release: 0.6, volume: 0.75 }
                ],
                duration: 1.2,
                masterVolume: 100,
                filterFreq: 4000,
                distortion: 30
            },
            zap: {
                // Electric shock
                layers: [
                    { type: 'noise', frequency: 5000, attack: 0.001, decay: 0.03, sustain: 0.15, release: 0.08, volume: 0.9 },
                    { type: 'square', frequency: 800, frequencyEnd: 400, attack: 0.001, decay: 0.02, sustain: 0.1, release: 0.06, volume: 0.75 }
                ],
                duration: 0.25,
                masterVolume: 100,
                filterFreq: 15000,
                distortion: 60
            },

            // ===== UI / INTERFACE =====
            success: {
                // Success/confirm - pleasant rising tone
                layers: [
                    { type: 'sine', frequency: 523, frequencyEnd: 784, attack: 0.001, decay: 0.08, sustain: 0.0, release: 0.12, volume: 0.8 },
                    { type: 'triangle', frequency: 659, frequencyEnd: 988, attack: 0.005, decay: 0.1, sustain: 0.0, release: 0.15, volume: 0.6 }
                ],
                duration: 0.25,
                masterVolume: 100,
                filterFreq: 12000,
                distortion: 0
            },
            error: {
                // Error/denied - harsh buzz
                layers: [
                    { type: 'square', frequency: 200, attack: 0.001, decay: 0.1, sustain: 0.0, release: 0.15, volume: 0.85 },
                    { type: 'sawtooth', frequency: 150, attack: 0.001, decay: 0.12, sustain: 0.0, release: 0.18, volume: 0.7 }
                ],
                duration: 0.3,
                masterVolume: 100,
                filterFreq: 3000,
                distortion: 40
            },

            // ===== ENVIRONMENT =====
            door: {
                // Door open/close - mechanical sound
                layers: [
                    { type: 'noise', frequency: 800, frequencyEnd: 400, attack: 0.05, decay: 0.1, sustain: 0.0, release: 0.15, volume: 0.75 },
                    { type: 'square', frequency: 150, frequencyEnd: 120, attack: 0.03, decay: 0.12, sustain: 0.0, release: 0.2, volume: 0.65 }
                ],
                duration: 0.35,
                masterVolume: 100,
                filterFreq: 6000,
                distortion: 20
            },
            beep: {
                // Alert/notification beep
                layers: [
                    { type: 'square', frequency: 880, attack: 0.001, decay: 0.05, sustain: 0.0, release: 0.05, volume: 0.8 },
                    { type: 'sine', frequency: 1320, attack: 0.001, decay: 0.05, sustain: 0.0, release: 0.05, volume: 0.5 }
                ],
                duration: 0.12,
                masterVolume: 100,
                filterFreq: 10000,
                distortion: 0
            }
        };

        const preset = presets[presetName];
        if (!preset) return;

        // Add layers with duration from preset
        preset.layers.forEach(layerConfig => {
            // Apply preset's global duration to each layer
            const layerWithDuration = { ...layerConfig, duration: layerConfig.duration || preset.duration };
            soundEngine.addLayer(layerWithDuration);
        });

        // Set master effects
        soundEngine.setDuration(preset.duration);
        soundEngine.setMasterVolume(preset.masterVolume / 100);
        soundEngine.setFilterFrequency(preset.filterFreq);
        soundEngine.setDistortion(preset.distortion / 100);

        // Update UI controls (with null checks for elements that may not exist)
        const masterVolumeEl = document.getElementById('masterVolume');
        const masterVolumeValueEl = document.getElementById('masterVolumeValue');
        const filterFreqEl = document.getElementById('filterFreq');
        const filterFreqValueEl = document.getElementById('filterFreqValue');
        const distortionEl = document.getElementById('distortion');
        const distortionValueEl = document.getElementById('distortionValue');

        if (masterVolumeEl) masterVolumeEl.value = preset.masterVolume;
        if (masterVolumeValueEl) masterVolumeValueEl.textContent = preset.masterVolume + '%';
        if (filterFreqEl) filterFreqEl.value = preset.filterFreq;
        if (filterFreqValueEl) {
            const displayValue = preset.filterFreq >= 1000 ? (preset.filterFreq / 1000).toFixed(1) + 'kHz' : preset.filterFreq.toFixed(0) + 'Hz';
            filterFreqValueEl.textContent = displayValue;
        }
        if (distortionEl) distortionEl.value = preset.distortion;
        if (distortionValueEl) distortionValueEl.textContent = preset.distortion + '%';

        // Render layers (this will show per-layer duration controls)
        this.renderLayers();

        // Mark as dirty (changed)
        if (typeof markDirty === 'function') markDirty();

        // Update preview waveform
        this.updatePreviewWaveform();

        // Auto-play the preset
        setTimeout(() => {
            this.play();
        }, 100);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.uiController = new UIController();
    });
} else {
    window.uiController = new UIController();
}
