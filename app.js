//Traigo de localStorage los datos si los hay
let heroes = JSON.parse(localStorage.getItem("heroes")) || [];

//Capturo cada elemento del formulario de registro
let alias = document.querySelector("#aliasText");
let nombre = document.querySelector("#nameText");
let poder = document.querySelector("#powerText");
let equipo = document.querySelector("#teamText");
let imagen = document.querySelector("#imgText");

//capturo el tbody de la tabla
let cuerpoTabla = document.querySelector("#cuerpoTabla") || "";

//Creo la clase para crear las instancias de heroe
class Heroe {
  constructor(alias, nombre, poder, equipo, imagen) {
    this.nombre = nombre;
    this.alias = alias;
    this.poder = poder;
    this.equipo = equipo;
    this.imagen = imagen;
  }
}

//Agregar heroes
const addHeroes = function () {
  if (alias.value && nombre.value && poder.value && equipo.value) {
    if (!imagen.value) {
      imagen.value =
        "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png";
    }

    heroes.push(
      new Heroe(
        alias.value.toUpperCase(),
        nombre.value,
        poder.value,
        equipo.value,
        imagen.value
      )
    );
    localStorage.setItem("heroes", JSON.stringify(heroes));
    updateDatos();
  } else {
    alert("Faltan datos");
  }
};

function updateDatos() {
  alias.value = "";
  nombre.value = "";
  poder.value = "";
  equipo.value = "";
  imagen.value = "";
}

function cargarTabla() {
  cuerpoTabla.innerHTML = "";
  heroes = JSON.parse(localStorage.getItem("heroes")) || [];
  heroes.forEach(function (heroe, index) {
    let fila = document.createElement("tr");
    let datos = `
                <th scope="row">${heroe.alias}</th>
                <td>${heroe.nombre}</td>
                <td>${heroe.poder}</td>
                <td>${heroe.equipo}</td>
               
`;
    fila.innerHTML = datos;

    cuerpoTabla.appendChild(fila);
  });
}

if (cuerpoTabla) {
  cargarTabla();
}
