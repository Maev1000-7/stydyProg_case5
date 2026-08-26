/*
  Файл index.js является точкой входа в наше приложение
  и только он должен содержать логику инициализации нашего приложения
  используя при этом импорты из других файлов

  Из index.js не допускается что то экспортировать
*/

import { initialCards } from "./scripts/cards.js";

import { createCard, submitNewCardForm } from "./scripts/components/card.js";

import { togglePopUp, closePopUpByOverlayClick, closePopUpByEscapeKey, submitProfileEditForm, handlePopUpImage } from "./scripts/components/modal.js";

import "./pages/index.css";

window.addEventListener('keydown', closePopUpByEscapeKey);

const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => { popup.addEventListener('click', closePopUpByOverlayClick) });

const placesList = document.querySelector(".places__list");

initialCards.forEach((item)=>{
  let source = item.link;
  let title = item.name;
  let card = createCard(source, title);
  placesList.append(card);
});



const addCardButton = document.querySelector(".profile__add-button");
const addCardPopUp = document.querySelector(".popup_type_new-card");
const closeCardPopUpButton = document.querySelector(".popup_type_new-card .popup__close ");

addCardButton.addEventListener('click',()=>{
  togglePopUp(addCardPopUp);

  const newCardForm = document.forms['new-place'];
  newCardForm.addEventListener('submit', submitNewCardForm)
});


closeCardPopUpButton.addEventListener('click',()=>{
  togglePopUp(addCardPopUp);
});



const profileEditButton = document.querySelector(".profile__edit-button");
const closeProfileEditPopUpButton = document.querySelector(".popup_type_edit .popup__close");
const profileEditPopUp = document.querySelector(".popup_type_edit");

profileEditButton.addEventListener('click',()=>{
  togglePopUp(profileEditPopUp);

  const profileform = document.forms['edit-profile'];
  
  const overlayButton = document.querySelector(".popup.popup_is-opened");
  overlayButton.addEventListener("click", closePopUpByOverlayClick);
  
  let userName = profileform.elements['user-name'];
  let userDescription = profileform.elements['user-description'];
  
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  
  userName.value = profileTitle.textContent;
  userDescription.value = profileDescription.textContent;
  profileform.addEventListener('submit', submitProfileEditForm);
});

closeProfileEditPopUpButton.addEventListener('click',()=>{
  togglePopUp(profileEditPopUp);
});



const placesPageSection = document.querySelector(".places.page__section");
const popUpImageCloseButton = document.querySelector(".popup__content_content_image .popup__close");
const imagePopUp = document.querySelector(".popup_type_image");

placesPageSection.addEventListener('click', (evt)=>{
  if (evt.target.classList.contains('card__image')){
    handlePopUpImage(evt);
  }
});

popUpImageCloseButton.addEventListener('click', ()=>{
  togglePopUp(imagePopUp);
});






