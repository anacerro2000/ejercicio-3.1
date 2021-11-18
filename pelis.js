

// MODELO DE DATOS

let mis_peliculas_iniciales = [
    {titulo: "Superlópez",   director: "Javier Ruiz Caldera", "miniatura": "files/superlopez.png"},
    {titulo: "Jurassic Park", director: "Steven Spielberg", "miniatura": "files/jurassicpark.png"},
    {titulo: "Interstellar",  director: "Christopher Nolan", "miniatura": "files/interstellar.png"},
];

let mis_peliculas = [];

const postAPI = async (peliculas) => {
    try {
        const res = await fetch("https://api.myjson.com/bins", {
          method: 'POST', 
          headers:{
              "Content-Type": "application/json",
          },
          body: JSON.stringify(peliculas)
        });
        const {uri} = await res.json();
        return uri;               
    } catch (err) {
        alert("No se ha podido crear el endpoint.")
    }
}
// Lee la información guardada en myjson a través de la API
const getAPI = async () => {
  try {
    const res = await fetch(localStorage.URL);
    return res.json();
  } catch (e) {
    alert("No se ha podido recuperar la información.")
  }
}
// Actualiza la información a través de la API
const updateAPI = async (peliculas) => {
  try {
    await fetch(localStorage.URL, {
      method: 'PUT', 
      headers:{
              "Content-Type": "application/json",
          },
      body: JSON.stringify(peliculas)});
  } catch(e) {
    alert("Ha ocurrido un error");
    return;
  }
}

// VISTAS
const indexView = (peliculas) => {
    let i=0;
    let view = "";

    while(i < peliculas.length) {
      view += `
        <div class="movie">
           <div class="movie-img">
                <img data-my-id="${i}" src="${peliculas[i].miniatura}" onerror="this.src='files/placeholder.png'"/>
           </div>
           <div class="title">
               ${peliculas[i].titulo || "<em>Sin título</em>"}
           </div>
           <div class="actions">
                <!--Insertar aquí botones de "Show" y "Delete"-->
               <button class="edit" data-my-id="${i}">editar</button>
            </div>
        </div>\n`;
      i = i + 1;
    };

    view += `<div class="actions">
                <!--Insertar aquí botones de "Añadir" y "Reset"-->
                <button class="new" id="new" data-my-id="${i}">add movie</button>
                <button class="reset" id ="reset" data-my-id="${i}">reset all</button>
            </div>`;

    return view;
};

const editView = (i, pelicula) => {
    return `<h2>Editar Película </h2>
        <div class="field">
        Título <br>
        <input  type="text" id="titulo" placeholder="Título" 
                value="${pelicula.titulo}">
        </div>
        <div class="field">
        Director <br>
        <input  type="text" id="director" placeholder="Director" 
                value="${pelicula.director}">
        </div>
        <div class="field">
        Miniatura <br>
        <input  type="text" id="miniatura" placeholder="URL de la miniatura" 
                value="${pelicula.miniatura}">
        </div>
        <div class="actions">
            <button class="update" data-my-id="${i}">
                Actualizar
            </button>
            <button class="index">
                Volver
            </button>
       `;
}

const showView = (pelicula) => {
    // Completar: genera HTML con información de la película
    // ...

    return `<h2>Informacion de la pelicula <\h2>
    <div class= "field">
    <h3> Titulo <\h3>
    <h1> ${pelicula.titulo}</h1>
    </div>
    <div class= "field">
    <h3> Director <\h3>
    <h1> ${pelicula.director}</h1>
    </div>
    <div class="field">
    <h3>Miniatura</h4>
    <h1>${pelicula.miniatura}</h1>
    </div>
    <div class="actions">
        <button class="index" id="volver">
            Volver
        </button>
    `;
}

const newView = () => { 
    // Completar: genera formulario para crear nuevo quiz
    // ...

    return `<h2>Crear Película</h2>
    <div class="field">
    Titulo <br>
    <input type="text" id="titulo" placeholder= "Titulo">
    <\div>
    <div class="field">
    Director <br>
    <input  type="text" id="director" placeholder="Director">
    </div>
    <div class="field">
    Miniatura <br>
    <input  type="text" id="miniatura" placeholder="URL de la miniatura">
    </div>
    <div class="actions">
        <button class="create" id ="create">Crear</button>
        <button class="index" id ="volver">Volver</button>`;
}


// CONTROLADORES 
const indexContr = () => {
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
    document.getElementById('main').innerHTML = indexView(mis_peliculas);
};

const showContr = (i) => {
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
    document.getElementById('main').innerHTML = indexView(mis_peliculas);
};

const newContr = () => {
    document.getElementById('main').innerHTML = newView();
};

const createContr = () => {
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
    var nueva_pelicula = {
        titulo : document.getElementById("titulo").value,
        director : document.getElementById("director").value,
        miniatura : document.getElementById("miniatura").value};
    mis_peliculas.push(nueva_pelicula);
    localStorage.mis_peliculas = JSON.stringify(mis_peliculas);
    indexContr();
};

const editContr = (i) => {
    let pelicula = JSON.parse(localStorage.mis_peliculas)[i];
    document.getElementById('main').innerHTML = editView(i, pelicula);
};

const updateContr = (i) => {
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
    mis_peliculas[i].titulo    = document.getElementById('titulo').value;
    mis_peliculas[i].director  = document.getElementById('director').value;
    mis_peliculas[i].miniatura = document.getElementById('miniatura').value;
    localStorage.mis_peliculas = JSON.stringify(mis_peliculas);
    indexContr();
};

const deleteContr = (i) => {
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
    var r = confirm("Seguro que quieres eliminarla?");
    if (r == true) {
        mis_peliculas.splice(i,1);
        localStorage.mis_peliculas = JSON.stringify(mis_peliculas);
        indexContr();
    } else {
        indexContr();
    }
};

const resetContr = () => {
    // Completar:  controlador que reinicia el modelo guardado en localStorage con las películas originales
    
    localStorage.mis_peliculas = JSON.stringify(mis_peliculas_iniciales);
    indexContr();
};

// ROUTER de eventos
const matchEvent = (ev, sel) => ev.target.matches(sel);
const myId = (ev) => Number(ev.target.dataset.myId);

document.addEventListener('click', ev => {
    if      (matchEvent(ev, '.index'))  indexContr  ();
    else if (matchEvent(ev, '.edit'))   editContr   (myId(ev));
    else if (matchEvent(ev, '.update')) updateContr (myId(ev));
    else if (matchEvent(ev, '.show')) showContr (myId(ev));
    else if (matchEvent(ev, '.new')) newContr (myId(ev));
    else if (matchEvent(ev, '.create')) createContr (myId(ev));
    else if (matchEvent(ev, '.delete')) deleteContr (myId(ev));
    else if (matchEvent(ev, '.reset')) resetContr (myId(ev));
})


// Inicialización        
document.addEventListener('DOMContentLoaded', indexContr);

