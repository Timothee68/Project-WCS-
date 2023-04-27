const dataSource = require("../utils").dataSource;
const Grade = require("../entity/Grade");
const Skills = require("../entity/Skills");
const Wilder = require("../entity/Wilder");

module.exports = {

    create: async (req, res) => {
        try {
            const wilderFromDB = await dataSource
                .getRepository(Wilder)
                .findOneBy({ name: req.body.wilder });
                console.log("Wilder from DB", wilderFromDB);

            const skillFromDB = await dataSource
                .getRepository(Skills)
                .findOneBy({ name: req.body.skill });
                console.log("Skill from DB", skillFromDB);
           
            await dataSource.getRepository(Grade).save({
                grade: req.body.grade,
                skills: skillFromDB,
                wilder: wilderFromDB,
        });
            res.send("Created Grade");
        } catch (error) {
            console.log(error);
            res.send("Error while creating grade");
        }
    },
    update: async (req , res) => {
        try {
            await dataSource
            .getRepository(Grade)
            .update({ grade:req.body.grade},{id: req.params.id})
            res.send("Updated grade");
        } catch (error) {
            res.send("Error");
        }
    },
    delete: async (req , res) => {
        try {
            await dataSource
            .getRepository(Grade)
            .delete({id: req.params.id})
            res.send("Delete grade");
        } catch (error) {
            res.send("Error");
        }
    },
    getAll: async (req, res) => {
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
    getOne: async (req , res) => {
        try {
          const grade = await dataSource
            .getRepository(Grade)
            .findBy({ id: req.params.id });
            res.send(grade);
        } catch (error) {
          res.send("Error");
        }
    },   
}