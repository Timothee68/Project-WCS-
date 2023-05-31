import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema} from "type-graphql";
import { WilderResolver } from "./resolver/WilderResolver";
import { GradeResolver } from "./resolver/GradeResolver";
import { SkillResolver } from "./resolver/SkillResolver";
import dataSource from "./utils";

// start Server 

const port = 5000;

const start = async (): Promise<void> => {
    await dataSource.initialize();
    const schema = await buildSchema({ resolvers: [
        WilderResolver,
        GradeResolver ,
        SkillResolver
    ]})
    const server = new ApolloServer({schema})
    try {
      const { url }: { url: string} = await server.listen({port})
      console.log(`Server ready at ${url}`)
    } catch(err) {
      console.log("Error starting the server")
    }
  };

void start();  


// import multer from "multer";
// import path from "path";
// const upload = multer({ dest: "./public/uploads/",  limits: { fileSize: 6024 * 6024 } });
// app.use(express.static("../public"));
// app.use(express.static(path.join(__dirname, "../public")));