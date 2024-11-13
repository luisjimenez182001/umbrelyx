
function toggleChatbot() {
    var chatbotWindow = document.getElementById("chatbot");
    if (chatbotWindow.style.display === "none" || chatbotWindow.style.display === "") {
        chatbotWindow.style.display = "block";
    } else {
        chatbotWindow.style.display = "none";
    }
    
}



function sendMessage() {
    var inputField = document.getElementById("chat-input");
    var message = inputField.value;
    if (message.trim() !== "") {
        var chatContent = document.getElementById("chat-content");

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

        // Aquí puedes agregar la lógica para enviar el mensaje al servidor o API
        // fetch(url, { ... })

        // URL del API
        const url = "https://magicloops.dev/api/loop/376a7e24-19af-4b6d-ad8f-0a23bed993ce/run";

        // Datos que deseas enviar en formato JSON
        const data = {
        from: "cliente@empresa.com",
        subject: "Información sobre servicios",
        body: "Hola, me gustaría saber más sobre los servicios que ofrece Umbrelyx Corporation."
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
        })
        .catch(error => {
        console.error("Error:", error); // Manejo de errores
        });

    }
}


// Realizar una solicitud GET con fetch
async function fetchChatbotData() {
    try {
        const response = await fetch("https://magicloops.dev/api/loop/376a7e24-19af-4b6d-ad8f-0a23bed993ce/run?from=cliente%40empresa.com&subject=Informaci%C3%B3n+sobre+servicios&body=Hola%2C+me+gustar%C3%ADa+saber+m%C3%A1s+sobre+los+servicios+que+ofrece+Umbrelyx+Corporation.");
        const data = await response.json(); // Convertir la respuesta a JSON

        // Actualizar el contenido del chatbot
        renderChatbotContent(data);
    } catch (error) {
        console.error("Error al obtener los datos del chatbot:", error);
    }
}

// Función para renderizar el contenido en el chatbot
function renderChatbotContent(data) {
    const contentContainer = document.querySelector('.chatbot-content');
    const htmlContent = marked(data.emailBody); // Convertir Markdown a HTML
    contentContainer.innerHTML = `<h5>${data.subject}</h3>` + htmlContent;
}

// Llamar a la función fetchChatbotData al cargar la página
window.addEventListener('load', fetchChatbotData);



