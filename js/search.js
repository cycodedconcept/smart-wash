
let input = document.querySelector("#input");

input.addEventListener("keyup", (e) => {
    let myInput = document.querySelector("#input").value;

    const profile = JSON.stringify({
        "location": myInput
    })
    const getToken = localStorage.getItem("token");
    const myToken = JSON.parse(getToken);

    const logUser = new Headers();
    logUser.append('Content-Type', 'application/json');
    logUser.append("Authorization", `Bearer ${myToken}`);

    const fil = {
        method: "POST",
        headers: logUser,
        body: profile
    }

    const url = `${baseUrl}/api/user/location`;


    fetch(url, fil)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        removeElements();
        for (let i of result) {
            if (i.toLowerCase().startsWith(input.value.toLocaleLowerCase()) && input.value != "") {
                let listItem = document.createElement("li");

                listItem.classList.add("list-items");
                listItem.style.cursor = "pointer";

                listItem.setAttribute("onclick", "displayNames('" + i + "')");

                let word = "<b>" + i.substr(0, input.value.length) + "</b>";

                word+= i.substr(input.value.length);

                listItem.innerHTML = word;
                document.querySelector(".list").appendChild(listItem)
            }
        }
    })
    .catch(error => console.log('error', error));

})

function displayNames(value) {
    input.value = value;
    removeElements();
}

function removeElements() {
    let items = document.querySelectorAll(".list-items");
    items.forEach((item) => {
        item.remove();
    });
}