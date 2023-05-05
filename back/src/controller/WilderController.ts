import  dataSource from "../utils";
import { Wilder } from "../entity/Wilder";
import { Grade } from "../entity/Grade";
import { Request, Response } from "express";
// import multer from "multer";
import fs from "fs";
// import path from "path";
import { v4 as uuidv4 } from 'uuid';

export default {
    create: async (req :Request , res :Response) => {
        try {
            console.log("req.file", req.file)
            if(req.file !=null ){
                console.log("request front",req.file)
                const { originalname } = req.file;
                const { filename } = req.file;
                const route =`public/uploads/${uuidv4()}-${originalname}`;
                fs.rename(`public/uploads/${filename}`, `public/uploads/${uuidv4()}-${originalname}`, (err) => {
                    if (err!=null) throw err;
      
                });
                const reqtotal = {...req.body, url: route}
                await dataSource
                .getRepository(Wilder)
                .save(reqtotal)
                res.send("Created Wilder");
            }
        } catch (error) {
            res.send("Error");
        }
    },
    update: async (req :Request , res :Response): Promise<void> => {
        try {
            await dataSource
            .getRepository(Wilder)
            .update(
                {id: parseInt(req.params.id)},
                {name:req.body.name, city:req.body.city, url:req.body.url},
            )
            res.send("Updated Wilder");
        } catch (error) {
            res.send("Error");
        }
    },
    delete: async (req :Request , res :Response) => {
        try {
            await dataSource
            .getRepository(Wilder)
            .delete( {id: parseInt(req.params.id)})
            res.send("Delete Wilder");
        } catch (error) {
            res.send("Error");
        }
    },
    getAll: async (req: Request, res: Response) => {
        try {

            const grades = await dataSource.getRepository(Grade).find({ relations: { wilder: true, skill: true } });   
            const wilders = await dataSource.getRepository(Wilder).find();
            const data = wilders.map((wilder: Wilder) => {
                const wilderGrades = grades.filter(
                    (grade: Grade) => grade.wilderId === wilder.id
                );

            const wilderGradesLean = wilderGrades.map((el : Grade) => {
             
              return { title: el.skill.name , votes: el.grade };
            });
            
            const result = {
              ...wilder,
              skill: wilderGradesLean,
            };
            return result;
          });
          
          res.send(data);
        } catch (error) {
          console.log(error);
          res.send("error while querying wilders");
        }
    },
    getOne: async (req :Request , res :Response) => {
        try {
            const wilder = await dataSource
            .getRepository(Wilder)
            .findBy( {id: parseInt(req.params.id)} );
            res.send(wilder);
        } catch (error) {
            res.send("Error");
        }
    },            
}
