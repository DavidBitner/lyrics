const form = document.querySelector(`#form`);
const searchInput = document.querySelector(`#search-input`);
const musicContainer = document.querySelector(`.music-container`);
const prevNext = document.querySelector(`.prev-next-container`);

async function getData(search) {
  const apiURL = `https://api.lyrics.ovh/suggest/${search}`;
  let response = await fetch(apiURL);
  let data = await response.json();
  return data;
}

getData().then((response) => {
  console.log(response);
});

// Ripple effect
function create_ripple(event) {
  const btn = event.currentTarget;

  const circle = document.createElement("span");
  const diameter = Math.max(btn.clientWidth, btn.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - (btn.offsetLeft + radius)}px`;
  circle.style.top = `${event.clientY - (btn.offsetTop + radius)}px`;
  circle.classList.add("ripple");

  const ripple = btn.getElementsByClassName("ripple")[0];
  if (ripple) {
    ripple.remove();
  }

  btn.appendChild(circle);
}

const btns = document.getElementsByTagName("a");
for (const btn of btns) {
  btn.addEventListener("click", create_ripple);
}

document.querySelector(`#search-btn`).addEventListener("click", create_ripple);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchTerm = searchInput.value.trim();

  if (!searchTerm) {
    musicContainer.innerHTML = `<div id="error-message">Invalid Term</div>`;
    return;
  }

  console.log(searchTerm);
});
