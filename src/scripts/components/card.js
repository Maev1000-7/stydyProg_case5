
// Файл со всеми функциями и DOM узлами

import { initialCards } from "../cards.js";
export{ initializeStartingPage };

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const cardsBundle = document.createDocumentFragment();
const addCardButton = document.querySelector('.profile__add-button')


function deleteCard(evt){
  evt.target.closest('.card').remove();
}

function createCard(cardsInfo){
  const card = cardTemplate.querySelector('.places__item.card').cloneNode(true);
  const deleteButton = card.querySelector('.card__control-button_type_delete');
  
  card.querySelector('.card__image').src = cardsInfo.link;
  card.querySelector('.card__title').textContent = cardsInfo.name;
  cardsBundle.append(card);
  
  deleteButton.addEventListener('click', deleteCard);
}

function initializeStartingPage(){
  initialCards.forEach(createCard);
  placesList.append(cardsBundle);
  addCardButton.addEventListener('click', createCardWithButton);
}

function createCardWithButton(){
  const card = cardTemplate.querySelector('.places__item.card').cloneNode(true);
  const deleteButton = card.querySelector('.card__control-button_type_delete');
  
  card.querySelector('.card__image').src = 'https://opis-cdn.tinkoffjournal.ru/mercury/JzSaEUPBnE.1-cheremsha-meme.jpg';
  card.querySelector('.card__title').textContent = 'Черемша';
  placesList.append(card);
  
  deleteButton.addEventListener('click', deleteCard);
}