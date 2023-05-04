import  dataSource from "../utils";
import { Wilder } from "../entity/Wilder";
import { Grade } from "../entity/Grade";
import { Request, Response } from "express";

export default {
    create: async (req :Request , res :Response) => {
        try {
            await dataSource
            .getRepository(Wilder)
            .save(req.body)
            res.send("Created Wilder");
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
                {name:req.body.name, city:req.body.city},
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
