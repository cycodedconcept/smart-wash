let baseUrl = "https://washsmart.onrender.com";

let dvogue;
let dsum;
let dtotal;
let ivogue;
let isum;
let itotal;

let thePrice = [];
let wfbag;
let wifbag


function toLogin(event) {
    event.preventDefault();
    location.href = "../pages/login.html"
}

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
            localStorage.setItem("user3", JSON.stringify(result));
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

    if (fn === "" || sn === "" || tn === "" || fon === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: '#00AEEF'
        })
        getSpin.style.display = "none"
    }
    else {
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
function dashboardApi() {
    const getToken = localStorage.getItem("token");
    const myToken = JSON.parse(getToken);


    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${myToken}`);

    const dashReq = {
        method: 'GET',
        headers: dashHeader
    };

    const url = `${baseUrl}/api/user/dashboardapi`

    fetch(url, dashReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        localStorage.setItem("dash", JSON.stringify(result))
        let removeBtn = document.querySelector(".sign-btn");
        let formParent = document.querySelector(".form-inline");


        if (result.user.hasOwnProperty('email')) {
            removeBtn.style.display = "none"

            const newDiv = document.createElement("div");
            const para = document.createElement("p");
            const pImg = document.createElement("img");
            pImg.src = "../assets/avatar.png"
            pImg.style.height = "40px";
            pImg.style.marginTop = "10px";
            pImg.style.marginRight = "6px";
            newDiv.style.marginTop = "30px;"
            para.innerHTML = `${result.user.name}`;
            para.style.marginTop = "15px";
            para.style.fontWeight = "800";
            para.style.marginRight = "10px";
            newDiv.style.display = "flex";
            newDiv.appendChild(pImg);
            newDiv.appendChild(para);
            formParent.prepend(newDiv)
        }
        else {

            if (!localStorage.getItem("token")) {
               removeBtn.style.display = "block";
            }
        }

    })
    .catch(error => console.log('error', error));
}
dashboardApi();




function getAdminEmail(event) {
    event.preventDefault();

    const getSpin = document.querySelector("#spin");
    getSpin.style.display = "inline-block";

    const getEmail = document.getElementById("adminEmail").value;
    if(getEmail === "") {
        Swal.fire({
            icon: 'info',
            text: 'The email field is required!',
            confirmButtonColor: '#00AEEF'
        })
    }

    else {
        const signReq = {
            method: 'GET',
        }
    
        let url = `${baseUrl}/api/user/sendotp/` + `${getEmail}`;
        fetch(url, signReq)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            localStorage.setItem("userAdmin", JSON.stringify(result));
            if (result.message === "Email Sent") {
                location.href = `otp2.html?email=${getEmail}`
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
}

function sendOtp(event) {
    event.preventDefault();

    const getSpin = document.querySelector("#spin");
    getSpin.style.display = "inline-block";

    const fn = document.querySelector(".ba").value;
    const sn = document.querySelector(".ba2").value;
    const tn = document.querySelector(".ba3").value;
    const fon = document.querySelector(".ba4").value;

    if (fn === "" || sn === "" || tn === "" || fon === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: '#00AEEF'
        })
        getSpin.style.display = "none"
    }

    else {
        const otp = fn + sn + tn + fon;
        localStorage.setItem("otp", otp);

        const getHash = localStorage.getItem("userAdmin");
        const hashIt = JSON.parse(getHash);
        const hash = hashIt.encrypted_data;

        const getEmail = localStorage.getItem("dash");
        const hashEmail = JSON.parse(getEmail);
        const hash2 = hashEmail.user.email;

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
                location.href = "../pages/change_password.html"
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
}


function changePassword(event) {
    event.preventDefault();

    const getSpin = document.getElementById("spin");
    getSpin.style.display = "inline-block";

    const fpassword = document.getElementById("cpassword").value;

    if (fpassword === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: '#00AEEF'
        })
        getSpin.style.display = "none";
    }

    else {

        const getHash = localStorage.getItem("userAdmin");
        const hashIt = JSON.parse(getHash);
        const hash = hashIt.encrypted_data;

        const getEmail = localStorage.getItem("dash");
        const hashEmail = JSON.parse(getEmail);
        const hash2 = hashEmail.user.email;

        const myOtp = localStorage.getItem("otp");

        const otpGet = JSON.stringify({
            "otp": myOtp,
            "hash": hash,
            "password": fpassword,
            "email": hash2
        })

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const optReq = {
            method: 'POST',
            headers: myHeaders,
            body: otpGet
        }

       const url = `${baseUrl}/api/user/forgot-password`;
       fetch(url, optReq)
       .then(response => response.json())
       .then(result => {
           console.log(result)
           if (result.message === "Password updated") {
               Swal.fire({
                   icon: 'success',
                   text: `${result.message}`,
                   confirmButtonColor: '#00AEEF'
               })
               setTimeout(() => {
                   location.href = "../pages/successpassword.html"
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
            icon: 'warning',
            text: error,
            confirmButtonColor: '#00AEEF'
        })
        getSpin.style.display = "none";
       });

    }

}

function updatePasswordAdmin(event) {
    event.preventDefault();

    const getSpin = document.getElementById("spin");
    getSpin.style.display = "inline-block";

    const getToken = localStorage.getItem("token");
    const myToken = JSON.parse(getToken);

    const oldPass = document.getElementById("oldpass").value;
    const newPass = document.getElementById("newPass").value;
    const confirmOldPass = document.getElementById("confirmNewPass").value;

    if (oldPass === "" || newPass === "" || confirmOldPass === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: '#00AEEF'
        })
        getSpin.style.display = "none";
    }
    if ( confirmOldPass !== newPass) {
        Swal.fire({
            icon: 'info',
            text: 'Passwords do not match',
            confirmButtonColor: '#00AEEF'
        })
        getSpin.style.display = "none";
    }
    
    else {
        const getHeader = new Headers();
        getHeader.append("Authorization", `Bearer ${myToken}`);

        const getBody = JSON.stringify({
            "oldpassword": oldPass,
            "newpassword": newPass,
            "confirmpassword": confirmOldPass
        })

        const upReq = {
            method: "POST",
            headers: getHeader,
            body: getBody
        };

        const url = `${baseUrl}/api/user/update-password`;
        fetch(url, upReq)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
}

function googleSignIn(event) {
    event.preventDefault();

    const goReq = {
        method: 'GET',
    }

    const url = `${baseUrl}/api/user`;
    fetch(url, goReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        location.href = `${result.message}`;
    })
    .catch(error => console.log('error', error));
}

function schedule(event) {
    event.preventDefault();

    if (localStorage.getItem("dash")) {
        const getDash = localStorage.getItem("dash");
        const myMess = JSON.parse(getDash);
        const viewMe = myMess.message;
        
        if (viewMe) {
            location.href = "../pages/login.html"
        }
        else {
            const getPhone = localStorage.getItem("dash");
            const myPhone = JSON.parse(getPhone);
            const phone = myPhone.user.phone_number;
    
            if (phone === "" || phone === null || phone === undefined) {
                const getModal = document.getElementById("dash-modal");
                getModal.style.display = "block";
            }
         
            else {
                const locationModal = document.getElementById("loc-modal");
                locationModal.style.display = "block"
            }
        }
    }

}

// function to close modal
function closeDashModal() {
    const getModal = document.getElementById("dash-modal");
    getModal.style.display = "none";
}

function xclose() {
    const getModal = document.getElementById("loc-modal");
    getModal.style.display = "none";
}

// function to update phone number
function updatePhone(event) {
    event.preventDefault();

    const getSpin = document.getElementById("spin");
    getSpin.style.display = "inline-block";

    const phoneNumber = document.getElementById("phone").value;
    console.log(phoneNumber)
    if (phoneNumber === "") {
        Swal.fire({
            icon: 'info',
            text: 'This field is required!',
            confirmButtonColor: '#00AEEF'
        })
        getSpin.style.display = "none";
    }

    else {
        const getToken = localStorage.getItem("token");
        const theToken = JSON.parse(getToken);


        const phoneHeader = new Headers();
        phoneHeader.append("Authorization", `Bearer ${theToken}`);

        const phoneData = JSON.stringify({
            "phone_number": phoneNumber
        })

        const phoneReq = {
            method: 'POST',
            headers: phoneHeader,
            body: phoneData
        }

        const url = `${baseUrl}/api/user/update-phonenumber`;
        fetch(url, phoneReq)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.message === "phone-number updated") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#00AEEF'
                })
                setTimeout(() => {
                    location.href = "../pages/plan.html"
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
                icon: 'warning',
                text: error,
                confirmButtonColor: '#00AEEF'
            })
            getSpin.style.display = "none";
        });

    }
}


// function to get location
function getLocation() {
    const getToken = localStorage.getItem("token");
    const myToken = JSON.parse(getToken);

    const locationHeader = new Headers();
    locationHeader.append("Authorization", `Bearer ${myToken}`);

    const myLoc = document.getElementById("location");

    const locReq = {
        method: 'GET',
        headers: locationHeader
    }

    let data = [];

    const url = `${baseUrl}/api/booking/get-supported-location`;

    fetch(url, locReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)

        result.map((item) => {
            data += `
            <option value="${item.name}">${item.name}</option>
        `
        })

        myLoc.innerHTML = data

        
    })
    .catch(error => console.log('error', error));


}

// function to send location
function sendAddress(event) {
    event.preventDefault()

    location.href = "../pages/location.html"
}

function getPricing() {
    let request = {
        method: 'GET',
    };

    const url = `${baseUrl}/api/pricing/get_pricing`;
    fetch(url, request)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        localStorage.setItem("price", JSON.stringify(result))
        
    })
    .catch(error => console.log('error', error));

}

// function to update location
function finalAddress(event) {
    event.preventDefault()

    const getSpin = document.querySelector("#spinit");
    getSpin.style.display = "inline-block";

    const getInput = document.querySelector(".myInput").value;
    if (getInput === "") {
        Swal.fire({
            icon: 'info',
            text: 'This field is required!',
            confirmButtonColor: '#00AEEF'
        })

        getSpin.style.display = "none";
    }

    else {
        const getToken = localStorage.getItem("token");
        const myToken = JSON.parse(getToken);

        const locationHeader = new Headers();
        locationHeader.append('Content-Type', 'application/json');

        locationHeader.append("Authorization", `Bearer ${myToken}`);

        const myProfile = JSON.stringify({
            "location": getInput
        });


        const fiReq = {
            method: 'POST',
            headers: locationHeader,
            body: myProfile
        }

        const url = `${baseUrl}/api/user/update-location`;

        fetch(url, fiReq)
        .then(response => response.json())
        .then(result => {
            console.log(result)

            if (result.message.hasOwnProperty("email")) {
                Swal.fire({
                    icon: 'success',
                    text: 'updated successfully',
                    confirmButtonColor: '#00AEEF'
                })
                setTimeout(() => {
                    location.href = "../pages/plan.html"
                })
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: 'Unsuccessful',
                    confirmButtonColor: '#00AEEF'
                })
                getSpin.style.display = "none";
            }
        })
        .catch(error => console.log('error', error));

    }
}

function displayAllPrice() {
    const getit = localStorage.getItem("price");
    const getHigh = JSON.parse(getit);


    const getPrice = document.querySelector(".price");
    const getPrice2 = document.querySelector(".priceSmart");
    const getPriceIron = document.querySelector(".priceiron");
    const mod = document.querySelector(".mod");
    const iri = document.querySelector(".ipri");
    



    getPrice.innerHTML = `${getHigh.wash_and_fold_one_time}`;
    getPrice2.innerHTML = `${getHigh.wash_and_fold_smart_wash}`;
    mod.innerHTML = `₦${getHigh.wash_and_fold_smart_wash_yearly_plan_per_bag}/yr`;
    getPriceIron.innerHTML = `${getHigh.wash_iron_and_fold_smart_wash}`;
    iri.innerHTML = `₦${getHigh.wash_iron_and_fold_smart_wash_yearly_plan_per_bag}/yr`;




    const sam = document.querySelector(".sam");
    const sam2 = document.querySelector(".sam2");
    const sam3 = document.querySelector(".sam3");
    const sam4 = document.querySelector(".sam4");
    const sam5 = document.querySelector(".sam5");

        // const getOnetime = document.querySelector(".oneprice");
        // const getOnetime2 = document.querySelector(".oneprice2");
        // const getOnetime3 = document.querySelector(".bozo");


        // getOnetime.innerHTML = `₦${getHigh.wash_and_fold_one_time}/bag`;
        // getOnetime2.innerHTML = `₦${getHigh.wash_and_fold_one_time}/month`;
        // getOnetime3.innerHTML = `₦${getHigh.wash_and_fold_one_time}`;



    let data = [];
    let data2 = [];
    let data3 = [];
    let data4 = [];
    let data5 = [];
        


        if (getHigh.dry_cleaning.top) {
            getHigh.dry_cleaning.top.map((item) => {
                data += `
                <div class="dry-item">
                    <p>${item.name}</p>
                    <p>₦${item.pricing}</p>
                </div>
                `
                sam.innerHTML = data;
            })
        }
        if (getHigh.dry_cleaning.bottom) {
            getHigh.dry_cleaning.bottom.map((item) => {
                data2 += `
                <div class="dry-item">
                    <p>${item.name}</p>
                    <p>₦${item.pricing}</p>
                </div>
                `
                sam2.innerHTML = data2;
            })
            
        }

        if (getHigh.dry_cleaning.full_body) {
            getHigh.dry_cleaning.full_body.map((item) => {
                data3 += `
                <div class="dry-item">
                    <p>${item.name}</p>
                    <p>₦${item.pricing}</p>
                </div>
                `
                sam3.innerHTML = data3;
            })
            
        }

        if (getHigh.dry_cleaning.house_hold) {
            getHigh.dry_cleaning.house_hold.map((item) => {
                data4 += `
                <div class="dry-item">
                    <p>${item.name}</p>
                    <p>₦${item.pricing}</p>
                </div>
                `
                sam4.innerHTML = data4;
            })
            
        }

        if (getHigh.dry_cleaning.native_wear) {
            getHigh.dry_cleaning.native_wear.map((item) => {
                data5 += `
                <div class="dry-item">
                    <p>${item.name}</p>
                    <p>₦${item.pricing}</p>
                </div>
                `
                sam5.innerHTML = data5;
            })
            
        }
}
displayAllPrice()

function hustle() {
    const getit = localStorage.getItem("price");
    const getHigh = JSON.parse(getit);

    const mybogo = document.querySelector(".bogo");
    const mybogo2 = document.querySelector(".bogo2");
    const mymigo = document.querySelector(".migo");

    mymigo.innerHTML = `₦${getHigh.wash_and_fold_one_time}/mo`;
    mybogo.innerHTML = `₦${getHigh.wash_and_fold_one_time}/mo`;

    let rap = parseInt(getHigh.wash_and_fold_one_time) * 2;
    mybogo2.innerHTML = `₦${rap}/mo`


}

function topWears() {
    let data = []

    const getTop = localStorage.getItem("price");
    const topIt = JSON.parse(getTop);

    const show = document.querySelector(".show-details");

    topIt.dry_cleaning.top.map((item) => {
        data +=`
        <div class="p-3 hoski">
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-5">
              <input type="checkbox" class="ischeck" value="${item.name}">
              <label class="" for="exampleCheck1">${item.name}</label>
              <input type="hidden" class="serviceName" value="Dry Cleaning">
              <input type="hidden" class="serviceType" value="dry_cleaning">
              <input type="hidden" class="clothName" value="top">

            </div>
            <div class="col-sm-12 col-md-12 col-lg-4">
              <div>
                <p id="${item.id}" class="isprice">₦${item.pricing}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-3">
              <div>
                <button type="button" class="turn" onclick="increase(${item.id}, ${item.pricing_id}, ${item.pricing})">+</button>
                <span id="${item.pricing_id}" class="pricing_id">1</span>
                <button type="button" class="turn" onclick="decrease(${item.id}, ${item.pricing_id}, ${item.pricing})">-</button>
              </div>
            </div>
        </div>
      </div>
        `
        show.style.display = "block";

        show.innerHTML = data;
        
    })


}

function bottomWears() {
    let data = []

    const getTop = localStorage.getItem("price");
    const topIt = JSON.parse(getTop);

    const show = document.querySelector(".show-details2");

    topIt.dry_cleaning.bottom.map((item) => {
        data +=`
        <div class="p-3 hoski">
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-5">
              <input type="checkbox" class="ischeck" value="${item.name}">
              <label class="" for="exampleCheck1">${item.name}</label>
              <input type="hidden" class="serviceName" value="Dry Cleaning">
              <input type="hidden" class="serviceType" value="dry_cleaning">
              <input type="hidden" class="clothName" value="bottom">

            </div>
            <div class="col-sm-12 col-md-12 col-lg-4">
              <div>
                <p id="${item.id}" class="isprice">₦${item.pricing}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-3">
              <div>
                <button type="button" class="turn" onclick="increase(${item.id}, ${item.pricing_id}, ${item.pricing})">+</button>
                <span id="${item.pricing_id}" class="pricing_id">1</span>
                <button type="button" class="turn" onclick="decrease(${item.id}, ${item.pricing_id}, ${item.pricing})">-</button>
              </div>
            </div>
        </div>
      </div>
        `
        show.innerHTML = data;
        show.style.display = "block";
    })
}

function fullBodyWears() {
    let data = []

    const getTop = localStorage.getItem("price");
    const topIt = JSON.parse(getTop);

    const show = document.querySelector(".show-details3");

    topIt.dry_cleaning.full_body.map((item) => {
        data +=`
        <div class="p-3 hoski">
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-5">
              <input type="checkbox" class="ischeck" value="${item.name}">
              <label class="" for="exampleCheck1">${item.name}</label>
              <input type="hidden" class="serviceName" value="Dry Cleaning">
              <input type="hidden" class="serviceType" value="dry_cleaning">
              <input type="hidden" class="clothName" value="full_body">

            </div>
            <div class="col-sm-12 col-md-12 col-lg-4">
              <div>
                <p id="${item.id}" class="isprice">₦${item.pricing}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-3">
              <div>
                <button type="button" class="turn" onclick="increase(${item.id}, ${item.pricing_id}, ${item.pricing})">+</button>
                <span id="${item.pricing_id}" class="pricing_id">1</span>
                <button type="button" class="turn" onclick="decrease(${item.id}, ${item.pricing_id}, ${item.pricing})">-</button>
              </div>
            </div>
        </div>
      </div>
        `
        show.innerHTML = data;
        show.style.display = "block";
    })
}

function houseHold() {
    let data = []

    const getTop = localStorage.getItem("price");
    const topIt = JSON.parse(getTop);

    const show = document.querySelector(".show-details4");

    topIt.dry_cleaning.house_hold.map((item) => {
        data +=`
        <div class="p-3 hoski">
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-5">
              <input type="checkbox" class="ischeck" value="${item.name}">
              <label class="" for="exampleCheck1">${item.name}</label>
              <input type="hidden" class="serviceName" value="Dry Cleaning">
              <input type="hidden" class="serviceType" value="dry_cleaning">
              <input type="hidden" class="clothName" value="house_hold">

            </div>
            <div class="col-sm-12 col-md-12 col-lg-4">
              <div>
                <p id="${item.id}" class="isprice">₦${item.pricing}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-3">
              <div>
                <button type="button" class="turn" onclick="increase(${item.id}, ${item.pricing_id}, ${item.pricing})">+</button>
                <span id="${item.pricing_id}" class="pricing_id">1</span>
                <button type="button" class="turn" onclick="decrease(${item.id}, ${item.pricing_id}, ${item.pricing})">-</button>
              </div>
            </div>
        </div>
      </div>
        `
        show.innerHTML = data;
        show.style.display = "block";
    })
}

function nativeWears() {

    let data = []

    const getTop = localStorage.getItem("price");
    const topIt = JSON.parse(getTop);

    const show = document.querySelector(".show-details5");

    topIt.dry_cleaning.native_wear.map((item) => {
        data +=`
        <div class="p-3 hoski">
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-5">
              <input type="checkbox" class="ischeck" value="${item.name}">
              <label class="" for="exampleCheck1">${item.name}</label>
              <input type="hidden" class="serviceName" value="Dry Cleaning">
              <input type="hidden" class="serviceType" value="dry_cleaning">
              <input type="hidden" class="clothName" value="native_wear">

            </div>
            <div class="col-sm-12 col-md-12 col-lg-4">
              <div>
                <p id="${item.id}" class="isprice">₦${item.pricing}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-3">
              <div>
                <button type="button" class="turn" onclick="increase(${item.id}, ${item.pricing_id}, ${item.pricing})">+</button>
                <span id="${item.pricing_id}" class="pricing_id">1</span>
                <button type="button" class="turn" onclick="decrease(${item.id}, ${item.pricing_id}, ${item.pricing})">-</button>
              </div>
            </div>
        </div>
      </div>
        `
        show.innerHTML = data;
        show.style.display = "block";
    })


}

// for ironing
function topWears1() {
    let data = []

    const getTop = localStorage.getItem("price");
    const topIt = JSON.parse(getTop);

    const show = document.querySelector(".show-details6");

    topIt.ironing.top.map((item) => {
        data +=`
        <div class="p-3 hoski">
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-5">
              <input type="checkbox" class="form-check-input ischeck" value="${item.name}">
              <label class="" for="exampleCheck1">${item.name}</label>
              <input type="hidden" class="serviceName" value="Ironing">
              <input type="hidden" class="serviceType" value="ironing">
              <input type="hidden" class="clothName" value="top">
            </div>
            <div class="col-sm-12 col-md-12 col-lg-4">
              <div>
                <p id="${item.id}" class="isprice">₦${item.pricing}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-3">
              <div>
                <button type="button" class="turn" onclick="increase(${item.id}, ${item.pricing_id}, ${item.pricing})">+</button>
                <span id="${item.pricing_id}" class="pricing_id">1</span>
                <button type="button" class="turn" onclick="decrease(${item.id}, ${item.pricing_id}, ${item.pricing})">-</button>
              </div>
            </div>
        </div>
      </div>
        `
        show.innerHTML = data;
        show.style.display = "block";
    })
}

function bottomWears1() {
    let data = []

    const getTop = localStorage.getItem("price");
    const topIt = JSON.parse(getTop);

    const show = document.querySelector(".show-details7");

    topIt.ironing.bottom.map((item) => {
        data +=`
        <div class="p-3 hoski">
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-5">
              <input type="checkbox" class="form-check-input ischeck" value="${item.name}">
              <label class="" for="exampleCheck1">${item.name}</label>
              <input type="hidden" class="serviceName" value="Ironing">
              <input type="hidden" class="serviceType" value="ironing">
              <input type="hidden" class="clothName" value="bottom">
            </div>
            <div class="col-sm-12 col-md-12 col-lg-4">
              <div>
                <p id="${item.id}" class="isprice">₦${item.pricing}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-3">
              <div>
                <button type="button" class="turn" onclick="increase(${item.id}, ${item.pricing_id}, ${item.pricing})">+</button>
                <span id="${item.pricing_id}" class="pricing_id">1</span>
                <button type="button" class="turn" onclick="decrease(${item.id}, ${item.pricing_id}, ${item.pricing})">-</button>
              </div>
            </div>
        </div>
      </div>
        `
        show.innerHTML = data;
        show.style.display = "block";
    })
}

function fullBodyWears1() {
    let data = []

    const getTop = localStorage.getItem("price");
    const topIt = JSON.parse(getTop);

    const show = document.querySelector(".show-details8");

    topIt.ironing.full_body.map((item) => {
        data +=`
        <div class="p-3 hoski">
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-5">
              <input type="checkbox" class="form-check-input ischeck" value="${item.name}">
              <label class="" for="exampleCheck1">${item.name}</label>
              <input type="hidden" class="serviceName" value="Ironing">
              <input type="hidden" class="serviceType" value="ironing">
              <input type="hidden" class="clothName" value="full_body">
            </div>
            <div class="col-sm-12 col-md-12 col-lg-4">
              <div>
                <p id="${item.id}" class="isprice">₦${item.pricing}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-3">
              <div>
                <button type="button" class="turn" onclick="increase(${item.id}, ${item.pricing_id}, ${item.pricing})">+</button>
                <span id="${item.pricing_id}" class="pricing_id">1</span>
                <button type="button" class="turn" onclick="decrease(${item.id}, ${item.pricing_id}, ${item.pricing})">-</button>
              </div>
            </div>
        </div>
      </div>
        `
        show.innerHTML = data;
        show.style.display = "block";
    })
}

function nativeWears1() {
    let data = []

    const getTop = localStorage.getItem("price");
    const topIt = JSON.parse(getTop);

    console.log(topIt)

    const show = document.querySelector(".show-details9");

    topIt.ironing.native_wear.map((item) => {
        data +=`
        <div class="p-3 hoski">
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-5">
              <input type="checkbox" class="form-check-input ischeck" value="${item.name}">
              <label class="" for="exampleCheck1">${item.name}</label>
              <input type="hidden" class="serviceName" value="Ironing">
              <input type="hidden" class="serviceType" value="ironing">
              <input type="hidden" class="clothName" value="native_wear">
            </div>
            <div class="col-sm-12 col-md-12 col-lg-4">
              <div>
                <p id="${item.id}" class="isprice">₦${item.pricing}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-3">
              <div>
                <button type="button" class="turn" onclick="increase(${item.id}, ${item.pricing_id}, ${item.pricing})">+</button>
                <span id="${item.pricing_id}" class="pricing_id">1</span>
                <button type="button" class="turn" onclick="decrease(${item.id}, ${item.pricing_id}, ${item.pricing})">-</button>
              </div>
            </div>
        </div>
      </div>
        `
        show.innerHTML = data;
        show.style.display = "block";
    })
}

function increase(id, priceId, pricing) {
    let price = id.getAttribute("id");
    let quantity = priceId.innerHTML;
    let newPrice = document.getElementById(price);
    let newQ = priceId.getAttribute("id");
    let momo = document.getElementById(newQ);
  
    let valueCount = parseInt(momo.innerHTML);
    let add = valueCount + 1;
    momo.innerHTML = add;
    newPrice.innerHTML = `₦${add * pricing}`;
    console.log(price, quantity, priceId);
}
  
function decrease(id, priceId, pricing) {
    let price = id.getAttribute("id");
    let quantity = priceId.innerHTML;
    let newPrice = document.getElementById(price);
    let newQ = priceId.getAttribute("id");
    let momo = document.getElementById(newQ);

    let valueCount = parseInt(momo.innerHTML);
    if (valueCount >=2) {
        let sub = valueCount - 1;
        momo.innerHTML = sub;
        newPrice.innerHTML = `₦${sub * pricing}`;
        console.log(price, quantity, priceId);
    }
}

  
function calValues(event) {
    event.preventDefault();
    let data = [];
    let data2 = [];

    const getAll = document.querySelectorAll(".ischeck");
    const getPrice = document.querySelectorAll(".isprice");
    const getQuantity = document.querySelectorAll(".pricing_id");
    const getServices = document.querySelectorAll(".serviceName");
    const getServty = document.querySelectorAll(".serviceType");
    const getClothes = document.querySelectorAll(".clothName");
    const getWash = document.querySelectorAll(".fold");

    for (j = 0; j < getWash.length; j++) {
        if (getWash[j].checked) {
            data2.push(getWash[j].value)
            localStorage.setItem("wash", JSON.stringify(data2));
            console.log(getWash[j].value)
        }
    }

    for (i = 0; i < getAll.length; i++) {
        if (getAll[i].checked) {
            const item = {};
            item.service_type = getServty[i].value;
            item.service_name = getServices[i].value;
            item.cloth_category = getClothes[i].value;
            item.cloth_name = getAll[i].value;
            item.quantity = getQuantity[i].innerHTML;
            item.pricing = getPrice[i].innerHTML.replace("₦", "");
            data.push(item)
            localStorage.setItem("allitem", JSON.stringify(data))

        }
    }
    if(localStorage.getItem("wash")){
        const total = data.reduce((acc, item) => {
            const price = Number(item.pricing.replace(/[^\d.-]/g, ''));
            return acc + price;
        }, 0);
        console.log(data)
        console.log("Total Price: ", total)
        localStorage.setItem("bis", total)
        location.href = "../pages/plan2.html"
    }
    else{
        location.href = "onetime.html";
    }
    
}

// let dvogue;
// let dsum;
// let dtotal;
// let ivogue;
// let isum;
// let itotal;


function chooseItem() {
    const myStuff = localStorage.getItem("allitem");
    const stuff = JSON.parse(myStuff);

    let vogue;
    let vogue2;
    let total = 0;
    let total2 = 0;


    let sum = 0;
    let sum2 = 0;
    for (let index = 0; index < stuff.length; index++) {
        if (stuff[index].service_type === "dry_cleaning") {
         sum += JSON.parse(stuff[index].quantity);
          let mok = stuff[index].pricing
          total += JSON.parse(mok);
          vogue = stuff[index].service_name;
          dvogue = vogue;
          dtotal = total;
          dsum = sum
          console.log(vogue, sum, total)
        }

        
        if (stuff[index].service_type === "ironing") {
            sum2 += JSON.parse(stuff[index].quantity);
            let mok2 = stuff[index].pricing;
            total2 += JSON.parse(mok2);
            vogue2 = stuff[index].service_name;
            ivogue = vogue2;
            itotal = total2;
            isum = sum2
            console.log(vogue2, sum2, total2)
        }
    }


}

console.log(dvogue)

function picked() {
    let ex = document.querySelector(".ex");

    if (dvogue === "Dry Cleaning") {
        ex.innerHTML +=`
           <h6 class="mt-4">${dvogue}</h6>

            <div class="item-by mt-4">
              <h6><b>${dsum} pieces (₦${dtotal})</b></h6>
            </div>
        `
    }
    if (ivogue === "Ironing") {
        ex.innerHTML +=`
        <h6 class="mt-4">${ivogue}</h6>

        <div class="item-by mt-4">
        <h6><b>${isum} pieces (₦${itotal})</b></h6>
        </div>
        `
    }
}





// function for one time wash



function picked2() {

    if (dvogue === "Dry Cleaning" && ivogue === "Ironing") {
        return `
           <h6 class="mt-4">${dvogue}</h6>

            <div class="item-by mt-4">
              <h6><b>${dsum} pieces (₦${dtotal})</b></h6>
            </div>

            <h6 class="mt-4">${ivogue}</h6>

            <div class="item-by mt-4">
            <h6><b>${isum} pieces (₦${itotal})</b></h6>
            </div>
        `
    }
    else if (dvogue === "Dry Cleaning") {
        return `
            <h6 class="mt-4">${dvogue}</h6>

            <div class="item-by mt-4">
              <h6><b>${dsum} pieces (₦${dtotal})</b></h6>
            </div>
        `
    }

    else if (ivogue === "Ironing") {
        return `
            <h6 class="mt-4">${ivogue}</h6>

            <div class="item-by mt-4">
            <h6><b>${isum} pieces (₦${itotal})</b></h6>
            </div>
        `
    }
}
picked2()

// function serviceIn() {
//     const getItem = localStorage.getItem("allitem");
//     const theItem = JSON.parse(getItem);

//     const getPupu = document.querySelector(".pupu");
//     const getPrice = localStorage.getItem("bis")

//     const washObji = localStorage.getItem("wash");
//     const washObj = JSON.parse(washObji)

//     let data = [];

//     washObj.map((item) => {
//         data += `
//         <div class="plan">
//             <div class="plan-img2">
//                 <img src="../assets/able.png" alt="">
//             </div>
//             <div class="form-check mt-3">
//                 <h4 class="wash">${item}</h4>
//             </div>
//         </div>
//         <div class="bag-mon">
//          ${theItem.map((item) => {
//             if (item.service_type === 'dry_cleaning') {
//                 return `
//                     <div class="search-card">
//                       <div>
//                         <p><b>${item.service_name}</b></p>
//                       </div>
//                     </div>
//                     <div class="search-card">
//                         <div>
//                             <p>${item.cloth_category} x ${item.quantity}</p>
//                         </div>
//                         <div>
//                             <p>₦${item.pricing}</p>
//                         </div>
//                     </div>
//                 `
//             }
//             else if (item.service_type === 'ironing') {
//                 return `
//                 <div class="search-card">
//                     <div>
//                     <p><b>${item.service_name}</b></p>
//                     </div>
//                 </div>
//                 <div class="search-card">
//                     <div>
//                         <p>${item.cloth_category} x ${item.quantity}</p>
//                     </div>
//                     <div>
//                         <p>₦${item.pricing}</p>
//                     </div>
//                 </div>
//                 `
//             }
//             else {
//                 return `
//                 <div class="search-card">
//                     <div>
//                      <p><b>${item.service_name}</b></p>
//                     </div>
//                 </div>
//                 <div class="search-card">
//                     <div>
//                         <p>${item.cloth_category} x ${item.quantity}</p>
//                     </div>
//                     <div>
//                         <p>₦${item.pricing}</p>
//                     </div>
//                 </div>
//                 `
//             }
//         })}
//         </div>

//         <div class="bag-mon2">
//             <div class="">
//             <p class="h-item">Total due today</p>
//             </div>
//             <div class="form-check">
//             <p class="okTotal">₦${getPrice}</p>
//             </div>
//         </div>
//         <hr>
//         `
//         getPupu.innerHTML = data;

//     })

    

// }

function calOneTime(event) {
    event.preventDefault();

    const mycheck = document.querySelector(".mycheck");

    if (mycheck.checked) {
        localStorage.setItem("oneplan", mycheck.value);
        location.href = "plan3.html"
    }
    else {
        Swal.fire({
            icon: 'info',
            text: 'Please choose a service',
            confirmButtonColor: '#00AEEF'
        })
    }


}


// function oneDetails() {
//     const det = localStorage.getItem("oneplan");
//     const gre = document.querySelector(".dre");
//     gre.innerHTML = det;

//     const myBag = document.querySelector(".bag-mon");
//     const ototal = document.querySelector(".okTotal");


//     const getItem = localStorage.getItem("allitem");
//     const theItem = JSON.parse(getItem);



//     theItem.map((item) => {
//         if (item.service_type === "dry_cleaning") {
//             return myBag.innerHTML += `
//             <div>
//                 <div class="search-card">
//                   <div>
//                     <p><b>${item.service_name}</b></p>
//                   </div>
//                 </div>
//                 <div class="search-card">
//                 <div>
//                     <p>${item.cloth_category} x ${item.quantity}</p>
//                 </div>
//                 <div>
//                     <p>₦${item.pricing}</p>
//                 </div>
//                 </div>
//             </div>
//             `
//         }
//         else if (item.service_type === "ironing") {
//             return myBag.innerHTML += `
//             <div>
//                 <div class="search-card">
//                   <div>
//                     <p><b>${item.service_name}</b></p>
//                   </div>
//                 </div>
//                 <div class="search-card">
//                 <div>
//                     <p>${item.cloth_category} x ${item.quantity}</p>
//                 </div>
//                 <div>
//                     <p>₦${item.pricing}</p>
//                 </div>
//                 </div>
//             </div>
//             `
//         }
//     })

//     const sum = theItem.reduce((accumulator, object) => {
//         let result = JSON.parse(object.pricing)
//         return accumulator + result;
//     }, 0);

//     ototal.innerHTML = `₦${sum}`;

// }

function oneDetails() {
    const myBag = document.querySelector(".plan-show");
    const ototal = document.querySelector(".okTotal");


    const getItem = localStorage.getItem("allitem");
    const theItem = JSON.parse(getItem);

    let blaze = [];

    theItem.map((item) => {
        blaze.push(item.service_name)
    })

    let newArry = [], keys={};
    for(let i in blaze){
        if(!keys[blaze[i]]){
        newArry.push(blaze[i]);
        keys[blaze[i]]=true;
        }
    }
    console.log(newArry);

    let mydata = [];

    newArry.map((item) => {
        if (item === "Dry Cleaning") {
            mydata += `
            <div class="plan">
                <div class="plan-img2">
                    <img src="../assets/able.png" alt="">
                </div>
                <div class="form-check mt-3">
                    <h4 class="wash">${item}</h4>
                </div>
            </div>
            <div class="bag-mon">
             ${theItem.map((item) => {
                if (item.service_type === 'dry_cleaning') {
                    return `
                    <div class="search-card">
                        <div>
                            <p>${item.cloth_name} x ${item.quantity}</p>
                        </div>
                        <div>
                            <p>₦${item.pricing}</p>
                        </div>
                    </div>
                `
                }
             }).join('')}
            </div>
            `
            myBag.innerHTML = mydata;

        }
        else if (item === 'Ironing') {
            mydata += `
            <div class="plan">
                <div class="plan-img2">
                    <img src="../assets/able.png" alt="">
                </div>
                <div class="form-check mt-3">
                    <h4 class="wash">${item}</h4>
                </div>
            </div>
            <div class="bag-mon">
             ${theItem.map((item) => {
                if (item.service_type === 'ironing') {
                    return `
                    <div class="search-card">
                        <div>
                            <p>${item.cloth_name} x ${item.quantity}</p>
                        </div>
                        <div>
                            <p>₦${item.pricing}</p>
                        </div>
                    </div>
                `
                }
             }).join('')}
            </div>
            `
            myBag.innerHTML = mydata;

        }

    })


    const sum = theItem.reduce((accumulator, object) => {
        let result = JSON.parse(object.pricing)
        return accumulator + result;
    }, 0);

    ototal.innerHTML = `₦${sum}`;

}

// function to send first request
function validateOrder(event) {
    event.preventDefault();

    const getOrderTime = document.querySelector(".time").value;
    if (!getOrderTime || getOrderTime === "") {
        Swal.fire({
            icon: 'info',
            text: 'Please select your pickup date',
            confirmButtonColor: '#00AEEF'
        })
    }
    else {
        let newDate = new Date(getOrderTime);

        let sMonth = newDate.getMonth() + 1;
        let sDay = newDate.getDate();
        let sYear = newDate.getFullYear();
        let sHour = newDate.getHours();
        let sMinute = newDate.getMinutes();
        let sAMPM = "AM";

        let iHourCheck = parseInt(sHour);

        if (iHourCheck > 12) {
            sAMPM = "PM";
            sHour = iHourCheck - 12;
        }
        else if (iHourCheck === 0) {
            sHour = "12";
        }

        sHour = sHour;

        const mope = sMonth + "-" + sDay + "-" + sYear + " " + sHour + ":" + sMinute + " " + sAMPM;

        localStorage.setItem("td", mope);

        const getToken = localStorage.getItem("token");
        const myToken = JSON.parse(getToken);
        console.log(myToken)

        const logUser = new Headers();
        logUser.append('Content-Type', 'application/json');
        logUser.append("Authorization", `Bearer ${myToken}`);

        const myItem = localStorage.getItem("allitem");
        const itemNew = JSON.parse(myItem);


        if (itemNew.length === 0) {
            Swal.fire({
                icon: 'info',
                text: 'You didn\'t choose any service',
                confirmButtonColor: '#00AEEF'
            })
            setTimeout(() => {
            location.href = "../pages/plan.html"
            }, 3000)
        }
        else {

            const userOrder = JSON.stringify({
                "pickup_time": mope,
                "items":itemNew
            });

            console.log(userOrder)

            const request = {
                method: 'POST',
                headers: logUser,
                body: userOrder
            }

            const url = `${baseUrl}/api/booking/calculate-booking`;

            fetch(url, request)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                localStorage.setItem("order", JSON.stringify(result));
                const myItem = localStorage.getItem("order");
                const muItem = JSON.parse(myItem);
                const mob = muItem.totalAmount;
                location.href = `../pages/payment.html?price=${mob}&pick=${mope}`
            })
            .catch(error => console.log('error', error));
        }
    }
}




