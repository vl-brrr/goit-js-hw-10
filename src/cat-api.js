import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_Pc0EsqLOYrpIKBVANtPiSodRua5iebH7aRTNXh2EvtPCNO9JBMLTPPkHhrs5FnIS';

const BASE_URL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  const END_POINT = '/breeds';

  return axios.get(`${BASE_URL}${END_POINT}`).then(resp => {
    return resp.data;
  });
}

function fetchCatByBreed(breedId) {
  const END_POINT = '/images/search';
  const params = new URLSearchParams({
    breed_ids: breedId,
  });

  return axios.get(`${BASE_URL}${END_POINT}?${params}`).then(resp => {
    return resp.data;
  });
}

export { fetchBreeds, fetchCatByBreed };
