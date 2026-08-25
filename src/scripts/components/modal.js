
import { deleteCard } from "./card.js";



function togglePopUp(popUp) {
  popUp.classList.toggle("popup_is-opened");
}

function handleOverlayClick(evt) {
  const popUp = evt.target.closest(".popup");
  
  if (evt.target === evt.currentTarget) {
    togglePopUp(popUp);
  }
}


const profileEditPopUp = document.querySelector(".popup_type_edit");

const profileform = document.forms['edit-profile'];

const userName = profileform.elements['user-name'];
const userDescription = profileform.elements['user-description'];

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function toggleProfilePopUp() {

  togglePopUp(profileEditPopUp);

  if (profileEditPopUp.classList.contains("popup_is-opened")) {
    
    const overlayButton = document.querySelector(".popup.popup_is-opened");
    overlayButton.addEventListener("click", handleOverlayClick);
    
    userName.value = profileTitle.textContent;
    userDescription.value = profileDescription.textContent;
    profileform.addEventListener('submit', submitProfileEditForm);
  } 
}

function submitProfileEditForm(evt){
  evt.preventDefault();
  profileTitle.textContent = userName.value;
  profileDescription.textContent = userDescription.value;
  togglePopUp(profileEditPopUp);
  profileform.removeEventListener('submit', submitProfileEditForm);
}




const newCardForm = document.forms['new-place'];
const placeNameInput = newCardForm.elements['place-name'];
const placeImageLinkInput = newCardForm.elements['place-link'];
const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;


function toggleCardPopUp() {
  const cardPopUp = document.querySelector(".popup_type_new-card");

  togglePopUp(cardPopUp);

  if (cardPopUp.classList.contains("popup_is-opened")) {
    const overlayButton = document.querySelector(".popup.popup_is-opened");
    overlayButton.addEventListener("click", handleOverlayClick);
    newCardForm.addEventListener('submit', submitNewCardForm);

  }
}

function submitNewCardForm(evt){
  evt.preventDefault();
  
  const card = cardTemplate.querySelector('.places__item.card').cloneNode(true);
  const deleteButton = card.querySelector('.card__control-button_type_delete');
  deleteButton.addEventListener('click', deleteCard);

 
  card.querySelector('.card__image').src = placeImageLinkInput.value;
  card.querySelector('.card__title').textContent = placeNameInput.value;
  placesList.prepend(card);

  toggleCardPopUp();
  newCardForm.removeEventListener('submit', submitNewCardForm)
}




const popUpImage = document.querySelector(".popup.popup_type_image");
function handlePopUpImage(evt) {
  const placeItem = evt.target.closest(".card__image");
  const bigPicture = popUpImage.querySelector(".popup__image");
  const pictureCaption = document.querySelector('.popup__caption');

  if (placeItem) {
    togglePopUp(popUpImage);
    bigPicture.src = placeItem.src;
    const cardTitle = evt.target.closest(".card");
    pictureCaption.textContent = cardTitle.textContent;
    if (popUpImage.classList.contains("popup_is-opened")) {
      const overlayButton = document.querySelector(".popup.popup_is-opened");
      overlayButton.addEventListener("click", handleOverlayClick);
    }
  }
}

function togglePopUpImage() {
  togglePopUp(popUpImage);
}



export {
  toggleProfilePopUp,
  toggleCardPopUp,
  handlePopUpImage,
  togglePopUpImage
};
