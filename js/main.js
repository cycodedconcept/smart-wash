const animation_elements = document.querySelectorAll(".bag");

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
           entry.target.classList.add("bagchange");
		} else {
			entry.target.classList.remove('bagchange');

		}
	})
}, {
	threshold: 0.4
});

for (let i = 0; i < animation_elements.length; i++) {
	const el = animation_elements[i];

	observer.observe(el);
}


const animation_elements2 = document.querySelectorAll(".image1");

const observer2 = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add("img1");
			setTimeout(() => {
			  entry.target.classList.add("mogun1");
			}, 2000)
		} else {
			entry.target.classList.remove('img1');
			entry.target.classList.remove("mogun1");

		}
	})
}, {
	// threshold: 0.5
});

for (let i = 0; i < animation_elements2.length; i++) {
	const el2 = animation_elements2[i];

	observer2.observe(el2);
}

// for the text
// const animation_text = document.querySelectorAll(".context-item");

// const observerText = new IntersectionObserver((entries) => {
// 	entries.forEach((entry) => {
// 		if (entry.isIntersecting) {
// 			entry.target.classList.add("show");
// 			setTimeout(() => {
// 			  entry.target.classList.add("hide");
// 			}, 2000)
// 		} else {
// 			entry.target.classList.remove('img1');
// 			entry.target.classList.remove("show");
// 			entry.target.classList.remove("hide");
// 		}
// 	})
// }, {
// 	threshold: 0
// });

// for (let i = 0; i < animation_text.length; i++) {
// 	const elText = animation_text[i];

// 	observerText.observe(elText);
// }


const animation_elements3 = document.querySelectorAll(".image2");

const observer3 = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			setTimeout(() => {
				entry.target.classList.add("img2");
			}, 2200)
		} else {
			entry.target.classList.remove("img2");
		}
	})
}, {
	// threshold: 0.3
});

for (let i = 0; i < animation_elements3.length; i++) {
	const el3 = animation_elements3[i];

	observer3.observe(el3);
}


// for the text
// const animation_text2 = document.querySelectorAll(".context-item2");

// const observerText2 = new IntersectionObserver((entries) => {
// 	entries.forEach((entry) => {
// 		if (entry.isIntersecting) {
// 			setTimeout(() => {
// 				entry.target.classList.add("show2");
// 			}, 2220)
// 		} else {
// 			entry.target.classList.remove("show2");
// 		}
// 	})
// }, {
// 	threshold: 0
// });

// for (let i = 0; i < animation_text2.length; i++) {
// 	const elText2 = animation_text2[i];

// 	observerText2.observe(elText2);
// }