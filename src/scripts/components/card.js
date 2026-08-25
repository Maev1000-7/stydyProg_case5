
// Файл со всеми функциями и DOM узлами

// import { cli } from "webpack";
import { initialCards } from "../cards.js";

import { toggleProfilePopUp, toggleCardPopUp, handlePopUpImage, togglePopUpImage } from "./modal.js";

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const cardsBundle = document.createDocumentFragment();


export function deleteCard(evt){
  evt.target.closest('.card').remove();
}

// export function handleLike(evt){
//   evt.target.classList.toggle('card__like-button_is-active');
// }

function createCard(cardsInfo){
  const card = cardTemplate.querySelector('.places__item.card').cloneNode(true);
  const deleteButton = card.querySelector('.card__control-button_type_delete');

  
  deleteButton.addEventListener('click', deleteCard);
  // const likeButton = document.querySelector('card__like-button');
  // likeButton.addEventListener('click', handleLike);
 
  card.querySelector('.card__image').src = cardsInfo.link;
  card.querySelector('.card__title').textContent = cardsInfo.name;
  cardsBundle.append(card);
}


const profileEditButton = document.querySelector('.profile__edit-button');
const closeProfileEditPopUp = document.querySelector('.popup_type_edit .popup__close');

const addCardButton = document.querySelector('.profile__add-button');
const closeCardPopUpButton = document.querySelector('.popup_type_new-card .popup__close ');

const placesPageSection = document.querySelector('.places.page__section');
const popUpImageCloseButton = document.querySelector('.popup__content_content_image .popup__close');




export function initializeStartingPage(){
  initialCards.forEach(createCard);
  placesList.append(cardsBundle);
  

  addCardButton.addEventListener('click', toggleCardPopUp);
  closeCardPopUpButton.addEventListener('click', toggleCardPopUp);

  profileEditButton.addEventListener('click', toggleProfilePopUp);
  closeProfileEditPopUp.addEventListener('click', toggleProfilePopUp);

  placesPageSection.addEventListener('click', handlePopUpImage);
  popUpImageCloseButton.addEventListener('click', togglePopUpImage);
}




