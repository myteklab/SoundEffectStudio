// Sound Effect Studio - Audio Engine
// Uses Web Audio API for synthesis and effects

class SoundEngine {
    constructor() {
        this.audioContext = null;
        this.layers = [];
        this.masterGain = null;
        this.convolver = null;
        this.filter = null;
        this.distortion = null;
        this.analyser = null;
        this.dryGain = null;      // For dry signal
        this.wetGain = null;      // For wet (reverb) signal
        this.reverbMix = null;    // Mix point for dry/wet
        this.duration = 1.0;
        this.isPlaying = false;
        this.currentSources = [];
    }

    initialize() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Create master effects chain
        this.masterGain = this.audioContext.createGain();
        this.convolver = this.audioContext.createConvolver();
        this.filter = this.audioContext.createBiquadFilter();
        this.distortion = this.audioContext.createWaveShaper();
        this.analyser = this.audioContext.createAnalyser();

        // Create dry/wet mixing nodes
        this.dryGain = this.audioContext.createGain();
        this.wetGain = this.audioContext.createGain();
        this.reverbMix = this.audioContext.createGain();

        // Configure effects
        this.filter.type = 'lowpass';
        this.filter.frequency.value = 20000;

        this.convolver.buffer = this.createReverbImpulse();

        this.analyser.fftSize = 2048;

        // Set default values
        this.masterGain.gain.value = 1.0;  // Normal volume (100%)
        this.dryGain.gain.value = 1.0;     // 100% dry signal
        this.wetGain.gain.value = 0.0;     // 0% wet signal (reverb off by default)

        // Initialize distortion with clean (no distortion) curve
        this.setDistortion(0);

        // Connect effects chain with dry/wet mixing
        // masterGain -> distortion -> filter -> split to dry/wet paths
        // Dry path: filter -> dryGain -> reverbMix
        // Wet path: filter -> convolver -> wetGain -> reverbMix
        // Then: reverbMix -> analyser -> destination
        this.masterGain.connect(this.distortion);
        this.distortion.connect(this.filter);

        // Dry path (no reverb)
        this.filter.connect(this.dryGain);
        this.dryGain.connect(this.reverbMix);

        // Wet path (with reverb)
        this.filter.connect(this.convolver);
        this.convolver.connect(this.wetGain);
        this.wetGain.connect(this.reverbMix);

