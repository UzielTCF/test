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
document.addEventListener("DOMContentLoaded", function() {
    // Menu toggle (si existe)
    const menuToggle = document.getElementById("menuToggle");
    if(menuToggle) {
        menuToggle.addEventListener("click", () => {
            const nav = document.getElementById("mobileNav");
            if(nav) {
                nav.style.display = nav.style.display === "flex" ? "none" : "flex";
            }
        });
    }
    
    // ===== CARRUSEL SUPERIOR CORREGIDO =====
    const topSlides = document.getElementById("topSlides");
    const prevBtn = document.getElementById("topPrev");
    const nextBtn = document.getElementById("topNext");
    
    // Verificar que todos los elementos existen
    if(topSlides && prevBtn && nextBtn) {
        const total = topSlides.children.length;
        
        // Verificar que hay imágenes
        if(total === 0) {
            console.warn("No hay imágenes en el carrusel");
            return;
        }
        
        let idx = 0;
        
        // Obtener el ancho real de una imagen (podría ser diferente al fijo 360)
        function getSlideWidth() {
            if(topSlides.children.length > 0) {
                return topSlides.children[0].offsetWidth;
            }
            return 360; // valor por defecto
        }
        
        function update() {
            const width = getSlideWidth();
            topSlides.style.transform = `translateX(-${idx * width}px)`;
        }
        
        // Event listeners para los botones
        nextBtn.addEventListener("click", () => { 
            idx = (idx + 1) % total; 
            update(); 
        });
        
        prevBtn.addEventListener("click", () => { 
            idx = (idx - 1 + total) % total; 
            update(); 
        });
        
        // Auto-play cada 4.8 segundos
        let interval = setInterval(() => { 
            idx = (idx + 1) % total; 
            update(); 
        }, 4800);
        
        // Pausar auto-play cuando el mouse está sobre el carrusel
        const carousel = document.getElementById("topCarousel");
        if(carousel) {
            carousel.addEventListener("mouseenter", () => {
                clearInterval(interval);
            });
            
            carousel.addEventListener("mouseleave", () => {
                interval = setInterval(() => { 
                    idx = (idx + 1) % total; 
                    update(); 
                }, 4800);
            });
        }
        
        // Actualizar en caso de resize de ventana
        window.addEventListener("resize", () => {
            update();
        });
        
        // Actualizar inicial
        setTimeout(update, 100); // Pequeño delay para asegurar que las imágenes cargaron
    } else {
        console.warn("No se encontraron los elementos del carrusel");
    }
});
