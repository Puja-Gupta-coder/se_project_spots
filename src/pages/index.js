import "../images/logo.svg"; // Add this
import "../images/avatar.jpg"; // Already exists
import "../images/Group2.svg"; // Already exists
import "../images/Group.svg"; // Add this
import "../images/add-logo.svg"; // Already exists
import "../images/Group27.svg"; // Already exists
import "../images/Close_Icon_preview.svg";

import "./index.css";
import {
  enableValidation,
  settings,
  disableButton,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";

// const initialCards = [
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },

//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },

//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },

//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },

//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },

//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];
const deleteForm = document.querySelector("#delete-form");
const deleteModal = document.querySelector("#delete-modal");
const deleteCloseButton = deleteModal.querySelector(".modal__close");
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const avatarModal = document.querySelector("#avatar-modal");
const profileAvatar = document.querySelector(".profile__avatar");
const avatarCloseButton = avatarModal.querySelector(".modal__button-close");
const profileForm = document.querySelector("#profile-form");
const profile = document.querySelector(".profile__column");
const profileNameElement = profile.querySelector(".profile__title");
const profileJobElement = profile.querySelector(".profile__description");
const nameInput = profileForm.querySelector("#name");
const jobInput = profileForm.querySelector("#description");
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "65d2d68a-31c1-4ecb-b4a7-2d6c51714b93",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([userData, cards]) => {
    profileAvatar.src = userData.avatar;
    profileNameElement.textContent = userData.name;
    profileJobElement.textContent = userData.about;

    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardList.append(cardElement);
    });
  })
  .catch(console.error);

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#edit-modal");
const profileCloseButton = profileEditModal.querySelector(
  ".modal__button-close"
);
const profileSubmitButton = profileEditModal.querySelector(
  ".modal__button-submit"
);

const cardTemplate = document.querySelector("#card-template");
const cardList = document.querySelector(".cards__list");

const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#edit-card-modal");
const addCardCloseButton = document.querySelector("#link-button-close");
const addCardForm = document.querySelector("#card-form");
const cardLinkInput = document.querySelector("#image-link");
const cardTitleInput = document.querySelector("#caption");
const cardSubmitButton = addCardModal.querySelector(".modal__button-submit");

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
  // avatar element
  cardElement.dataset.cardId = data._id;
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_liked");
  });

  cardDeleteButton.addEventListener("click", () => {
    openModal(deleteModal);
    deleteModal.dataset.cardId = data._id;
    deleteModal.dataset.cardElement = cardElement;
  });

  cardImage.addEventListener("click", () => {
    openModal(imagePreviewModal);
    modalImage.src = data.link;
    modalImage.alt = data.name;
    previewTitle.textContent = data.name;
  });

  return cardElement;
}
deleteCloseButton.addEventListener("click", () => closeModal(deleteModal));
deleteForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardId = deleteModal.dataset.cardId;
  const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);

  api
    .deleteCard(cardId)
    .then(() => {
      cardElement.remove();
      closeModal(deleteModal);
    })
    .catch((err) => {
      console.error(err);
    });
});

imagePreviewCloseButton.addEventListener("click", () => {
  closeModal(imagePreviewModal);
});

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

  const data = {
    name: nameInput.value,
    about: jobInput.value,
  };

  api
    .editUserInfo(data)
    .then((res) => {
      profileNameElement.textContent = res.name;
      profileJobElement.textContent = res.about;
      closeModal(profileEditModal);
    })
    .catch((err) => {
      console.error(err);
    });
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = addCardForm.querySelector(".modal__button");
  disableButton(submitButton);

  api.addCard(inputValues).then((res) => {
    const cardEl = getCardElement(res);
    cardList.prepend(cardEl);
    addCardForm.reset();
    disableButton(cardSubmitButton, settings);
  });
}

addCardButton.addEventListener("click", () => openModal(addCardModal));
addCardCloseButton.addEventListener("click", () => closeModal(addCardModal));
addCardForm.addEventListener("submit", handleCardFormSubmit);
// select avatar modal button at the top of page
//
avatarModalBtn.addEventListener("click", () => openModal(avatarModal));
avatarCloseButton.addEventListener("click", () => closeModal(avatarModal));

const closeModalByOverlayClick = (event) => {
  if (event.target.classList.contains("modal")) {
    closeModal(event.target);
  }
};

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", closeModalByOverlayClick);
});

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".modal_is-opened");
    console.log("Active Popup:", activePopup);
    if (activePopup) {
      closeModal(activePopup);
    }
  }
}
function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keyup", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keyup", handleEscape);
}

enableValidation(settings);
