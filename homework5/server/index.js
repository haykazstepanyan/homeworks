const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { v4 } = require("uuid");

const app = express();

require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  fs.readFile("./todos.json", (err, todos) => {
    if (err) res.status(500).send(err);
    res.send(todos);
  });
});

app.post("/create", (req, res) => {
  const newTodo = { ...req.body };
  newTodo.id = v4();
  const newData = [];

  fs.readFile("./todos.json", (err, todos) => {
    if (todos) {
      const existingData = JSON.parse(todos);
      newData.push(newTodo, ...existingData);
    } else {
      newData.push(newTodo);
    }

    fs.writeFile("./todos.json", JSON.stringify(newData), (err) => {
      if (err) res.status(500).send(err);
      res.status(201).send("Todo is created successfully");
    });
  });
});

app.delete("/delete/:id", (req, res) => {
  fs.readFile("./todos.json", (err, todos) => {
    if (err) res.status(500).send(err);

    const filteredResult = JSON.parse(todos).filter(
      (todo) => todo.id !== req.params.id
    );

    fs.writeFile("./todos.json", JSON.stringify(filteredResult), (err) => {
      if (err) res.status(500).send(err);
      res.send(filteredResult);
    });
  });
});

app.post("/update/:id", (req, res) => {
  fs.readFile("./todos.json", (err, todos) => {
    if (err) res.status(500).send(err);

    const { title, description, date, status } = req.body;
    const newData = [...JSON.parse(todos)];
    const todoIndex = newData.findIndex((todo) => todo.id === req.params.id);
    newData[todoIndex].title = title;
    newData[todoIndex].description = description;
    newData[todoIndex].status = status;
    newData[todoIndex].date = date;

    fs.writeFile("./todos.json", JSON.stringify(newData), (err) => {
      if (err) res.status(500).send(err);
      res.send(newData);
    });
  });
});

app.use((req, res) => {
  res.status(404).send("Not found page");
});

const checkDeadlines = () => {
  fs.readFile("./todos.json", (_, data) => {
    if (data) {
      const todos = JSON.parse(data);
      let isDataChanged = false;
      const newData = todos.map((todo) => {
        if (!todo.isNotified) {
          const timeDifference = Date.now() - new Date(todo.date);
          if (timeDifference > 0 && timeDifference < 120000) {
            console.log(`Your todo by id ${todo.id} date expires in 2 minutes`);
            todo.isNotified = true;
            isDataChanged = true;
          }
        }
        return todo;
      });
      if (isDataChanged) {
        fs.writeFile("./todos.json", JSON.stringify(newData), (err) => {
          if (err) console.log(err);
        });
      }
    }
  });
};

app.listen(port, () => {
  console.log(`Running server on ${port} port`);
  setInterval(checkDeadlines, 90000);
});
