


document.addEventListener('DOMContentLoaded', () => {
    let controller = new ScrollMagic.Controller();

    let timeline = new TimelineMax();
    timeline
    .from('.section_1_01', 4, {
        y: -100,
        x: -150,
        ease: Power3.easeInOut
    })
    .from('.section_1_02', 4, {
        y: -150,
        x: -250,
        ease: Power3.easeInOut
    }, '-=4')
    .from('.section_1_03', 4, {
        y: -80,
        x: -100,
        ease: Power3.easeInOut
    }, '-=4')
    .from('.section_1_04', 4, {
        y: -100,
        x: -150,
        ease: Power3.easeInOut
    }, '-=4')
    .from('.section_1_05', 4, {
        y: -80,
        x: -200,
        ease: Power3.easeInOut
    }, '-=4')
    .from('.section_1_06', 4, {
        y: -100,
        x: -350,
        ease: Power3.easeInOut
    }, '-=4')
    .from('.section_1_07', 4, {
        y: -50,
        x: -150,
        ease: Power3.easeInOut
    }, '-=4')
    .from('.section_1_08', 4, {
        y: 50,
        x: -350,
        ease: Power3.easeInOut
    }, '-=4')
    .from('.section_1_09', 4, {
        y: 100,
        x: -200,
        ease: Power3.easeInOut
    }, '-=4')

    let scene = new ScrollMagic.Scene({
        triggerElement: '.first-section',
        duration: '100%',
        triggerHook: 0,
        // offset: '300'
    })
    .setTween(timeline)
    .setPin('.first-section')
    .addTo(controller);

    let timeline2 = new TimelineMax();
    timeline2
    .to('.top .image-container', 4, {
        height: 0
    });

    let scene2 = new ScrollMagic.Scene({
        triggerElement: '.second-section',
        duration: '100%',
        triggerHook: 0,
        // offset: '100'
    })
    .setTween(timeline2)
    .setPin('.second-section')
    .addTo(controller);

    let timeline3 = new TimelineMax();
    timeline3
    .to('.section_3_01', 4, {
        y: -250,
        ease: Power3.easeInOut
    })
    .to('.section_3_02', 4, {
        y: -200,
        ease: Power3.easeInOut
    }, '-=4')
    .to('.section_3_03', 4, {
        y: -100,
        ease: Power3.easeInOut
    }, '-=4')
    .to('.section_3_04', 4, {
        y: 0,
        ease: Power3.easeInOut
    }, '-=4')
    .to('.section_3_05', 4, {
        y: 150,
        ease: Power3.easeInOut
    }, '-=4')
    .to('.section_3_06', 4, {
        y: 250,
        ease: Power3.easeInOut
    }, '-=4')

    let scene3 = new ScrollMagic.Scene({
        triggerElement: '.third-section',
        duration: '100%',
        triggerHook: 0,
        // offset: '200'
    })
    .setTween(timeline3)
    .setPin('.third-section')
    .addTo(controller);

    let timeline4 = new TimelineMax();
    timeline4
    .to('.section_4_01', 4, {
        autoAlpha: 0
    })
    .from('.section_4_02', 4, {
        autoAlpha: 0
    }, '-=4')
    .from('.section_4_03', 4, {
        autoAlpha: 0
    })
    .from('.section_4_04', 4, {
        autoAlpha: 0
    })

    let scene4 = new ScrollMagic.Scene({
        triggerElement: '.forth-section',
        duration: '4%',
        triggerHook: 0,
        // offset: '100'
    })
    .setTween(timeline4)
    .setPin('.forth-section')
    .addTo(controller);

})

function stickNavbar() {
    document.addEventListener("DOMContentLoaded", function(){
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
              document.getElementById('navbar_top').classList.add('fixed-top');
              document.getElementById('navbar_top').classList.add('alobam');

              // add padding top to show content behind navbar
            //   navbar_height = document.querySelector('.navbar').offsetHeight;
            //   document.body.style.paddingTop = navbar_height + 'px';
            } else {
              document.getElementById('navbar_top').classList.remove('fixed-top');
              document.getElementById('navbar_top').classList.remove('alobam');

               // remove padding top from body
              document.body.style.paddingTop = '0';
            } 
        });
    }); 
}

