
import { saveCard , deleteCardApi, getCardsInformation} from "./api.js";
import { togglePopUp } from "./modal.js";

export { createCard, submitNewCardForm };

function deleteCard(evt){
  evt.target.closest('.card').remove();
  const ID = getCardsInformation();
  deleteCardApi();

}



function likeCard(evt){
  evt.target.classList.toggle('card__like-button_is-active');
}


function createCard(cardsInfoSrc, cardsInfoText){
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.places__item.card').cloneNode(true);
  const deleteButton = card.querySelector('.card__control-button_type_delete');
  const likeButton = card.querySelector('.card__like-button');
  
  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', likeCard);
 
  card.querySelector('.card__image').src = cardsInfoSrc;
  card.querySelector('.card__title').textContent = cardsInfoText;
  
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