let bered;
let bewhite



function showOthers(event) {
    const myodana = document.querySelector(".flowki")
    const getWash = localStorage.getItem("wash");
    const myWash = JSON.parse(getWash);
    const getoz = document.querySelector(".oz");


    const getPrice = localStorage.getItem("price");
    const priceItem = JSON.parse(getPrice);

    const waf = priceItem.wash_and_fold_smart_wash;
    const wif = priceItem.wash_iron_and_fold_smart_wash;

    getoz.style.display = "block";

    
    if (event.target.checked) {
        myodana.innerHTML = ""
        if ((myWash.includes("wash & fold")) && (myWash.includes("wash iron & fold"))) {
        return myodana.innerHTML += `
        <div class="plan-item mb-3">
            <h5 class="wash">${myWash[0]}</h5>
        </div>
        <input type="hidden" class="serviceName warcrafname" value="wash and fold smart wash">
        <input type="hidden" class="serviceType warcraftype" value="wash_and_fold_smart_wash">

        <div class="plan-item plan1 mb-3">
        <h6 class="h-item mt-4">Billing</h6>
        <div class="item-by">
            <div class="mo-btn" onClick="month(event)">Monthly</div>
            <div class="an-btn" onClick="yearly(event)">Annually</div>
            <div class="stre">
            <img src="../assets/fre.png" alt="" class="vog">
            </div>
        </div>
        </div>
        <div class="plan-item plan2 mb-3">
        <h6 class="h-item mt-3">Bags / month</h6>

        <div class="item-by">
        <div class="moto" onClick="insert(1)">1</div>
        <div class="moto" onClick="insert(2)">2</div>
        <div class="moto" onClick="insert(3)">3</div>
        <div class="moto" onClick="insert(4)">4</div>
        <div class="moto" onClick="insert(5)">5</div>
            
        </div>
        </div>
        <div class="plan-item plan3 mb-3">
        <h6 class="h-item mt-4">Billing</h6>

        <div class="item-by">
            <h4 class="blu">₦${waf} / bag</h4>
            <p class="bul">₦${waf}/month</p>
        </div>
        </div>
        <div class="plan-item plan3 mb-3 ex">
            ${picked2()}
        </div>
        
    
        <hr>
        <div class="plan-item mb-3">
            <h5 class="wash">${myWash[1]}</h5>
        </div>
        <input type="hidden" class="serviceName warcrafname2" value="wash iron and fold smart wash">
        <input type="hidden" class="serviceType warcraftype2" value="wash_iron_and_fold_smart_wash">

        <div class="plan-item plan1 mb-3">
        <h6 class="h-item mt-4">Billing</h6>
        <div class="item-by">
            <div class="mo-btn2" onClick="month2(event)">Monthly</div>
            <div class="an-btn2" onClick="yearly2(event)">Annually</div>
            <div class="stre">
            <img src="../assets/fre.png" alt="" class="vog">
            </div>
        </div>
        </div>
        <div class="plan-item plan2 mb-3">
        <h6 class="h-item mt-3">Bags / month</h6>

        <div class="item-by">
            <div class="moto2" onClick="inserts(1)">1</div>
            <div class="moto2" onClick="inserts(2)">2</div>
            <div class="moto2" onClick="inserts(3)">3</div>
            <div class="moto2" onClick="inserts(4)">4</div>
            <div class="moto2" onClick="inserts(5)">5</div>
        </div>
        </div>
        <div class="plan-item plan3 mb-3">
        <h6 class="h-item mt-4">Billing</h6>

        <div class="item-by">
            <h4 class="iblu">₦${wif} / bag</h4>
            <p class="ibul">₦${wif}/month</p>
        </div>
        </div>
        <div class="plan-item plan3 mb-3 ex">
            ${picked2()}
        </div>
        
        `
        }

        else if (myWash.includes("wash & fold")) {
        console.log(myWash, waf)
        return myodana.innerHTML += `
        <div class="plan-item mb-3">
            <h5 class="wash">${myWash}</h5>
        </div>
        <input type="hidden" class="serviceName warcrafname" value="wash and fold smart wash">
        <input type="hidden" class="serviceType warcraftype" value="wash_and_fold_smart_wash">
        
        <div class="plan-item plan1 mb-3">
        <h6 class="h-item mt-4">Billing</h6>
        <div class="item-by">
            <div class="mo-btn" onClick="month(event)">Monthly</div>
            <div class="an-btn" onClick="yearly(event)">Annually</div>
            <div class="stre">
            <img src="../assets/fre.png" alt="" class="vog">
            </div>
        </div>
        </div>
        <div class="plan-item plan2 mb-3">
        <h6 class="h-item mt-3">Bags / month</h6>

        <div class="item-by">
        <div class="moto" onClick="insert(1)">1</div>
        <div class="moto" onClick="insert(2)">2</div>
        <div class="moto" onClick="insert(3)">3</div>
        <div class="moto" onClick="insert(4)">4</div>
        <div class="moto" onClick="insert(5)">5</div>
        </div>
        </div>
        <div class="plan-item plan3 mb-3">
        <h6 class="h-item mt-4">Billing</h6>

        <div class="item-by">
            <h5 class="blu">₦${waf} / bag</h5>
            <p class="bul">₦${waf}/month</p>
        </div>
        </div>
        <div class="plan-item plan3 mb-3 ex">
            ${picked2()}
        </div>
        
        `
        }
        else if(myWash.includes("wash iron & fold")) {
        console.log(myWash, wif)
        return myodana.innerHTML += `
        <div class="plan-item mb-3">
            <h5 class="wash">${myWash}</h5>
        </div>
        <input type="hidden" class="serviceName warcrafname2" value="wash iron and fold smart wash">
        <input type="hidden" class="serviceType warcraftype2" value="wash_iron_and_fold_smart_wash">
        
        <div class="plan-item plan1 mb-3">
        <h6 class="h-item mt-4">Billing</h6>
        <div class="item-by">
            <div class="mo-btn" onClick="month2(event)">Monthly</div>
            <div class="an-btn" onClick="yearly2(event)">Annually</div>
            <div class="stre">
            <img src="../assets/fre.png" alt="" class="vog">
            </div>
        </div>
        </div>
        <div class="plan-item plan2 mb-3">
        <h6 class="h-item mt-3">Bags / month</h6>

        <div class="item-by">
        <div class="moto2" onClick="inserts(1)">1</div>
        <div class="moto2" onClick="inserts(2)">2</div>
        <div class="moto2" onClick="inserts(3)">3</div>
        <div class="moto2" onClick="inserts(4)">4</div>
        <div class="moto2" onClick="inserts(5)">5</div>
        </div>
        </div>
        <div class="plan-item plan3 mb-3">
        <h6 class="h-item mt-4">Billing</h6>

        <div class="item-by">
            <h5 class="iblu">₦${wif} / bag</h5>
            <p class="ibul">₦${wif}/month</p>
        </div>
        </div>
        <div class="plan-item plan3 mb-3 ex">
            ${picked2()}
        </div>
        
        `
    }
    }
    
    
}






