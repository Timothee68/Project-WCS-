import "reflect-metadata";
import dataSource from "./utils";
import { ApolloServer , gql } from "apollo-server";
import { Wilder } from "./entity/Wilder";
import { Skill } from "./entity/Skill";
import { Grade } from "./entity/Grade"

// import multer from "multer";
// import path from "path";
// const upload = multer({ dest: "./public/uploads/",  limits: { fileSize: 6024 * 6024 } });
// app.use(express.static("../public"));
// app.use(express.static(path.join(__dirname, "../public")));

const typeDefs = gql`
    type Wilder {
        name: string
        city: string
        url: string
        grade: [Grade]    
    }

    type Grade {
        grade: int
        skill: Skill
    }

    type Skill {
        name: string

    }
    type Query: {
        getAllWilders: [Wilder]    
    }
    type Mutation: {
        createSkill(name: string) : Skill
    }
`
const resolvers = {
    Query: {
        getAllWilders: async () => {
            const allwilders = await dataSource.manager.find(Wilder , {
                relations: {
                    grades: {
                        skill: true,
                    },
                },
            })
            console.log(allwilders);
            return allwilders;
        }
    },
    Mutation: {
        creatSkill: async ( _: any , args: any ) => {
            const createSkill = new Skill()
            createSkill.name = args.name
            return await dataSource.manager.save(Skill ,createSkill);
        }
    }
}


// start Server 

const port = 5000;

const start = async (): Promise<void> => {
    await dataSource.initialize();
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    })
  
    try {
      const { url }: { url: string} = await server.listen({port})
      console.log(`Server ready at ${url}`)
    } catch(err) {
      console.log("Error starting the server")
    }
  };

void start();  