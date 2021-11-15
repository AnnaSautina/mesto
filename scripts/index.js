const pen = document.querySelector('.profile-info__edit-button');
const popup = document.querySelector('.popup');
const buttonClose = popup.querySelector('.popup__to-close');
const popupOverlay = popup.querySelector('.popup__overlay');

function showPopup() {
  popup.classList.add('popup_opened');
  document.documentElement.style.overflow = 'hidden';
  document.body.scroll = "no";
}

function closePopup() {
  popup.classList.remove('popup_opened');
  document.documentElement.style.overflow = 'auto';
  document.body.scroll = "yes";
}

pen.addEventListener('click', showPopup);
buttonClose.addEventListener('click', closePopup);
popupOverlay.addEventListener('click', closePopup);

let nameUser = document.getElementById('user-name').textContent;
let activityUser = document.getElementById('user-activity').textContent;
let inputs = document.querySelectorAll('input');
const popupElement = document.querySelector('.popup__container');

popupElement.addEventListener('submit', formSubmitHandler);
inputs[0].value = nameUser;
inputs[1].value = activityUser;

function formSubmitHandler (evt) {
  evt.preventDefault();
  document.getElementById('user-name').textContent = inputs[0].value;
  document.getElementById('user-activity').textContent = inputs[1].value;
  closePopup();
}
