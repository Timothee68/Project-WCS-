const express = require("express");
const cors = require('cors')
const dataSource = require("./utils").dataSource;
const WilderController = require("./controller/WilderController");
const SkillsController = require("./controller/SkillsController");
const GradeController = require("./controller/GradeController");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// Routing
app.get("/", (req, res) => {
    res.send("Hello Word");
});

app.get("/api/Wilder", WilderController.getAll);
app.get("/api/Wilder/:id", WilderController.getOne);
app.post("/api/Wilder", WilderController.create);
app.put("/api/Wilder/:id" , WilderController.update);
app.delete("/api/Wilder/:id" , WilderController.delete);

app.get("/api/Skills", SkillsController.getAll);
app.get("/api/Skills/:id", SkillsController.getOne);
app.post("/api/Skills", SkillsController.create);
app.put("/api/Skills/:id" , SkillsController.update);
app.delete("/api/Skills/:id" , SkillsController.delete);

app.get("/api/Grade" , GradeController.getAll);
app.get("/api/Grade/:id", GradeController.getOne);
app.post("/api/Grade" , GradeController.create);
app.put("/api/Grade/:id" , GradeController.update);
app.delete("/api/Grade/:id" , GradeController.delete);


app.use((req, res, next) => {
    res.status(404).send('Page not found');
  });
  
//start Server 
const start = async () => {
    await dataSource.initialize();
    app.listen(port, () => console.log("Server Started on 3001"));
}

start();