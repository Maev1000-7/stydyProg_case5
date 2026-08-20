/*
  Файл index.js является точкой входа в наше приложение
  и только он должен содержать логику инициализации нашего приложения
  используя при этом импорты из других файлов

  Из index.js не допускается что то экспортировать
*/

import { initialCards } from "./cards.js";

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const deleteButton = card.querySelector('.card__control-button_type_delete');


const cardsBundle = document.createDocumentFragment();



function deleteCard(evt){
  const card = evt.target.closest('.card');
  card.remove();
}

initialCards.forEach(function(item) {
  const card = cardTemplate.querySelector('.places__item.card').cloneNode(true);

  card.querySelector('.card__image').src = item.link;
  card.querySelector('.card__title').textContent = item.name;

  cardsBundle.append(card);


  deleteButton.addEventListener('click', deleteCard);
});


const addCardButton = document.querySelector('.profile__add-button')
addCardButton.addEventListener('click', ()=>{
  const card = cardTemplate.querySelector('.places__item.card').cloneNode(true);
    card.querySelector('.card__image').src = 'https://opis-cdn.tinkoffjournal.ru/mercury/JzSaEUPBnE.1-cheremsha-meme.jpg';
    card.querySelector('.card__title').textContent = 'Черемша';
    placesList.append(card);

    deleteButton.addEventListener('click', deleteCard);
});



placesList.append(cardsBundle);