function removeDrop(event) {
    const myodana = document.querySelector(".flowki")
    const getWash = localStorage.getItem("wash");
    const myWash = JSON.parse(getWash);
    const getoz = document.querySelector(".oz");



    const getPrice = localStorage.getItem("price");
    const priceItem = JSON.parse(getPrice);

    onewaf = priceItem.wash_and_fold_one_time;
    onewif = priceItem.wash_iron_and_fold_one_time;
    getoz.style.display = "block";

    
    if (event.target.checked) {
        myodana.innerHTML = ""

        if ((myWash.includes("wash & fold")) && (myWash.includes("wash iron & fold"))) {
            return myodana.innerHTML += `
            <div class="plan-item mb-3">
              <h5 class="wash">${myWash[0]}</h5>
            </div>
            <input type="hidden" class="serviceName" value="wash and fold one time">
            <input type="hidden" class="serviceType" value="wash_and_fold_one_time">
            <div class="plan-item plan2 mb-3">
            <h6 class="h-item mt-3">Bags / month</h6>

            <div class="item-by">
            <div class="moto" onClick="insert(1)">1</div>
            <div class="moto" onClick="insert(2)">2</div>
            <div class="moto" onClick="insert(3)">3</div>
            <div class="moto" onClick="insert(4)">4</div>
            <div class="moto" onClick="insert(5)">5</div>
            </div>
            </div>
            <div class="plan-item plan3 mb-3">
                <h6 class="h-item mt-4">Billing</h6>

                <div class="item-by">
                    <h4>₦${onewaf} / bag</h4>
                    <p>₦${onewaf}/month</p>
                </div>
            </div>
            <div class="plan-item plan3 mb-3 ex">
              ${picked2()}
            </div>

            <hr>
            <div class="plan-item mb-3">
              <h5 class="wash">${myWash[1]}</h5>
            </div>
            <input type="hidden" class="serviceName" value="wash iron and fold one time">
            <input type="hidden" class="serviceType" value="wash_iron_and_fold_one_time">
            <div class="plan-item plan2 mb-3">
            <h6 class="h-item mt-3">Bags / month</h6>

            <div class="item-by">
            <div class="moto2" onClick="inserts(1)">1</div>
            <div class="moto2" onClick="inserts(2)">2</div>
            <div class="moto2" onClick="inserts(3)">3</div>
            <div class="moto2" onClick="inserts(4)">4</div>
            <div class="moto2" onClick="inserts(5)">5</div>
            </div>
            </div>
            <div class="plan-item plan3 mb-3">
                <h6 class="h-item mt-4">Billing</h6>

                <div class="item-by">
                    <h4>₦${onewif} / bag</h4>
                    <p>₦${onewif}/month</p>
                </div>
            </div>
            <div class="plan-item plan3 mb-3 ex">
              ${picked2()}
            </div>
            
            `
        }
        else if (myWash.includes("wash & fold")) {
            return myodana.innerHTML += `
            <div class="plan-item mb-3">
              <h5 class="wash">${myWash}</h5>
            </div>
            <input type="hidden" class="serviceName" value="wash and fold one time">
            <input type="hidden" class="serviceType" value="wash_and_fold_one_time">
            <div class="plan-item plan2 mb-3">
            <h6 class="h-item mt-3">Bags / month</h6>

            <div class="item-by">
            <div class="moto" onClick="insert(1)">1</div>
            <div class="moto" onClick="insert(2)">2</div>
            <div class="moto" onClick="insert(3)">3</div>
            <div class="moto" onClick="insert(4)">4</div>
            <div class="moto" onClick="insert(5)">5</div>
            </div>
            </div>
            <div class="plan-item plan3 mb-3">
                <h6 class="h-item mt-4">Billing</h6>

                <div class="item-by">
                    <h4>₦${onewaf} / bag</h4>
                    <p>₦${onewaf}/month</p>
                </div>
            </div>
            <div class="plan-item plan3 mb-3 ex">
              ${picked2()}
            </div>
            
            `
        }
        else if(myWash.includes("wash iron & fold")) {
            return myodana.innerHTML +=`
            <div class="plan-item mb-3">
             <h5 class="wash">${myWash}</h5>
            </div>
            <input type="hidden" class="serviceName" value="wash iron and fold one time">
                <input type="hidden" class="serviceType" value="wash_iron_and_fold_one_time">
            <div class="plan-item plan2 mb-3">
            <h6 class="h-item mt-3">Bags / month</h6>

            <div class="item-by">
            <div class="moto2" onClick="inserts(1)">1</div>
            <div class="moto2" onClick="inserts(2)">2</div>
            <div class="moto2" onClick="inserts(3)">3</div>
            <div class="moto2" onClick="inserts(4)">4</div>
            <div class="moto2" onClick="inserts(5)">5</div>
            </div>
            </div>
            <div class="plan-item plan3 mb-3">
                <h6 class="h-item mt-4">Billing</h6>

                <div class="item-by">
                    <h4>₦${onewif} / bag</h4>
                    <p>₦${onewif}/month</p>
                </div>
            </div>
            <div class="plan-item plan3 mb-3 ex">
              ${picked2()}
            </div>
            
            `
        }

    }
    
    
}



