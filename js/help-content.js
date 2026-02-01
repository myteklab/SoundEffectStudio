// Sound Effect Studio - Help Content
// Educational information for each parameter

const helpContent = {
    layers: {
        title: "Sound Layers",
        content: `
            <h3>🎨 What are Sound Layers?</h3>
            <p>Sound layers are <strong>multiple sounds playing at the same time</strong>, blended together to create one rich, complex sound. Think of it like painting - you can use one color, or layer multiple colors to create depth and richness!</p>

            <h3>🎵 Why Use Layers?</h3>
            <p>Professional sound designers RARELY use just one sound. Layering is the secret to creating:</p>
            <ul>
                <li><strong>Richer, fuller sounds</strong> with more depth</li>
                <li><strong>More realistic effects</strong> that sound less "synthetic"</li>
                <li><strong>Unique sounds</strong> that stand out</li>
                <li><strong>Professional quality</strong> audio</li>
            </ul>

            <div class="help-tip">
                Even simple sounds like coin pickups in professional games often have 2-3 layers!
            </div>

            <h3>🎮 Real Game Sound Examples</h3>

            <h4>💥 Explosion (2-3 Layers)</h4>
            <div class="help-example">
                <div class="help-example-title">Professional Explosion Stack:</div>
                <ul>
                    <li><strong>Layer 1 - The Boom:</strong> Noise (800 → 50 Hz) at 80% volume - creates the initial "crack"</li>
                    <li><strong>Layer 2 - The Rumble:</strong> Sawtooth (120 → 40 Hz) at 60% volume - adds deep rumble</li>
                    <li><strong>Optional Layer 3 - The Impact:</strong> Low sine (60 Hz) at 40% volume - adds sub-bass punch</li>
                </ul>
                <p><strong>Why this works:</strong> The noise gives you the sharp attack, the sawtooth adds body and aggression, and the sine adds that "feel it in your chest" low end!</p>
            </div>

            <h4>⚡ Laser (2 Layers)</h4>
            <div class="help-example">
                <div class="help-example-title">Sci-Fi Laser Stack:</div>
                <ul>
                    <li><strong>Layer 1 - Main Body:</strong> Sawtooth (1200 → 300 Hz) at 50% volume - the main "pew"</li>
                    <li><strong>Layer 2 - The Edge:</strong> Square (1200 → 300 Hz) at 30% volume - adds sharpness</li>
                </ul>
                <p><strong>Why this works:</strong> The sawtooth is bright and buzzy (perfect for lasers), and the quieter square layer adds that extra sci-fi edge without being too harsh!</p>
            </div>

            <h4>🪙 Coin Pickup (2 Layers)</h4>
            <div class="help-example">
                <div class="help-example-title">Magical Coin Stack:</div>
                <ul>
                    <li><strong>Layer 1 - The Chime:</strong> Square (988 → 1319 Hz) at 40% volume - bright, rising pitch</li>
                    <li><strong>Layer 2 - The Sparkle:</strong> Sine (1319 Hz, no sweep) at 30% volume - pure tone that sustains</li>
                </ul>
                <p><strong>Why this works:</strong> The square gives you that classic game sound, while the sine adds a pleasant musical ring that makes it feel rewarding!</p>
            </div>

            <h4>⭐ Power Up (3 Layers)</h4>
            <div class="help-example">
                <div class="help-example-title">Epic Power-Up Stack:</div>
                <ul>
                    <li><strong>Layer 1 - Root Note:</strong> Square (200 → 800 Hz) at 50% volume - main rising tone</li>
                    <li><strong>Layer 2 - Harmony:</strong> Sine (400 → 1600 Hz) at 30% volume - one octave higher</li>
                    <li><strong>Layer 3 - Sparkle:</strong> Triangle (800 → 2400 Hz) at 20% volume - highest layer for magic</li>
                </ul>
                <p><strong>Why this works:</strong> Multiple layers at musical intervals create a CHORD that sounds magical and triumphant!</p>
            </div>

            <h3>🎯 Layering Techniques</h3>

            <h4>🎨 Frequency Layering</h4>
            <p>Stack sounds that occupy different frequency ranges:</p>
            <ul>
                <li><strong>Low Layer (20-200 Hz):</strong> Rumble and sub-bass (explosions, impacts)</li>
                <li><strong>Mid Layer (200-2000 Hz):</strong> Body and presence (main sound)</li>
                <li><strong>High Layer (2000+ Hz):</strong> Brightness and detail (sparkle, air)</li>
            </ul>
            <div class="help-example">
                <div class="help-example-title">Example: Thunder</div>
                <p>Low layer = deep rumble (60 Hz), Mid layer = crackle (noise 400 Hz), High layer = sharp crack (noise 2000 Hz)</p>
            </div>

            <h4>🎵 Harmonic Layering</h4>
            <p>Use musical intervals to create rich, harmonious sounds:</p>
            <ul>
                <li><strong>Octaves:</strong> Same note, different octaves (200 Hz + 400 Hz + 800 Hz)</li>
                <li><strong>Fifths:</strong> Musical harmony (200 Hz + 300 Hz)</li>
                <li><strong>Chords:</strong> Multiple notes (C + E + G = major chord)</li>
            </ul>
            <div class="help-tip">
                Power-ups sound AMAZING with harmonic layering - makes them feel magical and musical!
            </div>

            <h4>🌊 Texture Layering</h4>
            <p>Combine different wave types for complexity:</p>
            <ul>
                <li><strong>Clean + Noise:</strong> Add subtle noise (20% volume) to any sound for texture</li>
                <li><strong>Square + Sine:</strong> Retro edge with smooth undertone</li>
                <li><strong>Sawtooth + Triangle:</strong> Brightness with warmth</li>
            </ul>

            <h3>🎚️ Volume Balancing is KEY!</h3>
            <p>The most important skill in layering is <strong>volume balance</strong>:</p>
            <div class="help-example">
                <div class="help-example-title">The Layer Hierarchy:</div>
                <ul>
                    <li><strong>Main Layer:</strong> 50-70% volume (the dominant sound)</li>
                    <li><strong>Supporting Layers:</strong> 30-40% volume (adds character)</li>
                    <li><strong>Texture Layers:</strong> 20-30% volume (subtle enhancement)</li>
                </ul>
            </div>

            <div class="help-tip">
                Never set all layers to 100%! Start with your main layer at 50%, then add others at lower volumes.
            </div>

            <h3>🔧 Step-by-Step: Building a Layered Sound</h3>

            <h4>Example: Creating an Epic Explosion</h4>
            <ol>
                <li><strong>Start Simple:</strong> Click "+ Add Layer" to start with Layer 1</li>
                <li><strong>Main Boom:</strong> Set to Noise, 800 Hz → 50 Hz sweep, 80% volume, 0.3s decay</li>
                <li><strong>Add Layer 2:</strong> Click "+ Add Layer" again</li>
                <li><strong>Deep Rumble:</strong> Set to Sawtooth, 120 Hz → 40 Hz sweep, 60% volume, 0.4s decay</li>
                <li><strong>Play & Adjust:</strong> Hit play and balance the volumes until it sounds right!</li>
                <li><strong>Master Effects:</strong> Add 30-40% distortion and set filter to 3000 Hz for aggression</li>
            </ol>

            <h3>🎯 Pro Tips</h3>

            <div class="help-tip">
                <strong>Start with 1 layer, get it sounding good, THEN add more.</strong> Don't add layers just because you can!
            </div>

            <div class="help-tip">
                <strong>Each layer should have a purpose:</strong> "This layer adds brightness," "This layer adds depth," etc.
            </div>

            <div class="help-tip">
                <strong>Use different ADSR envelopes on different layers</strong> for more interest. Example: Main layer has quick attack, supporting layer has slow attack.
            </div>

            <div class="help-tip">
                <strong>Less is often more:</strong> 2-3 well-chosen layers beat 5-6 random layers!
            </div>

            <h3>⚠️ Common Mistakes</h3>

            <ul>
                <li><strong>❌ Too many layers:</strong> More than 4-5 usually just makes mud</li>
                <li><strong>❌ All layers at 100% volume:</strong> Causes distortion and clipping</li>
                <li><strong>❌ All layers in same frequency range:</strong> They fight for space and cancel out</li>
                <li><strong>❌ Adding layers without purpose:</strong> Every layer should add something specific</li>
                <li><strong>✅ 2-3 focused layers:</strong> Each with a clear purpose and proper volume balance</li>
            </ul>

            <h3>🎨 Creative Layer Ideas</h3>

            <div class="help-example">
                <div class="help-example-title">Underwater Effect</div>
                <p>Layer 1: Your main sound (bubbles, movement)<br>
                Layer 2: Low-frequency sine wave (30-60 Hz) at 20% for underwater pressure feel</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">Magical Sparkle</div>
                <p>Layer 1: Main chime sound<br>
                Layer 2: Very high triangle wave (2000+ Hz) at 15% volume with slow attack for shimmer</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">Retro Game Sound</div>
                <p>Layer 1: Square wave (your main note)<br>
                Layer 2: Same square wave one octave up at 30% volume<br>
                Creates that classic NES/Game Boy thickness!</p>
            </div>

            <h3>🎧 Experiment!</h3>
            <p><strong>Try this exercise:</strong></p>
            <ol>
                <li>Load the "Explosion" preset (which already has 2 layers!)</li>
                <li>Click on Layer 1, listen to it solo by lowering Layer 2 volume to 0</li>
                <li>Now listen to Layer 2 solo by lowering Layer 1 to 0</li>
                <li>Bring both back up - hear how they work together!</li>
            </ol>

            <div class="help-tip">
                Understanding how layers work together is the key to becoming a great sound designer!
            </div>

            <h3>🎬 Real-World Examples</h3>

            <p><strong>Famous game sounds that use layering:</strong></p>
            <ul>
                <li><strong>Mario jump:</strong> 2 layers (main bounce + harmonic overtone)</li>
                <li><strong>Sonic ring collect:</strong> 3 layers (chime + sparkle + bass punch)</li>
                <li><strong>Zelda treasure chest:</strong> 4 layers (ascending musical notes + shimmer)</li>
                <li><strong>Modern FPS gunshots:</strong> 5-8 layers (mechanism, boom, tail, echo, etc.)</li>
            </ul>

            <p>Even simple retro games used layering - they just did it cleverly within their limitations!</p>

            <h3>📚 Summary: When to Use Layers</h3>

            <p><strong>Use 1 Layer when:</strong></p>
            <ul>
                <li>Making simple UI clicks or beeps</li>
                <li>Learning the basics first</li>
                <li>The sound is already perfect with one layer</li>
            </ul>

            <p><strong>Use 2 Layers when:</strong></p>
            <ul>
                <li>You want more depth (most game sounds)</li>
                <li>Combining two complementary sounds (laser = sawtooth + square)</li>
                <li>Adding texture (main sound + subtle noise)</li>
            </ul>

            <p><strong>Use 3+ Layers when:</strong></p>
            <ul>
                <li>Creating complex effects (explosions, power-ups)</li>
                <li>Building musical/harmonic sounds</li>
                <li>Making "epic" or important sound effects</li>
            </ul>

            <div class="help-tip">
                Layering is what separates "okay" sound effects from "WOW!" sound effects. Master this technique!
            </div>
        `
    },

    waveType: {
        title: "Wave Type",
        content: `
            <h3>🎵 What is Wave Type?</h3>
            <p>Wave type determines the basic <strong>texture</strong> and <strong>character</strong> of your sound. Different wave shapes create different harmonics (overtones) which give each wave its unique sound.</p>

            <h3>📊 The Five Wave Types</h3>

            <h4>🌊 Sine (Smooth)</h4>
            <p>The purest waveform - contains only one frequency with no harmonics.</p>
            <div class="help-example">
                <div class="help-example-title">Best For:</div>
                <ul>
                    <li>🔔 Bell sounds and chimes</li>
                    <li>🎹 Pure musical tones</li>
                    <li>🔊 Sub-bass rumbles</li>
                    <li>💫 Magical or ethereal effects</li>
                </ul>
            </div>
            <div class="help-tip">Use sine waves for soft, mellow sounds. They work great for coin pickups and power-up chimes!</div>

            <h4>⬛ Square (8-bit)</h4>
            <p>Creates that classic retro video game sound. Has strong odd harmonics (3rd, 5th, 7th, etc.).</p>
            <div class="help-example">
                <div class="help-example-title">Best For:</div>
                <ul>
                    <li>🎮 Retro game sounds (like NES/Game Boy)</li>
                    <li>🦘 Jump effects</li>
                    <li>🖱️ UI clicks and beeps</li>
                    <li>👾 Chip-tune music</li>
                </ul>
            </div>
            <div class="help-tip">Square waves are perfect for that nostalgic 8-bit game feel. Try them for jump sounds!</div>

            <h4>📐 Sawtooth (Buzzy)</h4>
            <p>The "buzzy" wave - rich in all harmonics. Sounds bright and edgy.</p>
            <div class="help-example">
                <div class="help-example-title">Best For:</div>
                <ul>
                    <li>⚡ Laser and sci-fi weapons</li>
                    <li>🎸 Bass-heavy sounds</li>
                    <li>💥 Aggressive or harsh effects</li>
                    <li>🚁 Mechanical/engine sounds</li>
                </ul>
            </div>
            <div class="help-tip">Sawtooth waves are aggressive and bright. Perfect for laser guns and explosions!</div>

            <h4>▲ Triangle (Mellow)</h4>
            <p>Softer than square, but more character than sine. Contains only odd harmonics like square, but much weaker.</p>
            <div class="help-example">
                <div class="help-example-title">Best For:</div>
                <ul>
                    <li>🎶 Mellow musical tones</li>
                    <li>🔔 Soft bells</li>
                    <li>✨ Gentle magical effects</li>
                    <li>🌟 Subtle background sounds</li>
                </ul>
            </div>
            <div class="help-tip">Triangle is the middle ground - use it when sine is too plain but square is too harsh.</div>

            <h4>📻 Noise (Static)</h4>
            <p>Random frequencies all at once - like radio static or wind.</p>
            <div class="help-example">
                <div class="help-example-title">Best For:</div>
                <ul>
                    <li>💥 Explosions and impacts</li>
                    <li>💨 Wind and whoosh sounds</li>
                    <li>🔥 Fire and crackling</li>
                    <li>💔 Hit/damage sounds</li>
                    <li>🌊 Ocean waves</li>
                </ul>
            </div>
            <div class="help-tip">Noise is essential for realistic explosions! Combine it with low-frequency oscillators for best results.</div>

            <h3>🎨 Combining Wave Types</h3>
            <p>Professional sound designers often layer multiple wave types together:</p>
            <ul>
                <li><strong>Explosion:</strong> Noise (for the "boom") + Sawtooth (for the rumble)</li>
                <li><strong>Laser:</strong> Sawtooth + Square (for thickness and edge)</li>
                <li><strong>Power Up:</strong> Multiple Sine waves at different pitches (creates harmony)</li>
            </ul>
        `
    },

    pitch: {
        title: "Pitch (Frequency)",
        content: `
            <h3>🎵 What is Pitch?</h3>
            <p>Pitch controls how <strong>high or low</strong> your sound is. Measured in Hertz (Hz) - the number of vibrations per second.</p>
            <div class="help-value-range">Range: 20 Hz (very deep) to 2000 Hz (very high)</div>

            <h3>🎹 Pitch Reference Guide</h3>
            <ul>
                <li><strong>20-60 Hz:</strong> Sub-bass rumble (explosions, thunder)</li>
                <li><strong>60-120 Hz:</strong> Deep bass (kick drums, big impacts)</li>
                <li><strong>120-250 Hz:</strong> Low notes (hurt sounds, dark effects)</li>
                <li><strong>250-500 Hz:</strong> Mid-low (footsteps, heavy objects)</li>
                <li><strong>500-1000 Hz:</strong> Mid range (most game sounds)</li>
                <li><strong>1000-2000 Hz:</strong> High-mid (bright sounds, coins, power-ups)</li>
            </ul>

            <h3>🎮 Common Game Sound Pitches</h3>
            <div class="help-example">
                <div class="help-example-title">🦘 Jump Sound</div>
                <p>Start: <strong>600 Hz</strong> → End: <strong>200 Hz</strong></p>
                <p>The descending pitch makes it feel like you're going up and then gravity pulls you down!</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">🪙 Coin Pickup</div>
                <p>Start: <strong>988 Hz</strong> → End: <strong>1319 Hz</strong></p>
                <p>Rising pitch = positive feeling. These are actual musical notes (B5 to E6)!</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">⚡ Laser</div>
                <p>Start: <strong>1200 Hz</strong> → End: <strong>300 Hz</strong></p>
                <p>Fast downward sweep = "pew pew" sci-fi sound</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">💥 Explosion</div>
                <p>Low: <strong>40-120 Hz</strong></p>
                <p>Very low frequencies create that rumbling "boom" feeling in your chest!</p>
            </div>

            <h3>🎯 Pro Tips</h3>
            <div class="help-tip">
                Higher pitch = happier, lighter, more positive (coins, power-ups, success)
            </div>
            <div class="help-tip">
                Lower pitch = heavier, darker, more serious (explosions, damage, failure)
            </div>
            <div class="help-tip">
                Pitch sweeps (changing pitch over time) make sounds WAY more interesting! Try it!
            </div>

            <h3>🎼 Musical Notes Reference</h3>
            <p>If you want to create musical sound effects:</p>
            <ul>
                <li><strong>261 Hz</strong> = Middle C</li>
                <li><strong>329 Hz</strong> = E</li>
                <li><strong>392 Hz</strong> = G</li>
                <li><strong>523 Hz</strong> = High C</li>
                <li><strong>659 Hz</strong> = E</li>
                <li><strong>784 Hz</strong> = G</li>
            </ul>
            <p>Combine these to make harmonious power-up sounds!</p>
        `
    },

    frequencyEnd: {
        title: "End Pitch (Frequency Sweep)",
        content: `
            <h3>🎢 What is End Pitch?</h3>
            <p>End Pitch creates a <strong>frequency sweep</strong> - your sound will smoothly transition from the Start Pitch to this End Pitch over its duration.</p>
            <div class="help-value-range">Range: 0 Hz (no sweep) to 2000 Hz</div>

            <h3>↗️ Rising vs Falling Sweeps</h3>

            <h4>📈 Rising Pitch (End > Start)</h4>
            <p>Sound goes from low to high. Creates feelings of:</p>
            <ul>
                <li><strong>Jumping up</strong> or ascending</li>
                <li><strong>Positive emotions</strong> (coins, power-ups)</li>
                <li><strong>Charging up</strong> energy</li>
                <li><strong>Questions</strong> or anticipation</li>
            </ul>
            <div class="help-example">
                <div class="help-example-title">🪙 Coin Pickup</div>
                <p>Start: <strong>988 Hz</strong> → End: <strong>1319 Hz</strong></p>
                <p>Rising pitch = rewarding, positive feeling!</p>
            </div>

            <h4>📉 Falling Pitch (End < Start)</h4>
            <p>Sound goes from high to low. Creates feelings of:</p>
            <ul>
                <li><strong>Falling down</strong> or descending</li>
                <li><strong>Negative emotions</strong> (hurt, damage)</li>
                <li><strong>Impact</strong> or landing</li>
                <li><strong>Finality</strong> or game over</li>
            </ul>
            <div class="help-example">
                <div class="help-example-title">💔 Hurt Sound</div>
                <p>Start: <strong>400 Hz</strong> → End: <strong>100 Hz</strong></p>
                <p>Falling pitch = something bad happened!</p>
            </div>

            <h3>🎮 Common Game Sound Sweeps</h3>

            <div class="help-example">
                <div class="help-example-title">🦘 Jump Sound</div>
                <p>Start: <strong>150 Hz</strong> → End: <strong>600 Hz</strong></p>
                <p>Rising pitch mimics the upward motion of jumping!</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">⚡ Laser/Zap</div>
                <p>Start: <strong>1200 Hz</strong> → End: <strong>300 Hz</strong></p>
                <p>Fast falling pitch creates that classic "pew" sound!</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">⭐ Power Up</div>
                <p>Start: <strong>262 Hz</strong> → End: <strong>523 Hz</strong></p>
                <p>Doubling the frequency (one octave up) sounds magical!</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">☠️ Death/Game Over</div>
                <p>Start: <strong>400 Hz</strong> → End: <strong>50 Hz</strong></p>
                <p>Slow descending pitch = doom and defeat</p>
            </div>

            <h3>🎯 Tips for Using Sweeps</h3>

            <div class="help-tip">
                <strong>Set End Pitch to 0 for no sweep.</strong> The sound will stay at a constant pitch.
            </div>

            <div class="help-tip">
                <strong>Bigger sweep = more dramatic effect.</strong> Start: 200 Hz → End: 800 Hz is more noticeable than 200 Hz → 300 Hz.
            </div>

            <div class="help-tip">
                <strong>Combine with duration!</strong> Shorter duration = faster sweep. Longer duration = slower, more gradual change.
            </div>

            <h3>🎨 Multi-Layer Sweep Techniques</h3>
            <p>When using multiple layers, try these sweep combinations:</p>
            <ul>
                <li><strong>Same direction, different ranges:</strong> Layer 1: 300→800 Hz, Layer 2: 600→1200 Hz (creates richness)</li>
                <li><strong>Opposite directions:</strong> Layer 1 rises while Layer 2 falls (creates tension)</li>
                <li><strong>One sweeps, one static:</strong> Moving layer + steady layer (adds stability)</li>
            </ul>
        `
    },

    volume: {
        title: "Volume",
        content: `
            <h3>🔊 What is Volume?</h3>
            <p>Volume controls how <strong>loud</strong> each individual layer is. This is crucial when combining multiple layers!</p>
            <div class="help-value-range">Range: 0% (silent) to 100% (full volume)</div>

            <h3>🎚️ Balancing Multiple Layers</h3>
            <p>When you have multiple layers, you need to balance their volumes so they blend well together.</p>

            <div class="help-example">
                <div class="help-example-title">💥 Explosion Example</div>
                <ul>
                    <li><strong>Noise layer (high frequencies):</strong> 80% volume - the "crack"</li>
                    <li><strong>Sawtooth layer (low frequencies):</strong> 60% volume - the "rumble"</li>
                </ul>
                <p>The high-frequency noise is louder to give that sharp explosive sound, while the low rumble supports it.</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">⚡ Laser Example</div>
                <ul>
                    <li><strong>Sawtooth layer:</strong> 50% volume - main body</li>
                    <li><strong>Square layer:</strong> 30% volume - adds edge</li>
                </ul>
                <p>The second layer is quieter, just adding character without overwhelming the main sound.</p>
            </div>

            <h3>🎯 Volume Guidelines</h3>
            <ul>
                <li><strong>Single Layer:</strong> Start at 50-70% to leave headroom</li>
                <li><strong>Main Layer:</strong> 50-70% (the dominant sound)</li>
                <li><strong>Supporting Layers:</strong> 30-40% (adds flavor)</li>
                <li><strong>Background Layers:</strong> 20-30% (subtle texture)</li>
            </ul>

            <div class="help-tip">
                Never set everything to 100%! Your sound will be too loud and might distort. Always leave some headroom!
            </div>

            <h3>🔍 Common Mistakes</h3>
            <ul>
                <li><strong>❌ All layers at 100%:</strong> Causes distortion and clipping</li>
                <li><strong>❌ Too quiet overall:</strong> Use Master Volume instead of layer volumes</li>
                <li><strong>✅ Balanced approach:</strong> Main layer at 50-70%, supporting layers lower</li>
            </ul>

            <div class="help-tip">
                If your overall sound is too quiet, use the Master Volume control instead of increasing all layer volumes!
            </div>

            <h3>🎨 Creative Uses</h3>
            <p><strong>Fading Effects:</strong> You can create fade-in/fade-out effects by adjusting layer volumes along with Attack and Release times.</p>
            <p><strong>Layering Textures:</strong> Add a very quiet (20%) noise layer to almost any sound for extra richness!</p>
        `
    },

    layerDuration: {
        title: "Layer Duration",
        content: `
            <h3>⏱️ What is Layer Duration?</h3>
            <p>Layer Duration controls <strong>how long this specific layer plays</strong>. Each layer can have its own duration, allowing you to create complex layered sounds where different elements last different amounts of time.</p>
            <div class="help-value-range">Range: 0.01s (very short) to 5s (long)</div>

            <h3>🎯 Why Different Durations?</h3>
            <p>Real sound effects often have multiple components with different lengths:</p>
            <ul>
                <li><strong>Quick attack layer</strong> + <strong>longer sustain layer</strong></li>
                <li><strong>Short click</strong> + <strong>longer resonance</strong></li>
                <li><strong>Fast transient</strong> + <strong>slow tail</strong></li>
            </ul>

            <h3>🎮 Game Sound Examples</h3>

            <div class="help-example">
                <div class="help-example-title">🪙 Classic Coin Sound</div>
                <ul>
                    <li><strong>Layer 1:</strong> Sine @ 1200 Hz, <strong>0.1s</strong>, 100%</li>
                    <li><strong>Layer 2:</strong> Sine @ 1800 Hz, <strong>0.08s</strong>, 50%</li>
                </ul>
                <p>The higher layer is shorter and quieter - creates that satisfying "cha-ching" sparkle!</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">💥 Explosion</div>
                <ul>
                    <li><strong>Layer 1 (Crack):</strong> Noise @ 800 Hz, <strong>0.1s</strong>, 80%</li>
                    <li><strong>Layer 2 (Rumble):</strong> Sawtooth @ 80 Hz, <strong>0.8s</strong>, 60%</li>
                </ul>
                <p>Short sharp crack + long deep rumble = realistic explosion!</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">🦘 Double Jump</div>
                <ul>
                    <li><strong>Layer 1:</strong> Sine 300→800 Hz, <strong>0.1s</strong>, 80%</li>
                    <li><strong>Layer 2:</strong> Triangle 600→1200 Hz, <strong>0.08s</strong>, 40%</li>
                </ul>
                <p>Second layer is higher, shorter, and quieter - creates a "sparkle" effect!</p>
            </div>

            <h3>💡 Tips</h3>

            <div class="help-tip">
                <strong>Main layer = longest duration.</strong> Supporting layers are usually shorter.
            </div>

            <div class="help-tip">
                <strong>Higher pitched layers = shorter durations.</strong> High frequencies naturally decay faster in real sounds.
            </div>

            <div class="help-tip">
                <strong>The total sound length is the longest layer's duration.</strong> If Layer 1 is 0.5s and Layer 2 is 0.3s, your sound will be 0.5s total.
            </div>
        `
    },

    delay: {
        title: "Layer Delay",
        content: `
            <h3>⏰ What is Layer Delay?</h3>
            <p>Layer Delay controls <strong>when this layer starts playing</strong> relative to the beginning of the sound. A delay of 0 means the layer starts immediately. A delay of 0.06s means the layer waits 60 milliseconds before playing.</p>
            <div class="help-value-range">Range: 0s (instant) to 2s (delayed)</div>

            <h3>🎯 Why Use Delay?</h3>
            <p>Delay allows you to create <strong>sequential sounds</strong> where layers play one after another instead of all at once:</p>
            <ul>
                <li><strong>Two-tone effects</strong> - like the classic Mario coin "ding-DING"</li>
                <li><strong>Echo effects</strong> - same tone repeated with slight delay</li>
                <li><strong>Call and response</strong> - first sound triggers second sound</li>
                <li><strong>Building complexity</strong> - layers enter at different times</li>
            </ul>

            <h3>🎮 Game Sound Examples</h3>

            <div class="help-example">
                <div class="help-example-title">🪙 Mario-Style Coin (Two-Tone)</div>
                <ul>
                    <li><strong>Layer 1:</strong> Square @ 988 Hz, 0.07s, <strong>delay: 0s</strong></li>
                    <li><strong>Layer 2:</strong> Square @ 1319 Hz, 0.10s, <strong>delay: 0.06s</strong></li>
                </ul>
                <p>The second note starts 60ms after the first - creates that iconic "ding-DING" sound!</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">🔔 Multi-Chime</div>
                <ul>
                    <li><strong>Layer 1:</strong> Triangle @ 523 Hz, 0.2s, <strong>delay: 0s</strong></li>
                    <li><strong>Layer 2:</strong> Triangle @ 659 Hz, 0.2s, <strong>delay: 0.1s</strong></li>
                    <li><strong>Layer 3:</strong> Triangle @ 784 Hz, 0.2s, <strong>delay: 0.2s</strong></li>
                </ul>
                <p>Creates an ascending arpeggio effect - notes play one after another!</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">💫 Sparkle Trail</div>
                <ul>
                    <li><strong>Layer 1:</strong> Sine @ 1000 Hz, 0.1s, <strong>delay: 0s</strong>, 80%</li>
                    <li><strong>Layer 2:</strong> Sine @ 1200 Hz, 0.08s, <strong>delay: 0.05s</strong>, 60%</li>
                    <li><strong>Layer 3:</strong> Sine @ 1400 Hz, 0.06s, <strong>delay: 0.10s</strong>, 40%</li>
                </ul>
                <p>Each layer is higher, quieter, and delayed - creates a sparkle trail effect!</p>
            </div>

            <h3>💡 Tips</h3>

            <div class="help-tip">
                <strong>Small delays (0.03-0.08s) create rhythmic patterns.</strong> This is perfect for two-tone sounds like coin pickups.
            </div>

            <div class="help-tip">
                <strong>Total sound length = delay + duration of longest layer.</strong> A layer with 0.5s delay and 0.3s duration ends at 0.8s.
            </div>

            <div class="help-tip">
                <strong>Common delay values:</strong> 0.06s (60ms) for quick two-tone, 0.1s for distinct separation, 0.2s+ for echo effects.
            </div>
        `
    },

    attack: {
        title: "Attack",
        content: `
            <h3>⚡ What is Attack?</h3>
            <p>Attack controls <strong>how quickly</strong> your sound goes from silence to full volume when it starts. It's the "onset" of the sound.</p>
            <div class="help-value-range">Range: 0.001s (instant) to 1s (slow)</div>

            <h3>🎯 Attack Values Guide</h3>

            <h4>⚡ Instant Attack (0.001 - 0.01s)</h4>
            <p>Sound reaches full volume almost immediately.</p>
            <div class="help-example">
                <div class="help-example-title">Perfect For:</div>
                <ul>
                    <li>🦘 Jump sounds - needs to be instant and responsive</li>
                    <li>💥 Explosions - sudden and shocking</li>
                    <li>🖱️ UI clicks - immediate feedback</li>
                    <li>⚡ Laser shots - instant "pew!"</li>
                    <li>💔 Hit/damage sounds - sharp impact</li>
                </ul>
            </div>

            <h4>🎵 Fast Attack (0.01 - 0.05s)</h4>
            <p>Quick but slightly softer onset.</p>
            <div class="help-example">
                <div class="help-example-title">Perfect For:</div>
                <ul>
                    <li>🪙 Coin pickups - still quick but not harsh</li>
                    <li>⭐ Power-up starts - energetic but smooth</li>
                    <li>🎹 Musical notes - natural instrument-like</li>
                </ul>
            </div>

            <h4>🌊 Medium Attack (0.05 - 0.2s)</h4>
            <p>Noticeable "swell" as sound builds up.</p>
            <div class="help-example">
                <div class="help-example-title">Perfect For:</div>
                <ul>
                    <li>💨 Whoosh sounds - gradual buildup</li>
                    <li>🌟 Magical effects - ethereal feeling</li>
                    <li>🎺 Brass-like sounds - softer onset</li>
                </ul>
            </div>

            <h4>🌅 Slow Attack (0.2s - 1s)</h4>
            <p>Very gradual fade-in effect.</p>
            <div class="help-example">
                <div class="help-example-title">Perfect For:</div>
                <ul>
                    <li>🎻 Pad sounds - ambient background</li>
                    <li>🌊 Swells and risers - building tension</li>
                    <li>👻 Ghostly or eerie effects</li>
                </ul>
            </div>

            <h3>🎮 Game Sound Examples</h3>
            <div class="help-example">
                <div class="help-example-title">🦘 Jump Sound</div>
                <p><strong>Attack: 0.001s</strong></p>
                <p>Must be instant! When a player presses jump, they need immediate audio feedback.</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">⭐ Power Up</div>
                <p><strong>Attack: 0.02s</strong></p>
                <p>Slightly softer start makes it feel magical and pleasant, not harsh.</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">💨 Whoosh</div>
                <p><strong>Attack: 0.05s</strong></p>
                <p>The gradual build makes it feel like wind picking up speed.</p>
            </div>

            <h3>🎯 Pro Tips</h3>
            <div class="help-tip">
                For responsive game sounds (jumps, hits, clicks), always use very short attack times (0.001 - 0.01s)
            </div>
            <div class="help-tip">
                Longer attack times make sounds feel "softer" and less aggressive - great for friendly/positive effects
            </div>
            <div class="help-tip">
                If your sound feels too harsh or "clicky," try increasing the attack time slightly
            </div>

            <h3>🔄 Attack vs. Decay</h3>
            <p>Don't confuse attack with decay!</p>
            <ul>
                <li><strong>Attack:</strong> How fast sound reaches FULL volume (going UP)</li>
                <li><strong>Decay:</strong> How fast sound drops to SUSTAIN level (going DOWN)</li>
            </ul>
        `
    },

    decay: {
        title: "Decay",
        content: `
            <h3>📉 What is Decay?</h3>
            <p>Decay controls how quickly the sound drops from its <strong>peak volume</strong> (after attack) down to the <strong>sustain level</strong>.</p>
            <div class="help-value-range">Range: 0.001s (instant drop) to 1s (slow fade)</div>

            <h3>🎵 The ADSR Journey</h3>
            <ol>
                <li><strong>Attack:</strong> Sound goes from 0% → 100% volume</li>
                <li><strong>Decay:</strong> Sound goes from 100% → Sustain% volume</li>
                <li><strong>Sustain:</strong> Sound holds at this level</li>
                <li><strong>Release:</strong> Sound fades to 0% when it ends</li>
            </ol>

            <h3>🎯 Decay Values Guide</h3>

            <h4>⚡ Fast Decay (0.001 - 0.05s)</h4>
            <p>Quick drop - creates "plucky" or "percussive" sounds.</p>
            <div class="help-example">
                <div class="help-example-title">Perfect For:</div>
                <ul>
                    <li>🖱️ UI clicks - very short sounds</li>
                    <li>🔔 Plucked strings or bells</li>
                    <li>⚡ Snappy laser sounds</li>
                    <li>🥁 Percussion-like effects</li>
                </ul>
            </div>

            <h4>🎵 Medium Decay (0.05 - 0.2s)</h4>
            <p>Noticeable fade but still relatively quick.</p>
            <div class="help-example">
                <div class="help-example-title">Perfect For:</div>
                <ul>
                    <li>🦘 Jump sounds - initial "pop" then settles</li>
                    <li>🪙 Coin pickups - bright start, gentle fade</li>
                    <li>💔 Hurt sounds - sharp impact that fades</li>
                </ul>
            </div>

            <h4>🌊 Slow Decay (0.2s - 1s)</h4>
            <p>Gradual fade creates smoother, more musical sounds.</p>
            <div class="help-example">
                <div class="help-example-title">Perfect For:</div>
                <ul>
                    <li>⭐ Power-up sounds - magical sustained feeling</li>
                    <li>💥 Explosions - boom fades into rumble</li>
                    <li>🎹 Musical sustained notes</li>
                    <li>🌟 Magical effects</li>
                </ul>
            </div>

            <h3>🎮 Game Sound Examples</h3>
            <div class="help-example">
                <div class="help-example-title">🦘 Jump Sound</div>
                <p><strong>Decay: 0.08s</strong></p>
                <p>Quick decay gives that "boing" feeling - starts strong then drops quickly.</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">🪙 Coin Pickup</div>
                <p><strong>Decay: 0.08 - 0.15s</strong></p>
                <p>The bright chime needs to ring out a bit, but not too long.</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">💥 Explosion</div>
                <p><strong>Decay: 0.2 - 0.4s</strong></p>
                <p>The initial boom fades into a rumble. Longer decay = bigger explosion!</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">⭐ Power Up</div>
                <p><strong>Decay: 0.1 - 0.15s</strong></p>
                <p>Starts bright and energetic, then settles into a pleasant sustained note.</p>
            </div>

            <h3>🎯 Pro Tips</h3>
            <div class="help-tip">
                Short decay + low sustain = percussive, plucky sounds (great for clicks and short effects)
            </div>
            <div class="help-tip">
                Long decay + high sustain = smooth, musical sounds (great for power-ups and melodic effects)
            </div>
            <div class="help-tip">
                If your sound needs to feel "punchy" or "snappy," use a fast decay!
            </div>

            <h3>🔄 Decay + Sustain Combinations</h3>
            <ul>
                <li><strong>Fast Decay + Low Sustain (0%):</strong> Sound dies quickly (bells, clicks)</li>
                <li><strong>Medium Decay + Medium Sustain (50%):</strong> Balanced sound (jumps, coins)</li>
                <li><strong>Slow Decay + High Sustain (70-80%):</strong> Sustained sound (power-ups, pads)</li>
            </ul>

            <div class="help-tip">
                Experiment! Try the same sound with different decay times to hear how it changes the character completely!
            </div>
        `
    },

    sustain: {
        title: "Sustain",
        content: `
            <h3>🎵 What is Sustain?</h3>
            <p>Sustain is the <strong>volume level</strong> the sound holds at after the decay phase, until it's time to release. Unlike the other envelope parameters (which are times), sustain is a percentage!</p>
            <div class="help-value-range">Range: 0% (silent) to 100% (full volume)</div>

            <h3>🎹 Understanding Sustain</h3>
            <p>Think of sustain like this:</p>
            <ul>
                <li>Sound starts → <strong>Attack</strong> brings it to 100%</li>
                <li>Then <strong>Decay</strong> drops it down to your sustain level</li>
                <li>Sound <strong>stays</strong> at sustain level (holds the note)</li>
                <li>When sound ends → <strong>Release</strong> fades to 0%</li>
            </ul>

            <h3>🎯 Sustain Values Guide</h3>

            <h4>🔇 No Sustain (0%)</h4>
            <p>Sound dies out completely after decay - no held note.</p>
            <div class="help-example">
                <div class="help-example-title">Perfect For:</div>
                <ul>
                    <li>🖱️ UI clicks - very short, no sustain needed</li>
                    <li>⚡ Laser zaps - quick "pew" and done</li>
                    <li>💔 Quick hit sounds</li>
                    <li>🔔 Bell "dings" - ring and fade</li>
                </ul>
            </div>
            <div class="help-tip">
                0% sustain creates "one-shot" sounds that play and fade away naturally, like hitting a drum.
            </div>

            <h4>🎵 Low Sustain (10-30%)</h4>
            <p>Quiet held note after initial impact.</p>
            <div class="help-example">
                <div class="help-example-title">Perfect For:</div>
                <ul>
                    <li>🦘 Jump sounds - slight tail after the "boing"</li>
                    <li>💥 Explosions - rumble after the boom</li>
                    <li>💔 Hurt sounds - pain lingers briefly</li>
                </ul>
            </div>

            <h4>🎹 Medium Sustain (40-60%)</h4>
            <p>Balanced - noticeable held note.</p>
            <div class="help-example">
                <div class="help-example-title">Perfect For:</div>
                <ul>
                    <li>🪙 Coin pickups - bright chime that rings</li>
                    <li>⭐ Power-up sounds - sustained magical feeling</li>
                    <li>🎮 General purpose game sounds</li>
                </ul>
            </div>

            <h4>🎺 High Sustain (70-100%)</h4>
            <p>Strong held note - sound stays loud.</p>
            <div class="help-example">
                <div class="help-example-title">Perfect For:</div>
                <ul>
                    <li>🎹 Musical notes and melodies</li>
                    <li>⭐ Long power-up sounds</li>
                    <li>🌟 Ambient sustained effects</li>
                    <li>🎺 Horn or organ-like sounds</li>
                </ul>
            </div>

            <h3>🎮 Game Sound Examples</h3>
            <div class="help-example">
                <div class="help-example-title">🦘 Jump Sound</div>
                <p><strong>Sustain: 0%</strong></p>
                <p>Jump sounds are quick and punchy - they don't need to hold. The sound plays and fades away naturally.</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">🪙 Coin Pickup</div>
                <p><strong>Sustain: 0%</strong></p>
                <p>Like a bell - it rings bright and clear, then fades. No sustained note needed!</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">⭐ Power Up</div>
                <p><strong>Sustain: 60-80%</strong></p>
                <p>Power-ups should feel sustained and magical, so they hold at a strong volume!</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">💥 Explosion</div>
                <p><strong>Sustain: 15-20%</strong></p>
                <p>After the initial BOOM, there's a lingering rumble before it fades completely.</p>
            </div>

            <h3>🎯 Pro Tips</h3>
            <div class="help-tip">
                For short, punchy sounds (clicks, jumps, lasers), use 0% sustain. Let decay do the work!
            </div>
            <div class="help-tip">
                For musical or melodic sounds (power-ups, chimes), use medium to high sustain (50-80%)
            </div>
            <div class="help-tip">
                Sustain determines how "long" the sound feels, even if the total duration is the same
            </div>

            <h3>🔬 The Science of Sustain</h3>
            <p><strong>Real instruments:</strong></p>
            <ul>
                <li><strong>Piano:</strong> Low sustain - notes fade quickly</li>
                <li><strong>Organ:</strong> 100% sustain - holds forever until key released</li>
                <li><strong>Guitar (plucked):</strong> 0% sustain - string rings and fades</li>
                <li><strong>Violin (bowed):</strong> High sustain - can hold note as long as bow moves</li>
            </ul>

            <h3>🔄 Sustain + Duration Interaction</h3>
            <p>Important: Sustain level only matters if your <strong>duration is long enough</strong> for the sound to reach the sustain phase!</p>
            <div class="help-example">
                <div class="help-example-title">Example:</div>
                <p>If Duration = 0.1s, Attack = 0.01s, Decay = 0.05s, Release = 0.05s</p>
                <p>Total = 0.11s... there's NO TIME for sustain! The sound never reaches the sustain phase.</p>
            </div>
            <div class="help-tip">
                For sustain to be audible, your duration should be longer than Attack + Decay + Release combined!
            </div>
        `
    },

    release: {
        title: "Release",
        content: `
            <h3>🌅 What is Release?</h3>
            <p>Release controls how long the sound takes to <strong>fade to silence</strong> after the main duration ends. It's the "tail" of your sound.</p>
            <div class="help-value-range">Range: 0.001s (instant cutoff) to 2s (long fade)</div>

            <h3>🎵 Why Release Matters</h3>
            <p>Release prevents harsh cutoffs and creates natural-sounding fades. Without release, sounds would just STOP abruptly, which sounds unnatural and jarring.</p>

            <h3>🎯 Release Values Guide</h3>

            <h4>⚡ Very Short Release (0.001 - 0.02s)</h4>
            <p>Instant or near-instant cutoff.</p>
            <div class="help-example">
                <div class="help-example-title">Perfect For:</div>
                <ul>
                    <li>🖱️ UI clicks - need to stop immediately</li>
                    <li>⚡ Laser zaps - sharp, quick ending</li>
                    <li>🥁 Staccato/percussive effects</li>
                </ul>
            </div>
            <div class="help-tip">
                Very short release creates tight, controlled sounds. Great for UI feedback!
            </div>

            <h4>🎵 Short Release (0.02 - 0.1s)</h4>
            <p>Quick but smooth fade - most common for game sounds.</p>
            <div class="help-example">
                <div class="help-example-title">Perfect For:</div>
                <ul>
                    <li>🦘 Jump sounds - quick but not harsh</li>
                    <li>🪙 Coin pickups - gentle ring-out</li>
                    <li>💔 Hurt sounds - fade after impact</li>
                    <li>🎮 Most game sound effects</li>
                </ul>
            </div>

            <h4>🌊 Medium Release (0.1 - 0.5s)</h4>
            <p>Noticeable tail - sound lingers pleasantly.</p>
            <div class="help-example">
                <div class="help-example-title">Perfect For:</div>
                <ul>
                    <li>⭐ Power-up sounds - magical fade</li>
                    <li>💥 Explosions - rumble trails off</li>
                    <li>🎹 Musical notes - natural decay</li>
                    <li>🔔 Bell sounds - long ring</li>
                </ul>
            </div>

            <h4>🎺 Long Release (0.5s - 2s)</h4>
            <p>Very gradual fade - atmospheric and spacious.</p>
            <div class="help-example">
                <div class="help-example-title">Perfect For:</div>
                <ul>
                    <li>🌟 Ambient effects - ethereal fades</li>
                    <li>💫 Reverb-heavy sounds</li>
                    <li>🎻 Sustained musical tones</li>
                    <li>👻 Eerie or ghostly effects</li>
                </ul>
            </div>

            <h3>🎮 Game Sound Examples</h3>
            <div class="help-example">
                <div class="help-example-title">🖱️ UI Click</div>
                <p><strong>Release: 0.01s</strong></p>
                <p>Extremely short - click needs to be crisp and immediate, no tail!</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">🦘 Jump Sound</div>
                <p><strong>Release: 0.05s</strong></p>
                <p>Quick but smooth ending - not harsh, just snappy.</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">🪙 Coin Pickup</div>
                <p><strong>Release: 0.05 - 0.1s</strong></p>
                <p>Pleasant ring-out like a real chime - bright but not too long.</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">⭐ Power Up</div>
                <p><strong>Release: 0.3 - 0.35s</strong></p>
                <p>Magical fade - the sound lingers pleasantly, creating a sense of achievement!</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">💥 Explosion</div>
                <p><strong>Release: 0.4 - 0.6s</strong></p>
                <p>Long rumble fade - makes the explosion feel bigger and more impactful!</p>
            </div>

            <h3>🎯 Pro Tips</h3>
            <div class="help-tip">
                Release prevents "clicks" and "pops" - always use at least 0.01s even for short sounds!
            </div>
            <div class="help-tip">
                Longer release = bigger, more spacious sound. Shorter release = tighter, more controlled.
            </div>
            <div class="help-tip">
                If multiple sounds overlap (like rapid coin collection), use shorter release to prevent muddiness!
            </div>

            <h3>🔬 The Science</h3>
            <p><strong>Zero release</strong> would cause an instant cutoff from whatever volume the sound is at, straight to silence. This creates an audible "click" due to the discontinuity in the waveform.</p>
            <p><strong>Proper release</strong> smoothly ramps the volume to zero, preventing clicks and creating natural-sounding fades.</p>

            <h3>🎨 Creative Uses</h3>
            <div class="help-example">
                <div class="help-example-title">Echo Effect</div>
                <p>Combine medium sustain with long release to create an echo-like fade.</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">Gated Effect</div>
                <p>Use very short release (0.001s) with 0% sustain for hard-gated sounds.</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">Ambient Tail</div>
                <p>Long release (1-2s) on a high layer creates dreamy, atmospheric effects.</p>
            </div>

            <h3>⚠️ Common Mistakes</h3>
            <ul>
                <li><strong>❌ No release:</strong> Sounds harsh and unnatural</li>
                <li><strong>❌ Too long for fast sounds:</strong> Sounds overlap and get muddy</li>
                <li><strong>✅ Match release to context:</strong> Quick for UI, longer for musical/atmospheric</li>
            </ul>
        `
    },

    masterVolume: {
        title: "Master Volume",
        content: `
            <h3>🔊 What is Master Volume?</h3>
            <p>Master Volume controls the <strong>overall loudness</strong> of your entire sound - affecting ALL layers at once, after they've been mixed together.</p>
            <div class="help-value-range">Range: 0% (silent) to 100% (full volume)</div>

            <h3>🎚️ Master vs. Layer Volume</h3>
            <p><strong>Layer Volume:</strong> Controls individual layer loudness (how loud THAT layer is)</p>
            <p><strong>Master Volume:</strong> Controls final output loudness (how loud the WHOLE sound is)</p>

            <div class="help-example">
                <div class="help-example-title">Think of it like a band:</div>
                <ul>
                    <li><strong>Layer volumes:</strong> Each musician's individual volume knob</li>
                    <li><strong>Master volume:</strong> The venue's main PA system volume</li>
                </ul>
            </div>

            <h3>🎯 When to Adjust Master Volume</h3>
            <ul>
                <li><strong>Overall too quiet:</strong> Increase master volume</li>
                <li><strong>Overall too loud:</strong> Decrease master volume</li>
                <li><strong>Balance between layers is wrong:</strong> Adjust individual layer volumes (NOT master)</li>
            </ul>

            <h3>📊 Recommended Settings</h3>
            <div class="help-example">
                <div class="help-example-title">🖱️ UI Sounds (Clicks, Beeps)</div>
                <p><strong>Master Volume: 50-60%</strong></p>
                <p>UI sounds should be audible but not startling. Lower volume feels more professional.</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">🪙 Collectibles (Coins, Stars)</div>
                <p><strong>Master Volume: 60-70%</strong></p>
                <p>Rewarding but not overwhelming, especially since they might play repeatedly.</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">⚡ Action Sounds (Laser, Jump)</div>
                <p><strong>Master Volume: 65-75%</strong></p>
                <p>Should feel impactful and responsive.</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">💥 Big Events (Explosions, Power-ups)</div>
                <p><strong>Master Volume: 75-80%</strong></p>
                <p>These are meant to feel important and impressive!</p>
            </div>

            <h3>🎯 Pro Tips</h3>
            <div class="help-tip">
                Start at 70% and adjust from there. Never go to 100% right away - you need headroom!
            </div>
            <div class="help-tip">
                If you're hearing distortion or clipping, lower the master volume (or individual layer volumes)
            </div>
            <div class="help-tip">
                Test your sound at different volumes - it should sound good both quiet and loud!
            </div>

            <h3>🔊 Understanding Headroom</h3>
            <p><strong>Headroom</strong> is the space between your peak volume and the maximum (100%). You always want some headroom!</p>
            <div class="help-example">
                <div class="help-example-title">Why Headroom Matters:</div>
                <ul>
                    <li>Prevents distortion and clipping</li>
                    <li>Leaves room for audio processing (reverb, distortion effects)</li>
                    <li>Sounds more professional and polished</li>
                    <li>Allows for mixing with other game sounds later</li>
                </ul>
            </div>

            <h3>⚠️ Common Mistakes</h3>
            <ul>
                <li><strong>❌ Everything at 100%:</strong> No headroom = distortion and harsh sound</li>
                <li><strong>❌ Adjusting master instead of individual layers:</strong> Doesn't fix balance issues</li>
                <li><strong>❌ Too quiet overall:</strong> Players will struggle to hear important audio cues</li>
                <li><strong>✅ Balanced approach:</strong> 60-75% master, with proper layer balancing</li>
            </ul>

            <h3>🎮 Real-World Context</h3>
            <p>Remember: Your sound effect will play alongside music, other sound effects, and dialog in a real game. If your sound is too loud, it will overpower everything else!</p>

            <div class="help-tip">
                When exporting for use in a game, aim for 60-75% master volume. Game engines typically have their own master volume controls!
            </div>

            <h3>🔧 Troubleshooting</h3>
            <div class="help-example">
                <div class="help-example-title">Sound is distorted/crackling:</div>
                <p>→ Lower master volume to 60% and reduce layer volumes</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">Can barely hear the sound:</div>
                <p>→ Increase master volume to 70-80%, check layer volumes too</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">Some layers too quiet, others too loud:</div>
                <p>→ Don't touch master! Adjust individual layer volumes instead</p>
            </div>
        `
    },

    reverb: {
        title: "Reverb Mix",
        content: `
            <h3>🏛️ What is Reverb?</h3>
            <p>Reverb (short for "reverberation") simulates the sound of your effect playing in a <strong>physical space</strong> - like a room, hall, or cave. It creates echoes and reflections that make sounds feel less "dry" and more natural.</p>
            <div class="help-value-range">Range: 0% (dry/no reverb) to 100% (wet/full reverb)</div>

            <h3>🎵 How Reverb Works</h3>
            <p>When sound plays in a real space, it bounces off walls, ceiling, and floor, creating thousands of tiny echoes that blend together. Reverb simulates this!</p>
            <ul>
                <li><strong>Dry (0%):</strong> Pure original sound, no room effect</li>
                <li><strong>Mix:</strong> Blend between dry and wet</li>
                <li><strong>Wet (100%):</strong> Only the reverb reflections, no dry signal</li>
            </ul>

            <h3>🎯 Reverb Mix Guide</h3>

            <h4>🔇 No Reverb (0%)</h4>
            <p>Completely dry - no room simulation.</p>
            <div class="help-example">
                <div class="help-example-title">Best For:</div>
                <ul>
                    <li>🖱️ UI clicks - need to be crisp and immediate</li>
                    <li>🦘 Jump sounds - tight and responsive</li>
                    <li>⚡ Laser shots - clean and precise</li>
                    <li>🎮 Most fast-action game sounds</li>
                </ul>
            </div>

            <h4>🏠 Subtle Reverb (10-30%)</h4>
            <p>Gentle room presence - adds depth without being obvious.</p>
            <div class="help-example">
                <div class="help-example-title">Best For:</div>
                <ul>
                    <li>🪙 Coin pickups - slight sparkle</li>
                    <li>💔 Hurt sounds - adds impact</li>
                    <li>🔔 Bells and chimes - natural ring</li>
                    <li>🎮 General game sounds that need polish</li>
                </ul>
            </div>
            <div class="help-tip">
                The default 20% is perfect for most game sounds - adds life without being distracting!
            </div>

            <h4>🏛️ Medium Reverb (30-50%)</h4>
            <p>Noticeable space - sounds like it's in a real room.</p>
            <div class="help-example">
                <div class="help-example-title">Best For:</div>
                <ul>
                    <li>⭐ Power-up sounds - magical and spacious</li>
                    <li>💥 Explosions - makes them feel bigger</li>
                    <li>🌟 Special abilities - dramatic feel</li>
                    <li>🎺 Musical effects - concert hall feel</li>
                </ul>
            </div>

            <h4>🏰 Heavy Reverb (50-80%)</h4>
            <p>Very spacious - cathedral or cave-like.</p>
            <div class="help-example">
                <div class="help-example-title">Best For:</div>
                <ul>
                    <li>👻 Ghostly or eerie effects</li>
                    <li>🌌 Ambient sounds</li>
                    <li>🎵 Dramatic musical moments</li>
                    <li>🏰 Sounds in large virtual spaces</li>
                </ul>
            </div>

            <h3>🎮 Game Sound Examples</h3>
            <div class="help-example">
                <div class="help-example-title">🖱️ UI Click</div>
                <p><strong>Reverb: 0%</strong></p>
                <p>UI sounds need to be immediate and clean. Any reverb would make them feel "floaty" and less responsive.</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">🪙 Coin Pickup</div>
                <p><strong>Reverb: 15-25%</strong></p>
                <p>Just enough to make the chime sparkle and feel pleasant, like it's in a real space.</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">⭐ Power Up</div>
                <p><strong>Reverb: 30-40%</strong></p>
                <p>More reverb makes it feel magical and important - like the power is radiating outward!</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">💥 Explosion</div>
                <p><strong>Reverb: 25-35%</strong></p>
                <p>Adds depth and makes the explosion feel like it's echoing in the game world.</p>
            </div>

            <h3>🎯 Pro Tips</h3>
            <div class="help-tip">
                Less is more! Too much reverb makes sounds muddy and unclear. Start at 20% and adjust from there.
            </div>
            <div class="help-tip">
                Reverb makes sounds feel "bigger" and more spacious, but also less immediate and responsive.
            </div>
            <div class="help-tip">
                For retro/8-bit games, use little to no reverb (0-10%) to keep that classic dry sound!
            </div>

            <h3>🔬 The Science</h3>
            <p>Real reverb in a room has:</p>
            <ul>
                <li><strong>Early reflections:</strong> First few echoes (10-100ms)</li>
                <li><strong>Late reflections:</strong> Dense cloud of echoes that blend together</li>
                <li><strong>Decay time:</strong> How long it takes to fade completely</li>
            </ul>
            <p>This tool uses a simplified reverb that simulates a medium-sized room with about 2 seconds of decay.</p>

            <h3>🎨 Creative Uses</h3>
            <div class="help-example">
                <div class="help-example-title">Size Perception</div>
                <p>More reverb = bigger space. Use this to make sounds feel like they're in large caves or halls!</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">Distance Simulation</div>
                <p>Increase reverb and decrease volume to make sounds feel farther away.</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">Magical Effects</div>
                <p>High reverb (40-60%) on power-ups and special abilities creates an ethereal, magical quality.</p>
            </div>

            <h3>⚠️ Common Mistakes</h3>
            <ul>
                <li><strong>❌ Too much reverb on everything:</strong> Makes the mix muddy and unclear</li>
                <li><strong>❌ Reverb on rapid sounds:</strong> Creates a washy mess (like rapid coin pickups)</li>
                <li><strong>❌ Reverb on UI:</strong> Makes interface feel sluggish and unresponsive</li>
                <li><strong>✅ Selective reverb:</strong> Use it where it adds to the experience, skip where it doesn't</li>
            </ul>

            <div class="help-tip">
                If you're making multiple sounds for a game, use similar reverb amounts to make them feel like they're in the same world!
            </div>
        `
    },

    filter: {
        title: "Filter Frequency",
        content: `
            <h3>🎛️ What is Filter Frequency?</h3>
            <p>Filter Frequency controls a <strong>low-pass filter</strong> that removes (or "filters out") high frequencies above a certain point. It's like turning down the "treble" knob - making sounds darker and more muffled.</p>
            <div class="help-value-range">Range: 20 Hz (removes almost everything) to 20,000 Hz (lets everything through)</div>

            <h3>🔊 How Filters Work</h3>
            <p>A low-pass filter lets LOW frequencies pass through, but blocks HIGH frequencies. The filter frequency is the "cutoff point":</p>
            <ul>
                <li><strong>Above the cutoff:</strong> Frequencies get quieter (filtered out)</li>
                <li><strong>Below the cutoff:</strong> Frequencies pass through unchanged</li>
            </ul>

            <h3>🎯 Filter Frequency Guide</h3>

            <h4>🔇 Very Low (20 - 500 Hz)</h4>
            <p>Only deep bass frequencies pass through - very muffled and dark.</p>
            <div class="help-example">
                <div class="help-example-title">Sound Character:</div>
                <p>Extremely muffled, like hearing through thick walls. Only rumble survives.</p>
                <div class="help-example-title">Creative Uses:</div>
                <ul>
                    <li>💥 Distant explosions or thunder</li>
                    <li>🏰 Sounds through walls/doors</li>
                    <li>💔 Underwater effects</li>
                    <li>😵 Dazed/stunned character state</li>
                </ul>
            </div>

            <h4>🌊 Low (500 - 2000 Hz)</h4>
            <p>Noticeably muffled but still recognizable.</p>
            <div class="help-example">
                <div class="help-example-title">Sound Character:</div>
                <p>Warm and soft, like old telephone or radio quality.</p>
                <div class="help-example-title">Best For:</div>
                <ul>
                    <li>💥 Big, warm explosions (2000 Hz)</li>
                    <li>📻 Retro/vintage sound effects</li>
                    <li>🌊 Underwater ambience</li>
                    <li>😴 Dream sequences</li>
                </ul>
            </div>

            <h4>🎵 Medium (2000 - 8000 Hz)</h4>
            <p>Slightly darker but maintains clarity and character.</p>
            <div class="help-example">
                <div class="help-example-title">Sound Character:</div>
                <p>Warm and pleasant without being too bright or harsh.</p>
                <div class="help-example-title">Best For:</div>
                <ul>
                    <li>💥 Explosions with body but not too harsh (3000 Hz)</li>
                    <li>🔨 Impact sounds with weight</li>
                    <li>🎮 General action sounds that need warmth</li>
                    <li>💔 Hurt sounds (less piercing)</li>
                </ul>
            </div>

            <h4>✨ High (8000 - 15000 Hz)</h4>
            <p>Bright and clear - only removes the very highest harmonics.</p>
            <div class="help-example">
                <div class="help-example-title">Sound Character:</div>
                <p>Full, bright sound with slight smoothing of harsh edges.</p>
                <div class="help-example-title">Best For:</div>
                <ul>
                    <li>🪙 Coin pickups - bright but not painful</li>
                    <li>⭐ Power-ups - sparkly and clear</li>
                    <li>🔔 Chimes and bells</li>
                    <li>🎮 Most game sounds</li>
                </ul>
            </div>

            <h4>🌟 Full Range (15000 - 20000 Hz)</h4>
            <p>No filtering - all frequencies pass through.</p>
            <div class="help-example">
                <div class="help-example-title">Sound Character:</div>
                <p>Maximum brightness and detail. Can be harsh or crispy.</p>
                <div class="help-example-title">Best For:</div>
                <ul>
                    <li>🖱️ UI clicks - crisp and immediate</li>
                    <li>⚡ Laser zaps - sharp sci-fi sounds</li>
                    <li>✨ Very bright, sparkly effects</li>
                    <li>🎮 Sounds that need maximum clarity</li>
                </ul>
            </div>

            <h3>🎮 Game Sound Examples</h3>
            <div class="help-example">
                <div class="help-example-title">💥 Explosion</div>
                <p><strong>Filter: 2000-3000 Hz</strong></p>
                <p>Removes harsh high frequencies while keeping the powerful low-end rumble. Makes it feel massive and real, not tinny!</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">🪙 Coin Pickup</div>
                <p><strong>Filter: 15000 Hz</strong></p>
                <p>Keeps the brightness and sparkle but smooths any painful high frequencies.</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">🦘 Jump</div>
                <p><strong>Filter: 8000 Hz</strong></p>
                <p>Bright enough to be clear but not harsh on repeated plays.</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">⚡ Laser</div>
                <p><strong>Filter: 6000 Hz</strong></p>
                <p>Sci-fi brightness with some edge removed for that classic laser sound.</p>
            </div>

            <h3>🎯 Pro Tips</h3>
            <div class="help-tip">
                Default at 20,000 Hz (full range) is fine for most sounds. Lower it if something sounds too harsh or bright!
            </div>
            <div class="help-tip">
                Filtering makes sounds feel "warmer" and less "digital" - great for explosions and impacts!
            </div>
            <div class="help-tip">
                For retro games, try 8000 Hz or lower to get that classic lo-fi sound!
            </div>

            <h3>🔬 The Science</h3>
            <p><strong>Frequency and Sound:</strong></p>
            <ul>
                <li><strong>20-200 Hz:</strong> Deep bass rumble (sub-bass)</li>
                <li><strong>200-800 Hz:</strong> Body and warmth</li>
                <li><strong>800-2000 Hz:</strong> Presence and clarity</li>
                <li><strong>2000-8000 Hz:</strong> Brightness and definition</li>
                <li><strong>8000-20000 Hz:</strong> "Air" and sparkle</li>
            </ul>
            <p>By filtering out high frequencies, you're removing the "air" and "sparkle" first, making sounds progressively darker and more muffled.</p>

            <h3>🎨 Creative Uses</h3>
            <div class="help-example">
                <div class="help-example-title">Underwater Effect</div>
                <p>Set filter to 500-1000 Hz for instant underwater muffled sound!</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">Distance Simulation</div>
                <p>Lower filter frequency makes sounds feel farther away (distant sounds lose high frequencies in air).</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">Retro/Vintage</div>
                <p>Use 4000-8000 Hz for that classic low-fi video game or old radio sound.</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">Warm vs. Bright</div>
                <p>Compare the same sound at 4000 Hz (warm, smooth) vs. 20000 Hz (bright, crisp). Huge difference!</p>
            </div>

            <h3>⚠️ Common Mistakes</h3>
            <ul>
                <li><strong>❌ Too low on everything:</strong> Makes all sounds muddy and unclear</li>
                <li><strong>❌ Filtering UI sounds:</strong> UI needs to be crisp and clear!</li>
                <li><strong>✅ Use strategically:</strong> Filter explosions and impacts, keep UI and collectibles bright</li>
            </ul>

            <div class="help-tip">
                If your sound has annoying high-pitched elements, try lowering the filter instead of reducing volume!
            </div>

            <h3>🎧 Test It!</h3>
            <p><strong>Experiment:</strong> Load the explosion preset, then slowly drag the filter from 20,000 Hz down to 500 Hz while playing it. Hear how it goes from bright and crispy to deep and muffled!</p>
        `
    },

    distortion: {
        title: "Distortion",
        content: `
            <h3>🔥 What is Distortion?</h3>
            <p>Distortion adds <strong>crunch, grit, and aggression</strong> to your sounds by intentionally "overdriving" the audio signal. It's like pushing a guitar amp too hard - creates that fuzzy, aggressive tone!</p>
            <div class="help-value-range">Range: 0% (clean/no distortion) to 100% (heavy distortion)</div>

            <h3>🎸 How Distortion Works</h3>
            <p>Distortion "clips" the waveform when it gets too loud, cutting off the peaks and creating new harmonics (overtones). This makes sounds:</p>
            <ul>
                <li><strong>More aggressive</strong> and powerful</li>
                <li><strong>Grittier</strong> and rougher</li>
                <li><strong>Fuller</strong> with extra harmonics</li>
                <li><strong>Louder</strong> in perceived volume</li>
            </ul>

            <h3>🎯 Distortion Amount Guide</h3>

            <h4>✨ No Distortion (0%)</h4>
            <p>Pure, clean sound with no harmonic addition.</p>
            <div class="help-example">
                <div class="help-example-title">Best For:</div>
                <ul>
                    <li>🖱️ UI clicks - clean and professional</li>
                    <li>🪙 Coin pickups - pure and pleasant</li>
                    <li>🔔 Bells and chimes - pristine tones</li>
                    <li>⭐ Power-ups - magical and clean</li>
                    <li>🎮 Most game sounds by default</li>
                </ul>
            </div>

            <h4>🎵 Light Distortion (5-20%)</h4>
            <p>Subtle warmth and presence - adds body without obvious crunch.</p>
            <div class="help-example">
                <div class="help-example-title">Sound Character:</div>
                <p>Slightly fuller and more present, like analog warmth.</p>
                <div class="help-example-title">Best For:</div>
                <ul>
                    <li>⚡ Laser shots - extra sci-fi edge (10%)</li>
                    <li>🦘 Jumps - slight punch</li>
                    <li>💨 Whoosh - more texture</li>
                    <li>🎮 Sounds that need subtle enhancement</li>
                </ul>
            </div>

            <h4>🔥 Medium Distortion (20-40%)</h4>
            <p>Noticeable grit and aggression - clearly distorted.</p>
            <div class="help-example">
                <div class="help-example-title">Sound Character:</div>
                <p>Fuzzy, rough, and aggressive. Rock guitar territory!</p>
                <div class="help-example-title">Best For:</div>
                <ul>
                    <li>💥 Explosions - adds impact and aggression (30-40%)</li>
                    <li>💔 Hurt sounds - makes damage feel harsh (25%)</li>
                    <li>⚡ Aggressive laser weapons</li>
                    <li>🔨 Heavy impact sounds</li>
                </ul>
            </div>

            <h4>⚡ Heavy Distortion (40-70%)</h4>
            <p>Very aggressive and fuzzy - over-the-top crunch.</p>
            <div class="help-example">
                <div class="help-example-title">Sound Character:</div>
                <p>Extremely harsh and fuzzy, almost unrecognizable from original.</p>
                <div class="help-example-title">Best For:</div>
                <ul>
                    <li>💥 MASSIVE explosions - skull-crushing impact</li>
                    <li>⚡ Sci-fi energy weapons</li>
                    <li>👾 Alien or robotic voices</li>
                    <li>🎮 Extreme/stylized effects</li>
                </ul>
            </div>

            <h4>🌪️ Extreme Distortion (70-100%)</h4>
            <p>Complete obliteration - pure noise and chaos.</p>
            <div class="help-example">
                <div class="help-example-title">Sound Character:</div>
                <p>Barely recognizable, almost pure static. Very harsh!</p>
                <div class="help-example-title">Creative Uses:</div>
                <ul>
                    <li>🔥 Glitch effects</li>
                    <li>📻 Radio static/interference</li>
                    <li>⚠️ System errors or warnings</li>
                    <li>💀 Extreme, stylized impacts</li>
                </ul>
            </div>
            <div class="help-tip">
                Extreme distortion is rarely musical - use it for special effects only!
            </div>

            <h3>🎮 Game Sound Examples</h3>
            <div class="help-example">
                <div class="help-example-title">💥 Explosion</div>
                <p><strong>Distortion: 35%</strong></p>
                <p>Adds aggression and power to the boom. Makes it feel more impactful and dangerous!</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">💔 Hurt Sound</div>
                <p><strong>Distortion: 25%</strong></p>
                <p>Makes damage feel harsh and painful - the crunch adds impact!</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">⚡ Laser</div>
                <p><strong>Distortion: 10-20%</strong></p>
                <p>Subtle distortion adds sci-fi character without making it too fuzzy.</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">🖱️ UI Click</div>
                <p><strong>Distortion: 0%</strong></p>
                <p>UI sounds should stay clean and professional!</p>
            </div>

            <h3>🎯 Pro Tips</h3>
            <div class="help-tip">
                Start at 0% and add distortion gradually. A little goes a long way!
            </div>
            <div class="help-tip">
                Distortion makes sounds FEEL louder even if they're not - use it to add impact without raising volume!
            </div>
            <div class="help-tip">
                Combine distortion with low-pass filtering for that classic warm overdrive sound!
            </div>
            <div class="help-tip">
                For explosions, try 30-40% distortion - makes them feel powerful and dangerous!
            </div>

            <h3>🔬 The Science</h3>
            <p><strong>What distortion does to the waveform:</strong></p>
            <ul>
                <li><strong>Clipping:</strong> Cuts off the top and bottom of the wave</li>
                <li><strong>Harmonic addition:</strong> Creates new frequencies (overtones)</li>
                <li><strong>Compression:</strong> Makes quiet parts louder, loud parts stay loud</li>
                <li><strong>Character change:</strong> Transforms clean sounds into aggressive ones</li>
            </ul>

            <h3>🎨 Creative Uses</h3>
            <div class="help-example">
                <div class="help-example-title">Power and Aggression</div>
                <p>Add 30-50% distortion to make any sound feel more powerful and threatening!</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">Retro Game Sounds</div>
                <p>Light distortion (10-20%) can recreate that classic "bit-crushed" retro game sound.</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">Warmth and Body</div>
                <p>Very light distortion (5-10%) adds analog warmth like vintage gear, without obvious distortion.</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">Explosion Enhancement</div>
                <p>Combine noise + distortion + low filter for the perfect explosion: gritty, powerful, and massive!</p>
            </div>

            <h3>⚠️ Common Mistakes</h3>
            <ul>
                <li><strong>❌ Distortion on everything:</strong> Makes the whole mix harsh and fatiguing</li>
                <li><strong>❌ Too much too fast:</strong> Start low and add gradually</li>
                <li><strong>❌ Distorting UI sounds:</strong> UI needs to be clean and clear!</li>
                <li><strong>❌ Over 50% without purpose:</strong> Usually just makes things sound bad</li>
                <li><strong>✅ Strategic use:</strong> Apply to impacts, explosions, and aggressive effects only</li>
            </ul>

            <h3>🎧 Test It!</h3>
            <p><strong>Experiment:</strong> Load the laser preset and slowly increase distortion from 0% to 100%. Hear how it goes from clean "pew" to aggressive "BZZZZT"!</p>

            <div class="help-tip">
                Distortion + Noise layers = AMAZING explosions. Try it with the explosion preset!
            </div>

            <h3>🎭 When to Use Distortion</h3>
            <p><strong>Use it when you want sounds to feel:</strong></p>
            <ul>
                <li>More <strong>aggressive</strong> and intense</li>
                <li>More <strong>powerful</strong> and impactful</li>
                <li>More <strong>gritty</strong> and raw</li>
                <li><strong>Retro</strong> or lo-fi</li>
                <li><strong>Industrial</strong> or mechanical</li>
            </ul>

            <p><strong>DON'T use it for:</strong></p>
            <ul>
                <li>UI sounds (need to be clean)</li>
                <li>Pleasant sounds (coins, power-ups)</li>
                <li>Sounds that play frequently (gets fatiguing)</li>
            </ul>
        `
    },

    duration: {
        title: "Effect Duration",
        content: `
            <h3>⏱️ What is Effect Duration?</h3>
            <p>Duration controls <strong>how long your sound lasts</strong> from start to finish. This is the total time the sound plays, including all the envelope phases (Attack, Decay, Sustain, Release).</p>
            <div class="help-value-range">Range: 0.1s (very short) to 5s (very long)</div>

            <h3>🎮 Game Sound Duration Guide</h3>

            <h4>⚡ Very Short (0.05 - 0.15s)</h4>
            <p>Quick, snappy sounds for immediate feedback.</p>
            <div class="help-example">
                <div class="help-example-title">Perfect For:</div>
                <ul>
                    <li>🖱️ UI Clicks: <strong>0.08 - 0.1s</strong></li>
                    <li>💔 Quick hit sounds: <strong>0.1 - 0.15s</strong></li>
                    <li>⚡ Fast laser zaps: <strong>0.1 - 0.15s</strong></li>
                </ul>
            </div>

            <h4>🎵 Short (0.15 - 0.4s)</h4>
            <p>Standard game sound length - responsive but with character.</p>
            <div class="help-example">
                <div class="help-example-title">Perfect For:</div>
                <ul>
                    <li>🦘 Jump sounds: <strong>0.3 - 0.4s</strong></li>
                    <li>🪙 Coin pickups: <strong>0.3 - 0.4s</strong></li>
                    <li>⚡ Laser shots: <strong>0.2 - 0.3s</strong></li>
                    <li>💔 Hurt sounds: <strong>0.25 - 0.35s</strong></li>
                </ul>
            </div>

            <h4>🌊 Medium (0.4 - 1.0s)</h4>
            <p>Longer sounds with development and character.</p>
            <div class="help-example">
                <div class="help-example-title">Perfect For:</div>
                <ul>
                    <li>💨 Whoosh effects: <strong>0.6 - 0.8s</strong></li>
                    <li>⭐ Power-up sounds: <strong>0.7 - 1.0s</strong></li>
                    <li>💥 Explosions: <strong>0.8 - 1.2s</strong></li>
                    <li>🌟 Special ability sounds: <strong>0.5 - 1.0s</strong></li>
                </ul>
            </div>

            <h4>🎹 Long (1.0s - 5.0s)</h4>
            <p>Extended sounds for dramatic moments.</p>
            <div class="help-example">
                <div class="help-example-title">Perfect For:</div>
                <ul>
                    <li>🎺 Fanfares and victory sounds: <strong>2.0 - 3.0s</strong></li>
                    <li>🌟 Dramatic reveals: <strong>1.5 - 2.5s</strong></li>
                    <li>🎵 Musical stings: <strong>1.0 - 3.0s</strong></li>
                    <li>👻 Ambient effects: <strong>2.0 - 5.0s</strong></li>
                </ul>
            </div>

            <h3>⏰ Duration + ADSR Interaction</h3>
            <p><strong>CRITICAL:</strong> Your total duration should be long enough to include all ADSR phases!</p>
            <div class="help-example">
                <div class="help-example-title">Example Breakdown:</div>
                <p>If you want a 0.4s jump sound:</p>
                <ul>
                    <li>Attack: 0.001s</li>
                    <li>Decay: 0.08s</li>
                    <li>Sustain: 0% (so 0s sustain time)</li>
                    <li>Release: 0.05s</li>
                    <li><strong>Total minimum:</strong> 0.131s</li>
                    <li><strong>Duration set to:</strong> 0.4s ✅ (plenty of room!)</li>
                </ul>
            </div>

            <div class="help-tip">
                Formula: Duration should be ≥ Attack + Decay + Sustain Time + Release
            </div>

            <h3>🎯 Design Philosophy</h3>
            <div class="help-example">
                <div class="help-example-title">Responsive Sounds (Short Duration)</div>
                <p>For player actions that happen frequently (jumping, shooting, clicking), keep duration short (0.1 - 0.4s). Players need immediate feedback that doesn't overlap with repeated actions.</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">Reward Sounds (Medium Duration)</div>
                <p>For collecting items and achievements, use medium duration (0.4 - 1.0s). Long enough to feel rewarding but not so long it interrupts gameplay.</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">Event Sounds (Long Duration)</div>
                <p>For rare, important events (level complete, boss defeated), longer duration (1.0 - 3.0s) makes them feel significant.</p>
            </div>

            <h3>🎮 Specific Examples</h3>
            <div class="help-example">
                <div class="help-example-title">🦘 Jump Sound: 0.4s</div>
                <p><strong>Why?</strong> Long enough to have character and feel satisfying, short enough that rapid jumps don't create muddy overlap.</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">🪙 Coin: 0.35s</div>
                <p><strong>Why?</strong> Quick ring so collecting many coins in a row sounds clean, not chaotic.</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">⭐ Power-Up: 0.8s</div>
                <p><strong>Why?</strong> Long enough to feel special and magical, with rising pitch that develops over time.</p>
            </div>

            <div class="help-example">
                <div class="help-example-title">💥 Explosion: 1.0s</div>
                <p><strong>Why?</strong> Big boom needs time to develop from sharp attack through rumbling decay.</p>
            </div>

            <h3>🎯 Pro Tips</h3>
            <div class="help-tip">
                Shorter duration = more responsive feeling. Longer duration = more dramatic/impactful.
            </div>
            <div class="help-tip">
                For sounds that might play repeatedly (footsteps, gunshots), keep duration short to prevent overlap!
            </div>
            <div class="help-tip">
                Duration affects how "important" a sound feels. Save long durations for special moments!
            </div>

            <h3>⚠️ Common Mistakes</h3>
            <ul>
                <li><strong>❌ Too short:</strong> Sound cuts off before ADSR completes (sounds unfinished)</li>
                <li><strong>❌ Too long for frequent sounds:</strong> Creates muddy overlapping (jump sound still playing when you land)</li>
                <li><strong>❌ Same duration for everything:</strong> Makes all sounds feel equally important</li>
                <li><strong>✅ Match duration to usage:</strong> Quick for UI, medium for actions, long for events</li>
            </ul>

            <h3>🔧 Testing Your Duration</h3>
            <p><strong>The Rapid Fire Test:</strong> Play your sound 5 times quickly (like rapid coin collection). Does it sound clean or muddy?</p>
            <ul>
                <li><strong>Muddy:</strong> Duration too long - reduce it</li>
                <li><strong>Too abrupt:</strong> Duration too short - increase slightly</li>
                <li><strong>Just right:</strong> Each sound is distinct but flows nicely</li>
            </ul>
        `
    }
};

// Global functions for modal control
function openHelpModal(topic) {
    const modal = document.getElementById('helpModal');
    const title = document.getElementById('helpModalTitle');
    const body = document.getElementById('helpModalBody');

    if (helpContent[topic]) {
        title.textContent = helpContent[topic].title;
        body.innerHTML = helpContent[topic].content;
        modal.classList.add('active');
    }
}

function closeHelpModal() {
    const modal = document.getElementById('helpModal');
    modal.classList.remove('active');
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('helpModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeHelpModal();
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeHelpModal();
        }
    });
});
