import  dataSource from "../utils";
import { Skill } from "../entity/Skill";
import { Request, Response } from "express";

export default {
    create: async (req :Request , res :Response) => {
        try {
            await dataSource
            .getRepository(Skill)
            .save(req.body)
            res.send("Created skill");
        } catch (error) {
            res.send("Error");
        }
    },
    update: async (req :Request , res :Response) => {
        try {
            await dataSource
            .getRepository(Skill)
            .update( {id: parseInt(req.params.id)},{ name:req.body.name})
            res.send("Updated skill");
        } catch (error) {
            res.send("Error");
        }
    },
    delete: async (req :Request , res :Response) => {
        try {
            await dataSource
            .getRepository(Skill)
            .delete({id: parseInt(req.params.id)})
            res.send("Delete skill");
        } catch (error) {
            res.send("Error");
        }
    },
    getAll: async (req :Request , res :Response) => {
        try {
          const skill = await dataSource
            .getRepository(Skill)
            .find();
          res.json({ Skill: skill });
        } catch (error) {
          res.send("Error");
        }
      },
      getOne: async (req :Request , res :Response) => {
        try {
          const skill = await dataSource
            .getRepository(Skill)
            .findBy({ id: parseInt(req.params.id) });
            res.send(skill);
        } catch (error) {
          res.send("Error");
        }
      },   
}