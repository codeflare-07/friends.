// Smooth page navigation on buttons and dots
const nextButtons = document.querySelectorAll(".next-btn");
const dots = document.querySelectorAll(".page-indicator .dot");
const pages = document.querySelectorAll(".page");
const progressBar = document.querySelector(".progress");

function scrollToPage(id) {
    const section = document.getElementById(id);
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth" });

    // update active dot
    dots.forEach(dot => {
        dot.classList.toggle("active", dot.dataset.target === id);
    });

    // update progress
    const index = Array.from(pages).findIndex(p => p.id === id);
    const percent = ((index + 1) / pages.length) * 100;
    progressBar.style.width = `${percent}%`;
}

// next buttons
nextButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const nextId = btn.dataset.next;
        scrollToPage(nextId);
    });
});

// dots on the side
dots.forEach(dot => {
    dot.addEventListener("click", () => {
        scrollToPage(dot.dataset.target);
    });
});

// On scroll, adjust dots + progress
function updateOnScroll() {
    let activeId = "page-1";

    pages.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
            activeId = section.id;
        }
    });

    dots.forEach(dot => {
        dot.classList.toggle("active", dot.dataset.target === activeId);
    });

    const index = Array.from(pages).findIndex(p => p.id === activeId);
    const percent = ((index + 1) / pages.length) * 100;
    progressBar.style.width = `${percent}%`;
}

window.addEventListener("scroll", updateOnScroll);

// Simple typing effect on first page
const typingEl = document.getElementById("typing-line");
if (typingEl) {
    const fullText = typingEl.textContent.trim();
    typingEl.textContent = "";
    let i = 0;

    function type() {
        if (i <= fullText.length) {
            typingEl.textContent = fullText.slice(0, i);
            i++;
            setTimeout(type, 60);
        }
    }

    setTimeout(type, 600);
}