stickNavbar();


const getPrice = localStorage.getItem("price");
const theprice = JSON.parse(getPrice);
const dubem = theprice.dry_cleaning.top[0].pricing;
const dubem2 = theprice.dry_cleaning.top[1].pricing;
const dubem3 = theprice.dry_cleaning.top[2].pricing;
const dubem4 = theprice.dry_cleaning.top[3].pricing;

const dubem5 = theprice.dry_cleaning.bottom[0].pricing;
const dubem6 = theprice.dry_cleaning.bottom[1].pricing;
const dubem7 = theprice.dry_cleaning.bottom[2].pricing;
const dubem8 = theprice.dry_cleaning.full_body[0].pricing;
const dubem9 = theprice.dry_cleaning.full_body[1].pricing;
const dubem10 = theprice.dry_cleaning.full_body[2].pricing;
const dubem11 = theprice.dry_cleaning.house_hold[0].pricing;
const dubem12 = theprice.dry_cleaning.house_hold[1].pricing;
const dubem13 = theprice.dry_cleaning.native_wear[0].pricing;
const dubem14 = theprice.dry_cleaning.native_wear[1].pricing;
const dubem15 = theprice.dry_cleaning.native_wear[2].pricing;

// for ironing
const idubem = theprice.ironing.top[0].pricing;
const idubem2 = theprice.ironing.top[1].pricing;
const idubem3 = theprice.ironing.top[2].pricing;
const idubem4 = theprice.ironing.top[3].pricing;

const idubem5 = theprice.ironing.bottom[0].pricing;
const idubem6 = theprice.ironing.bottom[1].pricing;
const idubem7 = theprice.ironing.bottom[2].pricing;

const idubem8 = theprice.ironing.full_body[0].pricing;
const idubem9 = theprice.ironing.full_body[1].pricing;
const idubem10 = theprice.ironing.full_body[2].pricing;

const idubem13 = theprice.ironing.native_wear[0].pricing;
const idubem14 = theprice.ironing.native_wear[1].pricing;
const idubem15 = theprice.ironing.native_wear[2].pricing;




let valueCount = 1;

// for dry cleaning
let btnin = document.querySelector(".btnin");
let btnde = document.querySelector(".btnde");
let count = document.querySelector("#quantity");
let toptea = document.querySelector("#top1");

let btnin2 = document.querySelector(".btnin2");
let btnde2 = document.querySelector(".btnde2");
let count2 = document.querySelector("#quantity2");
let toptea2 = document.querySelector("#top2");

let btnin3 = document.querySelector(".btnin3");
let btnde3 = document.querySelector(".btnde3");
let count3 = document.querySelector("#quantity3");
let toptea3 = document.querySelector("#top3");

let btnin4 = document.querySelector(".btnin4");
let btnde4 = document.querySelector(".btnde4");
let count4 = document.querySelector("#quantity4");
let toptea4 = document.querySelector("#top4");

let btnin5 = document.querySelector(".btnin5");
let btnde5 = document.querySelector(".btnde5");
let count5 = document.querySelector("#quantity5");
let toptea5 = document.querySelector("#pantprice");

let btnin6 = document.querySelector(".btnin6");
let btnde6 = document.querySelector(".btnde6");
let count6 = document.querySelector("#quantity6");
let toptea6 = document.querySelector("#skirtprice");

let btnin7 = document.querySelector(".btnin7");
let btnde7 = document.querySelector(".btnde7");
let count7 = document.querySelector("#quantity7");
let toptea7 = document.querySelector("#shortprice");

let btnin8 = document.querySelector(".btnin8");
let btnde8 = document.querySelector(".btnde8");
let count8 = document.querySelector("#quantity8");
let toptea8 = document.querySelector("#casualprice");

