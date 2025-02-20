let amigos = [];




function agregarAmigo() {
    let amigoUsuario = document.getElementById('amigo').value.trim().toLowerCase();
    
    if (amigoUsuario === "") {
        mostrarModal('El nombre no puede estar en blanco');
        return;
    }

    if (amigos.some(amigo => amigo.toLowerCase() === amigoUsuario)) {
        mostrarModal('El nombre ya existe');
        return;
    }

    amigos.push(amigoUsuario);
    actualizarListaAmigos();
    limpiarCaja();

    //Coloca el cursor en el campo de entrada automáticamente
    document.getElementById('amigo').focus();
}

function actualizarListaAmigos() {
    let ul = document.getElementById('listaAmigos'); // Obtiene  ul
    ul.innerHTML = ""; // Limpia la lista antes de actualizarla
    amigos.forEach(amigo => {
        let li = document.createElement('li');
        li.textContent = amigo;
        ul.appendChild(li);
    });
}


function sortearAmigo() 
{
    // Verificar si hay amigos suficientes para sortear
    if (amigos.length === 0) {
        mostrarModal('Todos los amigos ya han sido sorteados');


         // Limpiar la lista de resultados una vez que se sortearon todos
         document.getElementById('listaAmigos').innerHTML = ''; 
         document.getElementById('resultado').innerHTML = '';
         
        return;
    }
    // 🔹 Desactivar el botón "Añadir" cuando empieza el sorteo
    document.querySelector('.button-add').disabled = true;
    document.getElementById('amigo').disabled = true; // Desactiva el campo de entrada

    // Generar un índice aleatorio y seleccionar un amigo
    let indiceAmigo = Math.floor(Math.random() * amigos.length);
    let amigoSorteado = amigos[indiceAmigo];

    // Eliminar al amigo sorteado del array amigos
    amigos.splice(indiceAmigo, 1);

    // Limpiar el contenido del ul antes de mostrar el nuevo sorteo
    let ul = document.getElementById('resultado');
    ul.innerHTML = ''; // Limpia los resultados anteriores para solo mostrar el último

    // Agregar el amigo sorteado al ul de forma visible
    let li = document.createElement('li');
    li.textContent = `El amigo sorteado es: ${amigoSorteado}`;
    ul.appendChild(li);

// Si ya no quedan amigos después de este sorteo, limpiar la lista y cerrar el modal
if (amigos.length === 0) {
    mostrarModal(`El último amigo sorteado es :" ${amigoSorteado} ". Juego se reiniciará en 7 segundos...`);

    setTimeout(() => {
        document.getElementById('listaAmigos').innerHTML = ''; // 🔹 Borra los amigos ingresados
        ul.innerHTML = ''; // 🔹 Borra la lista de sorteos
        cerrarModal(); // 🔹 Cierra el modal después de 5 segundos
        //Reactivar el botón "Añadir" cuando el juego se reinicie
        document.querySelector('.button-add').disabled = false;
        document.getElementById('amigo').disabled = false; // Reactiva el campo de entrada

    }, 7000); 
}


}



function mostrarModal(mensaje) {
    let modal = document.getElementById('modal');
    let modalMensaje = document.getElementById('modalMensaje');

    modalMensaje.textContent = mensaje; // Asigna el mensaje de alerta
    modal.style.display = 'flex'; // Muestra el modal correctamente
}



function cerrarModal() {
    let modal = document.getElementById('modal');

    modal.style.display = 'none'; // Oculta el modal
    document.getElementById('modalMensaje').textContent = ''; // Limpia el mensaje
}


function limpiarCaja() {
    document.querySelector('#amigo').value = '';
}