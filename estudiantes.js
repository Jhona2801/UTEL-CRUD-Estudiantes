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
}

let html = "";

studentList.foreach()