import {saveProfileChanges, updateAvatar} from "./api.js"

function togglePopUp(popUp) {
  const body = document.querySelector('body');
  body.classList.toggle("stop-scrolling");

  popUp.classList.toggle("popup_is-opened");
}


function closePopUpByOverlayClick(evt) {
  const popUp = evt.target.closest(".popup_is-opened");
  if (evt.target === evt.currentTarget) {
    togglePopUp(popUp);
  }
}


function closePopUpByEscapeKey(evt){
  if (evt.key === 'Escape'){
    const popUp = document.querySelector('.popup_is-opened');
    if (popUp){
       togglePopUp(popUp); 
    }
  }  
}


function submitProfileEditForm(evt){
  evt.preventDefault();

  const profileEditPopUp = document.querySelector(".popup_type_edit");

  const userName = evt.target.elements['user-name'];
  const userDescription = evt.target.elements['user-description'];

  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileTitle.textContent = userName.value;
  profileDescription.textContent = userDescription.value;

  saveProfileChanges(userName.value, userDescription.value);
  togglePopUp(profileEditPopUp);

  evt.target.removeEventListener('submit', submitProfileEditForm);
}


function changeProfilePictureForm(evt){
  evt.preventDefault();

  const pictureEditPopUp = document.querySelector(".popup_type_edit-avatar");

  const inputImageLink = evt.target.elements['user-avatar'];
  
  const profilePicture = document.querySelector('.profile__image')

  profilePicture.src = inputImageLink.value;

  updateAvatar(inputImageLink.value);

  togglePopUp(pictureEditPopUp);

  evt.target.removeEventListener('submit', changeProfilePictureForm);
}


function handlePopUpImage(evt){
  const popUpImage = document.querySelector(".popup.popup_type_image");
  const cardContent = evt.target.closest(".card");
  const pictureCaption = document.querySelector('.popup__caption');
  const bigPicture = popUpImage.querySelector(".popup__image");

  togglePopUp(popUpImage);
  
  const cardPicture = cardContent.querySelector('.card__image');
  bigPicture.src = cardPicture.src;
  
  const cardTitle = cardContent.querySelector('.card__title');
  pictureCaption.textContent = cardTitle.textContent;
 
  const overlayButton = document.querySelector(".popup.popup_is-opened");
  overlayButton.addEventListener("click", closePopUpByOverlayClick);
}





export { togglePopUp, closePopUpByOverlayClick, closePopUpByEscapeKey, submitProfileEditForm, handlePopUpImage, changeProfilePictureForm };