let btnin9 = document.querySelector(".btnin9");
let btnde9 = document.querySelector(".btnde9");
let count9 = document.querySelector("#quantity9");
let toptea9 = document.querySelector("#formalprice");

let btnin10 = document.querySelector(".btnin10");
let btnde10 = document.querySelector(".btnde10");
let count10 = document.querySelector("#quantity10");
let toptea10 = document.querySelector("#coatprice");

let btnin11 = document.querySelector(".btnin11");
let btnde11 = document.querySelector(".btnde11");
let count11 = document.querySelector("#quantity11");
let toptea11 = document.querySelector("#duveprice");

let btnin12 = document.querySelector(".btnin12");
let btnde12 = document.querySelector(".btnde12");
let count12 = document.querySelector("#quantity12");
let toptea12 = document.querySelector("#sheetprice");

let btnin13 = document.querySelector(".btnin13");
let btnde13 = document.querySelector(".btnde13");
let count13 = document.querySelector("#quantity13");
let toptea13 = document.querySelector("#ankaraprice");

let btnin14 = document.querySelector(".btnin14");
let btnde14 = document.querySelector(".btnde14");
let count14 = document.querySelector("#quantity14");
let toptea14 = document.querySelector("#laceprice");

let btnin15 = document.querySelector(".btnin15");
let btnde15 = document.querySelector(".btnde15");
let count15 = document.querySelector("#quantity15");
let toptea15 = document.querySelector("#agbadaprice");






// for ironing
let ibtnin = document.querySelector(".ibtnin");
let ibtnde = document.querySelector(".ibtnde");
let icount = document.querySelector("#iquantity");
let itoptea = document.querySelector("#itop");

let ibtnin2 = document.querySelector(".ibtnin2");
let ibtnde2 = document.querySelector(".ibtnde2");
let icount2 = document.querySelector("#iquantity2");
let itoptea2 = document.querySelector("#itop2");

let ibtnin3 = document.querySelector(".ibtnin3");
let ibtnde3 = document.querySelector(".ibtnde3");
let icount3 = document.querySelector("#iquantity3");
let itoptea3 = document.querySelector("#itop3");

let ibtnin4 = document.querySelector(".ibtnin4");
let ibtnde4 = document.querySelector(".ibtnde4");
let icount4 = document.querySelector("#iquantity4");
let itoptea4 = document.querySelector("#itop4");

let ibtnin5 = document.querySelector(".ibtnin5");
let ibtnde5 = document.querySelector(".ibtnde5");
let icount5 = document.querySelector("#iquantity5");
let itoptea5 = document.querySelector("#ipantprice");

let ibtnin6 = document.querySelector(".ibtnin6");
let ibtnde6 = document.querySelector(".ibtnde6");
let icount6 = document.querySelector("#iquantity6");
let itoptea6 = document.querySelector("#iskirtprice");

let ibtnin7 = document.querySelector(".ibtnin7");
let ibtnde7 = document.querySelector(".ibtnde7");
let icount7 = document.querySelector("#iquantity7");
let itoptea7 = document.querySelector("#ishortprice");

let ibtnin8 = document.querySelector(".ibtnin8");
let ibtnde8 = document.querySelector(".ibtnde8");
let icount8 = document.querySelector("#iquantity8");
let itoptea8 = document.querySelector("#icasualprice");

let ibtnin9 = document.querySelector(".ibtnin9");
let ibtnde9 = document.querySelector(".ibtnde9");
let icount9 = document.querySelector("#iquantity9");
let itoptea9 = document.querySelector("#iformalprice");

let ibtnin10 = document.querySelector(".ibtnin10");
let ibtnde10 = document.querySelector(".ibtnde10");
let icount10 = document.querySelector("#iquantity10");
let itoptea10 = document.querySelector("#icoatprice");

