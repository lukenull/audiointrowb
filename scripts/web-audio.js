/**
 * Plays a custom sound using the Web Audio API based on a specified waveform function
 * and an AudioBufferSourceNode.
 * 
 * @param {function} waveformFunction - A function that describes the waveform shape for a single cycle.
 *   It should accept a 'time' parameter (from 0 to 1) and return an amplitude value (from -1 to 1).
 * - The target frequency of the sound in Hz.
 * @param {number} duration - The duration the sound should play in seconds.
 */
export default function soundwave(waveformFunction, duration) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const sampleRate = audioContext.sampleRate;
    
    // Calculate the total number of frames (samples) needed for the duration
    const totalFrameCount = Math.floor(sampleRate * duration);
    
    // Create an empty mono buffer
    // AudioBuffer expects non-interleaved 32-bit linear PCM data with a range of -1 to 1
    const myBuffer = audioContext.createBuffer(1, totalFrameCount, sampleRate);

    // Get the Float32Array for the channel data
    const channelData = myBuffer.getChannelData(0);

    // Calculate how many samples make up one complete cycle at the desired frequency
    const samplesPerCycle = sampleRate;

    // Fill the buffer with the waveform data
    for (let i = 0; i < totalFrameCount; i++) {
        // Calculate the current position within a single cycle (0 to 1)
        
        // Use the user's function to get the amplitude
        channelData[i] = waveformFunction(i/sampleRate);
    }

    // Create an AudioBufferSourceNode and assign the buffer
    
    const sounddata={
        buffer:myBuffer,
        duration:duration,
        sourcenode:null,
        playing:false,
        start:()=>{
            const sourceNode = audioContext.createBufferSource();
            sourceNode.buffer = myBuffer;

            // Connect to the destination and start playback
            sourceNode.connect(audioContext.destination);
            sourceNode.start(0); // Start immediately
            sounddata.sourcenode=sourceNode;
            sounddata.playing=true;
            sourceNode.onended=()=>{
                sounddata.playing=false;
            }
        },
        stop:()=>{
            if (sounddata.sourcenode!=null) {
                sounddata.sourcenode.stop();
            } else {
                console.warn("no source");
            }
            
        },
        context:audioContext,
    }
    return sounddata;
    // The source node is automatically garbage-collected after playback ends.
}

// --- Example Usage ---

// A standard sine wave function
function sineWave(time) {
    return Math.sin(2 * Math.PI * time);
}

// A custom "sawtooth" wave function
function sawtoothWave(time) {
    // A simple linear ramp from -1 to 1 across the 0 to 1 time cycle
    return 2 * time - 1;
}

// Play sounds:
// Use a button in an HTML file to trigger these functions 
// (user interaction is required to start the AudioContext in most browsers):
// document.getElementById('playSineBuffer').onclick = () => playCustomSoundWithBuffer(sineWave, 440, 1.5);
// document.getElementById('playSawtoothBuffer').onclick = () => playCustomSoundWithBuffer(sawtoothWave, 261.63, 2);
