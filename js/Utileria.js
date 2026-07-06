const form = document.getElementById("formulario");

const modalOverlay = document.getElementById("modalOverlay");
const modalEdadValor = document.getElementById("modalEdadValor");
const modalDetalle = document.getElementById("modalDetalle");

document.getElementById("cerrarModal").addEventListener("click", () => {
  modalOverlay.classList.remove("activo");
});

function marcarError(idInput, mensaje) {
  document.getElementById(idInput).style.borderColor = "var(--terracotta)";
  document.getElementById("err-" + idInput.replace("err-", "")).textContent = mensaje;
}

function limpiarErrores() {
  ["nombre", "correo", "telefono", "fecha", "password"].forEach((id) => {
    document.getElementById(id).style.borderColor = "";
    document.getElementById("err-" + id).textContent = "";
  });
}

function log(mensaje, ok) {
  console.log((ok ? "✓ " : "✗ ") + mensaje);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  limpiarErrores();

  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const telefono = document.getElementById("telefono").value;
  const fecha = document.getElementById("fecha").value;
  const password = document.getElementById("password").value;

  let valido = true;

  const nombreValido =
    nombre.trim().length > 0 &&
    nombre.trim().split(/\s+/).every((palabra) => Utileria.soloLetras(palabra));
  log("soloLetras(nombre) → " + nombreValido, nombreValido);
  if (!nombreValido) {
    document.getElementById("err-nombre").textContent = "Solo letras, sin números ni símbolos.";
    document.getElementById("nombre").style.borderColor = "var(--terracotta)";
    valido = false;
  } else {
    document.getElementById("nombre").value = Utileria.capitalizarNombre(nombre);
  }

  const correoValido = Utileria.validarCorreo(correo);
  log("validarCorreo(correo) → " + correoValido, correoValido);
  if (!correoValido) {
    document.getElementById("err-correo").textContent = "Formato de correo inválido.";
    document.getElementById("correo").style.borderColor = "var(--terracotta)";
    valido = false;
  }

  const telefonoValido = Utileria.validarLongitud(telefono, 10) && /^\d+$/.test(telefono);
  log("validarLongitud(telefono, 10) → " + telefonoValido, telefonoValido);
  if (!telefonoValido) {
    document.getElementById("err-telefono").textContent = "Máximo 10 dígitos numéricos.";
    document.getElementById("telefono").style.borderColor = "var(--terracotta)";
    valido = false;
  }

  let edad = NaN;
  let mayorEdad = false;
  if (!fecha) {
    log("calcularEdad(fecha) → sin fecha", false);
    document.getElementById("err-fecha").textContent = "Selecciona tu fecha de nacimiento.";
    document.getElementById("fecha").style.borderColor = "var(--terracotta)";
    valido = false;
  } else {
    edad = Utileria.calcularEdad(fecha);
    mayorEdad = Utileria.esMayorDeEdad(fecha);
    log("calcularEdad(fecha) → " + edad + " años", true);
    log("esMayorDeEdad(fecha) → " + mayorEdad, mayorEdad);
    const diasCumple = Utileria.calcularDiasParaCumpleanos(fecha);
    log("calcularDiasParaCumpleanos(fecha) → " + diasCumple + " días", true);
  }

  const passwordValida = Utileria.validarPassword(password);
  log("validarPassword(password) → " + passwordValida, passwordValida);
  if (!passwordValida) {
    document.getElementById("err-password").textContent =
      "Mín. 8 caracteres, mayúscula, minúscula, número y carácter especial.";
    document.getElementById("password").style.borderColor = "var(--terracotta)";
    valido = false;
  }

  if (valido) {
    log("Formulario válido. Mostrando modal de edad.", true);
    modalEdadValor.textContent = edad;
    modalDetalle.textContent = mayorEdad
      ? "Eres mayor de edad (esMayorDeEdad → true)"
      : "Eres menor de edad (esMayorDeEdad → false)";
    modalOverlay.classList.add("activo");
  } else {
    log("Corrige los campos marcados en rojo.", false);
  }
});
