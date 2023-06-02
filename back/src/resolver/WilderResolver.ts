import { Arg, Mutation, Query , Resolver , } from "type-graphql"
import {Wilder} from "../entity/Wilder"
import dataSource from "../utils"

@Resolver(Wilder)
export class WilderResolver {

    @Query( () => [Wilder])
    async getAllWilders(): Promise<Wilder[]> {
        return await dataSource.manager.find(Wilder, {
            relations: {
                grades: {
                    skill: true,
                },
            },
        })
    }

    @Query( () => Wilder, { nullable: true } )
    async getwilderById(@Arg("id") id: number ): Promise<Wilder | null> {
        return await dataSource.manager.findOne(Wilder,  {where: {id},
            relations: {
                grades: {
                    skill: true,
                },
            },
        });     
    }

    @Mutation(() => Wilder) 
    async createWilder(
        @Arg("name") name: string ,
        @Arg("city") city: string
       ): Promise<Wilder> {
            const newWilder = new Wilder()
            newWilder.name = name;
            newWilder.city = city;
            newWilder.url = "https://vision.gel.ulaval.ca/~jflalonde/cours/4105/h19/tps/results/tp3/111126876/images/05-Thomas.jpg";

            const wilderFromDB = await dataSource.manager.save(Wilder, newWilder);
            
            return wilderFromDB
        }

    @Mutation(() => Wilder)
    async updateWilder(
        @Arg("id") id: number,
        @Arg("name") name: string,
        @Arg("city") city: string
    ): Promise<Wilder> {
        const wilderToUpdate = await dataSource.manager.findOne(Wilder, { where: { id } });
    
        if (wilderToUpdate == null ) throw new Error("Wilder not found");
        wilderToUpdate.name = name;
        wilderToUpdate.city = city;
        wilderToUpdate.url = "https://vision.gel.ulaval.ca/~jflalonde/cours/4105/h19/tps/results/tp3/111126876/images/05-Thomas.jpg";
        
        const updatedWilder = await dataSource.manager.save(Wilder, wilderToUpdate);

        return updatedWilder;
    }

    @Mutation(() => Boolean)
    async deleteWilder(@Arg("id") id: number): Promise<Boolean> {
        const wilderToDelete = await dataSource.manager.findOne(Wilder, { where: { id } });
    
        await dataSource.manager.remove(Wilder, wilderToDelete);
    
      return true;
    }
}