document.addEventListener("DOMContentLoaded", () => {
  // کتابخانه Splitting برای افکت روی متن
  Splitting();

  // انتخاب المان‌های اصلی
  const container = document.getElementById("presents-container");
  const presentsText = document.getElementById("presents-text");
  const presents = document.querySelectorAll(".present");

  // -- 1) تابعی برای ظاهرکردن جعبه‌ها --
  window.showPresents = function () {
    // نمایش کانتینر با انیمیشن (تغییر opacity)
    container.style.opacity = "1";
    // نمایش متن راهنما
    presentsText.style.display = "block";
  };

  // -- 2) کلیک روی هر جعبه => انتقال به لینک مربوطه --
  presents.forEach((present) => {
    present.addEventListener("click", () => {
      const link = present.getAttribute("data-link");
      if (link) {
        window.location.href = link;
      }
    });
  });

  function bursty(x, y) {
    const burst = new mojs.Burst({
      left: 0,
      top: 0,
      radius: { 0: 200 },
      count: 20,
      degree: 360,
      children: {
        fill: { white: "#34E1FF" },
        duration: 2000,
      },
    }).tune({ x, y });

    burst.replay();
  }
});
