const randomValue = crypto.getRandomValues(new Uint8Array(16));
const randomValueHex = Array.from(randomValue).map(byte => byte.toString(16).padStart(2, '0')).join('');
document.cookie = `myCookie=${randomValueHex}`;


document.cookie = `myCookie=${randomValueHex}; SameSite=None; Secure`;

// Navigation - active tabs
const nodes = document.getElementsByClassName("navbar_link");
for (let i = 0; i < nodes.length; i++) {
  nodes[i].addEventListener("click", triggerFunc);
}

function triggerFunc(e) {
    divSelector(e);
    refreshProjects();
}

function divSelector(event) {
    removeAllActives();
    if (event.currentTarget.className === "navbar_link") {
        event.currentTarget.className += ' active';
    } else if (event.currentTarget.className === "navbar_logo_link") {
        nodes[0].className += ' active'
    }
}

function removeAllActives() {
    const actives = document.getElementsByClassName("active");
  for (let i = 0; i < actives.length; i++) {
    actives[i].classList.remove('active');
    }
}

// Scrolling on projects page
const scrollTrigger = document.querySelector(".scroll-content");
const scrollTarget = document.getElementById("scroll_to");
const logo = document.querySelector(".navbar_logo_link");

scrollTrigger.addEventListener("click", scrollFunction);
logo.addEventListener("click", triggerFunc);

function scrollFunction() {

    if (scrollTrigger.classList.contains("down")) {
        scrollTarget.scrollIntoView({
            block: 'start',
            behavior: 'smooth',
            inline: 'start'
        });
    } else {
        scrollTarget.scrollIntoView({
            block: 'end',
            behavior: 'smooth',
            inline: 'start'
        });
    }

    toggleClass("down", scrollTrigger)
}

function toggleClass(className, target) {
    target.classList.toggle(className);
}

function refreshProjects() {
    scrollTrigger.classList.remove("down");
}


// toggle down class at 65vh of Projects page
if (
    "IntersectionObserver" in window &&
    "IntersectionObserverEntry" in window &&
    "intersectionRatio" in window.IntersectionObserverEntry.prototype
  ) {
  let observer = new IntersectionObserver(entries => {
    if (entries[0].boundingClientRect.y < 0) {
        scrollTrigger.classList.add("down");
    } else {
        scrollTrigger.classList.remove("down");
    }
  });
  observer.observe(document.querySelector("#middle-of-project-page-anchor"));
  }

// @todo: trigger refreshProjects onScroll

// const container = document.querySelector(".section-projects");
// const arrow = document.querySelector(".scroll-content")
// const windowHeight = window.innerHeight;
// const windowWidth = window.innerWidth;
// const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

// const windowScrollArea = vh*2.5;
// const containerScrollArea = 1.5*vh

// // update position of square 1 and square 2 when scroll event fires.
// window.addEventListener('scroll', function() {
//     var scrollTop = window.scrollY || window.scrollTop || 0;
//     var scrollPercent = scrollTop/windowScrollArea || 0;

//     console.log(`
//     (windowHeight - scrollTop) < 0): ${(windowHeight - scrollTop) < 0}
//     scrollTop < windowScrollArea: ${(scrollTop + 0.5 * vh) < windowScrollArea}
//     `)

//     // if it's a top of our project page container
//     if ((windowHeight - scrollTop) < 0 && (scrollTop + 0.6 * vh) < windowScrollArea) {
//             // arrow.computedStyleMap.top = scrollPercent*10 + "vh"
//             arrowTopValue = scrollPercent*100+20 + "vh"

//             console.log (`
//             windowHeight: ${windowHeight}
//             scrollTop: ${scrollTop}
//             windowScrollArea: ${windowScrollArea}
//             windowScrollArea + 50vh: ${windowScrollArea + 0.5 * vh}
//             scrollPercent: ${scrollPercent}
//             arrow.style.top: ${arrow.style.top}
//             arrowTopValue: ${arrowTopValue}
//             `)
//             arrow.classList = "scroll-content"
//             arrow.style.top = arrowTopValue;
//     } 
//     else if ((windowHeight - scrollTop) < 0 && (scrollTop  + 0.4 * vh) < windowScrollArea && scrollTop < windowScrollArea)  {
//         arrow.classList = "scroll-content down"
//         arrow.style.top = "120vh";
//     } 
//     else {
//         arrow.classList = "scroll-content"
//         arrow.style.top = "50vh";
//         console.log(arrow.style.top)
//     }
// });