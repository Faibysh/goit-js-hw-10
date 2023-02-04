const ENDPOINT = 'https://restcountries.com/v3.1/name/';

const getCountry = async (name) =>  {
  return fetch(
    `${ENDPOINT}${name}?fields=name,capital,population,flags,languages`
  ).then(res => res.json());
}

export default getCountry;
