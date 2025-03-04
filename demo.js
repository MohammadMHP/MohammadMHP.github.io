// demo.js
document.addEventListener('DOMContentLoaded', async () => {
    const startButton = document.getElementById('start');
    const cakeHolder = document.getElementById('cake-holder');
    const microphoneControls = document.getElementById('microphone-controls');
    const blowCandleButton = document.getElementById('blow-candle');
    const flame = document.querySelector('.flame');
    const cakeMessages = document.querySelectorAll('.cake-off');
    
    // Audio Stream Manager
    const audioStreamManager = new AudioStreamManager();
    
    // Initial state - hide cake and microphone controls
    cakeHolder.style.opacity = '0';
    microphoneControls.style.display = 'none';
    cakeMessages.forEach(msg => msg.style.display = 'none');

    // Reveal Cake
    startButton.addEventListener('click', () => {
        // Show cake
        cakeHolder.style.opacity = '1';
        
        // Hide start button
        startButton.style.display = 'none';
        
        // Show microphone controls
        microphoneControls.style.display = 'block';
    });

    // Blow Out Candle Function
    const blowOutCandle = () => {
        // Hide flame
        flame.style.display = 'none';
        
        // Show cake messages
        cakeMessages.forEach(msg => {
            msg.style.display = 'block';
        });
        
        // Disable blow button
        blowCandleButton.disabled = true;
        blowCandleButton.textContent = 'Candle Blown Out! 🕯️';
        
        // Stop audio stream
        audioStreamManager.stopStream();
    };

    // Microphone Blow Detection
    blowCandleButton.addEventListener('click', async () => {
        // Change button text to indicate listening
        blowCandleButton.textContent = 'Listening... Blow to extinguish 🎤';
        
        // Initialize audio stream
        const streamInitialized = await audioStreamManager.initializeAudioStream();
        
        if (streamInitialized) {
            // Create audio detector
            const audioDetector = new AudioDetector(audioStreamManager.analyser);
            
            // Start blow detection
            audioDetector.startBlowDetection(blowOutCandle);
        } else {
            // Handle microphone access error
            blowCandleButton.textContent = 'Microphone Access Failed 🚫';
        }
    });
});