import { fetchBreeds, fetchCatByBreed, selectList } from './cat-api.js';

fetchBreeds();

selectList.addEventListener('change', event => {
  fetchCatByBreed(event.target.value);
});
