import SlimSelect from 'slim-select';
import '/node_modules/slim-select/dist/slimselect.css';
import axios from 'axios';
import { Report } from 'notiflix/build/notiflix-report-aio';

const selectList = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const infoBox = document.querySelector('.cat-info');

axios.defaults.headers.common['x-api-key'] =
  'live_Pc0EsqLOYrpIKBVANtPiSodRua5iebH7aRTNXh2EvtPCNO9JBMLTPPkHhrs5FnIS';

const BASE_URL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  loader.classList.remove('hidden');
  const END_POINT = '/breeds';

  return axios
    .get(`${BASE_URL}${END_POINT}`)
    .then(resp => {
      selectList.classList.remove('hidden');
      selectList.innerHTML = resp.data
        .map(
          ({ id, name }) => `
        <option value="${id}">${name}</option>
        `
        )
        .join('');
      new SlimSelect({
        select: selectList,
      });
    })
    .catch(err => {
      Report.failure('Oops!', 'Something went wrong! Try reloading the page!');
    })
    .finally(() => {
      loader.classList.add('hidden');
    });
}
function fetchCatByBreed(breedId) {
  if (!infoBox.classList.contains('hidden')) {
    infoBox.classList.add('hidden');
  }
  loader.classList.remove('hidden');
  const END_POINT = '/images/search';
  const params = new URLSearchParams({
    breed_ids: breedId,
  });

  return axios
    .get(`${BASE_URL}${END_POINT}?${params}`)
    .then(resp => {
      infoBox.classList.remove('hidden');
      infoBox.innerHTML = resp.data
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
    })
    .catch(err => {
      Report.failure('Oops!', 'Something went wrong! Try reloading the page!');
    })
    .finally(() => {
      loader.classList.add('hidden');
    });
}

export { fetchBreeds, fetchCatByBreed, selectList };
