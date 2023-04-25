const dataSource = require("../utils").dataSource;
const Skill = require("../entity/Skills");

module.exports = {
    create: async (req , res) => {
        try {
            await dataSource
            .getRepository(Skill)
            .save(req.body)
            res.send("Created Skill");
        } catch (error) {
            res.send("Error");
        }
    },
    update: async (req , res) => {
        try {
            await dataSource
            .getRepository(Skill)
            .update({id: req.params.id},{ name:req.body.name})
            res.send("Updated Skill");
        } catch (error) {
            res.send("Error");
        }
    },
    delete: async (req , res) => {
        try {
            await dataSource
            .getRepository(Skill)
            .delete({id: req.params.id})
            res.send("Delete Skill");
        } catch (error) {
            res.send("Error");
        }
    },
    getAll: async (req , res) => {
        try {
          const Skills = await dataSource
            .getRepository(Skill)
            .find();
          res.json({ Skills: Skills });
        } catch (error) {
          res.send("Error");
        }
      },
      getOne: async (req , res) => {
        try {
          const skills = await dataSource
            .getRepository(Skill)
            .findBy({ id: req.params.id });
            res.send(skills);
        } catch (error) {
          res.send("Error");
        }
      },   
}