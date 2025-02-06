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
const editModal = document.querySelector("#edit-modal");
const closeButton = editModal.querySelector(".modal__button-close");
const submitButton = editModal.querySelector(".modal__button-submit");
const modalForm = document.querySelector(".modal__form");
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
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  return cardElement;
}
function handleEditButton() {
  editModal.classList.add("modal_opened");
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
}

function handleCloseButton() {
  editModal.classList.remove("modal_opened");
}
editButton.addEventListener("click", handleEditButton);
closeButton.addEventListener("click", handleCloseButton);

function handleSubmitButton(evt) {
  evt.preventDefault();
  editModal.classList.remove("modal_opened");
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
}

submitButton.addEventListener("click", handleSubmitButton);

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]);
  cardList.prepend(cardElement);
}
