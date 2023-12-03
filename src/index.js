import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import '/node_modules/slim-select/dist/slimselect.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const selectList = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const infoBox = document.querySelector('.cat-info');

fillSelectOptions();

selectList.addEventListener('change', event => {
  getCatByBreed(event.target.value);
});

function fillSelectOptions() {
  loader.classList.remove('hidden');
  fetchBreeds()
    .then(data => {
      selectList.classList.remove('hidden');
      selectList.innerHTML = createOptions(data);

      new SlimSelect({
        select: selectList,
      });
    })
    .catch(() => {
      Report.failure('Oops!', 'Something went wrong! Try reloading the page!');
    })
    .finally(() => {
      loader.classList.add('hidden');
    });
}

function createOptions(arr) {
  return arr
    .map(
      ({ id, name }) => `
  <option value="${id}">${name}</option>
  `
    )
    .join('');
}

function getCatByBreed(breedId) {
  if (!infoBox.classList.contains('hidden')) {
    infoBox.classList.add('hidden');
  }
  loader.classList.remove('hidden');
  fetchCatByBreed(breedId)
    .then(data => {
      if (data.length === 0) {
        throw 'The information is not found!';
      }
      infoBox.classList.remove('hidden');
      infoBox.innerHTML = creaateMarkUp(data);
    })
    .catch(err => {
      if (typeof err === 'string') {
        Report.failure('Oops!', err);
      } else {
        Report.failure(
          'Oops!',
          'Something went wrong! Try reloading the page!'
        );
      }
    })
    .finally(() => {
      loader.classList.add('hidden');
    });
}

function creaateMarkUp(arr) {
  return arr
    .map(
      ({ breeds, url }) => `
  <img class="cat-img" src="${url}" alt="${breeds[0].name}" >
  <div>
      <h2>${breeds[0].name}</h2>
      <p>${breeds[0].description}</p>
      <p><span class="cat-text-bold">Temperament:</span> ${breeds[0].temperament}</p>
  </div>
  `
    )
    .join('');
}
