const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");
const nextButton = document.querySelector(".controls button.forward");
const prevButton = document.querySelector(".controls button.backward");
const songName = document.querySelector(".music-player h1");
const artistName = document.querySelector(".music-player p");

const songs = [
  {
    title: "Ahooye Por Kereshmeh",
    name: "از طرف زهرا",
    source:
      "https://dls.musics-fa.com/tagdl/1402/Martik%20-%20Ahoo%20Khanom%20(320).mp3",
  },
  {
    title: "Cheshme siyahe",
    name: "از طرف زهرا",
    source:
      "https://dl1.musickhone.com/music/2022/01/31/nooshafarin__cheshme_siyahe%20negahe%20to%20baraye%20man%20yek%20panjerast%20.mp3",
  },
  {
    title: "VefaSerifova - CennetSayilir",
    name: "از طرف زهرا",
    source: "https://dl.sansizmusic.ir/2/vefa_serifova_cennet_sayilir.mp3",
  },
  {
    title: "Milad - Shahram Shabpareh",
    name: "از طرف بالتازار",
    source:
      "https://dlrrooz.top/2024/music/7/New/Shahram%20Shabpareh%20-%20Milad%20[320].mp3",
  },
  {
    title: "Be To Hargez - Hengameh",
    name: "از طرف محمد",
    source:
      "https://dlrrooz.top/2024/music/6/New/Hengameh%20-%20Bee%20To%20Hargez%20(320).mp3",
  },

  {
    title: "Kheili Khosh Halam ",
    name: "از طرف محمد",
    source:
      "https://dls.musics-fa.com/tagdl/downloads/Mohammad%20Alizade%20-%20Kheili%20Khosh%20Halam%20(320).mp3",
  },
  {
    title: "Man Asheghet Shodam",
    name: "از طرف محمد",
    source:
      "https://dl.shabamusic.com/Music/Archive/Sirvan%20Khosravi/Sirvan%20Khosravi%20-%20Man%20Asheghet%20Shodam.mp3",
  },
];

let currentSongIndex = 3;

function updateSongInfo() {
  songName.textContent = songs[currentSongIndex].title;
  artistName.textContent = songs[currentSongIndex].name;
  song.src = songs[currentSongIndex].source;

  song.addEventListener("loadeddata", () => {});
}

song.addEventListener("timeupdate", () => {
  if (!song.paused) {
    progress.value = song.currentTime;
  }
});

song.addEventListener("loadedmetadata", () => {
  progress.max = song.duration;
  progress.value = song.currentTime;
});

song.addEventListener("ended", () => {
  currentSongIndex = (swiper.activeIndex + 1) % songs.length;
  updateSongInfo();
  swiper.slideTo(currentSongIndex); 
  playSong(); 
});

function pauseSong() {
  song.pause();
  controlIcon.classList.remove("fa-pause");
  controlIcon.classList.add("fa-play");
}

function playSong() {
  song.play();
  controlIcon.classList.add("fa-pause");
  controlIcon.classList.remove("fa-play");
}

function playPause() {
  if (song.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

playPauseButton.addEventListener("click", playPause);

progress.addEventListener("input", () => {
  song.currentTime = progress.value;
});

progress.addEventListener("change", () => {
  playSong();
});

nextButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo();
  playPause();
});

prevButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateSongInfo();
  playPause();
});

updateSongInfo();

var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  centeredSlides: true,
  initialSlide: 3,
  slidesPerView: "auto",
  grabCursor: true,
  spaceBetween: 40,
  coverflowEffect: {
    rotate: 25,
    stretch: 0,
    depth: 50,
    modifier: 1,
    slideShadows: false,
  },
  navigation: {
    nextEl: ".forward",
    prevEl: ".backward",
  },
});

swiper.on("slideChange", () => {
  currentSongIndex = swiper.activeIndex;
  updateSongInfo(); 
  playPause(); 
});