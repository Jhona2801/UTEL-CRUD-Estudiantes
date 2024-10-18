//Validacion de forma para evitar campos vacios
function validateForm() {
  let name = document.getElementById("name").value,
    phone = document.getElementById("phone").value,
    email = document.getElementById("email").value;

  if (name == "") {
    alert("El nombre es obligatorio");
    return false;
  }
  //validacion para asegurar que el numero de telefono tenga un largo especifco
  if (phone == "") {
    alert("El teléfono es obligatorio");
    return false;
  } else if (phone.length < 10) {
    alert("El teléfono debe tener al menos 10 dígitos");
    return false;
  }

  if (email == "") {
    alert("El email es obligatorio");
    return false;
  }
  //validacion de formato para correo
  else if (!email.includes("@")) {
    alert("El email no es válido");
    return false;
  }

  return true;
}

//funcion que agreagara information cuando se presione el boton agreagar hacia el local storage
function addData() {
  //si la forma fue validada:
  if (validateForm()) {
    //toma los valores del formulario y los guarda en variables
    let name = document.getElementById("name").value,
      phone = document.getElementById("phone").value,
      email = document.getElementById("email").value;

    //si el local storage esta vacio, se crea un array vacio y se agrega el nuevo estudiante
    let studentList = JSON.parse(localStorage.getItem("studentList") || "[]");
    studentList.push({
      name: name,
      phone: phone,
      email: email,
    });
    localStorage.setItem("studentList", JSON.stringify(studentList));
    //llama la funcion para mostrar la informacion en la table por medio de DOM
    showData();
    //limpia los campos del formulario para que el usuario pueda agregar otro estudiante
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
  }
}
//pone la information del local storage a manera de HTML como cuerpo de la tabla usando DOM.
function showData() {
  const studentList = JSON.parse(localStorage.getItem("studentList")) || "[]";

  // crea una variable nueva del tipo string donde se almacenara la informacion que se insertara en el table body
  let html = "";

  // Itera en los elementos del array por medio de forEach y por cada uno de ellos agrega un nuevo table row y nuevas celdas con informacion.asi como bonotones con el index de cada elemento del array como argumento del boton para pasar ese numero de index a la funcion de modificar y borrar.
  studentList.forEach((student) => {
    html += `
      <tr>
        <td>${student.name}</td>
        <td>${student.phone}</td>
        <td>${student.email}</td>
        <td>
          <button onclick="deleteData(${studentList.indexOf(
            student
          )})" class="btn btn-danger"><i class="bi bi-trash"></i> Borrar</button>
          <button onclick="updateData(${studentList.indexOf(
            student
          )})" class="btn btn-warning m-2"><i class="bi bi-pencil"></i> Modificar</button>
        </td>
      </tr>
    `;
  });

  document.getElementById("newRows").innerHTML = html;
}

//carga la informacion desde el local storage cada que la pagina temrina de cargar
document.onload = showData();

//funcion que elimina la informacion del arreglo y por su numero de index y actualiza la informacion en el local storage
function deleteData(index) {
  let studentList = JSON.parse(localStorage.getItem("studentList"));
  studentList.splice(index, 1);
  localStorage.setItem("studentList", JSON.stringify(studentList));
  showData();
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
}

//funcion que trae la informacion del local storage por medio del numero de index en el arreglo hacia nuestro formulario para modificarla y la vuelve a guardar en local storage
function updateData(index) {
  //mostrata el boton de modificar y escondera el boton de agregar.
  document.getElementById("submit").style.display = "none";
  document.getElementById("update").style.display = "block";

  let studentList = JSON.parse(localStorage.getItem("studentList"));
  document.getElementById("name").value = studentList[index].name;
  document.getElementById("phone").value = studentList[index].phone;
  document.getElementById("email").value = studentList[index].email;

  document.getElementById("update").onclick = function () {
    if (validateForm()) {
      studentList[index].name = document.getElementById("name").value;
      studentList[index].phone = document.getElementById("phone").value;
      studentList[index].email = document.getElementById("email").value;
      localStorage.setItem("studentList", JSON.stringify(studentList));
      showData();
      //regresa a la visibilidad de los botones
      document.getElementById("submit").style.display = "block";
      document.getElementById("update").style.display = "none";
      //limpia los campos del formulario para que el usuario pueda agregar otro estudiante
      document.getElementById("name").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("email").value = "";
    }
  };
}
