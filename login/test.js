const chargeUtile = {
    email : "sophie.bluel@test.tld",
    password : "S0phie",
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

let tokenRecovery = postUsers(chargeUtile)
    .then((users) => {
         console.log(users.token);
    })

window.localStorage.setItem(email, tokenRecovery);
