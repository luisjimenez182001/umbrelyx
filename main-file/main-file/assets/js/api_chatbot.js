// Realizar una solicitud GET con fetch
async function fetchChatbotData() {

    try {
        const response = await fetch("https://magicloops.dev/api/loop/376a7e24-19af-4b6d-ad8f-0a23bed993ce/run?from=cliente%40empresa.com&subject=Informaci%C3%B3n+sobre+servicios&body=Hola%2C+me+gustar%C3%ADa+saber+m%C3%A1s+sobre+los+servicios+que+ofrece+Umbrelyx+Corporation.");
        const data = await response.json(); // Convertir la respuesta a JSON
  // Modificar el contenido para eliminar el texto no deseado
        if (data.emailBody) {
            // Reemplazar el texto no deseado con una cadena vacía
            data.emailBody = data.emailBody.replace("Sent using Magic Loops!", "");
            data.emailBody = data.emailBody.replace("*Click [here](https://magicloops.dev/loop/376a7e24-19af-4b6d-ad8f-0a23bed993ce) to view your Loop*","")
        }
        // Actualizar el contenido del chatbot
        renderChatbotContent(data);
    } catch (error) {
        console.error("Error al obtener los datos del chatbot:", error);
    }
    finally {
        hidePreloader(); // Ocultar el preloader después de obtener los datos
    }
}

// Función para renderizar el contenido en el chatbot
function renderChatbotContent(data) {
    const contentContainer = document.querySelector('.chatbot-content');
    const htmlContent = marked(data.emailBody); // Convertir Markdown a HTML
    contentContainer.innerHTML = `<h5>${data.subject}</h3>` + htmlContent;

    // Obtener el contenido de los botones desde el id 'options-container'
    const optionsContainer = document.getElementById('options-container');

    // Verificar si el contenedor existe y agregarlo al contenido del chatbot
    if (optionsContainer) {
        contentContainer.innerHTML += optionsContainer.outerHTML;
    }

}

// Función para renderizar el contenido en el chatbot
function renderChatbotContentanswer(data) {
    const contentContainer = document.querySelector('.chatbot-content');

    if (data.emailBody) {
        // Reemplazar el texto no deseado con una cadena vacía
        data.emailBody = data.emailBody.replace("Sent using Magic Loops!", "");
        data.emailBody = data.emailBody.replace("*Click [here](https://magicloops.dev/loop/376a7e24-19af-4b6d-ad8f-0a23bed993ce) to view your Loop*","")
    }
    const htmlContent = marked(data.emailBody); // Convertir Markdown a HTML
    contentContainer.innerHTML = `<h5>${data.subject}</h3>` + htmlContent;

    /*
    // Obtener el contenido de los botones desde el id 'options-container'
    const optionsContainer = document.getElementById('options-container');

    // Verificar si el contenedor existe y agregarlo al contenido del chatbot
    if (optionsContainer) {
        contentContainer.innerHTML += optionsContainer.outerHTML;
    }

    */

}


// Llamar a la función fetchChatbotData al cargar la página
window.addEventListener('load', fetchChatbotData);




function toggleChatbot() {
    var chatbotWindow = document.getElementById("chatbot");
    if (chatbotWindow.style.display === "none" || chatbotWindow.style.display === "") {
        showPreloader(); // Mostrar el preloader antes de realizar la solicitud

        chatbotWindow.style.display = "block";
    } else {
        chatbotWindow.style.display = "none";
    }
    
}

// Función para seleccionar una opción y enviar el mensaje
function selectOption(optionText) {
    var inputField = document.getElementById("chat-input");
    inputField.value = optionText; // Llenar el campo de entrada con el texto seleccionado
    sendMessage(optionText); // Enviar el mensaje automáticamente
}



function sendMessage(optionText) {
    var inputField = document.getElementById("chat-input");
    var message = inputField.value;
    if (message.trim() !== "") {
        var chatContent = document.querySelector(".chatbot-content");

        // Verificar si chatContent no es null
        if (!chatContent) {
            console.error("Elemento 'chatbot-content' no encontrado.");
            return;
        }

        // Crear un nuevo elemento de mensaje
        var messageElement = document.createElement("div");
        messageElement.textContent = message;
        messageElement.style.padding = "8px";
        messageElement.style.margin = "5px 0";
        messageElement.style.backgroundColor = "#007bff";
        messageElement.style.color = "white";
        messageElement.style.borderRadius = "5px";
        messageElement.style.alignSelf = "flex-end";

        // Agregar el mensaje al contenido del chat
        chatContent.appendChild(messageElement);

        // Limpiar el campo de entrada
        inputField.value = "";

        // Hacer scroll hacia abajo automáticamente
        chatContent.scrollTop = chatContent.scrollHeight;

        // URL del API
        const url = "https://magicloops.dev/api/loop/376a7e24-19af-4b6d-ad8f-0a23bed993ce/run";

        // Datos que deseas enviar en formato JSON
        const data = {
            from: "luisjimenez629@gmail.com",
            subject: "Información sobre servicios",
            body: optionText // Usar el texto del mensaje, no el elemento HTML
        };

        // Realizar la solicitud POST
        fetch(url, {
            method: "POST", // Método HTTP
            headers: {
                "Content-Type": "application/json" // Indicar que los datos están en formato JSON
            },
            body: JSON.stringify(data) // Convertir los datos a una cadena JSON
        })
        .then(response => response.json()) // Parsear la respuesta como JSON
        .then(data => {
            console.log("Respuesta del servidor:", data); // Mostrar la respuesta en la consola


            renderChatbotContentanswer(data);

        })
        .catch(error => {
            console.error("Error:", error); // Manejo de errores
        });
    }
}



// Función para mostrar el preloader
function showPreloader() {
    document.querySelector('.preloader').style.display = 'block';
}

// Función para ocultar el preloader
function hidePreloader() {
    document.querySelector('.preloader').style.display = 'none';
}
