const dataSource = require("../utils").dataSource;
const Grade = require("../entity/Grade");
const Skill = require("../entity/Skills");
const Wilder = require("../entity/Wilder");

module.exports = {

    create: async (req , res) => {
        try {
            const wilderFromDB = await dataSource
                .getRepository(Wilder)
                .findOneBy({ wilderId: req.params.id });
                console.log("Wilder from DB", wilderFromDB);

            const skillFromDB = await dataSource
                .getRepository(Skill)
                .findOneBy({ skillsId: req.params.id });
                console.log("Skill from DB", skillFromDB);

            await dataSource.getRepository(Grade).save({
                grade: req.body.grade,
                skill: skillFromDB,
                wilder: wilderFromDB,
            });
            res.send(" Add" );
        } catch (error) {
            res.send(error, "error");
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