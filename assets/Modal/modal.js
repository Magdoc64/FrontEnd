const closeModal = (e) => {

    e.preventDefault();

    modal.style.display = "none";

    galleryModal.innerHTML = "";

    modal.removeEventListener("click", closeModal);

    buttonClose.removeEventListener("click", closeModal);

    modalStop.removeEventListener("click", stopPropagation);

}

const stopPropagation = (e) => {
    e.stopPropagation();
}

buttonClose.addEventListener("click", closeModal);

modalStop.addEventListener("click", stopPropagation);

//create modal add image

import {getCategories, getWorks} from "../function-appli.js";

import {initCategories, addImageModal} from "./functions-modal.js";

let secondPageModal = () => {

    addImageModal();

    let choiceCategory = getCategories().then(categories => {
        
        initCategories();

        categories.forEach(category => {

            let option = document.createElement("option");
            option.innerHTML = category.name;
            option.value = category.id;
            selectCategory.appendChild(option);
        })
    });
}

modalAdd.addEventListener("click", secondPageModal);

//return modal origin

import {returnModal} from "./functions-modal.js";

arrowPrevious.addEventListener("click", () => {
    returnModal();

    modalAdd.removeEventListener("click", sendFile);

    modalAdd.addEventListener("click", secondPageModal);

    buttonClose.addEventListener("click", closeModal);

    modalStop.addEventListener("click", stopPropagation);
});

// add image 

import {checkErrorImage, initErrorImage, addPreviewImage, closePreviewImage} from "./functions-modal.js";

let newWork =[];

buttonAddImage.addEventListener("click", (e) => {
     
    inputImage.click();

    e.preventDefault();

    inputImage.addEventListener("change", (e) => {
        
        const file = e.target.files[0];
        
        initErrorImage();

        let fileSize = file.size;

        if (fileSize >= 4e6) {

            checkErrorImage();

        }else{
 
            addPreviewImage();
            
            previewImage.file = file;
            
            newWork.push(previewImage.file);
            
            const reader = new FileReader();
            
            reader.onload = (e) => {
                previewImage.src = e.target.result;
            };
            
            reader.readAsDataURL(file);
        }
    })
});

import {checkInputValid, initInputValid} from "./functions-modal.js";

const postStatusWork = async (newProject) => {
    const url = "http://localhost:5678/api/works";
                
    const response = await fetch(url, {
        method: "POST",
        headers: { 
            "Authorization": `Bearer ${token}`},
        body: newProject,
    });
    
    return response.status;
};

const sendFile = (e) => {
    let errorFile = [];

    const sizeFile = newWork[0].size;

    const namefile = newWork[0].name;
 
    const splitFile = namefile.split(".");
    const extensionImage = splitFile[1];

    let checkErrorFile = () => {
        if (sizeFile >= 4e6){
            errorFile.push("Fichier trop lourd");
        }
    
        if (formatImage.includes(extensionImage) === false){
            errorFile.push("Fichier au mauvais format");
        }
    }

    checkErrorFile();

    if (errorFile.length > 0){
        errorSending.style.display ="flex";
        errorSending.innerHTML = errorFile.join(", ");
                
    }else{

        let newProject = new FormData(addGallery);

        postStatusWork(newProject).then(res => {
            if (res === 201){
                
                addGallery.reset();
                
                closePreviewImage();

                closeModal(e);

                location = "http://127.0.0.1:5500/index.html";

            }else if (res === 401){
                errorSending.innerHTML = "Vous n'êtes pas autorisé à ajouter un projet.";
                errorSending.style.display = "flex";

            }else{
                errorSending.innerHTML = "Une erreur s'est produite. Contacter l'administrateur du site.";
                errorSending.style.display = "flex";
            }
        });
    } 
}

addGallery.addEventListener("change", () => {

    initInputValid();

    inputs.forEach(input => {
        checkInputValid();   
    })

    if(inputError.length === 0){
        modalAdd.classList.remove("button-inactive");
        modalAdd.classList.add("button-active");

        modalAdd.addEventListener("click", sendFile)
    }   
})






