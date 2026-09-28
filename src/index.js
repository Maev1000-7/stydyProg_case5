/*
  Файл index.js является точкой входа в наше приложение
  и только он должен содержать логику инициализации нашего приложения
  используя при этом импорты из других файлов

  Из index.js не допускается что то экспортировать
*/

import { createCard } from "./scripts/components/card.js";

import {
  togglePopUp,
  closePopUpByOverlayClick,
  closePopUpByEscapeKey,
  handlePopUpImage, 
  changeProfilePictureForm, 
  submitProfileEditForm
} from "./scripts/components/modal.js";

import { enableValidation } from "./scripts/components/validation.js";

import { getData, saveCard } from "./scripts/components/api.js";

import "./pages/index.css";


let userID;

const profileName = document.querySelector(".profile__title");
const profileDescriotion = document.querySelector(".profile__description");
const profilePicture = document.querySelector(".profile__image");

const profileEditAvatarPopUp = document.querySelector(
  ".popup_type_edit-avatar",
);

const placesList = document.querySelector('.places__list');

// Подгружаем карточки и профиль
getData().then(
  ([userData, cardsData]) => {
    userID = userData._id;

    cardsData.forEach((cardData) => {
      let card = createCard(cardData, userID);
      placesList.append(card);
    })
    
    profilePicture.src = userData.avatar;
    profileName.textContent = userData.name;
    profileDescriotion.textContent = userData.about;
  }
);


// Меняем Аву
profilePicture.addEventListener("click", () => {
  togglePopUp(profileEditAvatarPopUp);

  const profilePictureForm = document.forms["edit-avatar"];
  profilePictureForm.addEventListener("submit", changeProfilePictureForm);
});


// Закрываем попапы ESC
window.addEventListener("keydown", closePopUpByEscapeKey);

// Закрываем попапы кликая в пустоту
const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("click", closePopUpByOverlayClick);
});

// Закрываем попапы кнопкой X
const closePopUpButtons = document.querySelectorAll(".popup__close");
closePopUpButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    const popUp = closeButton.closest(".popup");
    togglePopUp(popUp);
  });
});


// Изменение пользовательского профиля
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopUp = document.querySelector(".popup_type_edit");

profileEditButton.addEventListener("click", () => {
  togglePopUp(profileEditPopUp);

  const profileform = document.forms["edit-profile"];

  let userName = profileform.elements["user-name"];
  let userDescription = profileform.elements["user-description"];

  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  userName.value = profileTitle.textContent;
  userDescription.value = profileDescription.textContent;
  profileform.addEventListener("submit", submitProfileEditForm);
});


// Открытие картинки в посте
const placesPageSection = document.querySelector(".places.page__section");

placesPageSection.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("card__image")) {
    handlePopUpImage(evt);
  }
});


// Добавление карточки пользователем
const addCardButton = document.querySelector('.profile__add-button');
const newCardPopUp = document.querySelector('.popup_type_new-card')

addCardButton.addEventListener('click', ()=>{
  togglePopUp(newCardPopUp);
})

const newPlaceForm = document.forms['new-place'];
newPlaceForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const cardTitleInput = newPlaceForm.elements["place-name"].value;
  const cardImageLinkInput = newPlaceForm.elements["place-link"].value

  saveCard(cardTitleInput, cardImageLinkInput).then((cardData) => {
    const card = createCard(cardData, userID)
    placesList.prepend(card);
  })
  togglePopUp(newCardPopUp);
})


enableValidation();





















