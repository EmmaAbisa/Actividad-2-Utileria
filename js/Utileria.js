const form = document.getElementById("formulario");

const modalOverlay = document.getElementById("modalOverlay");
const modalEdadValor = document.getElementById("modalEdadValor");
const modalDetalle = document.getElementById("modalDetalle");

document.getElementById("cerrarModal").addEventListener("click", () => {
  modalOverlay.classList.remove("activo");
});

// Muestra el mensaje de error debajo del campo, forzando estilos
// para que SIEMPRE se vea, sin importar lo que diga el CSS.
function mostrarError(idCampo, mensaje) {
  const input = document.getElementById(idCampo);
  const errDiv = document.getElementById("err-" + idCampo);

  input.style.borderColor = "var(--terracotta)";

  errDiv.textContent = mensaje;
  errDiv.style.display = "block";
  errDiv.style.color = "var(--terracotta)";
  errDiv.style.marginTop = "4px";
  errDiv.style.fontSize = "0.85rem";
}

function limpiarErrores() {
  ["nombre", "correo", "telefono", "fecha", "password"].forEach((id) => {
    document.getElementById(id).style.borderColor = "";
    const errDiv = document.getElementById("err-" + id);
    errDiv.textContent = "";
    errDiv.style.display = "none";
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

  // Siempre probamos capitalizarNombre, esté bien o mal escrito el nombre,
  // para poder ver en consola si la función funciona como debe.
  const nombreCapitalizado = Utileria.capitalizarNombre(nombre);
  log("capitalizarNombre(nombre) → " + nombreCapitalizado, true);

  if (!nombreValido) {
    mostrarError("nombre", "Solo letras, sin números ni símbolos.");
    valido = false;
  } else {
    document.getElementById("nombre").value = nombreCapitalizado;
  }

  const correoValido = Utileria.validarCorreo(correo);
  log("validarCorreo(correo) → " + correoValido, correoValido);
  if (!correoValido) {
    mostrarError("correo", "Formato de correo inválido.");
    valido = false;
  }

  const telefonoValido = Utileria.validarLongitud(telefono, 10) && /^\d+$/.test(telefono);
  log("validarLongitud(telefono, 10) → " + telefonoValido, telefonoValido);
  if (!telefonoValido) {
    mostrarError("telefono", "Máximo 10 dígitos numéricos.");
    valido = false;
  }

  let edad = NaN;
  let mayorEdad = false;
  if (!fecha) {
    log("calcularEdad(fecha) → sin fecha", false);
    mostrarError("fecha", "Selecciona tu fecha de nacimiento.");
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
    mostrarError(
      "password",
      "Mín. 8 caracteres, mayúscula, minúscula, número y carácter especial."
    );
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
