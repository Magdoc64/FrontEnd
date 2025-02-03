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

let token = localStorage.getItem("token");

let jsontoken = JSON.stringify(token);
console.log(jsontoken);

console.log(`Bearer ${token}`);

const postStatusWork = async (newProject) => {
    const url = "http://localhost:5678/api/works";
                
    const response = await fetch(url, {
        method: "POST",
        headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
    });
    
    console.log(response.status);
    return response.status;
};

const postNewWork = async (newProject) => {
    const url = "http://localhost:5678/api/works";
                
    const response = await fetch(url, {
        method: "POST",
        headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
    });
                
    const newWorks = await response.json();
    
    return newWorks;
};

let userIdActive = parseInt(localStorage.getItem("userId"));

const sendFile = () => {
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
            
        let titleNewWork = inputTitle.value;

        let newWorkUrl = "http://localhost:5678/images/" + titleNewWork+"."+extensionImage;

        let categoryIndex = selectCategory.selectedIndex;

        let categoryNewWork = selectCategory.options[categoryIndex].value;

        let newProject = new FormData();
        newProject.append("title", titleNewWork);
        //newProject.append("imageUrl", newWorkUrl);
        newProject.append("categoryId", categoryNewWork);
        //newProject.append("userId", userIdActive);
        newProject.append("file", newWork[0]);

        for (let formValue of newProject.values()){
            console.log(formValue);
        }

        /*let newProject = {
            "title": titleNewWork,
            "imageUrl": newWorkUrl,
            "categoryId": categoryNewWork,
            "userId": userIdActive
        }

        console.log(newProject);*/

        postStatusWork(newProject).then(res => {
            if (res === 200){
                postNewWork(newProject).then(newProject => {
                    console.log(newProject);

                    inputs.forEach(input => {
                        input.value=""
                    })
                });

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

/*const statusDelete = async (trashWork) => {
    const url = "http://localhost:5678/api/works";
                
    const response = await fetch(url, {
        method: "DELETE",
        headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json" },
        body: JSON.stringify(trashWork),
    });
                
    console.log(response.status);
    return response.status;
};

const deleteWorks = async (trashWork) => {
    const url = "http://localhost:5678/api/works";
                
    const response = await fetch(url, {
        method: "DELETE",
        headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json" },
        body: JSON.stringify(trashWork),
    });
                
    const deleteWork = await response.json();
    
    return deleteWork;
};

getWorks() .then (works => {
    works.forEach(work => {
        trashButton.addEventListener("click", (e) => {
            let workId = work.id;

            deleteWorks() .then(deleteWork => {
                let trashWork = {
                id: workId
                }

                statusDelete(trashWork) .then(res => {
                    if (res === 200) {
                        closeModal(e);

                        location = "http://127.0.0.1:5500/index.html";

                    }else if (res === 401) {
                        errorSending.innerHTML = "Vous n'êtes pas autorisé à supprimer.";
                        errorSending.style.display = "flex";

                    }else{
                        errorSending.innerHTML = "Une erreur s'est produite. Contacter l'administrateur du site.";
                        errorSending.style.display = "flex";

                    }
                }

            })
        })
    })
})*/



