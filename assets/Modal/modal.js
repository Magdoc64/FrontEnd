const galleryModal = document.querySelector(".gallery-modal");

const modalBox = document.querySelector(".js-modal");
const buttonClose = document.querySelector(".modal-close");
const modalStop = document.querySelector(".modal-stop");

const buttonModal = document.querySelector(".button-modal");
const titleModal = document.querySelector("#title-modal");

const buttonAddImage = document.querySelector(".button-add-image");
const addImagePicture = document.querySelector(".add-image-picture");
const addImage = document.querySelector(".add-image");
const addGallery = document.querySelector(".add-gallery");

const modalAdd = document.querySelector(".modal-add");
const arrowPrevious = document.querySelector(".arrow-previous");

const inputImage = document.querySelector("#button-add-image");
const inputTitle = document.querySelector("#add-title");
const selectCategory = document.querySelector("#category");

const iFontAwesome = document.querySelector(".fa-image");
const commentImage = document.querySelector(".comment-add-image");

let modal = null;

async function getWorks(){
    const url = "http://localhost:5678/api/works";
    const response = await fetch(url);
    const works = await response.json();
    return works;
}

let createGalleryImage = (worksToDisplay, place) => {
    worksToDisplay.forEach(workToDisplay => {
        
        const figureModal = document.createElement("figure");
        figureModal.classList.add("figure-gallery-modal")
        place.appendChild(figureModal);

        const imageModal = document.createElement("img");
        imageModal.src = workToDisplay.imageUrl;
        imageModal.alt = workToDisplay.title;
        figureModal.appendChild(imageModal);

        const iconDelete = document.createElement("i");
        iconDelete.classList.add("fa-solid");
        iconDelete.classList.add("fa-trash-can");
        figureModal.appendChild(iconDelete);
    })   
}

const openModal = (e) => {
    e.preventDefault();

    const target = document.querySelector(".modal");
    modal = target;

    modal.style.display = "flex";

    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");

    let imageList = getWorks().then((works) => {
        createGalleryImage(works,galleryModal);
    });

    modal.addEventListener("click", closeModal);

    buttonClose.addEventListener("click", closeModal);

    modalStop.addEventListener("click", stopPropagation);
}

const closeModal = (e) => {
    if (modal === null) return;

    e.preventDefault();

    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");

    galleryModal.innerHTML = "";

    modal.removeEventListener("click", closeModal);

    buttonClose.removeEventListener("click", closeModal);

    modalStop.removeEventListener("click", stopPropagation);

    modal = null;
}

const stopPropagation = (e) => {
    e.stopPropagation();
}

modalBox.addEventListener("click", openModal);

let getCategory = async () => {
    const url = "http://localhost:5678/api/categories";
    const response = await fetch(url);
    const categories = await response.json();
    return categories;
}

let deleteCategories = () => {
    selectCategory.innerHTML = "";

    let option = document.createElement("option");
    option.innerHTML = "";
    selectCategory.appendChild(option);    
}

let addImageModal = () => {
  
    arrowPrevious.style.display = "flex";

    let buttonModal = document.querySelector(".button-modal");
    buttonModal.style.justifyContent = "space-between";
    
    let titleModal = document.querySelector("#title-modal");
    titleModal.innerHTML = "Ajout photo";
    titleModal.style.color = "#000000";

    let galleryModal = document.querySelector(".gallery-modal");
    galleryModal.innerHTML = "";
    galleryModal.style.display = "none";

    let addGallery = document.querySelector(".add-gallery");
    addGallery.style.display = "flex";

    modalAdd.innerHTML = "Valider";
    modalAdd.style.backgroundColor = "#A7A7A7";
    modalAdd.style.border = "none";
    modalAdd.style.cursor = "default";

    let choiceCategory = getCategory().then(categories => {
        
        deleteCategories();

        categories.forEach(category => {

            let option = document.createElement("option");
            option.innerHTML = category.name;
            selectCategory.appendChild(option);
        })
    });
}

