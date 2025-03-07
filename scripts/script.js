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

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#edit-modal");
const profileCloseButton = profileEditModal.querySelector(
  ".modal__button-close"
);
const profileSubmitButton = profileEditModal.querySelector(
  ".modal__button-submit"
);
const profileForm = document.querySelector("#profile-form");
const profile = document.querySelector(".profile__column");
const profileNameElement = profile.querySelector(".profile__title");
const profileJobElement = profile.querySelector(".profile__description");
const nameInput = profileForm.querySelector("#name");
const jobInput = profileForm.querySelector("#description");

const cardTemplate = document.querySelector("#card-template");
const cardList = document.querySelector(".cards__list");

const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#edit-card-modal");
const addCardCloseButton = document.querySelector("#link-button-close");
const addCardForm = document.querySelector("#card-form");
const cardLinkInput = document.querySelector("#image-link");
const cardTitleInput = document.querySelector("#caption");
const cardSubmitButton = document.querySelector(".modal__button-submit");

const imagePreviewModal = document.querySelector("#modal-profile-preview");
const previewTitle = document.querySelector(".modal__caption");
const modalImage = document.querySelector(".modal__image");
const imagePreviewCloseButton = document.querySelector("#preview-button-close");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_liked");
  });

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    openModal(imagePreviewModal);
    modalImage.src = data.link;
    modalImage.alt = data.name;
    previewTitle.textContent = data.name;
  });

  return cardElement;
}

imagePreviewCloseButton.addEventListener("click", () => {
  closeModal(imagePreviewModal);
});

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

function handleEditButton() {
  openModal(profileEditModal);
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  resetValidation(profileForm, [nameInput, jobInput], settings);
}

profileEditButton.addEventListener("click", handleEditButton);
profileCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  closeModal(profileEditModal);
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

initialCards.forEach((card) => {
  const cardElement = getCardElement(card);
  cardList.append(cardElement);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  closeModal(addCardModal);
  const inputValues = {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
  };
  evt.target.reset();
  disableButton(cardSubmitButton, settings);

  const cardEl = getCardElement(inputValues);
  cardList.prepend(cardEl);
}

addCardButton.addEventListener("click", () => openModal(addCardModal));
addCardCloseButton.addEventListener("click", () => closeModal(addCardModal));
addCardForm.addEventListener("submit", handleCardFormSubmit);
