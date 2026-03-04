<script>
document.getElementById("formBoletin").addEventListener("submit", function(e) {
    e.preventDefault(); // Evita recargar la página
    alert("Gracias por suscribirte");
    this.reset(); // Limpia el formulario
});
</script>
<script>
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
});
</script>

let index = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slides img').length;

document.querySelector('.next').addEventListener('click', () => {
    index = (index + 1) % totalSlides;
    slides.style.transform = `translateX(-${index * 100}%)`;
});

document.querySelector('.prev').addEventListener('click', () => {
    index = (index - 1 + totalSlides) % totalSlides;
    slides.style.transform = `translateX(-${index * 100}%)`;
});

// Auto-carrusel cada 4 segundos
setInterval(() => {
    index = (index + 1) % totalSlides;
    slides.style.transform = `translateX(-${index * 100}%)`;
}, 4000);
 document.addEventListener("DOMContentLoaded", function() {
            // menu toggle (si existiera)
            const menuToggle = document.getElementById("menuToggle");
            if(menuToggle) {
                menuToggle.addEventListener("click", () => {
                    const nav = document.getElementById("mobileNav");
                    if(nav) nav.style.display = nav.style.display === "flex" ? "none" : "flex";
                });
            }
            // carrusel superior
            const topSlides = document.getElementById("topSlides");
            const prevBtn = document.getElementById("topPrev");
            const nextBtn = document.getElementById("topNext");
            if(topSlides && prevBtn && nextBtn) {
                const total = topSlides.children.length;
                let idx = 0;
                const slideWidth = 360;
                function update() { topSlides.style.transform = `translateX(-${idx * slideWidth}px)`; }
                nextBtn.addEventListener("click", () => { idx = (idx + 1) % total; update(); });
                prevBtn.addEventListener("click", () => { idx = (idx - 1 + total) % total; update(); });
                setInterval(() => { idx = (idx + 1) % total; update(); }, 4800);
            }
        });
