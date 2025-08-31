const express = require('express');
const app = express();
const port = 8080;
const path = require('path');

let clients = [];

app.get('/poll', (req, res) => {
    console.log("Connecttion Stablished with client... ");
    let clientName = req.query.name;
    clients.push({ 'res': res, 'name': clientName });
    req.on("close", () => {
        clients = clients.filter(client => client.res !== res);
    });
});

setInterval(() => {
    if (clients.length >= 1) {
        console.log("Broadcasting new data...");
        clients.forEach(client => client.res.json({ message: `${client.name} Hello at ` + new Date() }));
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


