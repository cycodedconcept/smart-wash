// function for dry cleaning
function getDry(event) {
    event.preventDefault();
    const getClash = document.querySelector(".clash");
    const getM1 = document.querySelector(".m1");
    const getM2 = document.querySelector(".m2");
    const getM3 = document.querySelector(".m3");
    const getDryImage = document.querySelector(".dry-img");
    const getBtn = document.querySelector(".dry");
    const getRow = document.querySelector(".congress");
    const getRosa = document.querySelector(".rosa");
    const getPrice2 = document.querySelector(".price2");
    const getPrice3 = document.querySelector(".price3");
    const getFold = document.querySelector(".fold");
    const getDuve = document.querySelector(".duvet");



    

    getClash.innerHTML = `<span class='wash'>Dry</span> Cleaning`;
    getM1.innerHTML = "This is the perfect service if you’re tired of dropping off your dry cleaning or if you keep forgetting to pick it up.";
    getM2.innerHTML = "From suits to blouses to dresses to pants and everything in between, we pick up, clean, and drop off your clothes for you so you can enjoy perfectly dry-cleaned clothes, at the perfect time.";
    getM3.innerHTML = "";

    getDryImage.src = "../assets/19.svg";

    getBtn.style.color = "#00AEEF"
    getBtn.style.borderBottom = "1px solid #00AEEF";

    getRow.style.flexDirection = "row-reverse";

    getRosa.style.display = "none";
    getPrice2.style.display = "block";

    getFold.style.color = "#000";
    getFold.style.border = "none";

    getDuve.style.color = "#000";
    getDuve.style.borderBottom = "none";

    getPrice3.style.display = "none";
}

// function for wash & fold

function getFold(event) {
    event.preventDefault();
    const getClash = document.querySelector(".clash");
    const getM1 = document.querySelector(".m1");
    const getM2 = document.querySelector(".m2");
    const getM3 = document.querySelector(".m3");
    const getDryImage = document.querySelector(".dry-img");
    const getBtn = document.querySelector(".dry");
    const getRow = document.querySelector(".congress");
    const getRosa = document.querySelector(".rosa");
    const getPrice2 = document.querySelector(".price2");
    const getFold = document.querySelector(".fold");
    const getDuve = document.querySelector(".duvet");


    getClash.innerHTML = `Wash & <span class='wash'>Fold</span>`;
    getM1.innerHTML = "The ideal service if you want to avoid the dreaded laundry chore and save your time and your sanity.";
    getM2.innerHTML = "We do your laundry for you so you can enjoy your free time. ";
    getM3.innerHTML = "Whether it’s a week’s worth of the entire family’s clothes, or all your linens, we pick up, wash, and fold your laundry.";

    getDryImage.src = "../assets/15.svg";

    getBtn.style.color = "#000"
    getBtn.style.borderBottom = "none";

    getFold.style.color = "#00AEEF";
    getFold.style.borderBottom = "1px solid #00AEEF";

    getRow.style.flexDirection = "row";

    getRosa.style.display = "block";
    getPrice2.style.display = "none";

    getDuve.style.color = "#000";
    getDuve.style.borderBottom = "none";
    
}

// function for duvet & Bed covers
function getDuve(event) {
    event.preventDefault();
    const getClash = document.querySelector(".clash");
    const getM1 = document.querySelector(".m1");
    const getM2 = document.querySelector(".m2");
    const getM3 = document.querySelector(".m3");
    const getDryImage = document.querySelector(".dry-img");
    const getBtn = document.querySelector(".dry");
    const getRow = document.querySelector(".congress");
    const getRosa = document.querySelector(".rosa");
    const getPrice2 = document.querySelector(".price2");
    const getPrice3 = document.querySelector(".price3");
    const getFold = document.querySelector(".fold");
    const getDuve = document.querySelector(".duvet");


    getClash.innerHTML = `<span class='wash'>Duvet & </span> Bed Covers`;
    getM1.innerHTML = "This is the perfect service if you’re tired of dropping off your dry cleaning or if you keep forgetting to pick it up.";
    getM2.innerHTML = "From suits to blouses to dresses to pants and everything in between, we pick up, clean, and drop off your clothes for you so you can enjoy perfectly dry-cleaned clothes, at the perfect time.";
    getM3.innerHTML = "";

    getDryImage.src = "../assets/20.svg";

    getBtn.style.color = "#000"
    getBtn.style.borderBottom = "none";

    getDuve.style.color = "#00AEEF";
    getDuve.style.borderBottom = "1px solid #00AEEF";

    getFold.style.color = "#000";
    getFold.style.borderBottom = "none";

    getRosa.style.display = "none";
    getPrice2.style.display = "none";

    getPrice3.style.display = "block";

}