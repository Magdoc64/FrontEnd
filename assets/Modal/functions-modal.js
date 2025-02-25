// second page of modal
export let initCategories = () => {
    selectCategory.innerHTML = "";

    let option = document.createElement("option");
    option.innerHTML = "";
    selectCategory.appendChild(option);    
}

export let addImageModal = () => {
  
    arrowPrevious.style.display = "flex";

    buttonModal.style.justifyContent = "space-between";
    
    titleModal.innerHTML = "Ajout photo";

    galleryModal.style.display = "none";

    addGallery.style.display = "flex";

    modalAdd.innerHTML = "Valider";
    modalAdd.classList.remove("button-active");
    modalAdd.classList.add("button-inactive");
}

export let returnModal = () => {
  
    arrowPrevious.style.display = "none";

    buttonModal.style.justifyContent = "end";
    
    titleModal.innerHTML = "Galerie photo";

    galleryModal.style.display = "grid";

    addGallery.style.display = "none";

    modalAdd.innerHTML = "Ajouter une photo";
    modalAdd.classList.remove("button-inactive");
    modalAdd.classList.add("button-active");

}

// add preview image
export let checkErrorImage = () => {
        
    iFontAwesome.classList.add("fa-solid");
    iFontAwesome.classList.add("fa-triangle-exclamation");

    commentImage.classList.add("error-image");
    commentImage.innerHTML = "L'image est trop lourde. Veuillez choisir une autre image."
}

export let initErrorImage = () => {
    
    if (iFontAwesome.classList.contains("fa-triangle-exclamation")) {
        iFontAwesome.classList.add("fa-regular");
        iFontAwesome.classList.add("fa-image");
        iFontAwesome.classList.remove("fa-solid");
        iFontAwesome.classList.remove("fa-triangle-exclamation");

        commentImage.classList.remove("error-image");
        commentImage.innerHTML = "jpg, png : 4mo max";
    }
}

export let addPreviewImage = () => {
    previewImage.style.display = "flex";

    addImagePicture.style.display = "none";
    commentImage.style.display = "none";
    buttonAddImage.style.display = "none";
}

export let closePreviewImage = () => {
    previewImage.style.display = "none";

    addImagePicture.style.display = "flex";
    commentImage.style.display = "flex";
    buttonAddImage.style.display = "flex";
    
}

// validating form

export let checkInputValid = () => {
    
    inputs.forEach(input => {

        if (input.value === null || input.value === ""){
            input.classList.add("error-input");
            inputError.push("donnée absente");
        }
    })
}

export let initInputValid = () => {

    inputError=[];

    inputs.forEach(input => {

        if(input.classList.contains("error-input")){
            input.classList.remove("error-input")
        }
    })
}