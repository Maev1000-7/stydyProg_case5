/*
  Файл index.js является точкой входа в наше приложение
  и только он должен содержать логику инициализации нашего приложения
  используя при этом импорты из других файлов

  Из index.js не допускается что то экспортировать
*/

// import { initialCards } from "./scripts/cards.js";

import { createCard, submitNewCardForm } from "./scripts/components/card.js";

import {
  togglePopUp,
  closePopUpByOverlayClick,
  closePopUpByEscapeKey,
  submitProfileEditForm,
  handlePopUpImage,
  changeProfilePictureForm,
} from "./scripts/components/modal.js";

import { enableValidation } from "./scripts/components/validation.js";

import { getData } from "./scripts/components/api.js";

import "./pages/index.css";


let userID;

const profileName = document.querySelector(".profile__title");
const profileDescriotion = document.querySelector(".profile__description");
const profilePicture = document.querySelector(".profile__image");
const profileEditAvatarPopUp = document.querySelector(
  ".popup_type_edit-avatar",
);


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



// Добавление карточки пользователем 
const placesList = document.querySelector(".places__list");

const addCardButton = document.querySelector(".profile__add-button");
const addCardPopUp = document.querySelector(".popup_type_new-card");

addCardButton.addEventListener("click", () => {
  togglePopUp(addCardPopUp);
  const newCardForm = document.forms["new-place"];
  newCardForm.addEventListener("submit", submitNewCardForm);
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



enableValidation();






















// Кладбище кода 


// function myCardDebugger(){
//   getCardsInformation()
//   .then((cards) => {
//     cards.forEach((card) => {
//       const ownerId = card.owner._id;
//       const cardId = card._id;
//       console.log(ownerId);
//       console.log(cardId);
//     })
//   })
// };

// function likeShowLikeCount(){

//   const cards = document.querySelectorAll(".card");

//   getCardsInformation()
//   .then((cards) => {
//     cards.forEach((card) => {
//       const ownerId = card.owner._id;
//       const cardId = card._id;

//       if (cardId == "6aaba36bac7047007b7aa36f") {

//       };

//     })
//   })
// }

// "6aaba36bac7047007b7aa36f"
// "6aaba3121f87fd0087f013d4"
// "6aaa88e44e650d0093873381"

// "69029c52df01f61be6da1f76"
// "69029c424b385d1bf2b803ac"
// "69029c384f58071c0af4cb92"

// "69029c2cfb9e0f1bfe93f194"
