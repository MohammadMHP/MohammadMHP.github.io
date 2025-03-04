// audioDetection.js
class AudioDetector {
    constructor(analyser) {
        this.analyser = analyser;
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        this.detectionTimeout = null;
    }

    detectSoundLevel() {
        this.analyser.getByteFrequencyData(this.dataArray);
        
        // Calculate average volume with more sensitive detection
        const averageVolume = this.dataArray.reduce((a, b) => a + b, 0) / this.dataArray.length;
        
        return averageVolume;
    }

    startBlowDetection(callback, options = {}) {
        const threshold = options.threshold || 120;
        const duration = options.duration || 1000; // 1 second continuous blow
        
        let blowStartTime = null;

        const checkVolume = () => {
            const volume = this.detectSoundLevel();
            const currentTime = Date.now();

            if (volume > threshold) {
                if (!blowStartTime) {
                    blowStartTime = currentTime;
                }

                // Check if blow has been sustained
                if (currentTime - blowStartTime >= duration) {
                    callback();
                    return false;
                }
            } else {
                // Reset if volume drops
                blowStartTime = null;
            }

            return true;
        };

        const volumeCheck = () => {
            if (checkVolume()) {
                this.detectionTimeout = requestAnimationFrame(volumeCheck);
            } else {
                cancelAnimationFrame(this.detectionTimeout);
            }
        };

        requestAnimationFrame(volumeCheck);
    }
}