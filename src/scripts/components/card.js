
import { deleteCardApi, saveCard } from "./api.js";
// import { deleteCardApi } from "./api.js";

import { togglePopUp } from "./modal.js";

export { createCard, submitNewCardForm };


function likeCard(evt){
  evt.target.classList.toggle('card__like-button_is-active');
}


// const deleteCard(evt) => {
//     const deleteConfirmButton = document.forms["remove-card"];
  

//     deleteConfirmButton.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//       deleteCardApi(cardData._id)
//       togglePopUp(deleteCardPopUp);
//       card.remove();
//     })
// } 


    // deleteConfirmButton.addEventListener('submit', submitRemove )
function createCard(cardData, userID){
  const source = cardData.link;
  const title = cardData.name;

  
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.places__item.card').cloneNode(true);
  
  const deleteButton = card.querySelector('.card__control-button_type_delete');
  
  deleteButton.addEventListener('click', () => {
    const deleteCardPopUp = document.querySelector(".popup_type_remove-card");
    togglePopUp(deleteCardPopUp);
  });


  // if (cardData.owner._id !== userID) {
  //   deleteButton.remove();
  // }
  
  const likeButton = card.querySelector('.card__like-button');
  const countLikes = card.querySelector(".card__like-count");
  

  // Вот тут что то не так
  // countLikes.textContent = cardData.likes.length;


  // Ну и следовательно тут 
  // cardData.likes.forEach((like) => {
  //     if (like._id) {
  //       if (like._id == userID){
  //         likeButton.classList.toggle("card__like-button_is-active")
  //       }
  //     }
  // });
  

  
  likeButton.addEventListener('click', likeCard);
 
  card.querySelector('.card__image').src = source;
  card.querySelector('.card__title').textContent = title;

  return card;
}



function submitNewCardForm(evt){
  evt.preventDefault();
  const placesList = document.querySelector('.places__list');
  
  const placeNameInput = evt.target.elements['place-name'];
  const placeImageLinkInput = evt.target.elements['place-link'];
  
  const cardTitle = placeNameInput.value;

  const cardInfoSrc = placeImageLinkInput.value;

  const card = createCard(cardInfoSrc, cardTitle);
  placesList.prepend(card);

  saveCard(cardTitle, cardInfoSrc);

  togglePopUp(evt.target.closest('.popup'));
  evt.target.removeEventListener('submit', submitNewCardForm)
}

