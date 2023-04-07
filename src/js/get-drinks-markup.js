import { showDrinkModal } from './modal-cocktails';
import heartIcon from 'bundle-text:../img/heart-icon.svg';
import { FavoriteStorage } from "./favorite-storage";

export function getDrinksMarkup(array) {
    const markup = array.map(({ strDrink, strDrinkThumb, idDrink }) => {
        return getCardMarkup(strDrink, strDrinkThumb, idDrink);
    });
    return markup;
}
function getCardMarkup(name, imageSrc, id) {
    const li = document.createElement('li');
    const isInFavorite = FavoriteStorage.isCocktailInFavorite(id);
    const addRemoveClassName = isInFavorite ? 'btn__add icon-active' : 'btn__add';
    const btnText = isInFavorite ? 'Remove' : 'Add to';
    li.className = 'cocktails__item';
    li.innerHTML = `
        <img class="cocktails__img" src="${imageSrc}" alt="cocktail"/>
        <div class="cocktails__descr">
            <h3 title="${name}" class="cocktails__name">${name}</h3>
            <div class="cocktails__btns">
                <button class="btn__learn" type="button" data-name="learn-more" data-id="${id}" >Learn more</button>
                <button class="${addRemoveClassName}" type="button" data-name="add-remove" data-id="${id}"><span data-name="add-remove" class="btn-text">${btnText}</span> <span data-name="add-remove" class="heart-icon">${heartIcon}</span></button>
            </div>
        </div>
        `;
    li.addEventListener('click', handleCardClick);
    return li;
}

export function handleCardClick(event) {
    const buttonName = event.target.dataset.name;
    if (buttonName === 'learn-more') {
        const id = event.target.dataset.id;
        showDrinkModal(id);
    }
    if (buttonName === 'add-remove' || buttonName === 'heart-icon') {
        const addRemoveBtn = event.currentTarget.querySelector('.btn__add');
        const btnText = addRemoveBtn.querySelector('.btn-text');
        const id = addRemoveBtn.dataset.id;
        addRemoveBtn.classList.toggle('icon-active');
        if (FavoriteStorage.isCocktailInFavorite(id)) {
            FavoriteStorage.removeCocktail(id);
            btnText.textContent = "Add to";
        } else {
            FavoriteStorage.addCocktail(id);
            btnText.textContent = "Remove";
        }
    }
}