function yearly(event) {
    event.preventDefault();
    const blu = document.querySelector(".blu");
    const bul = document.querySelector(".bul");

    const getServiceType = document.querySelector(".warcraftype");
    const getServiceName = document.querySelector(".warcrafname");

    getServiceType.value = "wash_and_fold_smart_wash_yearly_plan_per_bag";
    getServiceName.value = "wash and fold smart wash yearly plan per bag";

    console.log(getServiceType.value, getServiceName.value)

    

    const getPrice = localStorage.getItem("price");
    const priceItem = JSON.parse(getPrice);

    const chati = priceItem.wash_and_fold_smart_wash_yearly_plan_per_bag;
    blu.innerHTML = `₦${chati}/ bag`
    bul.innerHTML = `₦${chati}/month`

}
function yearly2(event) {
    event.preventDefault();
    const blu = document.querySelector(".iblu");
    const bul = document.querySelector(".ibul");

    const getServiceType = document.querySelector(".warcraftype2");
    const getServiceName = document.querySelector(".warcrafname2");

    getServiceType.value = "wash_iron_and_fold_smart_wash_yearly_plan_per_bag";
    getServiceName.value = "wash iron and fold smart wash yearly plan per bag";

    console.log(getServiceType.value, getServiceName.value)

    

    const getPrice = localStorage.getItem("price");
    const priceItem = JSON.parse(getPrice);

    const chati = priceItem.wash_iron_and_fold_smart_wash_yearly_plan_per_bag;
    blu.innerHTML = `₦${chati}/ bag`
    bul.innerHTML = `₦${chati}/month`

    
}


