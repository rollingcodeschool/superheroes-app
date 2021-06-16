//Traigo de localStorage los datos si los hay
let heroes = JSON.parse(localStorage.getItem("heroes")) || [];
let heroe = {};

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
                <td>
                <button class="btn btn-warning" onclick='verHeroe(${index})'>Ver</button>
                <button class="btn btn-info" onclick='irModif(${index})'>Modif</button>
                <button class="btn btn-danger" onclick='borrarHeroe(${index})'>X</button>
                </td>
               
`;
    fila.innerHTML = datos;

    cuerpoTabla.appendChild(fila);
  });
}

function verHeroe(id) {
  // console.log(id);
  heroe = heroes[id];

  document.querySelector("#title_modal").innerText = heroe.alias;
  document.querySelector(".card-title").innerText = heroe.nombre;
  document.querySelector("#imagen_heroe").src = heroe.imagen;
  document.querySelector("#text_poder").innerText = heroe.poder;
  document.querySelector("#text_equipo").innerText = heroe.equipo;
  $("#heroeModal").modal("show");
}

function borrarHeroe(id) {
  heroe = heroes[id];

  let validar = confirm(`Está seguro que quiere borrar a ${heroe.alias}`);

  if (validar) {
    heroes.splice(id, 1);
    localStorage.setItem("heroes", JSON.stringify(heroes));

    alert(`Se borró a ${heroe.alias}`);
    cargarTabla();
  }
}

function irModif(indice) {
  heroe = heroes[indice];
  // console.log(heroe);
  document.querySelector("#modif_title").innerText = heroe.alias;
  document.querySelector("#nombreModif").value = heroe.nombre;
  document.querySelector("#poderModif").value = heroe.poder;
  document.querySelector("#equipoModif").value = heroe.equipo;
  document.querySelector("#imagenModif").value = heroe.imagen;

  $("#modifModal").modal("show");
}

function handleChange(e) {
  console.log(e.target.value);

  heroe = {
    ...heroe,
    [e.target.name]: e.target.value,
  };

  console.log(heroe);
}

if (cuerpoTabla) {
  cargarTabla();
}
