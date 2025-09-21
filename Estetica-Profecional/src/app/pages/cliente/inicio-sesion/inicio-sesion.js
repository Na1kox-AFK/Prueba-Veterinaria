// ====== Configuración inicial ======
const loginCard = document.getElementById('login-card');
const registerCard = document.getElementById('register-card');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');

// --- Usuarios base ---
const usuariosBase = [
  { nombre: 'Admin Uno', email: 'admin1@clinica.com', password: '123456' },
  { nombre: 'Admin Dos', email: 'admin2@clinica.com', password: '123456' },
  { nombre: 'Admin Tres', email: 'admin3@clinica.com', password: '123456' },
];

// Cargar usuarios iniciales en localStorage si no existen
if (!localStorage.getItem('usuarios')) {
  localStorage.setItem('usuarios', JSON.stringify(usuariosBase));
}

// ====== Cambiar entre Login y Registro ======
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

// ====== Manejador de Login ======
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  // Obtener usuarios del localStorage
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  // Verificar usuario
  const usuarioEncontrado = usuarios.find(
    (u) => u.email === email && u.password === password
  );

  if (usuarioEncontrado) {
    alert(`✅ Bienvenido ${usuarioEncontrado.nombre}!`);
    // Guardar sesión activa
    localStorage.setItem('usuarioActivo', JSON.stringify(usuarioEncontrado));

    // Limpiar formulario
    e.target.reset();

    // Redirigir a home.html después de 1 seg
    setTimeout(() => {
      window.location.href = '../home/home.html'; // cambia ruta si es necesario
    }, 1000);
  } else {
    alert('⚠️ Correo o contraseña incorrectos');
  }
});

// ====== Manejador de Registro ======
document.getElementById('registerForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('registerName').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value.trim();

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  // Verificar si ya existe el email
  const existe = usuarios.some((u) => u.email === email);

  if (existe) {
    alert('⚠️ Este correo ya está registrado');
    return;
  }

  // Crear nuevo usuario
  const nuevoUsuario = { nombre: name, email: email, password: password };
  usuarios.push(nuevoUsuario);

  // Guardar en localStorage
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  alert(`✅ Cuenta creada para ${name} con email ${email}`);

  // Limpiar formulario y volver al login
  e.target.reset();
  registerCard.style.display = 'none';
  loginCard.style.display = 'block';
});

// ====== (Opcional) Cerrar sesión desde home.html ======
/*
En tu home.html puedes agregar:
<button onclick="cerrarSesion()">Cerrar Sesión</button>

Y en tu JS:
*/
function cerrarSesion() {
  localStorage.removeItem('usuarioActivo');
  window.location.href = '../inicio-sesion/inicio-sesion.html'; // vuelve al login
}

// ====== (Opcional) Protección de home.html ======
/*
En tu home.html añade este JS para no entrar sin login:

if (!localStorage.getItem('usuarioActivo')) {
  window.location.href = '../inicio-sesion/inicio-sesion.html';
}
*/