let ibtnin13 = document.querySelector(".ibtnin13");
let ibtnde13 = document.querySelector(".ibtnde13");
let icount13 = document.querySelector("#iquantity13");
let itoptea13 = document.querySelector("#iankaraprice");

let ibtnin14 = document.querySelector(".ibtnin14");
let ibtnde14 = document.querySelector(".ibtnde14");
let icount14 = document.querySelector("#iquantity14");
let itoptea14 = document.querySelector("#ilaceprice");

let ibtnin15 = document.querySelector(".ibtnin15");
let ibtnde15 = document.querySelector(".ibtnde15");
let icount15 = document.querySelector("#iquantity15");
let itoptea15 = document.querySelector("#iagbadaprice");





// for dry cleaning top
btnin.addEventListener("click", () => {
    let add = valueCount++;
    count.value = add;
    toptea.innerHTML = `₦${add * dubem}`;
})

btnde.addEventListener("click", () => {
    if (valueCount >=2) {
        let sub = --valueCount;
        count.value = sub;
        toptea.innerHTML = `₦${sub * dubem}`;
    }
})

// for polo

btnin2.addEventListener("click", () => {
    let add = valueCount++;
    count2.value = add;
    toptea2.innerHTML = `₦${add * dubem2}`;
})

btnde2.addEventListener("click", () => {
    if (valueCount >=2) {
        let sub = --valueCount;
        count2.value = sub;
        toptea2.innerHTML = `₦${sub * dubem2}`;
    }
})

// for sweater
btnin3.addEventListener("click", () => {
    let add = valueCount++;
    count3.value = add;
    toptea3.innerHTML = `₦${add * dubem3}`;
})

btnde3.addEventListener("click", () => {
    if (valueCount >=2) {
        let sub = --valueCount;
        count3.value = sub;
        toptea3.innerHTML = `₦${sub * dubem3}`;
    }
})

// for jacket/blazer

btnin4.addEventListener("click", () => {
    let add = valueCount++;
    count4.value = add;
    toptea4.innerHTML = `₦${add * dubem4}`;
})

btnde4.addEventListener("click", () => {
    if (valueCount >=2) {
        let sub = --valueCount;
        count4.value = sub;
        toptea4.innerHTML = `₦${sub * dubem4}`;
    }
})

// for pants
btnin5.addEventListener("click", () => {
    let add = valueCount++;
    count5.value = add;
    toptea5.innerHTML = `₦${add * dubem5}`;
})

btnde5.addEventListener("click", () => {
    if (valueCount >=2) {
        let sub = --valueCount;
        count5.value = sub;
        toptea5.innerHTML = `₦${sub * dubem5}`;
    }
})

// for skirt
btnin6.addEventListener("click", () => {
    let add = valueCount++;
    count6.value = add;
    toptea6.innerHTML = `₦${add * dubem6}`;
})

btnde6.addEventListener("click", () => {
    if (valueCount >=2) {
        let sub = --valueCount;
        count6.value = sub;
        toptea6.innerHTML = `₦${sub * dubem6}`;
    }
})

// for shorts
btnin7.addEventListener("click", () => {
    let add = valueCount++;
    count7.value = add;
    toptea7.innerHTML = `₦${add * dubem7}`;
})

btnde7.addEventListener("click", () => {
    if (valueCount >=2) {
        let sub = --valueCount;
        count7.value = sub;
        toptea7.innerHTML = `₦${sub * dubem7}`;
    }
})

// for casual
btnin8.addEventListener("click", () => {
    let add = valueCount++;
    count8.value = add;
    toptea8.innerHTML = `₦${add * dubem8}`;
})

btnde8.addEventListener("click", () => {
    if (valueCount >=2) {
        let sub = --valueCount;
        count8.value = sub;
        toptea8.innerHTML = `₦${sub * dubem8}`;
    }
})

// for formal
btnin9.addEventListener("click", () => {
    let add = valueCount++;
    count9.value = add;
    toptea9.innerHTML = `₦${add * dubem9}`;
})

