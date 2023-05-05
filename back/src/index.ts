import express, { Request, Response, NextFunction }  from "express";
import cors from 'cors';
import dataSource from "./utils";
import WilderController  from "./controller/WilderController";
import SkillController  from "./controller/SkillController";
import GradeController  from "./controller/GradeController";
import multer from "multer";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 5000;
const upload = multer({ dest: "./public/uploads/",  limits: { fileSize: 6024 * 6024 } });

app.use(express.json());
app.use(cors());
app.use(express.static("../public"));
// Serve the public folder for public resources
app.use(express.static(path.join(__dirname, "../public")));

// upload d'image 
// app.post( '/api/avatar' , upload.single( "avatar" ) , async( req: Request ,  res:Response ,  next: NextFunction ) => { 
//     console.log("file data all " , req.file)
//     if(req.file !=null ){
// 	    const { originalname } = req.file;
//         const { filename } = req.file;

//         fs.rename(`public/uploads/${filename}`, `public/uploads/${uuidv4()}-${originalname}`, (err) => {
//             if (err!=null) throw err;
//             res.send("File uploaded");
//         });
//     }
    
//   });
  
// Routing
app.get("/", (req :Request , res :Response) => {
    res.send("Hello Word");
});

app.get("/api/Wilder", WilderController.getAll);
app.get("/api/Wilder/:id", WilderController.getOne);
app.post("/api/Wilder" , WilderController.create , upload.single( "avatar" ), async( req: Request ,  res:Response ,  next: NextFunction ) => { 
    console.log("file data all " , req.file)
    if(req.file !=null ){
	    const { originalname } = req.file;
        const { filename } = req.file;

        fs.rename(`public/uploads/${filename}`, `public/uploads/${uuidv4()}-${originalname}`, (err) => {
            if (err!=null) throw err;
            res.send("File uploaded");
        });
    }
    
  });
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