document.addEventListener("DOMContentLoaded", function () {
    // انتخاب المان‌ها
    const flame = document.querySelector(".flame");
    const candle = document.querySelector(".candle");
    const revealBtn = document.getElementById("start");
    const cakeHolder = document.getElementById("cake-holder");
    const birthdayAlert = document.getElementById("birthdayAlert");

    // تنظیمات صوتی
    const blowAudio = new Audio('blow.mp3');
    let audioContext, analyser, microphone, mediaStream;
    let lastBlowTime = 0;
    let cakeRevealed = false;

    // تابع ایجاد افکت دود با سرعت کم
    function createSmokeEffect() {
        const smokeContainer = document.createElement("div");
        smokeContainer.style.position = 'absolute';
        smokeContainer.style.top = '-40px';
        smokeContainer.style.left = '50%';
        smokeContainer.style.pointerEvents = 'none';
        candle.appendChild(smokeContainer);

        const particleCount = 15;
        const particles = [];

        // ایجاد ذرات دود
        for (let i = 0; i < particleCount; i++) {
            const smoke = document.createElement("div");
            smoke.className = 'smoke';
            smoke.style.left = `${Math.random() * 100 - 50}%`;
            smoke.style.animationDelay = `${Math.random() * 0.5}s`;
            smokeContainer.appendChild(smoke);
            
            particles.push({
                element: smoke,
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
                vx: (Math.random() - 0.5) * 0.1, // سرعت افقی خیلی کم
                vy: -0.2 // سرعت عمودی آرام
            });
        }

        // انیمیشن دود آرام
        function animate() {
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.scale *= 1.002; // رشد بسیار آهسته
                particle.opacity *= 0.995; // محو شدن خیلی تدریجی

                particle.element.style.transform = 
                    `translate(${particle.x}px, ${particle.y}px) scale(${particle.scale})`;
                particle.element.style.opacity = particle.opacity;
            });

            if (particles.some(p => p.opacity > 0.1)) {
                requestAnimationFrame(animate);
            } else {
                smokeContainer.remove();
            }
        }
        requestAnimationFrame(animate);

        // نمایش پیام با تاخیر بیشتر
        setTimeout(() => {
            document.querySelector(".cake-message").classList.add("show");
            birthdayAlert.style.display = 'block';
            setTimeout(() => birthdayAlert.style.display = 'none', 5000);
        }, 2500);
    }

    // تابع خاموش کردن شمع
    function blowOutCandle() {
        if (flame.classList.contains("fade-out")) return;

        blowAudio.play();
        flame.classList.add("fade-out");
        candle.classList.add("fade");
        
        // توقف تشخیص صدا
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
        }

        // ایجاد افکت دود با تاخیر
        setTimeout(createSmokeEffect, 500);
    }

// تشخیص صدای فوت با تنظیمات جدید و فیلتر نرم‌کننده
function setupBlowDetection() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaStream = stream;
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyser);
            
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            
            // تنظیم آستانه جدید
            const BLOW_THRESHOLD = 40;
            // مقدار اولیه برای میانگین نمایی
            let smoothedVolume = 0;
            // فاکتور نرم‌کنندگی (بین 0 و 1؛ عدد بالاتر، نوسانات کمتری دارد)
            const smoothingFactor = 0.2;

            function checkBlow() {
                analyser.getByteFrequencyData(dataArray);
                const sum = dataArray.reduce((acc, val) => acc + val, 0);
                const averageVolume = sum / bufferLength;
                
                // محاسبه میانگین نمایی (برای نرم کردن تغییرات)
                smoothedVolume = (smoothingFactor * averageVolume) + ((1 - smoothingFactor) * smoothedVolume);
                
                if (smoothedVolume > BLOW_THRESHOLD && Date.now() - lastBlowTime > 5000) {
                    lastBlowTime = Date.now();
                    blowOutCandle();
                }
                
                if (!flame.classList.contains("fade-out")) {
                    requestAnimationFrame(checkBlow);
                }
            }
            
            checkBlow();
        })
        .catch(err => {
            console.error("دسترسی به میکروفون امکان‌پذیر نیست:", err);
        });
}

    // مدیریت رویداد کلیک
    revealBtn.addEventListener("click", function () {
        if (!cakeRevealed) {
            cakeHolder.style.display = "block";
            cakeRevealed = true;
            revealBtn.textContent = "فوت کن! 💨";
            setupBlowDetection();
        }
    });

    // فعال کردن ویبره در موبایل
    document.addEventListener('click', function() {
        if (navigator.vibrate) navigator.vibrate(30);
    });
});