btnde9.addEventListener("click", () => {
    if (valueCount >=2) {
        let sub = --valueCount;
        count9.value = sub;
        toptea9.innerHTML = `₦${sub * dubem9}`;
    }
})

// for coat
btnin10.addEventListener("click", () => {
    let add = valueCount++;
    count10.value = add;
    toptea10.innerHTML = `₦${add * dubem10}`;
})

btnde10.addEventListener("click", () => {
    if (valueCount >=2) {
        let sub = --valueCount;
        count10.value = sub;
        toptea10.innerHTML = `₦${sub * dubem10}`;
    }
})

// for duvet
btnin11.addEventListener("click", () => {
    let add = valueCount++;
    count11.value = add;
    toptea11.innerHTML = `₦${add * dubem11}`;
})

btnde11.addEventListener("click", () => {
    if (valueCount >=2) {
        let sub = --valueCount;
        count11.value = sub;
        toptea11.innerHTML = `₦${sub * dubem11}`;
    }
})

// for sheets
btnin12.addEventListener("click", () => {
    let add = valueCount++;
    count12.value = add;
    toptea12.innerHTML = `₦${add * dubem12}`;
})

btnde12.addEventListener("click", () => {
    if (valueCount >=2) {
        let sub = --valueCount;
        count12.value = sub;
        toptea12.innerHTML = `₦${sub * dubem12}`;
    }
})

// for ankara
btnin13.addEventListener("click", () => {
    let add = valueCount++;
    count13.value = add;
    toptea13.innerHTML = `₦${add * dubem13}`;
})

btnde13.addEventListener("click", () => {
    if (valueCount >=2) {
        let sub = --valueCount;
        count13.value = sub;
        toptea13.innerHTML = `₦${sub * dubem13}`;
    }
})

// for lace
btnin14.addEventListener("click", () => {
    let add = valueCount++;
    count14.value = add;
    toptea14.innerHTML = `₦${add * dubem14}`;
})

btnde14.addEventListener("click", () => {
    if (valueCount >=2) {
        let sub = --valueCount;
        count14.value = sub;
        toptea14.innerHTML = `₦${sub * dubem14}`;
    }
})

// for agbada
btnin15.addEventListener("click", () => {
    let add = valueCount++;
    count15.value = add;
    toptea15.innerHTML = `₦${add * dubem15}`;
})

btnde15.addEventListener("click", () => {
    if (valueCount >=2) {
        let sub = --valueCount;
        count15.value = sub;
        toptea15.innerHTML = `₦${sub * dubem15}`;
    }
})








// for ironing 
ibtnin.addEventListener("click", () => {
    let add = valueCount++;
    icount.value = add;
    itoptea.innerHTML = `₦${add * idubem}`;
})

ibtnde.addEventListener("click", () => {
    if (valueCount >=2) {
        let sub = --valueCount;
        icount.value = sub;
        itoptea.innerHTML = `₦${sub * idubem}`;
    }
})

// for polo

ibtnin2.addEventListener("click", () => {
    let add = valueCount++;
    icount2.value = add;
    itoptea2.innerHTML = `₦${add * idubem2}`;
})

ibtnde2.addEventListener("click", () => {
    if (valueCount >=2) {
        let sub = --valueCount;
        icount2.value = sub;
        itoptea2.innerHTML = `₦${sub * idubem2}`;
    }
})

// for sweater
ibtnin3.addEventListener("click", () => {
    let add = valueCount++;
    icount3.value = add;
    itoptea3.innerHTML = `₦${add * idubem3}`;
})

ibtnde3.addEventListener("click", () => {
    if (valueCount >=2) {
        let sub = --valueCount;
        icount3.value = sub;
        itoptea3.innerHTML = `₦${sub * idubem3}`;
    }
})

// for jacket/blazer

ibtnin4.addEventListener("click", () => {
    let add = valueCount++;
    icount4.value = add;
    itoptea4.innerHTML = `₦${add * idubem4}`;
})