function month(event) {
    event.preventDefault();
    const blu = document.querySelector(".blu");
    const bul = document.querySelector(".bul");

    const getServiceType = document.querySelector(".warcraftype");
    const getServiceName = document.querySelector(".warcrafname");

    getServiceType.value = "wash_and_fold_smart_wash";
    getServiceName.value = "wash and fold smart wash";

    console.log(getServiceType.value, getServiceName.value)


    const getPrice = localStorage.getItem("price");
    const priceItem = JSON.parse(getPrice);
    const chati = priceItem.wash_and_fold_smart_wash;
    blu.innerHTML = `₦${chati}/ bag`
    bul.innerHTML = `₦${chati}/month`
}

function month2(event) {
    event.preventDefault();
    const blu = document.querySelector(".iblu");
    const bul = document.querySelector(".ibul");

    const getServiceType = document.querySelector(".warcraftype2");
    const getServiceName = document.querySelector(".warcrafname2");

    getServiceType.value = "wash_iron_and_fold_smart_wash";
    getServiceName.value = "wash iron and fold smart wash";


    const getPrice = localStorage.getItem("price");
    const priceItem = JSON.parse(getPrice);
    const chati = priceItem.wash_iron_and_fold_smart_wash;
    blu.innerHTML = `₦${chati}/ bag`
    bul.innerHTML = `₦${chati}/month`
}


