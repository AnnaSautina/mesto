const cardElements = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const listCardElement = document.querySelector('.elements'); //ul
const itemTemplate = document.querySelector('.template');

function createCard(item) {
  let itemContainer = itemTemplate.content.cloneNode(true); //li
  itemContainer.querySelector('.element__text').textContent = item.name;
  itemContainer.querySelector('.element__photo').src = item.link;

  return itemContainer; //создали карточку
}
render = () => {
  cardElements.forEach((item) => {
    listCardElement.append(createCard(item)); //добавляем её в DOM
  });
}
render();


const editButton = document.querySelector('.profile-info__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupUser = document.querySelector('.popup_user');
const popupMesto = document.querySelector('.popup_mesto');

function showPopup(popup) { //открываем попапы
  popup.classList.add('popup_opened');
}
editButton.addEventListener('click', () => showPopup(popupUser)); //popupUser передаём как аргумент переменной popup
addButton.addEventListener('click', () => showPopup(popupMesto));


let nameUser = document.getElementsByClassName('profile-info__name')[0];
let activityUser = document.getElementsByClassName('profile-info__activity')[0];
let inputs = document.querySelectorAll('input');

function takeValues() {
  inputs[0].value = nameUser.textContent; //берём значения со стр. и вставляем в инпуты
  inputs[1].value = activityUser.textContent;
}
editButton.addEventListener('click', takeValues);


const buttonCloseUser = popupUser.querySelector('.popup__to-close');
const popupOverlayUser = popupUser.querySelector('.popup__overlay');
const buttonCloseMesto = popupMesto.querySelector('.popup__to-close');
const popupOverlayMesto = popupMesto.querySelector('.popup__overlay');

function closePopup(popup) { // закрываем попапы
  popup.classList.remove('popup_opened');
}
buttonCloseUser.addEventListener('click', () => closePopup(popupUser));
popupOverlayUser.addEventListener('click', () => closePopup(popupUser));
buttonCloseMesto.addEventListener('click', () => closePopup(popupMesto));
popupOverlayMesto.addEventListener('click', () => closePopup(popupMesto));


const userForm = popupUser.querySelector('.popup__form');
const mestoForm = popupMesto.querySelector('.popup__form');

function userFormSubmitHandler(evt) { //сохраняем введённые данные профиля на странице
  evt.preventDefault();
  nameUser.textContent = inputs[0].value;
  activityUser.textContent = inputs[1].value;
  closePopup(popupUser);
}
userForm.addEventListener('submit', userFormSubmitHandler);


function createCardSubmitHandler(evt) { //формируем карточку из попапа
  evt.preventDefault();
  let nameMesto = document.getElementById('nameMesto');
  let linkPicture = document.getElementById('linkPicture');
  let card = {name:nameMesto.value, link:linkPicture.value};
  const newCard = createCard(card);

  listCardElement.prepend(newCard);
  closePopup(popupMesto);
}
mestoForm.addEventListener('submit', createCardSubmitHandler); //сохраняем введённые данные места на странице




















/*const likeButton = itemTemplate.querySelector('.element__like');
  console.log(likeButton);

function like() {
  likeButton.addEventListener('click', function(evt){  //клик по сердечку
    const eventTarget = evt.target;
    eventTarget.classList.toggle('element__like_active');
    });
  return likeButton;
}
*/