ibtnde4.addEventListener("click", () => {
    if (valueCount >=2) {
        let sub = --valueCount;
        icount4.value = sub;
        itoptea4.innerHTML = `₦${sub * idubem4}`;
    }
})

// for pants
ibtnin5.addEventListener("click", () => {
    let add = valueCount++;
    icount5.value = add;
    itoptea5.innerHTML = `₦${add * idubem5}`;
})

ibtnde5.addEventListener("click", () => {
    if (valueCount >=2) {
        let sub = --valueCount;
        icount5.value = sub;
        itoptea5.innerHTML = `₦${sub * idubem5}`;
    }
})

// for skirt
ibtnin6.addEventListener("click", () => {
    let add = valueCount++;
    icount6.value = add;
    itoptea6.innerHTML = `₦${add * idubem6}`;
})

ibtnde6.addEventListener("click", () => {
    if (valueCount >=2) {
        let sub = --valueCount;
        icount6.value = sub;
        itoptea6.innerHTML = `₦${sub * idubem6}`;
    }
})

// for shorts
ibtnin7.addEventListener("click", () => {
    let add = valueCount++;
    icount7.value = add;
    itoptea7.innerHTML = `₦${add * idubem7}`;
})

ibtnde7.addEventListener("click", () => {
    if (valueCount >=2) {
        let sub = --valueCount;
        icount7.value = sub;
        itoptea7.innerHTML = `₦${sub * idubem7}`;
    }
})

// for casual
ibtnin8.addEventListener("click", () => {
    let add = valueCount++;
    icount8.value = add;
    itoptea8.innerHTML = `₦${add * idubem8}`;
})

ibtnde8.addEventListener("click", () => {
    if (valueCount >=2) {
        let sub = --valueCount;
        icount8.value = sub;
        itoptea8.innerHTML = `₦${sub * idubem8}`;
    }
})

// for formal
ibtnin9.addEventListener("click", () => {
    let add = valueCount++;
    icount9.value = add;
    itoptea9.innerHTML = `₦${add * idubem9}`;
})

ibtnde9.addEventListener("click", () => {
    if (valueCount >=2) {
        let sub = --valueCount;
        icount9.value = sub;
        itoptea9.innerHTML = `₦${sub * idubem9}`;
    }
})

// for coat
ibtnin10.addEventListener("click", () => {
    let add = valueCount++;
    icount10.value = add;
    itoptea10.innerHTML = `₦${add * idubem10}`;
})

ibtnde10.addEventListener("click", () => {
    if (valueCount >=2) {
        let sub = --valueCount;
        icount10.value = sub;
        itoptea10.innerHTML = `₦${sub * idubem10}`;
    }
})

// for ankara
ibtnin13.addEventListener("click", () => {
    let add = valueCount++;
    icount13.value = add;
    itoptea13.innerHTML = `₦${add * idubem13}`;
})

ibtnde13.addEventListener("click", () => {
    if (valueCount >=2) {
        let sub = --valueCount;
        icount13.value = sub;
        itoptea13.innerHTML = `₦${sub * idubem13}`;
    }
})

// for lace
ibtnin14.addEventListener("click", () => {
    let add = valueCount++;
    icount14.value = add;
    itoptea14.innerHTML = `₦${add * idubem14}`;
})

ibtnde14.addEventListener("click", () => {
    if (valueCount >=2) {
        let sub = --valueCount;
        icount14.value = sub;
        itoptea14.innerHTML = `₦${sub * idubem14}`;
    }
})

// for agbada
ibtnin15.addEventListener("click", () => {
    let add = valueCount++;
    icount15.value = add;
    itoptea15.innerHTML = `₦${add * idubem15}`;
})

ibtnde15.addEventListener("click", () => {
    if (valueCount >=2) {
        let sub = --valueCount;
        icount15.value = sub;
        itoptea15.innerHTML = `₦${sub * idubem15}`;
    }
})