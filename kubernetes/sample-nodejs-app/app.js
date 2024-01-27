const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send(`
    <h1> Hello from this node js App!!</h1>
    <p> New Version 2.0 : Declarative  </p>
    <p> try sending the request to /error and see what happens</P>
  `);
});

app.get("/error", (req, res) => {
  process.exit(1);
});

app.listen(8181);
