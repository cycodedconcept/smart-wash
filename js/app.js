
let baseUrl = "https://washsmart.onrender.com";
document.cookie = "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&response_type=code&client_id=454924869328-m14q0u1deaca3b921vm69jevpth1tv1m.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fuser%2Fgoogle%2Fauth";
let x = document.cookie;

function signup(event) {
    event.preventDefault();

    const getspin = document.querySelector("#spin");
    getspin.style.display = "inline-block";

    const getName = document.getElementById("name").value;
    const getEmail = document.getElementById("email").value;
    const getPhone = document.getElementById("phone").value;
    const getPassword = document.getElementById("password").value;
    const getPolicy = document.getElementById("policy").value;

    if (getName === "" || getEmail === "" || getPhone === "" || getPassword === "" || getPolicy === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: '#00AEEF'
        })
        getspin.style.display = "none";
    }

    else {
        let person = {
            name: getName,
            email: getEmail,
            phone: getPhone,
            password: getPassword,
            policy: getPolicy
        };

        localStorage.setItem("users", JSON.stringify(person));

        const signReq = {
            method: 'GET',
        }

        let url = `${baseUrl}/api/user/sendotp/` + `${getEmail}`
        fetch(url, signReq)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            localStorage.setItem("user3", JSON.stringify(result))
            if (result.message === "Email Sent") {
                location.href = "otp.html"
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: 'Unsuccessful please try again',
                    confirmButtonColor: '#00AEEF'
                })
                getspin.style.display = "none";
            }
        })
        .catch(error => {
            console.log('error', error)
            Swal.fire({
                icon: 'info',
                text: error,
                confirmButtonColor: '#00AEEF'
            })
            getspin.style.display = "none";
        });

    }

}

function googleSignIn(event) {
    event.preventDefault();
    location.href = x;
}

function getPricing() {
    var request = {
        method: 'GET',
    };

    let url = `${baseUrl}/api/pricing/get_pricing`;
    fetch(url, request)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}
getPricing();


