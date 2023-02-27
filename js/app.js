const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        setTimeout(() => {
            if (entry.isIntersecting) {
                entry.target.classList.add('showit');
            }

            else {
                entry.target.classList.remove('showit');
            }
        }, 4000)
    }, {threshold:[1.5]});
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el))

