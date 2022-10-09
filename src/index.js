import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createPrewiewMarkup, createCountryInfoMurkup } from './markup';

const refs = {
  inputRef: document.querySelector('#search-box'),
  countryListRef: document.querySelector('.country-list'),
  countryInfoRef: document.querySelector('.country-info'),
};
const DEBOUNCE_DELAY = 300;
refs.inputRef.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

let inputValue = '';

function renderPrewiewMarkup(data) {
  const markup = data.map(createPrewiewMarkup).join('');
  refs.countryListRef.innerHTML = markup;
}

function renderCountryInfoMarkup(data) {
  const markup = data.map(createCountryInfoMurkup).join('');
  refs.countryInfoRef.innerHTML = markup;
}

function onSearch(evt) {
  clearCountryList();
  clearCountryInfo();
  inputValue = evt.target.value.trim().toLowerCase();
  // console.log(inputValue);

  if (!inputValue) {
    return;
  }
  fetchCountries(inputValue)
    .then(data => {
      if (data.length === 1) {
        renderCountryInfoMarkup(data);
      } else if (data.length >= 2 && data.length <= 10) {
        renderPrewiewMarkup(data);
      } else {
        onManyCoincidences();
      }
    })
    .catch(error => {
      onInvalidName();
      // console.log('catch');
      // console.log(error.message);
    });
}

function clearCountryList() {
  refs.countryListRef.innerHTML = '';
}

function clearCountryInfo() {
  refs.countryInfoRef.innerHTML = '';
}

function onManyCoincidences() {
  return Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

function onInvalidName() {
  return Notify.failure('Oops, there is no country with that name');
}
