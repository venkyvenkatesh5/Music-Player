"use strict";
const imgEl = document.getElementById("bg_img");
const imgCoverEl = document.getElementById("cover");
const musicTitleEl = document.getElementById("music_title");
const musicArtistEl = document.getElementById("musric_artist");
const playerProgressEl = document.getElementById("player_progress");
const progressEl = document.getElementById("progress");
const currentTimeEl = document.getElementById("current_time");
const durationEl = document.getElementById("duration");
const prevBtnEl = document.getElementById("prev");
const playvBtnEl = document.getElementById("play");
const nextvBtnEl = document.getElementById("next");
const shuffleBtnEl = document.getElementById("shuff");
const repeatBtnEl = document.getElementById("rep");
const heartBtnEl = document.getElementById("heart");
const shareBtnEl = document.getElementById("shar");

const songs = [
  {
    path: "media/song1.mp3",
    displayName: "BGM Of Premalu",
    cover: "media/image-1.jpg",
    artist: "Vishnu Vijay | Shakthisree Gopalan | Kapil Kapilan",
  },
  {
    path: "media/song2.mp3",
    displayName: "Suttamla Soosi",
    cover: "media/image-2.jpg",
    artist: "VishwakSen, Neha Shetty | Yuvan Shankar Raja",
  },
  {
    path: "media/song3.mp3",
    displayName: "Chaleya",
    cover: "media/image-3.jpg",
    artist: "Arijit Singh, Shilpa Rao",
  },
  {
    path: "media/song4.mp3",
    displayName: "Nadaniya",
    cover: "media/image-4.jpg",
    artist: "Akshath",
  },
  {
    path: "media/song5.mp3",
    displayName: "O-Sajni-Re",
    cover: "media/image-5.jpg",
    artist: "Arijit Singh, Ram Sampath | Laapataa Ladies | Aamir Khan Productions",
  },
];

const music = new Audio();
let musicIndex = 0;
let isPlaying = false;
//================== Play Song  True or False====================
function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}
//================== Play Music====================
function playMusic() {
  isPlaying = true;
  playvBtnEl.classList.replace("fa-play", "fa-pause");
  playvBtnEl.setAttribute("title", "pause");
  music.play();
}
//================== Pause Music====================
function pauseMusic() {
  isPlaying = false;
  playvBtnEl.classList.replace("fa-pause", "fa-play");
  playvBtnEl.setAttribute("pause", "title");
  music.pause();
}
//================== Load Songs ====================
function loadMusic(songs) {
  music.src = songs.path;
  musicTitleEl.textContent = songs.displayName;
  musicArtistEl.textContent = songs.artist;
  imgCoverEl.src = songs.cover;
  imgEl.src = songs.cover;
}
//================== Change Music ====================
function changeMusic(direction) {
  musicIndex = musicIndex + direction + (songs.length % songs.length);
  loadMusic(songs[musicIndex]);
  playMusic();
}
//================== Set Progress ====================
function setProgressBar(e) {
  const width = playerProgressEl.clientWidth;
  const xValue = e.offsetX;
  music.currentTime = (xValue / width) * music.duration;
}
//================== Set Progress ====================
function updateProgressBar() {
  const { duration, currentTime } = music;
  const ProgressPercent = (currentTime / duration) * 100;
  progressEl.style.width = `${ProgressPercent}%`;
  const formattime = (timeRanges) =>
    String(Math.floor(timeRanges)).padStart(2, "0");
  durationEl.textContent = `${formattime(duration / 60)} : ${formattime(
    duration % 60,
  )}`;
  currentTimeEl.textContent = `${formattime(currentTime / 60)} : ${formattime(
    currentTime % 60,
  )}`;
}
//================= Btn Events========================
const btnEvents = () => {
  playvBtnEl.addEventListener("click", togglePlay);
  nextvBtnEl.addEventListener("click", () => changeMusic(1));
  prevBtnEl.addEventListener("click", () => changeMusic(-1));
  //========= Progressbar===========================
  music.addEventListener("ended", () => changeMusic(1));
  music.addEventListener("timeupdate", updateProgressBar);
  playerProgressEl.addEventListener("click", setProgressBar);
};
//================= Btn Events========================
document.addEventListener("DOMContentLoaded", btnEvents);

// Event listener for auto-playing the next song
music.addEventListener("ended", () => {
    if (!isRepeat) {
      changeMusic(1); // Play next song when current song ends, unless in repeat mode
    }
  });
//============ Calling Load Music
loadMusic(songs[musicIndex]);
// frontend/musicplayer.js
async function fetchSongs() {
  try {
    const response = await fetch('http://localhost:3000/api/songs');
    const songs = await response.json();
    console.log('Songs:', songs);
    // Update your UI with the fetched songs
  } catch (error) {
    console.error('Error fetching songs:', error);
  }
}

// Call this function to load songs
fetchSongs();
// frontend/musicplayer.js
async function updateSong(id, songData) {
  try {
    const response = await fetch(`http://localhost:3000/api/songs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(songData)
    });

    const result = await response.json();
    if (response.ok) {
      console.log('Song updated:', result);
    } else {
      console.error('Error updating song:', result.error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function deleteSong(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/songs/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      console.log('Song deleted');
    } else {
      console.error('Error deleting song:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
