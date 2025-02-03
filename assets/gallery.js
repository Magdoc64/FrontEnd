// create gallery with filter
import {getWorks, createGallery} from "./function-appli.js";

let worksList = getWorks().then((works) => {
    createGallery(works,gallery);
});

import {getCategories} from "./function-appli.js";

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

                worksList();
                
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

// Edit mode

let token = localStorage.getItem("token");

import {editMode, openModal} from "./function-appli.js";

if (token !== null){
    editMode();

}

//configuration logout

log.addEventListener("click", () => {
    localStorage.clear();

    modalBox.removeEventListener("click", openModal);

    location.reload();
})              

        
    




