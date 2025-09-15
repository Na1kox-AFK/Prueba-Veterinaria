// Cambiar entre Login y Registro
const loginCard = document.getElementById('login-card');
const registerCard = document.getElementById('register-card');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');

showRegister.addEventListener('click', (e) => {
  e.preventDefault();
  loginCard.style.display = 'none';
  registerCard.style.display = 'block';
});

showLogin.addEventListener('click', (e) => {
  e.preventDefault();
  registerCard.style.display = 'none';
  loginCard.style.display = 'block';
});

// Manejador de Login
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  // Aquí iría tu lógica real de autenticación
  alert(`Iniciaste sesión con:\nEmail: ${email}`);
});

// Manejador de Registro
document.getElementById('registerForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  // Aquí iría tu lógica real de registro
  alert(`¡Cuenta creada para ${name} con email ${email}!`);
});
