/* =========================================
   SCROLL GUIDE
========================================= */

const scrollGuide = document.getElementById("scrollGuide");

let guideHidden = false;


/* =========================================
   HIDE GUIDE
========================================= */

function hideScrollGuide() {

    if (guideHidden) {
        return;
    }

    guideHidden = true;

    scrollGuide.classList.add("hidden");
}


/* =========================================
   DETECT PAGE SCROLL
========================================= */

window.addEventListener(
    "scroll",
    () => {

        /*
         * Once user starts scrolling,
         * remove the guide.
         */
        if (window.scrollY > 20) {

            hideScrollGuide();

        }

    },
    {
        passive: true
    }
);


/* =========================================
   TOUCH START
========================================= */

let touchStartY = 0;

window.addEventListener(
    "touchstart",
    (event) => {

        touchStartY =
            event.touches[0].clientY;

    },
    {
        passive: true
    }
);


/* =========================================
   TOUCH MOVE
========================================= */

window.addEventListener(
    "touchmove",
    (event) => {

        const currentY =
            event.touches[0].clientY;

        const distance =
            touchStartY - currentY;


        /*
         * User is swiping upward
         */
        if (distance > 10) {

            hideScrollGuide();

        }

    },
    {
        passive: true
    }
);


/* =========================================
   DISABLE RIGHT CLICK
========================================= */

document.addEventListener(
    "contextmenu",
    (event) => {

        event.preventDefault();

    }
);


/* =========================================
   DISABLE IMAGE DRAGGING
========================================= */

document.addEventListener(
    "dragstart",
    (event) => {

        if (
            event.target &&
            event.target.tagName === "IMG"
        ) {

            event.preventDefault();

        }

    }
);