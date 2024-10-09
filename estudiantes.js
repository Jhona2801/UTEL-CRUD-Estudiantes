//Validacion de forma para evitar campos vacios
function validateForm() {
    let name = document.getElementById('name').value,
    phone = document.getElementById('phone').value,
    email = document.getElementById('email').value;

    if(name == "") {
        alert("El nombre es obligatorio");
        return false;
    }

    if(phone == "") {
        alert("El teléfono es obligatorio");
        return false;
    }

    if(email == "") {
        alert("El email es obligatorio");
        return false;
    }
    //validacion de formato para correo
    else if(!email.includes("@")){
        alert("El email no es válido");
        return false;
    }

    return true;
    
}

//pone la information del local storage a manera de HTML como vuepo de la table usando DOM.
function showData(){
    let studentList;
    if(localStorage.getItem("studentList") == null) {
        studentList = [];
    }
    else {
        studentList = JSON.parse(localStorage.getItem("studentList"));
    }


    let html = "";
    //agrega una nueva fila en tbody por cada elemento del arreglo studentList
    studentList.forEach(function (element, index){
    html += "<tr>";
    html += "<td>" + element.name + "</td>";
    html += "<td>" + element.phone + "</td>";
    html += "<td>" + element.email + "</td>";
    html += '<td><button onclick="deleteData('+index+')" class="btn btn-danger">Borrar</button><button onclick="updateData('+index+')" class="btn btn-warning m-2">Modificar</button></td>';
    html += "</tr>";
    });

    document.getElementById("newRows").innerHTML = html;
}

//carga la informacion desde el local storage cada que la pagina temrina de cargar
document.onload = showData();

//funcion que agreagara information cuando se presione el boton agreagar hacia el local storage
function addData(){
    //si la forma fue validada:
    if(validateForm() == true){
        let name = document.getElementById('name').value,
        phone = document.getElementById('phone').value,
        email = document.getElementById('email').value;

        let studentList;
        if(localStorage.getItem("studentList") == null) {
            studentList = [];
        }
        else {
        studentList = JSON.parse(localStorage.getItem("studentList"));
        }
        studentList.push({
            name: name,
            phone: phone,
            email: email
        });
        localStorage.setItem("studentList", JSON.stringify(studentList));
        showData();
        document.getElementById("name").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("email").value = "";
    }
}

//funcion que elimina la informacion del arreglo y el local storage

function deleteData(index){
    let studentList = JSON.parse(localStorage.getItem("studentList"));
    studentList.splice(index, 1);
    localStorage.setItem("studentList", JSON.stringify(studentList));
    showData();
}

//funcion que abre un modal para editar la informacion del arreglo y el local storage
function updateData(index){
    //mostrata el boton de modificar y escondera el boton de agregar.
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";

    let studentList = JSON.parse(localStorage.getItem("studentList"));
    document.getElementById("name").value = studentList[index].name;
    document.getElementById("phone").value = studentList[index].phone;
    document.getElementById("email").value = studentList[index].email;

    document.getElementById("update").onclick = function(){
        if(validateForm() == true){
            studentList[index].name = document.getElementById("name").value;
            studentList[index].phone = document.getElementById("phone").value;
            studentList[index].email = document.getElementById("email").value;
            localStorage.setItem("studentList", JSON.stringify(studentList));
            showData();
            //regresa a la visibilidad de los botones
            document.getElementById("submit").style.display = "block";
            document.getElementById("update").style.display = "none";
            document.getElementById("name").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("email").value = "";
        }
    }   
}