        // Final output
        this.reverbMix.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);

        console.log('Sound Engine initialized');
    }

    createReverbImpulse() {
        const length = this.audioContext.sampleRate * 2;
        const impulse = this.audioContext.createBuffer(2, length, this.audioContext.sampleRate);
        const left = impulse.getChannelData(0);
        const right = impulse.getChannelData(1);

        for (let i = 0; i < length; i++) {
            const decay = Math.pow(1 - i / length, 3);
            left[i] = (Math.random() * 2 - 1) * decay;
            right[i] = (Math.random() * 2 - 1) * decay;
        }

        return impulse;
    }

    addLayer(config = {}) {
        const layer = {
            id: Date.now() + Math.random(),
            type: config.type || 'sine',
            frequency: config.frequency || 440,
            frequencyEnd: config.frequencyEnd || null, // For frequency sweeps
            duration: config.duration || null, // Per-layer duration (null = use global)
            delay: config.delay || 0, // Delay before layer starts (in seconds)
            attack: config.attack || 0.01,
            decay: config.decay || 0.1,
            sustain: config.sustain || 0.5,
            release: config.release || 0.2,
            volume: config.volume || 0.8,  // Increased from 0.5 to 0.8
            enabled: true,
            // Sample-specific properties
            audioBuffer: config.audioBuffer || null,
            trimStart: config.trimStart || 0,
            trimEnd: config.trimEnd || null,
            pitch: config.pitch || 1.0,
            sampleName: config.sampleName || null,
            originalDuration: config.originalDuration || null
        };

        this.layers.push(layer);
        return layer;
    }

    // Get the effective duration for a layer (layer-specific or global fallback)
    getLayerDuration(layer) {
        return (layer.duration !== null && layer.duration > 0) ? layer.duration : this.duration;
    }

    // Get the maximum duration across all layers (for export)
    // Accounts for layer delay + duration
    getMaxLayerDuration() {
        if (this.layers.length === 0) return this.duration;

        let maxDuration = 0;
        this.layers.forEach(layer => {
            if (layer.enabled) {
                const layerDelay = layer.delay || 0;
                const layerDur = this.getLayerDuration(layer);
                const totalLayerTime = layerDelay + layerDur;
                if (totalLayerTime > maxDuration) maxDuration = totalLayerTime;
            }
        });

        return maxDuration > 0 ? maxDuration : this.duration;
    }

    // Load audio sample from File or URL
    async loadSample(source) {
        // Initialize audio context if needed
        if (!this.audioContext) {
            this.initialize();
        }

        let arrayBuffer;
        let sampleName = 'Imported Sample';

        try {
            if (source instanceof File) {
                // File upload
                arrayBuffer = await source.arrayBuffer();
                sampleName = source.name.replace(/\.[^/.]+$/, ''); // Remove extension
            } else if (typeof source === 'string') {
                // URL import - direct fetch
                const response = await fetch(source);

                if (!response.ok) {
                    throw new Error('Failed to fetch audio from URL (status ' + response.status + ')');
                }

                arrayBuffer = await response.arrayBuffer();
                // Extract filename from URL
                const urlPath = source.split('/').pop().split('?')[0];
                sampleName = urlPath.replace(/\.[^/.]+$/, '') || 'URL Sample';
            } else {
                throw new Error('Invalid source type');
            }

            // Decode audio data
            const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

            // Create sample layer
            const layer = this.addLayer({
                type: 'sample',
                audioBuffer: audioBuffer,
                sampleName: sampleName,
                originalDuration: audioBuffer.duration,
                trimStart: 0,
                trimEnd: audioBuffer.duration,
                pitch: 1.0,
                volume: 0.8,
                attack: 0.001,
                decay: 0.01,
                sustain: 1.0,
                release: 0.01,
                enabled: true
            });

            return layer;
        } catch (error) {
            console.error('Failed to load sample:', error);
            throw error;
        }
    }

    removeLayer(layerId) {
        this.layers = this.layers.filter(layer => layer.id !== layerId);
    }

    updateLayer(layerId, property, value) {
        const layer = this.layers.find(l => l.id === layerId);
        if (layer) {
            layer[property] = value;
        }
    }

    play() {
        if (!this.audioContext) {
            this.initialize();
        }

        if (this.isPlaying) {
            this.stop();
        }

        this.isPlaying = true;
        this.currentSources = [];
        const now = this.audioContext.currentTime;

        // Play each enabled layer
        this.layers.forEach(layer => {
            if (!layer.enabled) return;

            // Get this layer's duration and delay
            const layerDuration = this.getLayerDuration(layer);
            const layerDelay = layer.delay || 0;
            const startTime = now + layerDelay;

            // Handle noise type
            if (layer.type === 'noise') {
                this.playNoiseLayer(layer, startTime, layerDuration);
                return;
            }

            // Handle sample type
            if (layer.type === 'sample') {
                this.playSampleLayer(layer, startTime, layerDuration);
                return;
            }

            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.type = layer.type;
            oscillator.frequency.value = layer.frequency;

            // Add frequency sweep if frequencyEnd is specified
            if (layer.frequencyEnd !== null && layer.frequencyEnd !== layer.frequency) {
                oscillator.frequency.setValueAtTime(layer.frequency, startTime);
                oscillator.frequency.exponentialRampToValueAtTime(layer.frequencyEnd, startTime + layerDuration);
            }

            // ADSR Envelope
            const attackTime = layer.attack;
            const decayTime = layer.decay;
            const sustainLevel = layer.sustain * layer.volume;
            const releaseTime = layer.release;

            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(layer.volume, startTime + attackTime);
            gainNode.gain.linearRampToValueAtTime(sustainLevel, startTime + attackTime + decayTime);
            gainNode.gain.setValueAtTime(sustainLevel, startTime + layerDuration - releaseTime);
            gainNode.gain.linearRampToValueAtTime(0, startTime + layerDuration);

            oscillator.connect(gainNode);
            gainNode.connect(this.masterGain);

            oscillator.start(startTime);
            oscillator.stop(startTime + layerDuration);

            this.currentSources.push(oscillator);
        });

        // Auto-stop after the longest layer duration (includes delay)
        const maxDuration = this.getMaxLayerDuration();
        setTimeout(() => {
            this.isPlaying = false;
        }, maxDuration * 1000);
    }

    playNoiseLayer(layer, startTime, layerDuration) {
        // Create noise buffer
        const bufferSize = this.audioContext.sampleRate * layerDuration;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);

        // Generate white noise
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noiseSource = this.audioContext.createBufferSource();
        const gainNode = this.audioContext.createGain();
        const filterNode = this.audioContext.createBiquadFilter();

        noiseSource.buffer = buffer;
        filterNode.type = 'bandpass';
        filterNode.frequency.value = layer.frequency;
        filterNode.Q.value = 1.0;

        // Apply frequency sweep to filter if specified
        if (layer.frequencyEnd !== null && layer.frequencyEnd !== layer.frequency) {
            filterNode.frequency.setValueAtTime(layer.frequency, startTime);
            filterNode.frequency.exponentialRampToValueAtTime(layer.frequencyEnd, startTime + layerDuration);
        }

        // ADSR Envelope
        const attackTime = layer.attack;
        const decayTime = layer.decay;
        const sustainLevel = layer.sustain * layer.volume;
        const releaseTime = layer.release;

        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(layer.volume, startTime + attackTime);
        gainNode.gain.linearRampToValueAtTime(sustainLevel, startTime + attackTime + decayTime);
        gainNode.gain.setValueAtTime(sustainLevel, startTime + layerDuration - releaseTime);
        gainNode.gain.linearRampToValueAtTime(0, startTime + layerDuration);

        noiseSource.connect(filterNode);
        filterNode.connect(gainNode);
        gainNode.connect(this.masterGain);

        noiseSource.start(startTime);
        noiseSource.stop(startTime + layerDuration);

        this.currentSources.push(noiseSource);
    }

    playSampleLayer(layer, startTime, layerDuration) {
        if (!layer.audioBuffer) {
            console.warn('Sample layer has no audio buffer');
            return;
        }

        const source = this.audioContext.createBufferSource();
        const gainNode = this.audioContext.createGain();

        source.buffer = layer.audioBuffer;
        source.playbackRate.value = layer.pitch || 1.0;

        // Calculate trim
        const trimStart = layer.trimStart || 0;
        const trimEnd = layer.trimEnd || layer.audioBuffer.duration;
        const trimDuration = trimEnd - trimStart;

        // ADSR Envelope
        const attackTime = layer.attack || 0.001;
        const decayTime = layer.decay || 0.01;
        const sustainLevel = (layer.sustain || 1.0) * layer.volume;
        const releaseTime = layer.release || 0.01;

        // Calculate effective duration (considering pitch and layer duration)
        const effectiveDuration = Math.min(trimDuration / layer.pitch, layerDuration);

        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(layer.volume, startTime + attackTime);
        gainNode.gain.linearRampToValueAtTime(sustainLevel, startTime + attackTime + decayTime);

        if (effectiveDuration > releaseTime) {
            gainNode.gain.setValueAtTime(sustainLevel, startTime + effectiveDuration - releaseTime);
            gainNode.gain.linearRampToValueAtTime(0, startTime + effectiveDuration);
        }

        source.connect(gainNode);
        gainNode.connect(this.masterGain);

        source.start(startTime, trimStart, trimDuration);

        this.currentSources.push(source);
    }

    stop() {
        this.currentSources.forEach(source => {
            try {
                source.stop();
            } catch (e) {
                // Already stopped
            }
        });
        this.currentSources = [];
        this.isPlaying = false;
    }

    setMasterVolume(value) {
        if (this.masterGain) {
            this.masterGain.gain.value = value;
        }
    }

    setReverbMix(value) {
        // value: 0-1 where 0 = 100% dry, 1 = 100% wet
        if (this.dryGain && this.wetGain) {
            // Equal power crossfade for smooth mixing
            const wetAmount = value;
            const dryAmount = 1 - value;

            this.dryGain.gain.value = dryAmount;
            this.wetGain.gain.value = wetAmount;
        }
    }

    setFilterFrequency(value) {
        if (this.filter) {
            this.filter.frequency.value = value;
        }
    }

    setDistortion(value) {
        if (this.distortion) {
            const amount = value;
            const samples = 44100;
            const curve = new Float32Array(samples);

            if (amount === 0) {
                // No distortion - create linear curve (output = input)
                for (let i = 0; i < samples; i++) {
                    curve[i] = (i * 2) / samples - 1;
                }
            } else {
                // Apply distortion curve
                const deg = Math.PI / 180;
                for (let i = 0; i < samples; i++) {
                    const x = (i * 2) / samples - 1;
                    curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
                }
            }

            this.distortion.curve = curve;
            this.distortion.oversample = '4x';
        }
    }

    setDuration(value) {
        this.duration = value;
    }

    getAnalyserData() {
        if (!this.analyser) return null;

        const bufferLength = this.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        this.analyser.getByteTimeDomainData(dataArray);

        return dataArray;
    }

    // Generate a preview waveform without playing sound
    async generatePreviewWaveform(sampleCount = 500) {
        if (!this.audioContext) {
            this.initialize();
        }

        // Need at least one enabled layer
        const enabledLayers = this.layers.filter(l => l.enabled);
        if (enabledLayers.length === 0) {
            return null;
        }

        // Get the max duration across all layers
        const previewDuration = this.getMaxLayerDuration();

        // Create offline context for silent rendering
        const sampleRate = 44100;
        const offlineContext = new OfflineAudioContext(
            1, // mono for preview
            sampleRate * previewDuration,
            sampleRate
        );

        // Recreate effects chain in offline context
        const offlineMasterGain = offlineContext.createGain();
        const offlineFilter = offlineContext.createBiquadFilter();
        const offlineDistortion = offlineContext.createWaveShaper();
        const offlineConvolver = offlineContext.createConvolver();
        const offlineDryGain = offlineContext.createGain();
        const offlineWetGain = offlineContext.createGain();
        const offlineReverbMix = offlineContext.createGain();

        offlineFilter.type = 'lowpass';
        offlineFilter.frequency.value = this.filter ? this.filter.frequency.value : 20000;
        offlineDistortion.curve = this.distortion ? this.distortion.curve : null;
        offlineMasterGain.gain.value = this.masterGain ? this.masterGain.gain.value : 1.0;
        offlineDryGain.gain.value = this.dryGain ? this.dryGain.gain.value : 1.0;
        offlineWetGain.gain.value = this.wetGain ? this.wetGain.gain.value : 0.0;
        offlineConvolver.buffer = this.createReverbImpulseForContext(offlineContext);

        // Connect chain with dry/wet reverb mixing
        offlineMasterGain.connect(offlineDistortion);
        offlineDistortion.connect(offlineFilter);

        // Dry path (no reverb)
        offlineFilter.connect(offlineDryGain);
        offlineDryGain.connect(offlineReverbMix);

        // Wet path (with reverb)
        offlineFilter.connect(offlineConvolver);
        offlineConvolver.connect(offlineWetGain);
        offlineWetGain.connect(offlineReverbMix);

        // Final output
        offlineReverbMix.connect(offlineContext.destination);

        // Render each layer
        const now = 0;
        enabledLayers.forEach(layer => {
            const layerDuration = this.getLayerDuration(layer);
            const layerDelay = layer.delay || 0;
            const startTime = now + layerDelay;

            if (layer.type === 'sample') {
                // Sample layer - render from audioBuffer
                if (!layer.audioBuffer) {
                    return; // Skip if no buffer loaded
                }

                const source = offlineContext.createBufferSource();
                const gainNode = offlineContext.createGain();

                source.buffer = layer.audioBuffer;
                source.playbackRate.value = layer.pitch || 1.0;

                // Calculate trim
                const trimStart = layer.trimStart || 0;
                const trimEnd = layer.trimEnd || layer.audioBuffer.duration;
                const trimDuration = trimEnd - trimStart;

                // ADSR Envelope
                const attackTime = layer.attack || 0.001;
                const decayTime = layer.decay || 0.01;
                const sustainLevel = (layer.sustain || 1.0) * layer.volume;
                const releaseTime = layer.release || 0.01;

                // Calculate effective duration (considering pitch)
                const effectiveDuration = Math.min(trimDuration / (layer.pitch || 1.0), layerDuration);

                gainNode.gain.setValueAtTime(0, startTime);
                gainNode.gain.linearRampToValueAtTime(layer.volume, startTime + attackTime);
                gainNode.gain.linearRampToValueAtTime(sustainLevel, startTime + attackTime + decayTime);

                if (effectiveDuration > releaseTime) {
                    gainNode.gain.setValueAtTime(sustainLevel, startTime + effectiveDuration - releaseTime);
                    gainNode.gain.linearRampToValueAtTime(0, startTime + effectiveDuration);
                }

                source.connect(gainNode);
                gainNode.connect(offlineMasterGain);

                source.start(startTime, trimStart, trimDuration);
            } else if (layer.type === 'noise') {
                // Create noise buffer
                const bufferSize = sampleRate * layerDuration;
                const buffer = offlineContext.createBuffer(1, bufferSize, sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    data[i] = Math.random() * 2 - 1;
                }

                const noiseSource = offlineContext.createBufferSource();
                const gainNode = offlineContext.createGain();
                const filterNode = offlineContext.createBiquadFilter();

                noiseSource.buffer = buffer;
                filterNode.type = 'bandpass';
                filterNode.frequency.value = layer.frequency;
                filterNode.Q.value = 1.0;

                if (layer.frequencyEnd !== null && layer.frequencyEnd !== layer.frequency) {
                    filterNode.frequency.setValueAtTime(layer.frequency, startTime);
                    filterNode.frequency.exponentialRampToValueAtTime(layer.frequencyEnd, startTime + layerDuration);
                }

                // ADSR
                const attackTime = layer.attack;
                const decayTime = layer.decay;
                const sustainLevel = layer.sustain * layer.volume;
                const releaseTime = layer.release;

                gainNode.gain.setValueAtTime(0, startTime);
                gainNode.gain.linearRampToValueAtTime(layer.volume, startTime + attackTime);
                gainNode.gain.linearRampToValueAtTime(sustainLevel, startTime + attackTime + decayTime);
                gainNode.gain.setValueAtTime(sustainLevel, startTime + layerDuration - releaseTime);
                gainNode.gain.linearRampToValueAtTime(0, startTime + layerDuration);

                noiseSource.connect(filterNode);
                filterNode.connect(gainNode);
                gainNode.connect(offlineMasterGain);

                noiseSource.start(startTime);
                noiseSource.stop(startTime + layerDuration);
            } else {
                // Oscillator (sine, square, sawtooth, triangle)
                const oscillator = offlineContext.createOscillator();
                const gainNode = offlineContext.createGain();

                oscillator.type = layer.type;
                oscillator.frequency.value = layer.frequency;

                if (layer.frequencyEnd !== null && layer.frequencyEnd !== layer.frequency) {
                    oscillator.frequency.setValueAtTime(layer.frequency, startTime);
                    oscillator.frequency.exponentialRampToValueAtTime(layer.frequencyEnd, startTime + layerDuration);
                }

                // ADSR
                const attackTime = layer.attack;
                const decayTime = layer.decay;
                const sustainLevel = layer.sustain * layer.volume;
                const releaseTime = layer.release;

                gainNode.gain.setValueAtTime(0, startTime);
                gainNode.gain.linearRampToValueAtTime(layer.volume, startTime + attackTime);
                gainNode.gain.linearRampToValueAtTime(sustainLevel, startTime + attackTime + decayTime);
                gainNode.gain.setValueAtTime(sustainLevel, startTime + layerDuration - releaseTime);
                gainNode.gain.linearRampToValueAtTime(0, startTime + layerDuration);

                oscillator.connect(gainNode);
                gainNode.connect(offlineMasterGain);

                oscillator.start(startTime);
                oscillator.stop(startTime + layerDuration);
            }
        });

        try {
            // Render the audio
            const renderedBuffer = await offlineContext.startRendering();
            const channelData = renderedBuffer.getChannelData(0);

            // Downsample to requested sample count for display
            const waveformData = new Float32Array(sampleCount);
            const samplesPerPoint = Math.floor(channelData.length / sampleCount);

            for (let i = 0; i < sampleCount; i++) {
                let sum = 0;
                let max = 0;
                const start = i * samplesPerPoint;
                const end = Math.min(start + samplesPerPoint, channelData.length);

                // Use peak value for better visual representation
                for (let j = start; j < end; j++) {
                    const absVal = Math.abs(channelData[j]);
                    if (absVal > max) max = absVal;
                    sum += channelData[j];
                }

                // Store the sample with sign of average but magnitude of peak
                const avg = sum / (end - start);
                waveformData[i] = avg >= 0 ? max : -max;
            }

            return {
                data: waveformData,
                duration: previewDuration
            };
        } catch (error) {
            console.error('Preview waveform generation failed:', error);
            return null;
        }
    }

    // Export to WAV
    async exportToWAV() {
        if (!this.audioContext) {
            this.initialize();
        }

        // Use the maximum layer duration for export
        const exportDuration = this.getMaxLayerDuration();

        // Create offline context for rendering
        const offlineContext = new OfflineAudioContext(
            2, // stereo
            this.audioContext.sampleRate * exportDuration,
            this.audioContext.sampleRate
        );

        // Recreate effects chain in offline context
        const offlineMasterGain = offlineContext.createGain();
        const offlineConvolver = offlineContext.createConvolver();
        const offlineFilter = offlineContext.createBiquadFilter();
        const offlineDistortion = offlineContext.createWaveShaper();
        const offlineDryGain = offlineContext.createGain();
        const offlineWetGain = offlineContext.createGain();
        const offlineReverbMix = offlineContext.createGain();

        offlineFilter.type = 'lowpass';
        offlineFilter.frequency.value = this.filter.frequency.value;
        offlineConvolver.buffer = this.createReverbImpulseForContext(offlineContext);
        offlineDistortion.curve = this.distortion.curve;
        offlineDistortion.oversample = this.distortion.oversample;
        offlineMasterGain.gain.value = this.masterGain.gain.value;
        offlineDryGain.gain.value = this.dryGain.gain.value;
        offlineWetGain.gain.value = this.wetGain.gain.value;

        // Connect chain with dry/wet mixing
        offlineMasterGain.connect(offlineDistortion);
        offlineDistortion.connect(offlineFilter);

        // Dry path
        offlineFilter.connect(offlineDryGain);
        offlineDryGain.connect(offlineReverbMix);

        // Wet path
        offlineFilter.connect(offlineConvolver);
        offlineConvolver.connect(offlineWetGain);
        offlineWetGain.connect(offlineReverbMix);

        // Final output
        offlineReverbMix.connect(offlineContext.destination);

        // Render each layer
        const now = 0;
        this.layers.forEach(layer => {
            if (!layer.enabled) return;

            // Get this layer's duration and delay
            const layerDuration = this.getLayerDuration(layer);
            const layerDelay = layer.delay || 0;
            const startTime = now + layerDelay;

            // Handle noise type
            if (layer.type === 'noise') {
                this.renderNoiseLayer(offlineContext, offlineMasterGain, layer, startTime, layerDuration);
                return;
            }

            // Handle sample type
            if (layer.type === 'sample') {
                this.renderSampleLayer(offlineContext, offlineMasterGain, layer, startTime, layerDuration);
                return;
            }

            const oscillator = offlineContext.createOscillator();
            const gainNode = offlineContext.createGain();

            oscillator.type = layer.type;
            oscillator.frequency.value = layer.frequency;

            // Add frequency sweep if frequencyEnd is specified
            if (layer.frequencyEnd !== null && layer.frequencyEnd !== layer.frequency) {
                oscillator.frequency.setValueAtTime(layer.frequency, startTime);
                oscillator.frequency.exponentialRampToValueAtTime(layer.frequencyEnd, startTime + layerDuration);
            }

            // ADSR Envelope
            const attackTime = layer.attack;
            const decayTime = layer.decay;
            const sustainLevel = layer.sustain * layer.volume;
            const releaseTime = layer.release;

            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(layer.volume, startTime + attackTime);
            gainNode.gain.linearRampToValueAtTime(sustainLevel, startTime + attackTime + decayTime);
            gainNode.gain.setValueAtTime(sustainLevel, startTime + layerDuration - releaseTime);
            gainNode.gain.linearRampToValueAtTime(0, startTime + layerDuration);

            oscillator.connect(gainNode);
            gainNode.connect(offlineMasterGain);

            oscillator.start(startTime);
            oscillator.stop(startTime + layerDuration);
        });

        // Render the audio
        const renderedBuffer = await offlineContext.startRendering();

        // Convert to WAV
        const wavBlob = this.bufferToWave(renderedBuffer);
        return wavBlob;
    }

    renderNoiseLayer(context, destination, layer, startTime, layerDuration) {
        // Create noise buffer
        const bufferSize = context.sampleRate * layerDuration;
        const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
        const data = buffer.getChannelData(0);

        // Generate white noise
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noiseSource = context.createBufferSource();
        const gainNode = context.createGain();
        const filterNode = context.createBiquadFilter();

        noiseSource.buffer = buffer;
        filterNode.type = 'bandpass';
        filterNode.frequency.value = layer.frequency;
        filterNode.Q.value = 1.0;

        // Apply frequency sweep to filter if specified
        if (layer.frequencyEnd !== null && layer.frequencyEnd !== layer.frequency) {
            filterNode.frequency.setValueAtTime(layer.frequency, startTime);
            filterNode.frequency.exponentialRampToValueAtTime(layer.frequencyEnd, startTime + layerDuration);
        }

        // ADSR Envelope
        const attackTime = layer.attack;
        const decayTime = layer.decay;
        const sustainLevel = layer.sustain * layer.volume;
        const releaseTime = layer.release;

        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(layer.volume, startTime + attackTime);
        gainNode.gain.linearRampToValueAtTime(sustainLevel, startTime + attackTime + decayTime);
        gainNode.gain.setValueAtTime(sustainLevel, startTime + layerDuration - releaseTime);
        gainNode.gain.linearRampToValueAtTime(0, startTime + layerDuration);

        noiseSource.connect(filterNode);
        filterNode.connect(gainNode);
        gainNode.connect(destination);

        noiseSource.start(startTime);
        noiseSource.stop(startTime + layerDuration);
    }

    renderSampleLayer(context, destination, layer, startTime, layerDuration) {
        if (!layer.audioBuffer) {
            console.warn('Sample layer has no audio buffer for rendering');
            return;
        }

        const source = context.createBufferSource();
        const gainNode = context.createGain();

        source.buffer = layer.audioBuffer;
        source.playbackRate.value = layer.pitch || 1.0;

        // Calculate trim
        const trimStart = layer.trimStart || 0;
        const trimEnd = layer.trimEnd || layer.audioBuffer.duration;
        const trimDuration = trimEnd - trimStart;

        // ADSR Envelope
        const attackTime = layer.attack || 0.001;
        const decayTime = layer.decay || 0.01;
        const sustainLevel = (layer.sustain || 1.0) * layer.volume;
        const releaseTime = layer.release || 0.01;

        // Calculate effective duration (considering pitch and layer duration)
        const effectiveDuration = Math.min(trimDuration / layer.pitch, layerDuration);

        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(layer.volume, startTime + attackTime);
        gainNode.gain.linearRampToValueAtTime(sustainLevel, startTime + attackTime + decayTime);

        if (effectiveDuration > releaseTime) {
            gainNode.gain.setValueAtTime(sustainLevel, startTime + effectiveDuration - releaseTime);
            gainNode.gain.linearRampToValueAtTime(0, startTime + effectiveDuration);
        }

        source.connect(gainNode);
        gainNode.connect(destination);

        source.start(startTime, trimStart, trimDuration);
    }

    createReverbImpulseForContext(context) {
        const length = context.sampleRate * 2;
        const impulse = context.createBuffer(2, length, context.sampleRate);
        const left = impulse.getChannelData(0);
        const right = impulse.getChannelData(1);

        for (let i = 0; i < length; i++) {
            const decay = Math.pow(1 - i / length, 3);
            left[i] = (Math.random() * 2 - 1) * decay;
            right[i] = (Math.random() * 2 - 1) * decay;
        }

        return impulse;
    }

    bufferToWave(buffer) {
        const length = buffer.length * buffer.numberOfChannels * 2;
        const arrayBuffer = new ArrayBuffer(44 + length);
        const view = new DataView(arrayBuffer);
        const channels = [];
        let offset = 0;
        let pos = 0;

        // Write WAV header
        const setUint16 = (data) => {
            view.setUint16(pos, data, true);
            pos += 2;
        };
        const setUint32 = (data) => {
            view.setUint32(pos, data, true);
            pos += 4;
        };

        // "RIFF" chunk descriptor
        setUint32(0x46464952); // "RIFF"
        setUint32(36 + length); // file length - 8
        setUint32(0x45564157); // "WAVE"

        // "fmt " sub-chunk
        setUint32(0x20746d66); // "fmt "
        setUint32(16); // subchunk1size
        setUint16(1); // audio format (1 = PCM)
        setUint16(buffer.numberOfChannels);
        setUint32(buffer.sampleRate);
        setUint32(buffer.sampleRate * 2 * buffer.numberOfChannels); // byte rate
        setUint16(buffer.numberOfChannels * 2); // block align
        setUint16(16); // bits per sample

        // "data" sub-chunk
        setUint32(0x61746164); // "data"
        setUint32(length);

        // Write interleaved data
        for (let i = 0; i < buffer.numberOfChannels; i++) {
            channels.push(buffer.getChannelData(i));
        }

        while (pos < arrayBuffer.byteLength) {
            for (let i = 0; i < buffer.numberOfChannels; i++) {
                let sample = Math.max(-1, Math.min(1, channels[i][offset]));
                sample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
                view.setInt16(pos, sample, true);
                pos += 2;
            }
            offset++;
        }

        return new Blob([arrayBuffer], { type: 'audio/wav' });
    }

    clearAll() {
        this.stop();
        this.layers = [];
    }
}

// Create global instance
const soundEngine = new SoundEngine();
window.soundEngine = soundEngine;
