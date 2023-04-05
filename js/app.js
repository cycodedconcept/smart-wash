
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

    if (getName.length < 6) {
        Swal.fire({
            icon: 'info',
            text: 'Name must be more than 6 characters',
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
                location.href = `otp.html?email=${getEmail}`
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

// verify otp
function getOtp(event) {
    event.preventDefault();

    const getSpin = document.querySelector("#spin");
    getSpin.style.display = "inline-block"

    const fn = document.querySelector(".ba").value;
    const sn = document.querySelector(".ba2").value;
    const tn = document.querySelector(".ba3").value;
    const fon = document.querySelector(".ba4").value;

    const otp = fn + sn + tn + fon;

    const getHash = localStorage.getItem("user3");
    const hashIt = JSON.parse(getHash);
    const hash = hashIt.encrypted_data;

    const getEmail = localStorage.getItem("users");
    const hashEmail = JSON.parse(getEmail);
    const hash2 = hashEmail.email;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "otp": otp,
        "hash": hash,
        "email": hash2
    });

    const otpReq = {
        method: 'POST',
        body: raw,
        headers: myHeaders
    }

    const url = `${baseUrl}/api/user/verify-otp/`;
    fetch(url, otpReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)

        if (result.message === "Valid") {
            location.href = "../pages/success.html"
        }
        else {
            Swal.fire({
                icon: 'info',
                text: 'Unsuccessful please try again',
                confirmButtonColor: '#00AEEF'
            })
            getSpin.style.display = "none";
        }
    })
    .catch(error => {
        console.log('error', error)
        Swal.fire({
            icon: 'info',
            text: error,
            confirmButtonColor: '#00AEEF'
        })
        getSpin.style.display = "none";
    });

}


// function for verified sign in
function approvedSignUp(event) {
    event.preventDefault();

    const getSpin = document.querySelector("#spin");
    getSpin.style.display = "inline-block"

    const getDetails = localStorage.getItem("users");
    const details = JSON.parse(getDetails);
    const detailsName = details.name;
    const detailsEmail = details.email;
    const detailsPass = details.password;
    const detailsPhone = details.phone;
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "name": detailsName,
        "phone_number": detailsPhone,
        "email": detailsEmail,
        "password": detailsPass
    })

    const signReq = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    }

    const url = `${baseUrl}/api/user/signup/`;
    fetch(url, signReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.token) {
            location.href = "../pages/login.html"
        }
        else {
            Swal.fire({
                icon: 'info',
                text: `${result.message}`,
                confirmButtonColor: '#00AEEF'
            })
            getSpin.style.display = "none";
        }
    })
    .catch(error => {
        console.log('error', error)
        Swal.fire({
            icon: 'info',
            text: error,
            confirmButtonColor: '#00AEEF'
        })
        getSpin.style.display = "none";
    });

}


function getMail() {
    const params = new URLSearchParams(window.location.search);
    let getId = params.get('email');
    
    const getMail = document.querySelector(".otm");
    getMail.innerHTML = getId;
    getMail.style.color = "#00AEEF";

}

// function to properly sign up
function signIn(event) {
    event.preventDefault();
    
    const getSpin = document.querySelector("#spin");
    getSpin.style.display = "inline-block";

    const getEmail = document.getElementById("email").value;
    const getPassword = document.getElementById("password").value;

    if (getEmail === "" || getPassword === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: '#00AEEF'
        })

        getSpin.style.display = "none";
    }
    else {
        const signHead = new Headers();
        signHead.append("Content-Type", "application/json");

        const profile = JSON.stringify({
            "email": getEmail,
            "password": getPassword
        });

        const req = {
            method: 'POST',
            body: profile,
            headers: signHead
        };

        const url = `${baseUrl}/api/user/login`

        fetch(url, req)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            localStorage.setItem("token", JSON.stringify(result.token));

            if (result.message === "Login Successful Done") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#00AEEF'
                })

                setTimeout(() => {
                    location.href = "../index.html"
                }, 3000)
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: `${result.message}`,
                    confirmButtonColor: '#00AEEF'
                })
                getSpin.style.display = "none";
            }

        })
        .catch(error => {
            console.log('error', error)
            Swal.fire({
                icon: 'success',
                text: error,
                confirmButtonColor: '#00AEEF'
            })
            getSpin.style.display = "none";
        });
    }

}

// function for dashboard api

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


