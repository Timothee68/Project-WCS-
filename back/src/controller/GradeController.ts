import  dataSource from "../utils";
import { Wilder } from "../entity/Wilder";
import { Skill } from "../entity/Skill";
import { Grade } from "../entity/Grade";
import { Request, Response } from "express";

export default {

    create: async (req :Request , res :Response) => {
        try {

            const wilderFromDB = await dataSource
                .getRepository(Wilder)
                .findOneBy({ name: req.body.wilder });

            const skillFromDB = await dataSource
                .getRepository(Skill)
                .findOneBy({ name: req.body.skill });

            const gradeBodyR: number = req.body.grade;

            if( wilderFromDB != null && skillFromDB != null){
                
                await dataSource.getRepository(Grade).save({
                    grade: gradeBodyR,
                    skill: skillFromDB,
                    wilder: wilderFromDB,
                });
            }
            res.send("Created Grade");
        } catch (error) {
            console.log(error);
            res.send("Error while creating grade");
        }
    },
    update: async (req :Request , res :Response) => {
        try {
            await dataSource
            .getRepository(Grade)
            .update({ grade:req.body.grade},{id: parseInt(req.params.id)})
            res.send("Updated grade");
        } catch (error) {
            res.send("Error");
        }
    },
    delete: async (req :Request , res :Response) => {
        try {
            await dataSource
            .getRepository(Grade)
            .delete({id: parseInt(req.params.id)})
            res.send("Delete grade");
        } catch (error) {
            res.send("Error");
        }
    },
    getAll: async (req :Request , res :Response) => {
        try {
          const gradesFromDB = await dataSource
          .getRepository(Grade)
          .find();
          res.send(gradesFromDB);

        } catch (error) {

          console.log(error);
          res.send("Error while reading grades");
        }
    },  
    getOne: async (req :Request , res :Response) => {
        try {
          const grade = await dataSource
            .getRepository(Grade)
            .findBy({id: parseInt(req.params.id)});
            res.send(grade);
        } catch (error) {
          res.send("Error");
        }
    },   
}