let returnModal = () => {
  
    arrowPrevious.style.display = "none";

    buttonModal.style.justifyContent = "end";
    
    titleModal.innerHTML = "Galerie photo";
    titleModal.style.color = "#000000";

    galleryModal.innerHTML = "";
    
    galleryModal.style.display = "grid";
    let imageList = getWorks().then((works) => {
        createGalleryImage(works,galleryModal);
    });

    addGallery.style.display = "none";

    modalAdd.innerHTML = "Ajouter une photo";
    modalAdd.style.backgroundColor = "#1D6154";
    modalAdd.style.border = "1px solid #1D6154";
    modalAdd.style.cursor = "pointer";

}

modalAdd.addEventListener("click", addImageModal);

arrowPrevious.addEventListener("click", returnModal);

let checkErrorImage = (fileSize) => {
        
    iFontAwesome.classList.remove(".fa-regular");
    iFontAwesome.classList.remove(".fa-image");
    iFontAwesome.classList.add("fa-solid");
    iFontAwesome.classList.add("fa-triangle-exclamation");

    commentImage.classList.add("error-image");
    commentImage.innerHTML = "L'image est trop lourde. Veuillez choisir une autre image."
    commentImage.style.color = "rgba(250, 5, 16, 1)";
}

let initErrorImage = () => {
    if (iFontAwesome.classList.contains(".fa-triangle-exclamation")) {

        iFontAwesome.classList.add(".fa-regular");
        iFontAwesome.classList.add(".fa-image");
        iFontAwesome.classList.remove("fa-solid");
        iFontAwesome.classList.remove("fa-triangle-exclamation");

        commentImage.classList.remove("error-image");
        commentImage.innerHTML = "jpg, png : 4mo max";  
    }
}

buttonAddImage.addEventListener("click", (e) => {
     
    inputImage.click();

    e.preventDefault();

    inputImage.addEventListener("change", (e) => {
        
        const file = e.target.files[0];
        
        initErrorImage();

        let fileSize = file.size;

        if (fileSize >= 4e6) {

            checkErrorImage(fileSize);

        }else{

            const previewImage = document.createElement("img");
            previewImage.classList.add("preview-image");
            previewImage.style.display="flex";
            previewImage.file = file;
            addImage.appendChild(previewImage);

            const reader = new FileReader();
            
            reader.onload = (e) => {
                previewImage.src = e.target.result;
              };
            
            reader.readAsDataURL(file);

            addImagePicture.style.display = "none";
            commentImage.style.display = "none";
            buttonAddImage.style.display = "none";
        }
    })

});

inputImage.classList.add("inputForm");
inputTitle.classList.add("inputForm");
selectCategory.classList.add("inputForm");

let inputs = document.querySelectorAll(".inputForm");

let inputError = [];

let checkInputValid = () => {
    

    inputs.forEach(input => {

        if (input.value === null || input.value === ""){
            input.classList.add("error-input");
            inputError.push("donnée absente");
        }
     
    })
}

let initInputValid = () => {

    inputError = [];

    inputs.forEach(input => {

        if(input.classList.contains("error-input")){
            input.classList.remove("error-input")
        }
    })
}

addGallery.addEventListener("change", () => {
    
    initInputValid();

    inputs.forEach(input => {
        checkInputValid();   
    })

    if(inputError.length === 0){
        modalAdd.style.backgroundColor = "#1D6154";
        modalAdd.style.border = "1px solid #1D6154";
        modalAdd.style.cursor = "pointer";

        modalAdd.addEventListener("click", (e) => {
            closeModal(e);
            inputs.forEach(input => {
                input.value=""
            })
            const image = document.querySelector(".preview-image");
            image.style.display = "none";

            addImagePicture.style.display = "flex";
            commentImage.style.display = "flex";
            buttonAddImage.style.display = "flex";
        })
    }
})


