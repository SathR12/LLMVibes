document.getElementById('send').addEventListener('click', sendMessage);

function getColor(score) {
    let r, g, b = 0;

    if (score <= 0.5) {
        // RED → YELLOW
        const t = score / 0.5;

        r = 255;
        g = Math.floor(255 * t);
        b = 0;

    } else {
        // YELLOW → GREEN
        const t = (score - 0.5) / 0.5; 

        r = Math.floor(255 * (1 - t));
        g = 255;
        b = 0;
    }

    return `rgb(${r}, ${g}, ${b})`;
}

async function sendMessage() {
    const input = document.getElementById('message');
    const chat = document.getElementById('chat');

    const text = input.value;
    if (!text) return;

    const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: text })
    });

    const data = await response.json();   

    const color = getColor(data.score);
    document.body.style.backgroundColor = color;
}