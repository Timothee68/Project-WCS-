const dataSource = require("../utils").dataSource;
const Wilder = require("../entity/Wilder");
const Skills = require("../entity/Skills");
const Grade = require("../entity/Grade");

module.exports = {
    create: async (req , res) => {
        try {
            await dataSource
            .getRepository(Wilder)
            .save(req.body)
            console.log(req.body);
            res.send("Created Wilder");
        } catch (error) {
            res.send("Error");
        }
    },
    update: async (req , res) => {
        try {
            console.log(req.body)
            await dataSource
            .getRepository(Wilder)
            .update(
                {id: req.params.id},
                {name:req.body.name, city:req.body.city},
            )
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
    getAll: async (req, res) => {
      try {

        const grades = await dataSource.getRepository(Grade).find();
          console.log(grades);

        const wilders = await dataSource.getRepository(Wilder).find();
          console.log("wilders", wilders);

        const data = wilders.map((wilder) => {
            const wilderGrades = grades.filter(
              (grade) => grade.wilder.id === wilder.id
            );

        const wilderGradesLean = wilderGrades.map((el) => {
            return { title: el.skills.name, votes: el.grade };
        });

        const result = {
          ...wilder,
          skills: wilderGradesLean,
        };
        console.log(result);
        return result;
        });
        res.send(data);
      } catch (error) {
        console.log(error);
        res.send("error while querying wilders");
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
}
