<script>
document.getElementById("formBoletin").addEventListener("submit", function(e) {
    e.preventDefault(); // Evita recargar la página
    alert("Gracias por suscribirte");
    this.reset(); // Limpia el formulario
});
</script>

