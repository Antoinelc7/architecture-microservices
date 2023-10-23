const express = require("express");
const app     = express()
const mongoose = require("mongoose");
const port    = 3000;

mongoose.connect("mongousers+srv://user1:0KdPv7bmdtrMT7uR@cluster0.q9gdy5e.mongousers.net/?retryWrites=true&w=majority", 
{ useNewUrlParser: true, 
    useUnifiedTopology: true })
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch((err) => console.log("Erreur connexion : " + err));

function extractRoutes(str) {
    const routes = [];
    let currentRoute = {};
    const regex = /@url\s?=\s?(.*)|@method\s?=\s?(.*)|static\s(?:async\s)?(.*)\s?\(/g;
    let match;

    while ((match = regex.exec(str)) !== null) {
        const [_, url, method, action] = match;
        if (url !== undefined) currentRoute.url = url;
        if (method !== undefined) currentRoute.method = method.toLowerCase();
        if (action !== undefined) currentRoute.action = action;
        if (currentRoute.url && currentRoute.method && currentRoute.action) {
            routes.push(currentRoute);
            currentRoute = {};
        }
    }

    return routes;
}

app.listen(port,() => {
    console.log(`server is running on port: ${port}`);
})