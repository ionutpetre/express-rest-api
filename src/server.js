const express = require("express");
const bodyParser = require("body-parser");

const ResourceService = require("./services/resource");
const usersService = new ResourceService("user");

const app = express();
app.use(bodyParser.json());

app.get("/users", (req, res) => {
  const users = usersService.getAll();
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const user = usersService.getOne(req.params.id);
  res.json(user);
});

app.post("/users", (req, res) => {
  const user = req.body;
  const newuser = usersService.addOne(user);
  res.status(201).send(newuser);
});

app.put("/users/:id", (req, res) => {
  const user = usersService.updateOne(req.params.id, req.body);
  res.json(user);
});

app.delete("/users/:id", (req, res) => {
  usersService.deleteOne(req.params.id);
  res.status(204).send();
});

const PORT = 3000;

app.listen(3000, () => console.log(`Express REST API started on: ${PORT}`));

module.exports = app;
