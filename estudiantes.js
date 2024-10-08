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

//funcion para revisar si existe arreglo en local storage y crear el arreglo en caso de no existir
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

//carga toda la informacion cuando la pagina carga
document.onload = showData();

//funcion que agreagara information cuando se presione el boton agreagar
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