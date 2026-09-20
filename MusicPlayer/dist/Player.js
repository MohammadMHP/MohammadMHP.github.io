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
    title: "Bekhand",
    name: "از طرف زهرا",
    source:
      "https://dl.rozmusic.com/Music/1398/01/05/Ashvan%20-%20Bekhand.mp3",
  },
  {
    title: "Negine - Mande Nabashi",
    name: "از طرف زهرا",
    source: "https://kabulmusic.com/force-download.php?file=https%3A%2F%2Fdl.kabulmusic.com%2Fmedia%2Fmusic%2Fnegina-amanghulova%2Fnegina_amanghulova_chadar_mashi_kabulmusic.com.mp3",
  },
  {
    title: "Milad - Shahram Shabpareh",
    name: "از طرف بالتازار",
    source:
      "https://musicviral.musitraf.com/Music/04-03/Shahram%20Shabpareh%20-%20In%20Shabi%20Ke%20Migan%20Shab%20Nist.mp3",
  },
  {
    title: "Be To Hargez - Hengameh",
    name: "از طرف محمد",
    source:
      "https://musicviral.musitraf.com/Music/03-08/kashki%20donya%20vase%20yek%20shab%20male%20man.mp3",
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
