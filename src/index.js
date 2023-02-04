import './css/styles.css';
import getCountry from "./fetchCountries.js";
import debounce from "lodash.debounce";
import {Notify} from 'notiflix';
const searchBox = document.getElementById('search-box');
const countryInfo = document.getElementById('country-info');
const countryList = document.getElementById('country-list');
const DEBOUNCE_DELAY = 300;
searchBox.addEventListener("input", debounce(onSearch,DEBOUNCE_DELAY));


function onSearch(e) {
  e.preventDefault();
  if (e.target.value !== '') {
    getCountry(e.target.value.trim()).then(res => {
      onRenderData(res);
    }).catch(e => Notify.failure('Oops, there is no country with that name'))
    

  }
  else {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  }
  }


const onRenderData = (data) => {

  countryList.textContent = '';
  countryInfo.textContent = '';

  if (data.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }

  else if (data.length >= 2 && data.length <= 10) {
    let readyData = []
    readyData = [...data.map(country => {
      const {flags, name} = country
        return `<li><img src=${flags.svg} alt=${flags.alt}/><span>${name.official}</span></li>`
    })]
    countryList.insertAdjacentHTML('beforeend', readyData.join(''));
  }
  else {
     let readyData = []
    readyData = [...data.map(country => {
      const { name, capital, population, flags, languages } = country
      console.log(languages);
      return `
      <div class='title'>
      <img src=${flags.svg} alt=${flags.alt}/>
      <span class='name'>${name.official}</span>
      </div>
      <div>
      <p> <span>Capital:</span> ${capital}</p>
      <p> <span>Population:</span> ${population}</p>
      <p> <span>Languages:</span> ${Object.values(languages).join(', ')}</p> 
      </div>
        `
    })]
    countryInfo.insertAdjacentHTML("beforeend", readyData.join(''))
  }
}


