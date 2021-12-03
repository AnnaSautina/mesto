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

  let likeButton = itemContainer.querySelector('.element__like');
  AddLikeHandler(likeButton); //обработчик клика по сердечку

  let deleteButton = itemContainer.querySelector('.element__delete');
  AddClickHandler(deleteButton); // действия пользователя с кнопкой удаления эл.

  return itemContainer; //создали карточку
}


render = () => {
  cardElements.forEach((item) => {
    listCardElement.append(createCard(item)); //добавляем её в DOM
  });
}
render();


// Добавление/удаление лайка
function AddLikeHandler(likeButton) {
  likeButton.addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active');
  });
}


// Манипуляции с кнопкой удаления эл.
function AddClickHandler(deleteButton) {
  deleteButton.addEventListener('mouseover', function(evt) { //при наведении мыши
    evt.target.classList.add('element__delete_hover');
  });
  deleteButton.addEventListener('mouseout', function(evt) { //при отведении мыши
    evt.target.classList.remove('element__delete_hover');
  });
  deleteButton.addEventListener('click', function(evt) {
    const itemContainer = deleteButton.closest('.element');
    itemContainer.remove();
  });
}


const editButton = document.querySelector('.profile-info__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupUser = document.querySelector('.popup_user');
const popupMesto = document.querySelector('.popup_mesto');

//Открываем попапы
function ShowPopup(popup) {
  popup.classList.add('popup_opened');
}
editButton.addEventListener('click', () => ShowPopup(popupUser)); //popupUser передаём как аргумент переменной popup
addButton.addEventListener('click', () => ShowPopup(popupMesto));


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

// Закрываем попапы
function ClosePopup(popup) {
  popup.classList.remove('popup_opened');
}
buttonCloseUser.addEventListener('click', () => ClosePopup(popupUser));
popupOverlayUser.addEventListener('click', () => ClosePopup(popupUser));
buttonCloseMesto.addEventListener('click', () => ClosePopup(popupMesto));
popupOverlayMesto.addEventListener('click', () => ClosePopup(popupMesto));


const userForm = popupUser.querySelector('.popup__form');
const mestoForm = popupMesto.querySelector('.popup__form');

// Сохраняем введённые данные профиля на странице
function userFormSubmitHandler(evt) {
  evt.preventDefault();
  nameUser.textContent = inputs[0].value;
  activityUser.textContent = inputs[1].value;
  ClosePopup(popupUser);
}
userForm.addEventListener('submit', userFormSubmitHandler);


//формируем карточку из попапа
function createCardSubmitHandler(evt) {
  evt.preventDefault();

  let nameMesto = document.getElementById('nameMesto');
  let linkPicture = document.getElementById('linkPicture');
  let card = {name:nameMesto.value, link:linkPicture.value};
  const newCard = createCard(card);

  listCardElement.prepend(newCard);
  ClosePopup(popupMesto);
}
mestoForm.addEventListener('submit', createCardSubmitHandler); //сохраняем введённые данные места на странице
