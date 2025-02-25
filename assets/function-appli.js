// fetch function

export const getWorks = async () => {
    const url = "http://localhost:5678/api/works";
    const response = await fetch(url);
    const works = await response.json();
    return works;
}

export let getCategories = async () => {
    const url = "http://localhost:5678/api/categories";
    const response = await fetch(url);
    const categories = await response.json();
    return categories;
}

// Index functions
export let createGallery = (worksToDisplay, place) => {
    worksToDisplay.forEach(workToDisplay => {
        const figure = document.createElement("figure");
        figure.classList.add("figure-gallery")
        figure.dataset.id = workToDisplay.category.id;
        place.appendChild(figure);

        const image = document.createElement("img");
        image.src = workToDisplay.imageUrl;
        image.alt = workToDisplay.title;
        figure.appendChild(image);

        const figcaption = document.createElement("figcaption");
        figcaption.innerHTML = workToDisplay.title;
        figure.appendChild(figcaption);
    })   
}

//Edition function

export let editMode = () => {

    //headband create
    const headband = document.createElement("div");
    headband.classList.add("headband-edition");
    
    header.appendChild(headband);

    const divHeaderParent = divHeader.parentNode;
    divHeaderParent.insertBefore(headband, divHeader);
    divHeader.appendChild(titleHeader);
    divHeader.appendChild(navigationHeader);

    const headbandIcon = document.createElement("i");
    headbandIcon.classList.add("fa-regular");
    headbandIcon.classList.add("fa-pen-to-square")
    headband.appendChild(headbandIcon);

    const headbandText = document.createElement("p");
    headbandText.classList.add("headband-text");
    headbandText.innerHTML = "Mode édition";
    headband.appendChild(headbandText);

    //modify login
    log.innerHTML = "logout";
    log.href = "#";

    //add button "modifier"
    const modify = document.createElement("a");
    modify.classList.add("modify");
    modify.classList.add("js-modal");
    modify.href = "#modal";
    portfolioHeader.appendChild(modify);

    const modalBox = document.querySelector(".js-modal");
    modalBox.addEventListener("click", openModal);

    const modifyIcon = document.createElement("i");
    modifyIcon.classList.add("fa-regular");
    modifyIcon.classList.add("fa-pen-to-square");
    modify.appendChild(modifyIcon);

    const modifyText = document.createElement("p");
    modifyText.classList.add("modify-text");
    modifyText.innerHTML = "modifier";
    modify.appendChild(modifyText);

    filter.style.display = "none";
}

//Modal functions

// gallery modal
export let createGalleryImage = (worksToDisplay, place) => {
    worksToDisplay.forEach(workToDisplay => {
        
        const figureModal = document.createElement("figure");
        figureModal.classList.add("figure-gallery-modal")
        place.appendChild(figureModal);

        const imageModal = document.createElement("img");
        imageModal.src = workToDisplay.imageUrl;
        imageModal.alt = workToDisplay.title;
        figureModal.appendChild(imageModal);

        const buttonTrash =document.createElement("button");
        buttonTrash.classList.add("button-trash");
        buttonTrash.value = workToDisplay.id;
        figureModal.appendChild(buttonTrash);

        let projectId = buttonTrash.value;
        
        buttonTrash.addEventListener("click", (e) => {
            deleteProject(projectId, figureModal, e);
        })

        const iconDelete = document.createElement("i");
        iconDelete.classList.add("fa-solid");
        iconDelete.classList.add("fa-trash-can");
        buttonTrash.appendChild(iconDelete);
    })
}

let modal = null;

export const openModal = (e) => {
    
    e.preventDefault();

    const target = document.querySelector(".modal");
    modal = target;

    modal.style.display = "flex";

    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    modal.classList.add("modal-active");

    let imageList = getWorks().then(works => {
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
    modal.classList.remove("modal-active");

    galleryModal.innerHTML = "";

    modal.removeEventListener("click", closeModal);

    buttonClose.removeEventListener("click", closeModal);

    modalStop.removeEventListener("click", stopPropagation);

    modal = null;
}

const stopPropagation = (e) => {
    e.stopPropagation();
}

//Delete project

const statusDelete = async (projectId) => {
    const url = `http://localhost:5678/api/works/${projectId}`;
                
    const response = await fetch(url, {
        method: "DELETE",
        headers: { 
            "Authorization": `Bearer ${token}`},
    });
                
    return response.status;
};

const deleteProject = (projectId, figureModal, e) => {

    statusDelete(projectId) .then(res => {
        if (res === 204) {
            closeModal(e);

            figureModal.remove();

            gallery.innerHTML = "";
            getWorks().then((works) => {
                createGallery(works,gallery);
            });

            
            
            //location = "http://127.0.0.1:5500/index.html";

        }else if (res === 401) {
            errorSending.innerHTML = "Vous n'êtes pas autorisé à supprimer.";
            errorSending.style.display = "flex";

        }else{
            errorSending.innerHTML = "Une erreur s'est produite. Contacter l'administrateur du site.";
            errorSending.style.display = "flex";

        }
    });
}
