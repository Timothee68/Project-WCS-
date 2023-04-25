const dataSource = require("../utils").dataSource;
const Wilder = require("../entity/Wilder");
const Skills = require("../entity/Skills");

module.exports = {
    create: async (req , res) => {
        try {
            await dataSource
            .getRepository(Wilder)
            .save(req.body)
            res.send("Created Wilder");
        } catch (error) {
            res.send("Error");
        }
    },
    update: async (req , res) => {
        try {
            await dataSource
            .getRepository(Wilder)
            .update({id: req.params.id},{ name:req.body.name})
            res.send("Updated Wilder");
        } catch (error) {
            res.send("Error");
        }
    },
    delete: async (req , res) => {
        try {
            await dataSource
            .getRepository(Wilder)
            .delete({id: req.params.id})
            res.send("Delete Wilder");
        } catch (error) {
            res.send("Error");
        }
    },
    getAll: async (req , res) => {
        try {
            const wilders = await dataSource
            .getRepository(Wilder)
            .find();
          res.json({ wilders: wilders });
        } catch (error) {
          res.send("Error");
        }
    },
    getOne: async (req , res) => {
        try {
            const wilder = await dataSource
            .getRepository(Wilder)
            .findBy({ id: req.params.id });
            res.send(wilder);
        } catch (error) {
            res.send("Error");
        }
    },            
    addSkills: async (req , res) => {
    try {
        const wilderToUpdate = await dataSource
            .getRepository(Wilder)
            .findOneBy({ id: req.params.id });

        const SkillToAdd = await dataSource
            .getRepository(Skills)
            .findOneBy({ id: req.params.idSkill });

        wilderToUpdate.Skills = [...wilderToUpdate.Skills, SkillToAdd];
        
        await dataSource
            .getRepository(Wilder)
            .save(wilderToUpdate);

        res.send("Skill Add");

    } catch (error) {

        res.send("Error");
    }
    },   
}