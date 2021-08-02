let searchInput = document.getElementById('searchInput');
let timerId = undefined;

let getData = () => {
  stillTyping();
  window.clearTimeout(timerId);
  let query = searchInput.value;
  if (query.length < 1) {
    doneTyping();
    clearResults();
    return;
  }
  let url = `https://swapi.dev/api/people/?search=${query}`;

  timerId = setTimeout(() => {
    showData(url);
    timerId = undefined;
  }, 500);
};

let clearResults = () => {
  searchInput.value = null;

  let searchResults = document.getElementById('searchResults');
  searchResults.innerHTML = null;

  let closeButton = document.querySelector('#closeButton');
  closeButton.style.display = 'none';

  let hr = document.querySelector('#hr');
  hr.style.display = 'none';

  let noResult = document.getElementById('noResult');
  noResult.style.display = 'none';
};

let stillTyping = () => {
  window.clearTimeout(timerId);

  let loader = document.getElementById('loader');
  loader.style.display = 'block';

  let yellowCircle = document.querySelector('.yellowCircle');
  yellowCircle.style.display = 'none';
};

let doneTyping = () => {
  let loader = document.getElementById('loader');
  loader.style.display = 'none';

  let yellowCircle = document.querySelector('.yellowCircle');
  yellowCircle.style.display = 'flex';
};

let showData = async (url) => {
  let res = await fetch(url);
  let data = await res.json();
  console.log('data:', data);
  displayResults(data.results);
};

let createCharacter = (name, gender, birth_year) => {
  let resultInfo = document.createElement('div');
  resultInfo.classList.add('resultInfo');
  resultInfo.onclick = function () {
    showSingleCharacter(name);
  };
  resultInfo.innerHTML = `<div class="characterInfo">
	<div>
	  <p class="characterName">${name}</p>
	  <p>${birth_year}</p>
	</div>
	<p>${gender}</p>
  </div>`;
  return resultInfo;
};

let displayResults = (results) => {
  if (results.length == 0) {
    let noResult = document.getElementById('noResult');
    noResult.style.display = 'block';
  }
  let searchResults = document.getElementById('searchResults');
  searchResults.innerHTML = null;
  results.forEach(({ birth_year, gender, name }) => {
    let character = createCharacter(name, gender, birth_year);
    searchResults.append(character);
  });

  let closeButton = document.querySelector('#closeButton');
  closeButton.style.display = 'block';

  let hr = document.querySelector('#hr');
  hr.style.display = 'block';

  doneTyping();
};

searchInput.addEventListener('input', getData);

let createSingleCharacter = (character) => {
  let { mass, birth_year, height, eye_color, name, gender, hair_color } =
    character;
  let person = document.createElement('div');
  person.id = 'person';
  person.innerHTML = `
	<h1 class="character-name">YODA</h1>
	<div>
	  <div>
		<h2>Personal Info</h2>
		<h4>Birth Year: ${birth_year}</h4>
		<h4>Gender: ${gender}</h4>
		<h4>Height : ${height}</h4>
	  </div>
	  <div>
		<h2>Anatomy</h2>
		<h4>Eye Color: ${eye_color}</h4>
		<h4>Mass: ${mass}</h4>
		<h4>Hair Color : ${hair_color}</h4>
	  </div>
	</div>
	<button id="backButton" onclick="reset()">Go Back</button>
`;

  let body = document.querySelector('body');
  body.append(person);
};

let showSingleCharacter = async (name) => {
  let container = document.querySelector('.container');
  container.style.display = 'none';
  let url = `https://swapi.dev/api/people/?search=${name}`;

  let res = await fetch(url);
  let data = await res.json();
  let character = data.results[0];

  createSingleCharacter(character);
};

let reset = () => {
  let person = document.getElementById('person');
  person.remove();

  let container = document.querySelector('.container');
  container.style.display = 'flex';
};
