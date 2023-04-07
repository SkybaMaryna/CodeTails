import { fetchCocktailsByLetter } from './fetch-cocktails';
import { calculateCocktails } from './calculate';
import { getDrinksMarkup } from './get-drinks-markup';
import { createPagination } from './pagination';
import { getErrorMarkup } from './get-error-markup';

const contentResults = document.querySelector('#content-results');
const contentTitle = document.querySelector('#content-title');
const symbolPanel = document.querySelector('.symbol__panel');
const letterOnSelect = document.querySelector('.select');

symbolPanel.addEventListener('click', getCocktails1);
letterOnSelect.addEventListener('click', getCocktails1);

let letterSearchResults;

function getCocktails1(ev) {
  if (!ev.target.dataset.value) {
    return;
  }
  let cocktailFirstLetter = ev.target.dataset.value;

  contentTitle.innerHTML = 'Searching results..';
  const numberOfCocktails = calculateCocktails();

  fetchCocktailsByLetter(cocktailFirstLetter)
    .then(data => {
      letterSearchResults = data;
      contentTitle.innerHTML = 'Cocktails';
      contentResults.innerHTML = '';
      contentResults.append(
        ...getDrinksMarkup(data.slice(0, numberOfCocktails))
      );
      createPagination(data, numberOfCocktails, 1);
    })
    .catch(error => {
      contentTitle.innerHTML = error;
      contentResults.innerHTML = getErrorMarkup();
    });
}
