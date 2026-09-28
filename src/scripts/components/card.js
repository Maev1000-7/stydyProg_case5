
import { deleteCardApi, unlikeCard, likeCard} from "./api.js";

import { togglePopUp } from "./modal.js";

const deleteCardPopUp = document.querySelector(".popup_type_remove-card");
const deleteConfirmButton = document.forms["remove-card"];

function createCard(cardData, userID){
  const source = cardData.link;
  const title = cardData.name;


  const cardID = cardData._id;
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.places__item.card').cloneNode(true);
  

  const deleteButton = card.querySelector('.card__control-button_type_delete');
 
  if (cardData.owner._id !== userID) {
    deleteButton.remove();
  } 
  
  else {
    deleteButton.addEventListener('click', () => {
      togglePopUp(deleteCardPopUp);

      deleteConfirmButton.addEventListener('submit', (evt)=>{
        evt.preventDefault();
        deleteCardApi(cardID)
        .then(() => {
          card.remove();
          togglePopUp(deleteCardPopUp);
          })
        .catch((err) => console.log(`Ошибка при удалении карточки: ${err}`))
        })
      });
  };
  
  const likeButton = card.querySelector('.card__like-button');
  const countLikes = card.querySelector(".card__like-count");
  
  countLikes.textContent = cardData.likes.length;

  cardData.likes.forEach((like) => {
      if (like._id) {
        if (like._id == userID){
          likeButton.classList.toggle("card__like-button_is-active")
        }
      }
  });
  
  likeButton.addEventListener('click', ()=>{
    handleLikeClick(likeButton, cardID);
  });
 
  card.querySelector('.card__image').src = source;
  card.querySelector('.card__title').textContent = title;

  return card;
}


function handleLikeClick(likeButton, cardID) {
  const likeElement = likeButton.closest(".like__element");
  const countLikes = likeElement.querySelector(".card__like-count");
  
  if (likeButton.classList.contains("card__like-button_is-active")) {
    unlikeCard(cardID)
      .then((result) => {       
        countLikes.textContent = result.likes.length;
        likeButton.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    likeCard(cardID)
      .then((result) => {
        countLikes.textContent = result.likes.length;
        likeButton.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}


export { createCard };
