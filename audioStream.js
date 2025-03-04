
// var mediaStreamSource = null


// function audioStream(stream) {
//   // Create an AudioNode from the stream.
//   mediaStreamSource = audioContext.createMediaStreamSource(stream);

//   // Create a new volume meter and connect it.
//   meter = createAudioMeter(audioContext);
//   mediaStreamSource.connect(meter);

//   // kick off the visual updating
//   //drawLoop();

//   audioDetection(DEFAULT_PARAMETERS_CONFIGURATION)

//   audioRecorder(stream)
// }

class AudioStreamManager {
    constructor() {
        this.audioContext = null;
        this.analyser = null;
        this.microphone = null;
        this.stream = null;
    }

    async initializeAudioStream() {
        try {
            // Request microphone access
            this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            // Create audio context
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create analyser
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 256;
            
            // Connect microphone stream to analyser
            this.microphone = this.audioContext.createMediaStreamSource(this.stream);
            this.microphone.connect(this.analyser);
            
            return true;
        } catch (error) {
            console.error('Error accessing microphone:', error);
            return false;
        }
    }

    stopStream() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
        }
        if (this.audioContext) {
            this.audioContext.close();
        }
    }
}