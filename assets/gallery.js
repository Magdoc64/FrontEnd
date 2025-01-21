const gallery = document.querySelector(".gallery");

async function getWorks(){
    const url = "http://localhost:5678/api/works";
    const response = await fetch(url);
    const works = await response.json();
    return works;
}

let createGallery = (worksToDisplay, place) => {
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

let token = window.localStorage.getItem("token");

if (token !== null){
    const headband = document.createElement("div");
    headband.classList.add("headband-edition");
    
    let header = document.querySelector("header");
    header.appendChild(headband);

    let divHeader = document.querySelector(".div-header");

    const divHeaderParent = divHeader.parentNode;
    divHeaderParent.insertBefore(headband, divHeader);

    let titleHeader = document.querySelector("h1");
    divHeader.appendChild(titleHeader);

    let navigationHeader = document.querySelector("nav");
    divHeader.appendChild(navigationHeader);

    const headbandIcon = document.createElement("i");
    headbandIcon.classList.add("fa-regular");
    headbandIcon.classList.add("fa-pen-to-square")
    headband.appendChild(headbandIcon);

    const headbandText = document.createElement("p");
    headbandText.classList.add("headband-text");
    headbandText.innerHTML = "Mode édition";
    headband.appendChild(headbandText);

    const log = document.querySelector(".log");
    log.innerHTML = "logout";
    log.href = "#";

    const portfolioHeader = document.querySelector(".portfolio-header");
    const modify = document.createElement("a");
    modify.classList.add("modify");
    modify.href = "#";
    portfolioHeader.appendChild(modify);

    const modifyIcon = document.createElement("i");
    modifyIcon.classList.add("fa-regular");
    modifyIcon.classList.add("fa-pen-to-square");
    modify.appendChild(modifyIcon);

    const modifyText = document.createElement("p");
    modifyText.classList.add("modify-text");
    modifyText.innerHTML = "modifier";
    modify.appendChild(modifyText);

}

let worksList = getWorks().then((works) => {
    createGallery(works,gallery);
});


async function getCategories(){
    const url = "http://localhost:5678/api/categories";
    const response = await fetch(url);
    const categories = await response.json();
    return categories;
}

let filter = document.createElement("ul");
filter.classList.add("filter");

let parentFilter = document.querySelector("#portfolio");
parentFilter.appendChild(filter);

const galleryParent = gallery.parentNode;
galleryParent.insertBefore(filter, gallery);

let filterCategories = getCategories().then(categories => {
    
    let filterAll = document.createElement("li");
    filterAll.classList.add("filter-item");
    filterAll.innerHTML = "Tous";

    filter.appendChild(filterAll);

    filterAll.classList.add("active");

    categories.forEach(category => {
        let filterItem = document.createElement("li");
        filterItem.classList.add("filter-item");

        filterItem.innerHTML = category.name;
        filterItem.dataset.id = category.id;

        filter.appendChild(filterItem);
        });
        
    });

let filterButtons = getCategories().then(categories => {
    
    let filterButton = document.querySelectorAll(".filter-item");

    filterButton.forEach(button => {
            
        button.addEventListener("click", (event) => {
            
            gallery.innerHTML = "";

            filterButton.forEach(button => {
                button.classList.remove("active");
            });
                
            button.classList.add("active");

            let buttonsId = event.target.innerHTML;

            if (buttonsId === "Tous"){

                let works = getWorks().then (works => {
                    createGallery(works, gallery);
                });
                
            }else{

                let worksFiltered = getWorks().then (works => {
                    let buttonId = parseInt(event.target.dataset.id);

                    worksFiltered = works.filter((work) => work.category.id === buttonId);

                    createGallery(worksFiltered, gallery);
                });
            }               
        })                        
    })
});

const log = document.querySelector(".log");

log.addEventListener("click", () => {
    window.localStorage.removeItem("token");

    token = window.localStorage.getItem("token");

    location.reload();
})              

        
    




