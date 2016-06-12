const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/build"));

app.listen(PORT, () => process.stdout.write("Server up on port " + PORT + "!\n"));
