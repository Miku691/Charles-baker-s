const totalPages = 11;

let currentPage = 1;

const menuImage = document.getElementById("menuImage");
const pageNumber = document.getElementById("pageNumber");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const fullscreenBtn = document.getElementById("fullscreenBtn");
const menuViewer = document.getElementById("menuViewer");


// ==============================
// Load Menu Page
// ==============================

function showPage(page) {

    currentPage = page;

    const pageNumberFormatted = String(page).padStart(2, "0");

    menuImage.src = `assets/page-${pageNumberFormatted}.webp`;

    menuImage.alt = `Charles Bakers Menu - Page ${page}`;

    pageNumber.textContent = page;

    updateButtons();
}


// ==============================
// Previous / Next Buttons
// ==============================

function updateButtons() {

    prevBtn.disabled = currentPage === 1;

    nextBtn.disabled = currentPage === totalPages;
}


prevBtn.addEventListener("click", () => {

    if (currentPage > 1) {
        showPage(currentPage - 1);
    }

});


nextBtn.addEventListener("click", () => {

    if (currentPage < totalPages) {
        showPage(currentPage + 1);
    }

});


// ==============================
// Keyboard Navigation
// ==============================

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowLeft") {

        if (currentPage > 1) {
            showPage(currentPage - 1);
        }

    }

    if (event.key === "ArrowRight") {

        if (currentPage < totalPages) {
            showPage(currentPage + 1);
        }

    }

});


// ==============================
// Swipe Navigation
// ==============================

let touchStartX = 0;
let touchEndX = 0;


menuViewer.addEventListener("touchstart", (event) => {

    touchStartX = event.changedTouches[0].screenX;

}, { passive: true });


menuViewer.addEventListener("touchend", (event) => {

    touchEndX = event.changedTouches[0].screenX;

    handleSwipe();

}, { passive: true });


function handleSwipe() {

    const swipeDistance = touchEndX - touchStartX;

    // Swipe left → next page
    if (swipeDistance < -50) {

        if (currentPage < totalPages) {
            showPage(currentPage + 1);
        }

    }

    // Swipe right → previous page
    if (swipeDistance > 50) {

        if (currentPage > 1) {
            showPage(currentPage - 1);
        }

    }
}


// ==============================
// Fullscreen
// ==============================

fullscreenBtn.addEventListener("click", async () => {

    try {

        if (!document.fullscreenElement) {

            await menuViewer.requestFullscreen();

            fullscreenBtn.textContent = "✕ Exit Fullscreen";

        } else {

            await document.exitFullscreen();

            fullscreenBtn.textContent = "⛶ Fullscreen";
        }

    } catch (error) {

        console.log("Fullscreen not supported:", error);

    }

});


document.addEventListener("fullscreenchange", () => {

    if (!document.fullscreenElement) {

        fullscreenBtn.textContent = "⛶ Fullscreen";

    }

});


// ==============================
// Disable Right Click
// ==============================

document.addEventListener("contextmenu", (event) => {

    event.preventDefault();

});


// ==============================
// Prevent Image Dragging
// ==============================

menuImage.addEventListener("dragstart", (event) => {

    event.preventDefault();

});


// ==============================
// Initial Page
// ==============================

showPage(1);