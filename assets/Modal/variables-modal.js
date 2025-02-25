const galleryModal = document.querySelector(".gallery-modal");

const modalBox = document.querySelector(".js-modal");

const buttonClose = document.querySelector(".modal-close");
const modalStop = document.querySelector(".modal-stop");

const buttonModal = document.querySelector(".button-modal");
const titleModal = document.querySelector("#title-modal");

const buttonAddImage = document.querySelector(".button-add-image");
const addImagePicture = document.querySelector(".add-image-picture");
const addImage = document.querySelector(".add-image");
const addGallery = document.getElementById("add-gallery");

const modalAdd = document.querySelector(".modal-add");
const arrowPrevious = document.querySelector(".arrow-previous");

const inputs = document.querySelectorAll(".input-form");
const inputImage = document.querySelector("#button-add-image");
const inputTitle = document.querySelector("#add-title");
const selectCategory = document.querySelector("#category");

const iFontAwesome = document.querySelector(".fa-image");
const iFontAwesomeError= document.querySelector(".fa-triangle-exclamation");
const commentImage = document.querySelector(".comment-add-image");

const previewImage = document.querySelector(".preview-image");

let inputError = [];

const errorSending = document.querySelector(".error-sending");
const formatImage = ["jpg", "jpeg", "png"];


