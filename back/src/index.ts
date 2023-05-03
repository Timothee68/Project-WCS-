import express, { Request, Response, NextFunction }  from "express";
import cors from 'cors';
import dataSource from "./utils";
import WilderController  from "./controller/WilderController";
import SkillController  from "./controller/SkillController";
import GradeController  from "./controller/GradeController";


const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// Routing
app.get("/", (req :Request , res :Response) => {
    res.send("Hello Word");
});

app.get("/api/Wilder", WilderController.getAll);
app.get("/api/Wilder/:id", WilderController.getOne);
app.post("/api/Wilder", WilderController.create);
app.put("/api/Wilder/:id" , WilderController.update);
app.delete("/api/Wilder/:id" , WilderController.delete);

app.get("/api/Skill", SkillController.getAll);
app.get("/api/Skill/:id", SkillController.getOne);
app.post("/api/Skill", SkillController.create);
app.put("/api/Skill/:id" , SkillController.update);
app.delete("/api/Skill/:id" , SkillController.delete);

app.get("/api/Grade" , GradeController.getAll);
app.get("/api/Grade/:id", GradeController.getOne);
app.post("/api/Grade" , GradeController.create);
app.put("/api/Grade/:id" , GradeController.update);
app.delete("/api/Grade/:id" , GradeController.delete);


app.use((req :Request , res :Response, next: NextFunction) => {
    res.status(404).send('Page not found');
  });
  
// start Server 
const start = async (): Promise<void> =>  {
    await dataSource.initialize();
    app.listen(port, () => console.log("Server Started on 3001"));
}

void start();