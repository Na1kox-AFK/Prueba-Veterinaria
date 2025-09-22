// Apenas cargue index.html, redirige a cliente/home/home.html
(function () {
  const destino = "Estetica-Profecional/src/app/pages/cliente/home/home.html";
  try {
    window.location.replace(destino); // no deja historial
  } catch (e) {
    window.location.href = destino; // fallback
  }
})();
