// Obtener los elementos del DOM
const formTarea = document.getElementById("form-tarea");
const inputTarea = document.getElementById("input-tarea");
const listaTareas = document.getElementById("lista-tareas");

// Función para guardar una tarea en el localstorage
function guardarTarea(tarea) {
  // Obtener el arreglo de tareas del localstorage o crear uno vacío
  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  // Agregar la nueva tarea al arreglo
  tareas.push(tarea);
  // Guardar el arreglo en el localstorage como una cadena
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Función para leer las tareas del localstorage y mostrarlas en la lista
function mostrarTareas() {
  // Obtener el arreglo de tareas del localstorage o crear uno vacío
  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  // Limpiar la lista
  listaTareas.innerHTML = "";
  // Recorrer el arreglo de tareas
  for (let tarea of tareas) {
    // Crear un elemento li con la tarea y un botón para eliminarla
    const li = document.createElement("li");
    li.textContent = tarea;
    const boton = document.createElement("button");
    boton.textContent = "Eliminar";
    boton.classList.add('btnRemove');
    boton.addEventListener("click", function () {
      eliminarTarea(tarea);
    });
    // Agregar el botón al li y el li a la lista
    li.appendChild(boton);
    listaTareas.appendChild(li);
  }
}

// Función para eliminar una tarea del localstorage y de la lista
function eliminarTarea(tarea) {
  // Obtener el arreglo de tareas del localstorage o crear uno vacío
  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  // Filtrar el arreglo para quitar la tarea que se quiere eliminar
  const nuevasTareas = tareas.filter(function (t) {
    return t !== tarea;
  });
  // Guardar el nuevo arreglo en el localstorage como una cadena
  localStorage.setItem("tareas", JSON.stringify(nuevasTareas));
  // Mostrar las tareas actualizadas en la lista
  mostrarTareas();
}

// Agregar un evento al formulario para agregar una tarea al localstorage y a la lista
formTarea.addEventListener("submit", function (e) {
  // Prevenir el comportamiento por defecto del formulario
  e.preventDefault();
  // Obtener el valor del input
  const tarea = inputTarea.value;
  // Validar que no esté vacío
  if (tarea) {
    // Guardar la tarea en el localstorage
    guardarTarea(tarea);
    // Mostrar las tareas en la lista
    mostrarTareas();
    // Limpiar el input
    inputTarea.value = "";
  }
});

// Mostrar las tareas al cargar la página
mostrarTareas();


