# Utilería.js — Librería de Validaciones para Formularios

![alt text](img/Captura de pantalla2026-07-04234512).

---

## ¿Qué problema resuelve?

Después de hacer varios formularios a lo largo de mi estancia en el TEC, algo se vuelve evidente: escribir las mismas validaciones una y otra vez deja de tener sentido. Cada formulario nuevo implica volver a programar la validación de correo, la de contraseña, la de edad, aunque ya se hayan resuelto exactamente los mismos casos en un proyecto anterior. Es una tarea repetitiva que consume tiempo que podría usarse en la parte del proyecto que realmente es nueva.

`utileria.js` busca eliminar esa repetición. Concentra las validaciones más comunes de un formulario en un solo archivo, de manera que cualquier proyecto —este formulario, este login, o el que venga después en el proyecto integrador— pueda apoyarse en las mismas funciones sin volver a escribirlas desde cero. Si en algún momento una validación necesita un ajuste, el cambio se hace en un solo lugar y queda disponible para todos los formularios que usan la librería.

---

## Instalación

Solo es agregar el archivo `utileria.js` al proyecto y enlázarlo en el HTML con una etiqueta `<script>`, antes del mimsmo codigo:

```html
<script src="js/utileria.js"></script>
```

A partir de ahí, todas las funciones quedan disponibles a través del objeto `Utileria`, por ejemplo `Utileria.validarCorreo(...)`.

---

## Uso y ejemplos

### 1. `validarCorreo(correo)`
Valida que un texto tenga el formato correcto de un correo electrónico.

```js
let correoUsuario = "juan.perez@email.com";
let esValido = Utileria.validarCorreo(correoUsuario);

if (esValido) {
  console.log("El correo es válido.");
} else {
  console.log("El correo no es válido.");
}
```

### 2. `soloLetras(texto)`
Valida que un texto contenga únicamente letras (incluye vocales acentuadas y la letra ñ), sin números ni símbolos.

```js
let nombreUsuario = "José";
if (Utileria.soloLetras(nombreUsuario)) {
  console.log("El nombre contiene solo letras.");
}
```

### 3. `validarLongitud(numero, maxLongitud)`
Valida que un número no exceda una cantidad máxima de dígitos. Útil para campos como teléfono o código postal.

```js
let telefono = "9511234567";
if (Utileria.validarLongitud(telefono, 10)) {
  console.log("Longitud de teléfono correcta.");
}
```

### 4. `calcularEdad(fechaNacimiento)`
Calcula la edad en años cumplidos a partir de una fecha de nacimiento (formato "AAAA-MM-DD").

```js
let fechaNac = "2000-05-15";
let edad = Utileria.calcularEdad(fechaNac);
console.log("La edad es: " + edad + " años.");
```

### 5. `esMayorDeEdad(fechaNacimiento)`
Determina si una persona es mayor de edad (18 años o más) a partir de su fecha de nacimiento.

```js
let fechaNac = "2005-10-20";
if (Utileria.esMayorDeEdad(fechaNac)) {
  console.log("Es mayor de edad, puede registrarse.");
} else {
  console.log("Aún es menor de edad.");
}
```

### 6. `validarPassword(password)`
Valida que una contraseña cumpla con los siguientes requisitos: mínimo 8 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial.

```js
let pass = "Segura123!";
if (Utileria.validarPassword(pass)) {
  console.log("La contraseña es segura.");
}
```

---

## Funciones adicionales (propias)

### 7. `capitalizarNombre(texto)`
Se agregó porque, en formularios reales, los nombres suelen capturarse en combinaciones inconsistentes de mayúsculas y minúsculas ("maria DE LA cruz", "JUAN perez"). Esta función normaliza el texto a formato de nombre propio, dejando en mayúscula solo la primera letra de cada palabra.

```js
console.log(Utileria.capitalizarNombre("maria DE LA cruz"));
// "Maria De La Cruz"
```

### 8. `calcularDiasParaCumpleanos(fechaNacimiento)`
Pensada para aplicaciones que necesiten enviar recordatorios o promociones de cumpleaños de forma automática. A partir de la fecha de nacimiento, calcula cuántos días faltan para el próximo cumpleaños de la persona.

```js
console.log(Utileria.calcularDiasParaCumpleanos("2005-12-25"));
// número de días que faltan para el 25 de diciembre
```

---

## Pruebas en consola

Además de integrarse en el formulario y el login, cada validación imprime su resultado (`true`/`false`) en la consola del navegador mediante `console.log()`. Para revisarlo: abre `index.html` (o la página en vivo), presiona `F12`, entra a la pestaña **Console**, llena el formulario y envíalo — ahí se mostrará el resultado de cada función.

---

## Capturas de pantalla

### 1. Formulario vacío
![alt text](image-1.png)

### 2. Validación de campos con error (nombre, correo, teléfono)
![alt text](image-2.png)

### 3. Formulario validado con éxito y modal de edad
![alt text](image-3.png)

### 4. Login vacío / con errores
![alt text](image-4.png)

### 5. Consola mostrando resultados correctos (true)
:(aquí pega la captura donde enseñes esto)

### 6. Consola mostrando resultados incorrectos (false)
![alt text](image-5.png)

![alt text](image-6.png)

![alt text](image-7.png)

![alt text](image-8.png)


---

## Enlace a GitHub Pages

El formulario y el login funcionando en vivo pueden consultarse en el siguiente enlace:

🔗 **Ver página en vivo (GitHub Pages):** _[https://emmaabisa.github.io/Actividad-2-Utileria/]_
