const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name:"Wilder",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
           type: "text",
        },
    },
    relations: {
        Skills: {
            target: "Skills",
            type: "many-to-many",
            joinTable: true,
            cascade: true,
            eager: true,
        },
    },
});