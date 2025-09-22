// ====== CONFIGURACIÓN INICIAL ======
const loginCard = document.getElementById('login-card');
const registerCard = document.getElementById('register-card');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');

// ====== USUARIOS BASE ADMIN ======
const usuariosBase = [
  { nombre: 'Bastian Sanches', email: 'ba.sanches@duocuc.cl', password: 'asd123', rol: 'admin' },
  { nombre: 'Matias Diaz', email: 'admin2@sb.com', password: '123', rol: 'admin' },
  { nombre: 'Elias', email: 'admin3@sb.com', password: '123', rol: 'admin' }
];

// ====== UTILIDADES ======
function guardarLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function obtenerLS(key, defaultValue = null) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
}
function toggleCards(showLoginCard) {
  loginCard.style.display = showLoginCard ? 'block' : 'none';
  registerCard.style.display = showLoginCard ? 'none' : 'block';
}

// ====== CARGAR USUARIOS BASE SI NO EXISTEN ======
if (!localStorage.getItem('usuarios')) {
  guardarLS('usuarios', usuariosBase);
}

// ====== CAMBIAR ENTRE LOGIN Y REGISTRO ======
showRegister.addEventListener('click', (e) => {
  e.preventDefault();
  toggleCards(false);
});
showLogin.addEventListener('click', (e) => {
  e.preventDefault();
  toggleCards(true);
});

// ====== LOGIN ======
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  // Obtener usuarios guardados
  const usuariosGuardados = obtenerLS('usuarios', []);

  // Verificar usuario
  const usuarioEncontrado = usuariosGuardados.find(
    (u) => u.email === email && u.password === password
  );

  if (usuarioEncontrado) {
    alert(`✅ Bienvenido ${usuarioEncontrado.nombre}!`);

    // Guardar sesión activa
    guardarLS('usuarioActivo', usuarioEncontrado);

    // Limpiar formulario
    e.target.reset();

    // Redirigir según rol
    setTimeout(() => {
      if (usuarioEncontrado.rol !== 'user') {
        window.location.href = '../../admin/home-admin/home-admin.html'; // Admin
      } else {
        window.location.href = '../home/home.html'; // Usuario normal
      }
    }, 1000);
  } else {
    alert('⚠️ Correo o contraseña incorrectos');
  }
});

// ====== REGISTRO ======
document.getElementById('registerForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('registerName').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value.trim();

  let usuarios = obtenerLS('usuarios', []);

  // Verificar si ya existe el email
  const existe = usuarios.some((u) => u.email === email);

  if (existe) {
    alert('⚠️ Este correo ya está registrado');
    return;
  }

  // Crear usuario normal (rol user)
  const nuevoUsuario = { nombre: name, email, password, rol: 'user' };
  usuarios.push(nuevoUsuario);

  guardarLS('usuarios', usuarios);
  guardarLS('usuarioActivo', nuevoUsuario); // Sesión activa directa

  alert(`✅ Cuenta creada para ${name} con email ${email}`);

  e.target.reset();
  toggleCards(true); // volver al login
});

// ====== CERRAR SESIÓN ======
function cerrarSesion() {
  localStorage.removeItem('usuarioActivo');
  window.location.href = '../inicio-sesion/inicio-sesion.html';
}

// ====== PROTECCIÓN DE PÁGINAS ======
function protegerPaginaAdmin() {
  const usuarioActivo = obtenerLS('usuarioActivo');
  if (!usuarioActivo || usuarioActivo.rol !== 'admin') {
    window.location.href = '../inicio-sesion/inicio-sesion.html';
  }
}
function protegerPaginaUsuario() {
  const usuarioActivo = obtenerLS('usuarioActivo');
  if (!usuarioActivo || usuarioActivo.rol !== 'user') {
    window.location.href = '../inicio-sesion/inicio-sesion.html';
  } else {
    const dynamicLink = document.getElementById('dynamicLink');
    if (dynamicLink) {
      dynamicLink.textContent = `Hola, ${usuarioActivo.nombre}`;
      dynamicLink.href = '#';
      dynamicLink.style.pointerEvents = 'none';
    }
  }
}
