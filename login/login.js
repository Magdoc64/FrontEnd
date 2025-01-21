const form = document.querySelector("form");
const submit = document.querySelector("#submit")
const inputs = document.querySelectorAll("input");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const errorMessage = document.querySelector("#error-message");

const checkEmail = (emailValue) =>{
        
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        return regex.test(emailValue);
}

let errors =[];

const errorAlert = (emailValue, passwordValue) => {
     
    if (emailValue === "" || emailValue === null){
        errors.push("L'email doit être renseigné");
        emailInput.classList.add("error");
    }/*else{
        let testEmail = checkEmail(email);
        console.log (testEmail);

        if (emailValue !== "" || emailValue !== null && testEmail===false){
            errors.push("Email invalide exemple attendu : robert.martin@gmail.com");
            emailInput.classList.add("error");
        }
    }*/

    if (passwordValue=== "" || passwordValue === null){
        errors.push("Le mot de passe doit être renseigné");
        passwordInput.classList.add("error");
    }

    return errors;
}

let errorMessageInactive = () => {
    errors.splice(0, errors.length);

    inputs.forEach (input => {
        if (input.classList.contains("error")) {
            input.classList.remove;
        }
    })
}

const postStatus = async (chargeUtile) => {
    const url = "http://localhost:5678/api/users/login";
    
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chargeUtile),
    });
    
    return response.status;
}

const postUsers = async (chargeUtile) => {
    const url = "http://localhost:5678/api/users/login";

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chargeUtile),
    });

    const users = await response.json();
    return users;
};

submit.addEventListener("click", (event) => {
    
    let emailValue = emailInput.value;
    
    let passwordValue = passwordInput.value;

    errorMessageInactive();

    const usersIdentify = {
        email : emailValue,
        password : passwordValue,
    };

    errorAlert(usersIdentify.email, usersIdentify.password);

    if (errors.length>0) {

        event.preventDefault();

        errorMessage.innerHTML = errors.join(". ");

    }else{
        event.preventDefault();
        
        postStatus(usersIdentify).then((res) => {
            if(res===200){
                let tokenRecovery = postUsers(usersIdentify).then((users) => {
                    console.log(users.token);
                });

                window.localStorage.setItem("token", tokenRecovery);

                window.location = "http://127.0.0.1:5500/index.html";

            }else if(res===401){
                errorMessage.innerHTML = "Vous n'êtes pas autorisé à accéder à l'édition. Veuillez contacter l'administrateur du site."

            }else if(res===404){
                errorMessage.innerHTML = "Utilisateur inconnu. Veuillez créer un compte."

            }else{
                errorMessage.innerHTML = "Une anomalie s'est produite. Veuillez contacter l'administrateur du site."
            }
        });
    }
})