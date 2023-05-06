let baseUrl = "https://washsmart.onrender.com";


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

        // const getEmail = document.getElementById("adminEmail");
        // getEmail.setAttribute('value', `${result.user.email}`);
        // getEmail.style.color = "#00AEEF"



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

function getPricing() {
    let request = {
        method: 'GET',
    };

    let data = [];
    let data2 = [];
    let data3 = [];
    let data4 = [];
    let data5 = [];





    let url = `${baseUrl}/api/pricing/get_pricing`;
    fetch(url, request)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        localStorage.setItem("price", JSON.stringify(result))
        const sam = document.querySelector(".sam");
        const sam2 = document.querySelector(".sam2");
        const sam3 = document.querySelector(".sam3");
        const sam4 = document.querySelector(".sam4");
        const sam5 = document.querySelector(".sam5");



        const getPrice = document.querySelector(".price");
        const getPrice2 = document.querySelector(".priceSmart");
        const getPriceIron = document.querySelector(".priceIron");


        getPrice.innerHTML = `${result.wash_and_fold_one_time}`;
        getPrice2.innerHTML = `${result.wash_and_fold_smart_wash}`;

        getPriceIron.innerHTML = `${result.ironing}`;
        


        if (result.dry_cleaning.top) {
            result.dry_cleaning.top.map((item) => {
                data += `
                <div class="dry-item">
                    <p>${item.name}</p>
                    <p>₦${item.pricing}</p>
                </div>
                `
                sam.innerHTML = data;
            })
        }
        if (result.dry_cleaning.bottom) {
            result.dry_cleaning.bottom.map((item) => {
                data2 += `
                <div class="dry-item">
                    <p>${item.name}</p>
                    <p>₦${item.pricing}</p>
                </div>
                `
                sam2.innerHTML = data2;
            })
            
        }

        if (result.dry_cleaning.full_body) {
            result.dry_cleaning.full_body.map((item) => {
                data3 += `
                <div class="dry-item">
                    <p>${item.name}</p>
                    <p>₦${item.pricing}</p>
                </div>
                `
                sam3.innerHTML = data3;
            })
            
        }

        if (result.dry_cleaning.house_hold) {
            result.dry_cleaning.house_hold.map((item) => {
                data4 += `
                <div class="dry-item">
                    <p>${item.name}</p>
                    <p>₦${item.pricing}</p>
                </div>
                `
                sam4.innerHTML = data4;
            })
            
        }

        if (result.dry_cleaning.native_wear) {
            result.dry_cleaning.native_wear.map((item) => {
                data5 += `
                <div class="dry-item">
                    <p>${item.name}</p>
                    <p>₦${item.pricing}</p>
                </div>
                `
                sam5.innerHTML = data5;
            })
            
        }
        else {
            

            
        }
    })
    .catch(error => console.log('error', error));

}
getPricing();




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
              <input type="checkbox" class="form-check-input" value="${item.name}">
              <label class="" for="exampleCheck1">${item.name}</label>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-4">
              <div>
                <p id="${item.id}">₦${item.pricing}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-3">
              <div>
                <button type="button" class="turn" onclick="increase(${item.id}, ${item.pricing_id}, ${item.pricing})">+</button>
                <span id="${item.pricing_id}">1</span>
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

    const show = document.querySelector(".show-details");

    topIt.dry_cleaning.bottom.map((item) => {
        data +=`
        <div class="p-3 hoski">
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-5">
              <input type="checkbox" class="form-check-input" value="${item.name}">
              <label class="" for="exampleCheck1">${item.name}</label>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-4">
              <div>
                <p id="${item.id}">₦${item.pricing}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-3">
              <div>
                <button type="button" class="turn" onclick="increase(${item.id}, ${item.pricing_id}, ${item.pricing})">+</button>
                <span id="${item.pricing_id}">1</span>
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

    const show = document.querySelector(".show-details");

    topIt.dry_cleaning.full_body.map((item) => {
        data +=`
        <div class="p-3 hoski">
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-5">
              <input type="checkbox" class="form-check-input" value="${item.name}">
              <label class="" for="exampleCheck1">${item.name}</label>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-4">
              <div>
                <p id="${item.id}">₦${item.pricing}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-3">
              <div>
                <button type="button" class="turn" onclick="increase(${item.id}, ${item.pricing_id}, ${item.pricing})">+</button>
                <span id="${item.pricing_id}">1</span>
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

    const show = document.querySelector(".show-details");

    topIt.dry_cleaning.house_hold.map((item) => {
        data +=`
        <div class="p-3 hoski">
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-5">
              <input type="checkbox" class="form-check-input" value="${item.name}">
              <label class="" for="exampleCheck1">${item.name}</label>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-4">
              <div>
                <p id="${item.id}">₦${item.pricing}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-3">
              <div>
                <button type="button" class="turn" onclick="increase(${item.id}, ${item.pricing_id}, ${item.pricing})">+</button>
                <span id="${item.pricing_id}">1</span>
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

    const show = document.querySelector(".show-details");

    topIt.dry_cleaning.native_wear.map((item) => {
        data +=`
        <div class="p-3 hoski">
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-5">
              <input type="checkbox" class="form-check-input" value="${item.name}">
              <label class="" for="exampleCheck1">${item.name}</label>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-4">
              <div>
                <p id="${item.id}">₦${item.pricing}</p>
              </div>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-3">
              <div>
                <button type="button" class="turn" onclick="increase(${item.id}, ${item.pricing_id}, ${item.pricing})">+</button>
                <span id="${item.pricing_id}">1</span>
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

let valueCount = 1;

function increase(id, priceId, pricing) {
  let price = id.getAttribute("id");
  let quantity = priceId.innerHTML;
  let newPrice = document.getElementById(price);
  let newQ = priceId.getAttribute("id");
  let momo = document.getElementById(newQ)

  let add = valueCount++;
  momo.innerHTML = add;
  newPrice.innerHTML = `₦${add * pricing}`;
  console.log(price, quantity, priceId)
}

function decrease(id, priceId, pricing) {
    let price = id.getAttribute("id");
    let quantity = priceId.innerHTML;
    let newPrice = document.getElementById(price);
    let newQ = priceId.getAttribute("id");
    let momo = document.getElementById(newQ);

    if (valueCount >=2) {
        let sub = --valueCount;
        momo.innerHTML = sub;
        newPrice.innerHTML = `₦${sub * pricing}`;
        console.log(price, quantity, priceId)
    }
}


// ironing starts here
function topWears1() {

    const getTop = localStorage.getItem("price");
    const topIt = JSON.parse(getTop);

    const shirt = document.getElementById("ishirt");
    const topPrice1 = document.getElementById("itop")
    const shirt2 = document.getElementById("ishirt2");
    const topPrice2 = document.getElementById("itop2")
    const shirt3 = document.getElementById("ishirt3");
    const topPrice3 = document.getElementById("itop3")
    const shirt4 = document.getElementById("ishirt4");
    const topPrice4 = document.getElementById("itop4");


    const top = document.querySelector(".top2");
    const bottom = document.querySelector(".bottom2");
    const fullbody = document.querySelector(".fullbody2");
    const nativewear = document.querySelector(".nativeWear2");


    shirt.innerHTML = topIt.ironing.top[0].name;
    topPrice1.innerHTML = "₦" + topIt.ironing.top[0].pricing;
    console.log(topPrice1)

    shirt2.innerHTML = topIt.ironing.top[1].name;
    topPrice2.innerHTML = "₦" + topIt.ironing.top[1].pricing;

    shirt3.innerHTML = topIt.ironing.top[2].name;
    topPrice3.innerHTML = "₦" + topIt.ironing.top[2].pricing;

    shirt4.innerHTML = topIt.ironing.top[3].name;
    topPrice4.innerHTML = "₦" + topIt.ironing.top[3].pricing;

    top.style.display = "block";
    bottom.style.display = "none";
    fullbody.style.display = "none";
    nativewear.style.display = "none";


}

function bottomWears1() {
    const getTop = localStorage.getItem("price");
    const topIt = JSON.parse(getTop);

    const pants = document.getElementById("ipants");
    const pantprice = document.getElementById("ipantprice")
    const skirt = document.getElementById("iskirt");
    const skirtprice = document.getElementById("iskirtprice")
    const shorts = document.getElementById("ishorts");
    const shortprice = document.getElementById("ishortprice");

    const bottom = document.querySelector(".bottom2");
    const top = document.querySelector(".top2");
    const fullbody = document.querySelector(".fullbody2");
    const nativewear = document.querySelector(".nativeWear2");


    

    pants.innerHTML = topIt.ironing.bottom[0].name;
    pantprice.innerHTML = "₦" + topIt.ironing.bottom[0].pricing;

    skirt.innerHTML = topIt.ironing.bottom[1].name;
    skirtprice.innerHTML = "₦" + topIt.ironing.bottom[1].pricing;

    shorts.innerHTML = topIt.ironing.bottom[2].name;
    shortprice.innerHTML = "₦" + topIt.ironing.bottom[2].pricing;

    bottom.style.display = "block";
    top.style.display = "none";
    fullbody.style.display = "none";
    nativewear.style.display = "none";
}

function fullBodyWears1() {
    const getTop = localStorage.getItem("price");
    const topIt = JSON.parse(getTop);

    const casual = document.getElementById("icasual");
    const casualprice = document.getElementById("icasualprice")
    const formal = document.getElementById("iformal");
    const formalprice = document.getElementById("iformalprice")
    const coat = document.getElementById("icoat");
    const coatprice = document.getElementById("icoatprice");

    const bottom = document.querySelector(".bottom2");
    const top = document.querySelector(".top2");
    const fullbody = document.querySelector(".fullbody2");
    const nativewear = document.querySelector(".nativeWear2");
    

    casual.innerHTML = topIt.ironing.full_body[0].name;
    casualprice.innerHTML = "₦" + topIt.ironing.full_body[0].pricing;

    formal.innerHTML = topIt.ironing.full_body[1].name;
    formalprice.innerHTML = "₦" + topIt.ironing.full_body[1].pricing;

    coat.innerHTML = topIt.ironing.full_body[2].name;
    coatprice.innerHTML = "₦" + topIt.ironing.full_body[2].pricing;

    bottom.style.display = "none";
    top.style.display = "none";
    fullbody.style.display = "block";
    nativewear.style.display = "none";

}

function nativeWears1() {

    const getTop = localStorage.getItem("price");
    const topIt = JSON.parse(getTop);

    const ankara = document.getElementById("iankara");
    const ankaraprice = document.getElementById("iankaraprice")
    const lace = document.getElementById("ilace");
    const laceprice = document.getElementById("ilaceprice");
    const agbada = document.getElementById("iagbada");
    const agbadaprice = document.getElementById("iagbadaprice");
    
    const bottom = document.querySelector(".bottom2");
    const top = document.querySelector(".top2");
    const fullbody = document.querySelector(".fullbody2");
    const nativewear = document.querySelector(".nativeWear2");

    ankara.innerHTML = topIt.ironing.native_wear[0].name;
    ankaraprice.innerHTML = "₦" + topIt.ironing.native_wear[0].pricing;

    lace.innerHTML = topIt.ironing.native_wear[1].name;
    laceprice.innerHTML = "₦" + topIt.ironing.native_wear[1].pricing;

    agbada.innerHTML = topIt.ironing.native_wear[2].name;
    agbadaprice.innerHTML = "₦" + topIt.ironing.native_wear[2].pricing;

    bottom.style.display = "none";
    top.style.display = "none";
    fullbody.style.display = "none";
    nativewear.style.display = "block";


}


function getValue() {
    const getPrice = localStorage.getItem("price");
    const theprice = JSON.parse(getPrice);

    const fitem = document.getElementById("item1");
    if (fitem.checked) {
      fitem.value = theprice.dry_cleaning.top[0].name;
    }
    else {
        fitem.value = '';
    }
}

function getValue2() {
    const getPrice = localStorage.getItem("price");
    const theprice = JSON.parse(getPrice);

    const fitem = document.getElementById("item2");

    if (fitem.checked) {
        fitem.value = theprice.dry_cleaning.top[1].name;
    }
    else {
        fitem.value = '';
    }
}

function getValue3() {
    const getPrice = localStorage.getItem("price");
    const theprice = JSON.parse(getPrice);

    const fitem = document.getElementById("item3");
    if (fitem.checked) {
        fitem.value = theprice.dry_cleaning.top[2].name;
    }
    else {
        fitem.value = '';
    }
}

function getValue4() {
    const getPrice = localStorage.getItem("price");
    const theprice = JSON.parse(getPrice);

    const fitem = document.getElementById("item4");
    if (fitem.checked) {
        fitem.value = theprice.dry_cleaning.top[3].name;
    }
    else {
        fitem.value = '';
    }
}

function getValue5() {
    const getPrice = localStorage.getItem("price");
    const theprice = JSON.parse(getPrice);

    const fitem = document.getElementById("item5");
    if (fitem.checked) {
        fitem.value = theprice.dry_cleaning.bottom[0].name;
    }
    else {
        fitem.value = '';
    }
}

function getValue6() {
    const getPrice = localStorage.getItem("price");
    const theprice = JSON.parse(getPrice);

    const fitem = document.getElementById("item6");
    if (fitem.checked) {
        fitem.value = theprice.dry_cleaning.bottom[1].name;
    }
    else {
        fitem.value = '';
    }
}

function getValue7() {
    const getPrice = localStorage.getItem("price");
    const theprice = JSON.parse(getPrice);

    const fitem = document.getElementById("item7");
    if (fitem.checked) {
        fitem.value = theprice.dry_cleaning.bottom[2].name;
    }
    else {
        fitem.value = '';
    }
}

function getValue8() {
    const getPrice = localStorage.getItem("price");
    const theprice = JSON.parse(getPrice);

    const fitem = document.getElementById("item8");
    if (fitem.checked) {
        fitem.value = theprice.dry_cleaning.full_body[0].name;
    }
    else {
        fitem.value = '';
    }
}

function getValue9() {
    const getPrice = localStorage.getItem("price");
    const theprice = JSON.parse(getPrice);

    const fitem = document.getElementById("item9");
    if (fitem.checked) {
        fitem.value = theprice.dry_cleaning.full_body[1].name;
    }
    else {
        fitem.value = '';
    }
}

function getValue10() {
    const getPrice = localStorage.getItem("price");
    const theprice = JSON.parse(getPrice);

    const fitem = document.getElementById("item10");
    if (fitem.checked) {
        fitem.value = theprice.dry_cleaning.full_body[2].name;
    }
    else {
        fitem.value = '';
    }
}

function getValue11() {
    const getPrice = localStorage.getItem("price");
    const theprice = JSON.parse(getPrice);

    const fitem = document.getElementById("item11");
    if (fitem.checked) {
        fitem.value = theprice.dry_cleaning.house_hold[0].name;
    }
    else {
        fitem.value = '';
    }
}

function getValue12() {
    const getPrice = localStorage.getItem("price");
    const theprice = JSON.parse(getPrice);

    const fitem = document.getElementById("item12");
    if (fitem.checked) {
        fitem.value = theprice.dry_cleaning.house_hold[1].name;
    }
    else {
        fitem.value = '';
    }
}

function getValue13() {
    const getPrice = localStorage.getItem("price");
    const theprice = JSON.parse(getPrice);

    const fitem = document.getElementById("item13");
    if (fitem.checked) {
        fitem.value = theprice.dry_cleaning.native_wear[0].name;
    }
    else {
        fitem.value = '';
    }
}

function getValue14() {
    const getPrice = localStorage.getItem("price");
    const theprice = JSON.parse(getPrice);

    const fitem = document.getElementById("item14");
    if (fitem.checked) {
        fitem.value = theprice.dry_cleaning.native_wear[1].name;
    }
    else {
        fitem.value = '';
    }
}

function getValue15() {
    const getPrice = localStorage.getItem("price");
    const theprice = JSON.parse(getPrice);

    const fitem = document.getElementById("item15");
    if (fitem.checked) {
        fitem.value = theprice.dry_cleaning.native_wear[2].name;
    }
    else {
        fitem.value = '';
    }
}



function calValues(event) {
    event.preventDefault();

    const getShirt = document.getElementById("item15").value;
    const getShirt2 = document.getElementById("item2").value;



    
    console.log(getShirt);
    console.log(getShirt2);




}



function showOthers(event) {
    const getDiv = document.querySelector(".odana");
    const getOz = document.querySelector(".oz");
    const getPlan = document.querySelector(".plan1");
    const getPlan2 = document.querySelector(".plan2");
    const getPlan3 = document.querySelector(".plan3");
    const getPlan4 = document.querySelector(".plan4");



    if (event.target.checked) {

        getDiv.style.display = "block";
        getOz.style.display = "block";

        getPlan.style.border = "1px solid #00AEEF";
        getPlan2.style.border = "1px solid #00AEEF";
        getPlan3.style.border = "1px solid #00AEEF";
        getPlan4.style.border = "1px solid #00AEEF";


        getDiv.style.borderRadius = "10px";

    }
    
    
}

function removeDrop(event) {
    const getDiv = document.querySelector(".odana");
    const getOz = document.querySelector(".oz");

    if (event.target.checked) {
        getDiv.style.display = "none";
        getOz.style.display = "none";
    }
}