function insert(num){
    const obj = {
        num: num,
        type: "wash & fold"
    }
    console.log(obj)
    wfbag = obj.num;
    localStorage.setItem("bg1", wfbag)

    const buttons = document.querySelectorAll('.moto');

    buttons.forEach(button => {
      button.addEventListener('click', seatFunction, false);
    });

    function seatFunction() {
        buttons.forEach(btn => btn.classList.remove('obrafor'));
        this.classList.add('obrafor');
    }
}

function inserts(num){
    
    const obj = {
        num: num,
        type: "wash iron & fold"
    }
    console.log(obj)
    wifbag = obj.num;
    localStorage.setItem("bg2", wifbag)

    const buttons = document.querySelectorAll('.moto2');

    buttons.forEach(button => {
      button.addEventListener('click', seatFunction, false);
    });

    function seatFunction() {
        buttons.forEach(btn => btn.classList.remove('obrafor'));
        this.classList.add('obrafor');
    }


}




function smartWash(event) {
    event.preventDefault();

    let bag = [];
    const getItems = localStorage.getItem("allitem");
    const sivItems = JSON.parse(getItems);

    const getPrice = localStorage.getItem("price");
    const topIt = JSON.parse(getPrice);
    const mywplan = topIt.wash_and_fold_smart_wash_yearly_plan_per_bag;
    const mywiplan = topIt.wash_iron_and_fold_smart_wash_yearly_plan_per_bag;

    const onetime = topIt.wash_and_fold_one_time;
    const onetimei = topIt.wash_iron_and_fold_one_time;

    let bg1 = localStorage.getItem("bg1");
    let bg2 = localStorage.getItem("bg2");
    console.log(bag.length)

    bag.push(bg1)
    bag.push(bg2)
    


    const getWash = localStorage.getItem("wash");
        const myWash = JSON.parse(getWash);
        if (myWash.includes("wash & fold") && myWash.includes("wash iron & fold")) {
            thePrice.push(topIt.wash_and_fold_smart_wash, topIt.wash_iron_and_fold_smart_wash)
        }
        else if (myWash.includes("wash & fold")) {
            thePrice.push(topIt.wash_and_fold_smart_wash)
        }
        else if (myWash.includes("wash iron & fold")) {
            thePrice.push(topIt.wash_iron_and_fold_smart_wash)
        }

        const getServices = document.querySelectorAll(".serviceName");
        const getServty = document.querySelectorAll(".serviceType");

        

        let service = [];
        let typ = []; 

        let komo = []



        for (i = 0; i < getServices.length; i++) {
            
            let cs = getServices[i].value;
            service.push(cs);
        }
        for (j = 0; j < getServty.length; j++) {
            let bs = getServty[j].value;
            typ.push(bs)
        }

        const customerService = typ.map((service_type, index) => {
        if (service_type === "wash_and_fold_smart_wash_yearly_plan_per_bag") {
            return Object.assign({}, {
                service_type,
                service_name: service[index],
                quantity: bag[index],
                pricing: mywplan
            })
        }
        else if (service_type === "wash_iron_and_fold_smart_wash_yearly_plan_per_bag") {
            return Object.assign({}, {
                service_type,
                service_name: service[index],
                quantity: bag[index],
                pricing: mywiplan
            })
        }
        else if (service_type === "wash_and_fold_one_time") {
            return Object.assign({}, {
                service_type,
                service_name: service[index],
                quantity: bag[index],
                pricing: onetime
            })
        }
        else if (service_type === "wash_iron_and_fold_one_time") {
            return Object.assign({}, {
                service_type,
                service_name: service[index],
                quantity: bag[index],
                pricing: onetimei
            })
        }
        
        else {
            return Object.assign({}, {
                service_type,
                service_name: service[index],
                quantity: bag[index],
                pricing: thePrice[index]
            })
        }
        
    })

    for (let i = 0; i < customerService.length; i++) {
        sivItems.push(customerService[i])
        komo.push(customerService[i].pricing)
    }
    localStorage.setItem("komoprice", JSON.stringify(komo))


    localStorage.setItem("newService", JSON.stringify(sivItems));
    location.href = "../pages/wash.html"
    
    
    
}



