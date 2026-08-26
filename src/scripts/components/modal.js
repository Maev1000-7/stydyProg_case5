

function togglePopUp(popUp) {
  popUp.classList.toggle("popup_is-opened");
}


function closePopUpByOverlayClick(evt) {
  const popUp = evt.target.closest(".popup_is-opened");
  if (evt.target === evt.currentTarget) {
    togglePopUp(popUp);
  }
}


function closePopUpByEscapeKey(evt){
  const popUp = document.querySelector('.popup_is-opened');
  if (evt.key === 'Escape'){
    togglePopUp(popUp); 
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

  togglePopUp(profileEditPopUp);

  evt.target.removeEventListener('submit', submitProfileEditForm);
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
  
  // if (popUpImage.classList.contains("popup_is-opened")) {}
 
  const overlayButton = document.querySelector(".popup.popup_is-opened");
  overlayButton.addEventListener("click", closePopUpByOverlayClick);
}


export { togglePopUp, closePopUpByOverlayClick, closePopUpByEscapeKey, submitProfileEditForm, handlePopUpImage };































// Объявленные функции:
// 1. togglePopUp
// 2. closePopUpByOverlayClick
// 3. closePopUpByEscapeKey


// 5. submitProfileEditForm
// 7. submitNewCardForm

// 8. handlePopUpImage

// 6. toggleCardPopUp
// 9. togglePopUpImage
// 4. toggleProfilePopUp

// function handlePopUpImage(evt) {
//   const placeItem = evt.target.closest(".card__image");
  
//   const popUpImage = document.querySelector(".popup.popup_type_image");

//   const bigPicture = popUpImage.querySelector(".popup__image");

//   const pictureCaption = document.querySelector('.popup__caption');

//   if (placeItem) {
//     togglePopUp(popUpImage);
//     bigPicture.src = placeItem.src;
//     const cardTitle = evt.target.closest(".card");
//     pictureCaption.textContent = cardTitle.textContent;
//     if (popUpImage.classList.contains("popup_is-opened")) {
//       const overlayButton = document.querySelector(".popup.popup_is-opened");
//       overlayButton.addEventListener("click", closePopUpByOverlayClick);
//     }
//   }
// }
// function togglePopUpImage() {
//   togglePopUp(popUpImage);
// }

// function toggleCardPopUp() {
//   const cardPopUp = document.querySelector(".popup_type_new-card");

//   togglePopUp(cardPopUp);

//   if (cardPopUp.classList.contains("popup_is-opened")) {
//     const overlayButton = document.querySelector(".popup.popup_is-opened");
//     overlayButton.addEventListener("click", closePopUpByOverlayClick);
//     newCardForm.addEventListener('submit', submitNewCardForm);

//   }
// }

// function toggleProfilePopUp() {

//   togglePopUp(profileEditPopUp);

//   if (profileEditPopUp.classList.contains("popup_is-opened")) {
    
//     const overlayButton = document.querySelector(".popup.popup_is-opened");
//     overlayButton.addEventListener("click", closePopUpByOverlayClick);
    
//     userName.value = profileTitle.textContent;
//     userDescription.value = profileDescription.textContent;
//     profileform.addEventListener('submit', submitProfileEditForm);
//   } 
// }