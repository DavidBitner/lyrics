const form = document.querySelector(`#form`);
const searchInput = document.querySelector(`#search-input`);
const musicContainer = document.querySelector(`.music-container`);
const prevNext = document.querySelector(`.prev-next-container`);
const container = document.querySelector(`.container`);

const apiURL = "https://api.lyrics.ovh";

let prev = "";
let next = "";

async function getMoreSongs(url) {
  let response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  let data = await response.json();

  showSongs(data);
}

function showSongs(songsInfo) {
  musicContainer.innerHTML = songsInfo.data
    .map(
      (song) => `
    <li class="song">
      <div class="song__artist">${song.artist.name} - </div>
      <div class="song__name">${song.title}</div>
      <button class="song__btn btn" data-artist="${song.artist.name}" data-song-title="${song.title}">Lyrics</button>
    </li>
  `
    )
    .join("");

  next = songsInfo.next;
  prev = songsInfo.prev;

  if (songsInfo.prev || songsInfo.next) {
    prevNext.innerHTML = `
      ${
        songsInfo.prev
          ? `<button class="song__btn btn" id="prev-button">Prev</button>`
          : ""
      }
      ${
        songsInfo.next
          ? `<button class="song__btn btn" id="next-button"">Next</button>`
          : ""
      }
    `;
    return;
  }

  prevNext.innerHTML = "";
}

async function getData(search) {
  const url = `${apiURL}/suggest/${search}`;
  let response = await fetch(url);
  let data = await response.json();

  showSongs(data);
}

async function fetchLyrics(artist, songName) {
  let response = await fetch(`${apiURL}/v1/${artist}/${songName}`);
  let data = await response.json();

  console.log(data);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchTerm = searchInput.value.trim();

  if (!searchTerm) {
    musicContainer.innerHTML = `<div id="error-message">Invalid Term</div>`;
    return;
  }

  getData(searchTerm);
});

container.addEventListener("click", (event) => {
  if (event.target.id == "next-button") {
    getMoreSongs(next);
  }
  if (event.target.id == "prev-button") {
    getMoreSongs(prev);
  }
  if (event.target.classList[0] == "song__btn") {
    const artist = event.target.getAttribute("data-artist");
    const songName = event.target.getAttribute("data-song-title");

    console.log(artist, songName);

    fetchLyrics(artist, songName);
  }
});