function washBag() {
    const getPupu = document.querySelector(".pupu");
    const due = document.querySelector(".td");
    const getItem = localStorage.getItem("newService");
    const theItem = JSON.parse(getItem);
    const mototal = localStorage.getItem("bis");
    const tomo = JSON.parse(mototal);
    let sum = 0;

    let blaze = [];

    theItem.map((item) => {
        blaze.push(item.service_name)
    })

    let newArry = [], keys={};
    for(let i in blaze){
        if(!keys[blaze[i]]){
        newArry.push(blaze[i]);
        keys[blaze[i]]=true;
        }
    }
    console.log(newArry);

    let mydata = [];

    newArry.map((item) => {
        if (item === "Dry Cleaning") {
            mydata += `
            <div class="plan">
                <div class="plan-img2">
                    <img src="../assets/able.png" alt="">
                </div>
                <div class="form-check mt-3">
                    <h4 class="wash">${item}</h4>
                </div>
            </div>
            <div class="bag-mon">
             ${theItem.map((item) => {
                if (item.service_type === 'dry_cleaning') {
                    return `
                    <div class="search-card">
                        <div>
                            <p>${item.cloth_name} x ${item.quantity}</p>
                        </div>
                        <div>
                            <p>₦${item.pricing}</p>
                        </div>
                    </div>
                `
                }
             }).join('')}
            </div>
            `
            getPupu.innerHTML = mydata;

        }
        else if (item === 'Ironing') {
            mydata += `
            <div class="plan">
                <div class="plan-img2">
                    <img src="../assets/able.png" alt="">
                </div>
                <div class="form-check mt-3">
                    <h4 class="wash">${item}</h4>
                </div>
            </div>
            <div class="bag-mon">
             ${theItem.map((item) => {
                if (item.service_type === 'ironing') {
                    return `
                    <div class="search-card">
                        <div>
                            <p>${item.cloth_name} x ${item.quantity}</p>
                        </div>
                        <div>
                            <p>₦${item.pricing}</p>
                        </div>
                    </div>
                `
                }
             }).join('')}
            </div>
            `
            getPupu.innerHTML = mydata;

        }

        else if (item === 'wash and fold smart wash') {
            mydata += `
            <div class="plan">
                <div class="plan-img2">
                    <img src="../assets/able.png" alt="">
                </div>
                <div class="form-check mt-3">
                    <h4 class="wash">${item}</h4>
                </div>
            </div>
            <div class="bag-mon">
             ${theItem.map((item) => {
                if (item.service_type === 'wash_and_fold_smart_wash') {
                    return `
                    <div class="search-card">
                        <div>
                            <p><b>Number of bag:</b> ${item.quantity}</p>
                        </div>
                        <div>
                            <p><b>Price per bag:</b> ₦${item.pricing}</p>
                        </div>
                    </div>
                `
                }
             }).join('')}
            </div>
            `
            getPupu.innerHTML = mydata;
        }

        else if (item === 'wash iron and fold smart wash') {
            mydata += `
            <div class="plan">
                <div class="plan-img2">
                    <img src="../assets/able.png" alt="">
                </div>
                <div class="form-check mt-3">
                    <h4 class="wash">${item}</h4>
                </div>
            </div>
            <div class="bag-mon">
             ${theItem.map((item) => {
                if (item.service_type === 'wash_iron_and_fold_smart_wash') {
                    return `
                    <div class="search-card">
                        <div>
                            <p><b>Number of bag:</b> ${item.quantity}</p>
                        </div>
                        <div>
                            <p><b>Price per bag:</b> ₦${item.pricing}</p>
                        </div>
                    </div>
                `
                }
             }).join('')}
            </div>
            
            `
            getPupu.innerHTML = mydata;
        }

        else if (item === 'wash and fold one time') {
            mydata += `
            <div class="plan">
                <div class="plan-img2">
                    <img src="../assets/able.png" alt="">
                </div>
                <div class="form-check mt-3">
                    <h4 class="wash">${item}</h4>
                </div>
            </div>
            <div class="bag-mon">
             ${theItem.map((item) => {
                if (item.service_type === 'wash_and_fold_one_time') {
                    return `
                    <div class="search-card">
                        <div>
                            <p><b>Number of bag:</b> ${item.quantity}</p>
                        </div>
                        <div>
                            <p><b>Price per bag:</b> ₦${item.pricing}</p>
                        </div>
                    </div>
                `
                }
             }).join('')}
            </div>
            
            `
            getPupu.innerHTML = mydata;
        }

        else if (item === 'wash iron and fold one time') {
            mydata += `
            <div class="plan">
                <div class="plan-img2">
                    <img src="../assets/able.png" alt="">
                </div>
                <div class="form-check mt-3">
                    <h4 class="wash">${item}</h4>
                </div>
            </div>
            <div class="bag-mon">
             ${theItem.map((item) => {
                if (item.service_type === 'wash_iron_and_fold_one_time') {
                    return `
                    <div class="search-card">
                        <div>
                            <p><b>Number of bag:</b> ${item.quantity}</p>
                        </div>
                        <div>
                            <p><b>Price per bag:</b> ₦${item.pricing}</p>
                        </div>
                    </div>
                `
                }
             }).join('')}
            </div>
            
            `
            getPupu.innerHTML = mydata;
        }

        else if (item === 'wash and fold smart wash yearly plan per bag') {
            mydata += `
            <div class="plan">
                <div class="plan-img2">
                    <img src="../assets/able.png" alt="">
                </div>
                <div class="form-check mt-3">
                    <h4 class="wash">${item}</h4>
                </div>
            </div>
            <div class="bag-mon">
             ${theItem.map((item) => {
                if (item.service_type === 'wash_and_fold_smart_wash_yearly_plan_per_bag') {
                    return `
                    <div class="search-card">
                        <div>
                            <p><b>Number of bag:</b> ${item.quantity}</p>
                        </div>
                        <div>
                            <p><b>Price per bag:</b> ₦${item.pricing}</p>
                        </div>
                    </div>
                `
                }
             }).join('')}
            </div>
            
            `
            getPupu.innerHTML = mydata;
        }

        else if (item === 'wash iron and fold smart wash yearly plan per bag') {
            mydata += `
            <div class="plan">
                <div class="plan-img2">
                    <img src="../assets/able.png" alt="">
                </div>
                <div class="form-check mt-3">
                    <h4 class="wash">${item}</h4>
                </div>
            </div>
            <div class="bag-mon">
             ${theItem.map((item) => {
                if (item.service_type === 'wash_iron_and_fold_smart_wash_yearly_plan_per_bag') {
                    return `
                    <div class="search-card">
                        <div>
                            <p><b>Number of bag:</b> ${item.quantity}</p>
                        </div>
                        <div>
                            <p><b>Price per bag:</b> ₦${item.pricing}</p>
                        </div>
                    </div>
                `
                }
             }).join('')}
            </div>
            
            `
            getPupu.innerHTML = mydata;
        }

    })

    let tot = [];

    theItem.map((item) => {
        if (item.service_type === "wash_and_fold_smart_wash") {
            let mytot = item.quantity * item.pricing
            tot.push(mytot)
        }
        else if (item.service_type === "wash_iron_and_fold_smart_wash") {
            let mytot2 = item.quantity * item.pricing
            tot.push(mytot2)
        }
        else if (item.service_type === "wash_and_fold_one_time") {
            let mytot3 = item.quantity * item.pricing
            tot.push(mytot3)
        }
        else if (item.service_type === "wash_iron_and_fold_one_time") {
            let mytot4 = item.quantity * item.pricing
            tot.push(mytot4)
        }
        else if (item.service_type === "wash_and_fold_smart_wash_yearly_plan_per_bag") {
            let mytot5 = item.quantity * item.pricing
            tot.push(mytot5)
        }
        else if (item.service_type === "wash_iron_and_fold_smart_wash_yearly_plan_per_bag") {
            let mytot6 = item.quantity * item.pricing
            tot.push(mytot6)
        }
    })

    console.log(tot)

    for (let i = 0; i < tot.length; i++) {
        sum += tot[i];
    }

    let totalResult = sum + tomo;
    due.innerHTML = `₦${totalResult}`;
}









