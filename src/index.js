/*
  Файл index.js является точкой входа в наше приложение
  и только он должен содержать логику инициализации нашего приложения
  используя при этом импорты из других файлов

  Из index.js не допускается что то экспортировать
*/

// import { initialCards } from "./scripts/cards.js";

import { createCard, submitNewCardForm } from "./scripts/components/card.js";

import { togglePopUp, closePopUpByOverlayClick, closePopUpByEscapeKey, submitProfileEditForm, handlePopUpImage, changeProfilePictureForm} from "./scripts/components/modal.js";

import { enableValidation } from "./scripts/components/validation.js";

import {getCardsInformation, getUsersInformation} from "./scripts/components/api.js";

import "./pages/index.css";

window.addEventListener('keydown', closePopUpByEscapeKey);




const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => { popup.addEventListener('click', closePopUpByOverlayClick) });


const closePopUpButtons = document.querySelectorAll(".popup__close");
closePopUpButtons.forEach((closeButton) => {
   closeButton.addEventListener('click', ()=> {
    const popUp = closeButton.closest(".popup");
    togglePopUp(popUp);
  });
});


/** 
 * Загружаем начальные карточки с сервера
*/
const placesList = document.querySelector(".places__list");
getCardsInformation().then((initialCards) => {
  initialCards.forEach((item)=>{
    let source = item.link;
    let title = item.name;
    let card = createCard(source, title);
    placesList.append(card);
  })
});





const addCardButton = document.querySelector(".profile__add-button");
const addCardPopUp = document.querySelector(".popup_type_new-card");

addCardButton.addEventListener('click',()=>{
  togglePopUp(addCardPopUp);

  const newCardForm = document.forms['new-place'];
  newCardForm.addEventListener('submit', submitNewCardForm);
});





const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopUp = document.querySelector(".popup_type_edit");


profileEditButton.addEventListener('click',()=>{
togglePopUp(profileEditPopUp);

  const profileform = document.forms['edit-profile'];
  
  let userName = profileform.elements['user-name'];
  let userDescription = profileform.elements['user-description'];
  
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  
  userName.value = profileTitle.textContent;
  userDescription.value = profileDescription.textContent;
  profileform.addEventListener('submit', submitProfileEditForm);
});


const placesPageSection = document.querySelector(".places.page__section");


placesPageSection.addEventListener('click', (evt)=>{
  if (evt.target.classList.contains('card__image')){
    handlePopUpImage(evt);
  }
});


const profilePicture = document.querySelector(".profile__image");
const profileEditAvatarPopUp = document.querySelector(".popup_type_edit-avatar");
const profileName = document.querySelector(".profile__title");
const profileDescriotion = document.querySelector(".profile__description");

getUsersInformation().then(
  (userData) => {
    profilePicture.src = userData.avatar;
    profileName.textContent = userData.name;
    profileDescriotion.textContent = userData.about;
  }
);

profilePicture.addEventListener('click', ()=> {
  togglePopUp(profileEditAvatarPopUp);

  const profilePictureForm = document.forms['edit-avatar'];
  profilePictureForm.addEventListener('submit', changeProfilePictureForm);
});


enableValidation();






 