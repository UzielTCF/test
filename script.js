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
<script>
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
</script>
