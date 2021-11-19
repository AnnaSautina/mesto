const editButton = document.querySelector('.profile-info__edit-button');
const popup = document.querySelector('.popup');
const buttonClose = popup.querySelector('.popup__to-close');
const popupOverlay = popup.querySelector('.popup__overlay');
let nameUser = document.getElementsByClassName('profile-info__name')[0];
let activityUser = document.getElementsByClassName('profile-info__activity')[0];
let inputs = document.querySelectorAll('input');
const userForm = document.querySelector('.popup__form');

function showPopup() {
  popup.classList.add('popup_opened');
  inputs[0].value = nameUser.textContent;
  inputs[1].value = activityUser.textContent;
}
editButton.addEventListener('click', showPopup);

function closePopup() {
  popup.classList.remove('popup_opened');
}
buttonClose.addEventListener('click', closePopup);
popupOverlay.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameUser.textContent = inputs[0].value;
  activityUser.textContent = inputs[1].value;
  closePopup();
}
userForm.addEventListener('submit', formSubmitHandler);
