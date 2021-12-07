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

const editButton = document.querySelector('.profile-info__edit-button');
const addButton = document.querySelector('.profile__add-button');
const elementPhoto = document.querySelector('.element__photo');

const popupUser = document.querySelector('.popup_user');
const popupMesto = document.querySelector('.popup_mesto');
const popupView = document.querySelector('.popup_view');

const buttonCloseUser = popupUser.querySelector('.popup__to-close');
const buttonCloseMesto = popupMesto.querySelector('.popup__to-close');
const buttonCloseView = popupView.querySelector('.popup__to-close');

const popupOverlayUser = popupUser.querySelector('.popup__overlay');
const popupOverlayMesto = popupMesto.querySelector('.popup__overlay');
const popupOverlayView = popupView.querySelector('.popup__overlay');

const userForm = popupUser.querySelector('.popup__form');
const mestoForm = popupMesto.querySelector('.popup__form');
const popupViewTitle = document.querySelector('.popup__subtitle');
const popupViewPhoto = document.querySelector('.popup__photo');

const nameUser = document.querySelector('.profile-info__name');
const activityUser = document.querySelector('.profile-info__activity');
const inputNameUser = userForm.querySelector('.popup__input-text_name');
const inputActivityUser = userForm.querySelector('.popup__input-text_activity');
const inputNameMesto = document.getElementById('nameMesto');
const inputLinkPicture = document.getElementById('linkPicture');

// Создаем карточку из template
function createCard(item) {
  const itemContainer = itemTemplate.content.cloneNode(true); //li
  const elementPhoto = itemContainer.querySelector('.element__photo');
  const likeButton = itemContainer.querySelector('.element__like');
  const deleteButton = itemContainer.querySelector('.element__delete');

  itemContainer.querySelector('.element__text').textContent = item.name;
  elementPhoto.src = item.link;
  elementPhoto.alt = item.name;

  addLikeHandler(likeButton); //обработчик клика по сердечку
  addClickHandler(deleteButton); // действия пользователя с кнопкой удаления эл.
  addPhotoViewHandler(elementPhoto); // просмотр фотографии

  return itemContainer; //получили карточку li
}

// Добавляем её в DOM
render = () => {
  cardElements.forEach((item) => {
    listCardElement.append(createCard(item));
  });
}
render();

// Добавление/удаление лайка
function addLikeHandler(likeButton) {
  likeButton.addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active');
  });
}

// Манипуляции с кнопкой удаления эл.
function addClickHandler(deleteButton) {
  deleteButton.addEventListener('click', function(evt) {
    const itemContainer = deleteButton.closest('.element');
    itemContainer.remove();
  });
}

// Открываем попапы форм
function showPopup(popup) {
  popup.classList.add('popup_opened');
  inputNameUser.value = nameUser.textContent;
  inputActivityUser.value = activityUser.textContent;
}
editButton.addEventListener('click', () => showPopup(popupUser));
addButton.addEventListener('click', () => showPopup(popupMesto));

// Сохраняем введённые данные профиля на странице
function handleUserFormSubmit(evt) {
  evt.preventDefault();
  nameUser.textContent = inputNameUser.value;
  activityUser.textContent = inputActivityUser.value;
  closePopup(popupUser);
}
userForm.addEventListener('submit', handleUserFormSubmit);

// Очищаем форму добавления места
function clearValues() {
  inputNameMesto.value = '';
  inputLinkPicture.value = '';
}

// Формируем карточку из попапа
function createCardSubmitHandler(evt) {
  evt.preventDefault();

  const card = {name:inputNameMesto.value, link:inputLinkPicture.value};
  const newCard = createCard(card);

  listCardElement.prepend(newCard);
  clearValues();
  closePopup(popupMesto);
}
mestoForm.addEventListener('submit', createCardSubmitHandler); //сохраняем введённые данные места на странице

// Открываем попап просмотра фотографии
function addPhotoViewHandler(elementPhoto) {
  elementPhoto.addEventListener('click', function(evt) {
    const evtTarget = evt.target; //получаем родительскую карточку

    popupViewTitle.textContent = evtTarget.alt;
    popupViewPhoto.src = evtTarget.src; //и атрибуты её элементов
    popupViewPhoto.alt = evtTarget.alt;

    showPopup(popupView);
  });
}

// Закрываем попапы
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
buttonCloseUser.addEventListener('click', () => closePopup(popupUser));
popupOverlayUser.addEventListener('click', () => closePopup(popupUser));
buttonCloseMesto.addEventListener('click', () => closePopup(popupMesto));
popupOverlayMesto.addEventListener('click', () => closePopup(popupMesto));
buttonCloseView.addEventListener('click', () => closePopup(popupView));
popupOverlayView.addEventListener('click', () => closePopup(popupView));
