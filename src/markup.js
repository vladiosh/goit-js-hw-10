function createPrewiewMarkup({ flags, name }) {
  return `<li class="country-list__item">
      <img
        class="country-list__flag"
        src="${flags.svg}"
        width="30px"
        height="20px"
      />
      <p class="country-list__name">${name.official}</p>
    </li>`;
}

function createCountryInfoMurkup({
  flags,
  name,
  capital,
  population,
  languages,
}) {
  const langStr = Object.values(languages).join(', ');

  return ` 
    <div class="country-list__item">
    <img class="country-list__flag" width="60px" height="40px" src="${flags.svg}"></img>
    <p class="country-list__name accent">${name.official}</p></div>
    <div class="description">
    <p class="description__name">Capital: <span>${capital}</span><p>
    <p class="description__name">Population: <span>${population}</span></p>
    <p class="description__name">Languages: <span>${langStr}</span></p>
    </div>`;
}

export { createPrewiewMarkup, createCountryInfoMurkup };
