/**
 * 
 */

const Utileria = (function () {
  "use strict";

  // 

  /**
   * Valida que un texto tenga formato de correo electrónico.
   *
   * @param {string} correo  Texto a validar, ej. "ana@dominio.com".
   * @returns {boolean} true si el formato es válido, false si no.
   *
   * @example
   * validarCorreo("ana@dominio.com");
   * validarCorreo("ana@dominio");     
   */
  function validarCorreo(correo) {
    if (typeof correo !== "string") return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return regex.test(correo.trim());
  }

  /**
   
   *
   * @param {string} texto -
   * @returns {boolean}
   *
   * @example
   * 
   */
  function soloLetras(texto) {
    if (typeof texto !== "string" || texto.trim() === "") return false;
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+$/;
    return regex.test(texto);
  }

  /**
   * 
   *
   * @param {number|string} numero 
   * @param {number} maxLongitud 
   * @returns {boolean} 
   *
   * @example
   * validarLongitud(9511234567, 10); // true  (10 dígitos)
   * validarLongitud(95112345678, 10); // false (11 dígitos)
   */
  function validarLongitud(numero, maxLongitud) {
    if (numero === null || numero === undefined) return false;
    const soloDigitos = String(numero).replace(/\D/g, "");
    if (soloDigitos === "") return false;
    return soloDigitos.length <= maxLongitud;
  }

  /**
   
   *
   * @param {string|Date} fechaNacimiento 
   * @returns {number} 
   *
   * @example
   
   */
  function calcularEdad(fechaNacimiento) {
    const nacimiento = new Date(fechaNacimiento);
    if (isNaN(nacimiento.getTime())) return NaN;

    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mesActual = hoy.getMonth() - nacimiento.getMonth();
    const noHaCumplidoAun =
      mesActual < 0 || (mesActual === 0 && hoy.getDate() < nacimiento.getDate());

    if (noHaCumplidoAun) edad--;
    return edad;
  }

  /**
   
   *
   * @param {string|Date} fechaNacimiento 
   * @returns {boolean} 
   *
   * @example
   * esMayorDeEdad("2005-07-04"); // true
   * esMayorDeEdad("2015-07-04"); // false
   */
  function esMayorDeEdad(fechaNacimiento) {
    const edad = calcularEdad(fechaNacimiento);
    if (isNaN(edad)) return false;
    return edad >= 18;
  }

  /**
   
   *
   * @param {string} password 
   * @returns {boolean} 
   *
   * @example
   
   */
  function validarPassword(password) {
    if (typeof password !== "string") return false;
    const tieneLongitudMinima = password.length >= 8;
    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneMinuscula = /[a-z]/.test(password);
    const tieneNumero = /[0-9]/.test(password);
    const tieneEspecial = /[^A-Za-z0-9]/.test(password);

    return (
      tieneLongitudMinima &&
      tieneMayuscula &&
      tieneMinuscula &&
      tieneNumero &&
      tieneEspecial
    );
  }


  /**
   
   * @param {string} texto - Nombre o texto a capitalizar.
   * @returns {string} Texto capitalizado palabra por palabra.
   *
   * @example
  
   */
  function capitalizarNombre(texto) {
    if (typeof texto !== "string") return "";
    return texto
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
      .join(" ");
  }

  /**
  
   *
   * @param {string|Date} fechaNacimiento 
   * @returns {number}
   *
   * @example

   */
  function calcularDiasParaCumpleanos(fechaNacimiento) {
    const nacimiento = new Date(fechaNacimiento);
    if (isNaN(nacimiento.getTime())) return NaN;

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    let proximoCumple = new Date(
      hoy.getFullYear(),
      nacimiento.getMonth(),
      nacimiento.getDate()
    );
    proximoCumple.setHours(0, 0, 0, 0);

    if (proximoCumple.getTime() < hoy.getTime()) {
      proximoCumple.setFullYear(hoy.getFullYear() + 1);
    }

    const msPorDia = 1000 * 60 * 60 * 24;
    return Math.round((proximoCumple.getTime() - hoy.getTime()) / msPorDia);
  }

  // ==========================================================================
  // EXPORTAR API PÚBLICA
  // ==========================================================================
  return {
    validarCorreo,
    soloLetras,
    validarLongitud,
    calcularEdad,
    esMayorDeEdad,
    validarPassword,
    capitalizarNombre,
    calcularDiasParaCumpleanos,
  };
})();


if (typeof module !== "undefined" && module.exports) {
  module.exports = Utileria;
}