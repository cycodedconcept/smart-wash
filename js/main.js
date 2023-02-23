const observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('gallery-img');
        }
		
		else {
            entry.target.classList.remove('gallery-img');
        }
    });
});

const hiddenElements2 = document.querySelectorAll('.img-gal');
hiddenElements2.forEach((el2) => observer2.observe(el2))


const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('addit');
        }
		
		else {
            entry.target.classList.remove('addit');
        }
    },{ threshold: 1.5 });
});

const hiddenElements = document.querySelectorAll('.gallery');
hiddenElements.forEach((el) => observer.observe(el))

