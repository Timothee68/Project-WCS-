const express = require("express");
const dataSource = require("./utils").dataSource;
const WilderController = require("./controller/WilderController");
const SkillsController = require("./controller/SkillsController");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello Word");
});

app.post("/api/Wilder", WilderController.create);
app.put("/api/Wilder/:id" , WilderController.update);
app.delete("/api/Wilder/:id" , WilderController.delete);
app.get("/api/Wilder", WilderController.getAll);
app.get("/api/Wilder/:id", WilderController.getOne);

app.post("/api/Wilder/:id/Skill/:idSkill" , WilderController.addSkills)

app.post("/api/Skills", SkillsController.create);
app.put("/api/Skills/:id" , SkillsController.update);
app.delete("/api/Skills/:id" , SkillsController.delete);
app.get("/api/Skills", SkillsController.getAll);
app.get("/api/Skills/:id", SkillsController.getOne);


app.use((req, res, next) => {
    res.status(404).send('Page not found');
  });
  
//start Server 
const start = async () => {
    await dataSource.initialize();
    app.listen(3000, () => console.log("Server Started on 3000"));
}

start();