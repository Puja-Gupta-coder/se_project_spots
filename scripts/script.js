const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },

  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },

  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },

  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },

  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },

  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const editButton = document.querySelector(".profile__edit-button");
const modal = document.querySelector(".modal");
const editModal = document.querySelector("#edit-modal");
const closeButton = editModal.querySelector(".modal__button-close");
const submitButton = editModal.querySelector(".modal__button-submit");
const modalForm = document.querySelector("#profile-form");
const profileFormElement = document.querySelector(".profile__column");
const profileNameElement = profileFormElement.querySelector(".profile__title");
const profileJobElement = profileFormElement.querySelector(
  ".profile__description"
);
const nameInput = modalForm.querySelector("#name");
const jobInput = modalForm.querySelector("#description");
const cardTemplate = document.querySelector("#card-template");
const cardList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const modalPreview = document.querySelector("#modal-profile-preview");
  const previewTitle = document.querySelector(".modal__caption");
  const modalImage = document.querySelector(".modal__image");
  const previewButtonClose = document.querySelector("#preview-button-close");
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_liked");
  });
  cardDeleteButton.addEventListener("click", () => {
    cardDeleteButton.classList.toggle("card__delete-button_clicked");
  });

  cardImage.addEventListener("click", () => {
    openModal(modalPreview);
    modalImage.src = data.link;
    previewTitle.textContent = data.name;
  });

  previewButtonClose.addEventListener("click", () => {
    closeModal(modalPreview);
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}
function handleEditButton() {
  openModal(editModal);
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}
editButton.addEventListener("click", handleEditButton);
closeButton.addEventListener("click", () => {
  closeModal(editModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  closeModal(editModal);
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
}

modalForm.addEventListener("submit", handleProfileFormSubmit);

initialCards.forEach((card) => {
  const cardElement = getCardElement(card);
  cardList.append(cardElement);
});

const editModalButton = document.querySelector(".profile__add-button");
const modalVisible = document.querySelector("#edit-card-modal");
const closeButtonLinkForm = document.querySelector("#link-button-close");
const cardForm = document.querySelector("#card-form");
const cardLinkInput = document.querySelector("#image-link");
const cardTitleInput = document.querySelector("#caption");

function cardLinkFormSubmit(evt) {
  evt.preventDefault();
  closeModal(modalVisible);
  const inputValues = {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
  };
  const cardEl = getCardElement(inputValues);
  cardList.prepend(cardEl);
}

editModalButton.addEventListener("click", () => openModal(modalVisible));
closeButtonLinkForm.addEventListener("click", () => closeModal(modalVisible));
cardForm.addEventListener("submit", cardLinkFormSubmit);