function validateOrder2(event) {
    event.preventDefault();


    const getOrderTime = document.querySelector(".time").value;
    if (!getOrderTime || getOrderTime === "") {
        Swal.fire({
            icon: 'info',
            text: 'Please select your pickup date',
            confirmButtonColor: '#00AEEF'
        })
    }
    else {
        let newDate = new Date(getOrderTime);

        let sMonth = newDate.getMonth() + 1;
        let sDay = newDate.getDate();
        let sYear = newDate.getFullYear();
        let sHour = newDate.getHours();
        let sMinute = newDate.getMinutes();
        let sAMPM = "AM";

        let iHourCheck = parseInt(sHour);

        if (iHourCheck > 12) {
            sAMPM = "PM";
            sHour = iHourCheck - 12;
        }
        else if (iHourCheck === 0) {
            sHour = "12";
        }

        sHour = sHour;

        const mope = sMonth + "-" + sDay + "-" + sYear + " " + sHour + ":" + sMinute + " " + sAMPM;

        localStorage.setItem("td", mope);

        const getToken = localStorage.getItem("token");
        const myToken = JSON.parse(getToken);

        const logUser = new Headers();
        logUser.append('Content-Type', 'application/json');
        logUser.append("Authorization", `Bearer ${myToken}`);

        const myItem = localStorage.getItem("newService");
        const itemNew = JSON.parse(myItem);

        if (itemNew.length === 0) {
            Swal.fire({
                icon: 'info',
                text: 'You didn\'t choose any service',
                confirmButtonColor: '#00AEEF'
            })
            setTimeout(() => {
            location.href = `../pages/plan.html`
            }, 3000)
        }
        else {

            const userOrder = JSON.stringify({
                "pickup_time": mope,
                "items":itemNew
            });

            console.log(userOrder)

            const request = {
                method: 'POST',
                headers: logUser,
                body: userOrder
            }

            const url = `${baseUrl}/api/booking/calculate-booking`;

            fetch(url, request)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                localStorage.setItem("order", JSON.stringify(result));
                const myItem = localStorage.getItem("order");
                const muItem = JSON.parse(myItem);
                const mob = muItem.totalAmount;
                location.href = `../pages/payment.html?price=${mob}&pick=${mope}`
            })
            .catch(error => console.log('error', error));
        }
    }
}





function getCurrentDate() {
    const tanMonth = document.querySelector(".tan");
    const day = document.querySelector(".day");

    const d = new Date();

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[d.getMonth()];

    if (d.getDate() == 31 || d.getDate() == 21 || d.getDate() == 1) {
      day.innerHTML = `${d.getDate()}<sup>st</sup>`
    }
    else if (d.getDate() == 22 || d.getDate() == 2) {
      day.innerHTML = `${d.getDate()}<sup>nd</sup>`
    }

    else if (d.getDate() == 23 || d.getDate() == 3) {
        day.innerHTML = `${d.getDate()}<sup>rd</sup>`
    }
    else {
        day.innerHTML = `${d.getDate()}<sup>th</sup>`
    }
    tanMonth.innerHTML = month;

}
getCurrentDate();

function getDateTime() {
    const mytd = localStorage.getItem("td");

    const itemDetal = document.querySelector(".motime");
    itemDetal.innerHTML = mytd;

    console.log(mytd)
}