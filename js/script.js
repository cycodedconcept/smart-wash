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
    const getFold = document.querySelector(".fold");


    

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
}