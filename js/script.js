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
    getM1.innerHTML = "Your items are freshly washed, ironed and neatly packed ready to be delivered.";
    getM2.innerHTML = "Enjoy perfectly dry-cleaned clothes, at the <br> perfect time.";
    getM3.innerHTML = "";

    getDryImage.src = "../assets/19.svg";
    getDryImage.classList.add('.addimg-swing');

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
    getM1.innerHTML = "Have Your garments stay cleaner than<br> ever. We wash, dry and fold your laundry.";
    getM2.innerHTML = "Our experts know what it takes to tackle<br> even the toughest stains.";
    getM3.innerHTML = "";

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


    getClash.innerHTML = `<span class='wash'>Ironing </span>`;
    getM1.innerHTML = "Smart wash offers you a special and unique service for your Duvets.";
    getM2.innerHTML = "Your duvet will be returned to you in compact packaging, ideal for carrying and storing bulky items, and will keep your duvet clean and fresh until you’re ready to use it. All these will be done for you at a very affordable price.";
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

function changeCol() {
    const getBoss2 = document.querySelector(".boss2");
    const getBoss = document.querySelector(".boss");
    const getBoss3 = document.querySelector(".boss3");
    getBoss2.style.color = "#00AEEF";
    getBoss.style.color = "#B7B7B9";
    getBoss3.style.color = "#B7B7B9";
}

function changeTh() {
    const getBoss2 = document.querySelector(".boss2");
    const getBoss = document.querySelector(".boss");
    const getBoss3 = document.querySelector(".boss3");
    getBoss2.style.color = "#B7B7B9";
    getBoss.style.color = "#B7B7B9";
    getBoss3.style.color = "#00AEEF";
}

function changeAnnual(event) {
    event.preventDefault();
    const getMonth = document.querySelector(".month");
    const getAnnual = document.querySelector(".annual");

    const getBogo = document.querySelector(".bogo");
    const getBoris = document.querySelector(".boris");

    const getBogo2 = document.querySelector(".bogo2");
    const getBoris2 = document.querySelector(".boris2");

    const getBogo3 = document.querySelector(".bogo3");
    const getBoris3 = document.querySelector(".boris3");

    const getBogo4 = document.querySelector(".bogo4");
    const getBoris4 = document.querySelector(".boris4");

    getBogo.innerHTML = "N 50,000/year";
    getBoris.innerHTML = `${"Save at least <span class='wash'>36 hours</span> on laundry each year!"}`;

    getBogo2.innerHTML = "N 47,000/year";
    getBoris2.innerHTML = `${"Save at least <span class='wash'>72 hours</span> on laundry each year!"}`;

    getBogo3.innerHTML = "N 45,000/year";
    getBoris3.innerHTML = `${"Save at least <span class='wash'>96 hours</span> on laundry each year!"}`;

    getBogo4.innerHTML = "N 40,000/year";
    getBoris4.innerHTML = `${"Save at least <span class='wash'>120 hours</span> on laundry each year!"}`;

    getMonth.style.borderBottom = "none";
    getAnnual.style.borderBottom = "3px solid #00AEEF";
}

function changeMonth(event) {
    event.preventDefault();
    const getMonth = document.querySelector(".month");
    const getAnnual = document.querySelector(".annual");

    const getBogo = document.querySelector(".bogo");
    const getBoris = document.querySelector(".boris");

    const getBogo2 = document.querySelector(".bogo2");
    const getBoris2 = document.querySelector(".boris2");

    const getBogo3 = document.querySelector(".bogo3");
    const getBoris3 = document.querySelector(".boris3");

    const getBogo4 = document.querySelector(".bogo4");
    const getBoris4 = document.querySelector(".boris4");

    getBogo.innerHTML = "N 5,000/mo";
    getBoris.innerHTML = `${"Save at least <span class='wash'>3 hours</span> on laundry each month!"}`;

    getBogo2.innerHTML = "N 5,000/mo";
    getBoris2.innerHTML = `${"Save at least <span class='wash'>6 hours</span> on laundry each month!"}`;

    getBogo3.innerHTML = "N 5,000/mo";
    getBoris3.innerHTML = `${"Save at least <span class='wash'>9 hours</span> on laundry each month!"}`;

    getBogo4.innerHTML = "N 5,000/mo";
    getBoris4.innerHTML = `${"Save at least <span class='wash'>12 hours</span> on laundry each month!"}`;

    getMonth.style.borderBottom = "3px solid #00AEEF";
    getAnnual.style.borderBottom = "none";
}