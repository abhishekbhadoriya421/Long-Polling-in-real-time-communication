const express = require('express');
const app = express();
const port = 8080;
const path = require('path');

let clients = [];

app.get('/poll', (req, res) => {
    console.log("Connecttion Stablished with client... ");

    clients.push(res);

    req.on("close", () => {
        clients = clients.filter(client => client !== res);
    });
});

setInterval(() => {
    if (clients.length >= 1) {
        console.log("Broadcasting new data...");
        clients.forEach(res => res.json({ message: "Hello at " + new Date() }));
        clients = [];
    }

}, 3000);

app.get('/', (req, res) => {
    const filePath = path.join(__dirname + '/public/index.html');
    return res.sendFile(filePath)
})

app.listen(port, (err) => {
    console.log('Server is running');
})


