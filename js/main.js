const randomValue = crypto.getRandomValues(new Uint8Array(16));
const randomValueHex = Array.from(randomValue).map(byte => byte.toString(16).padStart(2, '0')).join('');
document.cookie = `myCookie=${randomValueHex}`;


document.cookie = `myCookie=${randomValueHex}; SameSite=None; Secure`;

// Navigation - active tabs && to the top button behavior
const sections = document.querySelectorAll("section");
const navAnchors = document.querySelectorAll("nav .navbar-menu ul.navbar_list li.navbar_item a.navbar_link");
const fixedUp = document.querySelector(".fixed-up");
window.onscroll = () => {
  let current = "";
  let current_middle = "";
  let vh = window.innerHeight;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute("id");
    }
    if (pageYOffset >= sectionTop - (vh/3*2)) {
        current_middle = section.getAttribute("id");
    }
  });

  navAnchors.forEach((a) => {
    a.classList.remove("active");
    if (a.classList.contains(current)) {
      a.classList.add("active");
    }
  });

  if (current_middle === "home") {
    fixedUp.style.display = "none";
  } else if (window.innerWidth <= 640) {
    fixedUp.style.display = "none";
  } else {
    fixedUp.style.display = "flex";
  }
};


// Movements of "More Projects" on projects page
function toggleClass(className, target) {
    target.classList.toggle(className);
}

function refreshProjects() {
    scrollTrigger.classList.remove("down");
}

// Refresh with logo click
const logo = document.querySelector(".navbar_logo_link");
logo.addEventListener("click", refreshProjects);

// Refresh with nav elems click
const nodes = document.getElementsByClassName("navbar_link");
for (let i = 0; i < nodes.length; i++) {
  nodes[i].addEventListener("click", refreshProjects);
}

const scrollTarget = document.getElementById("projects");
const scrollTrigger = document.querySelector(".scroll-content");

// move up/down on click
scrollTrigger.addEventListener("click", scrollFunction);

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

// move up/down on scroll
if (
    "IntersectionObserver" in window &&
    "IntersectionObserverEntry" in window &&
    "intersectionRatio" in window.IntersectionObserverEntry.prototype
    ) {
      
    // toggle down class at 65vh of Projects page
    let observer = new IntersectionObserver(entries => {
        if (entries[0].boundingClientRect.y < 0) {
            scrollTrigger.classList.add("down");
        } else {
            scrollTrigger.classList.remove("down");
        }
    });
    observer.observe(document.querySelector("#middle-of-project-page-anchor"));
}

// close nav on mobile
navLinksMobile = document.querySelectorAll(".navigation__link");

checkboxMobile = document.getElementById("navi-toggle");

navLinksMobile.forEach(link => {
    link.addEventListener("click", () => {
        checkboxMobile.checked = false;
    })
})