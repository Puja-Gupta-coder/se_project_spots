# Project 3: Spots

# Spot

An image sharing site

## Project Description

Spot is a Figma project implemented in HTML and CSS. The project showcases a profile page with a header, main content, and footer. The main content includes a profile section and a section displaying various cards with images and titles.

##Tech Stack

1. HTML
2. CSS
3. Git and GitHub
4. Figma
5. Web Browsers

## Features

- Responsive design
- Profile section with avatar, name, description, and edit button
- Cards section with images and titles
- Footer section with project copyright

## Deployment

This webpage is deployed to github pages.

Deployment link: https://puja-gupta-coder.github.io/se_project_spots/

````

## Semantics and BEM

### Semantics

In this project, we have followed semantic HTML principles to improve accessibility, SEO, and overall readability of the code. Semantic HTML elements clearly describe their meaning in a way that is both understandable by humans and machines. Key semantic elements used in the project include:

- `<header>`: Defines the header section of the page.
- `<main>`: Represents the main content of the document.
- `<section>`: Groups related content together.
- `<footer>`: Defines the footer section of the page.

### BEM (Block Element Modifier)

The BEM methodology is used to structure the CSS in a maintainable and scalable way. BEM is a naming convention for classes that aims to make the relationships between components clear. The structure is as follows:

- **Block**: The standalone component that is meaningful on its own (e.g., `.profile`, `.card`).
- **Element**: A part of a block that has no standalone meaning and is semantically tied to its block (e.g., `.profile__avatar`, `.card__image`).
- **Modifier**: A flag on a block or element that changes its appearance or behavior (e.g., `.profile__avatar--large`).

Example from the project:

```html
<section class="profile page__section">
<img src="./images/avatar.jpg" alt="avatar image" class="profile__avatar" />
<div class="profile__column">
 <h2 class="profile__title">Bessie Coleman</h2>
 <p class="profile__description">Civil Aviator</p>
 <button class="profile__edit-button">
   <img src="./images/edit-button.svg" alt="edit button" />Edit Profile
 </button>
</div>
<button class="profile__add-button">
 <img src="./images/add-button.svg" alt="add button" />
 New Post
</button>
</section>

In this example: .profile is the Block. .profile__avatar, .profile__column,
.profile__title, .profile__description, .profile__edit-button, and
.profile__add-button are Elements. *Modifiers could be added to these classes to
alter their appearance or behavior if needed. By adhering to these principles,
the project's structure remains clear and maintainable .
````

[Project overview video link](https://drive.google.com/file/d/1KTPTYnmqMFHMz5rpvooNyCXEhDae0j_P/view?usp=drive_link)
