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
        @Arg("city") city: string,
        @Arg("url") url: string ): Promise<Wilder> {
            const newWilder = new Wilder()
            newWilder.name = name;
            newWilder.city = city;
            newWilder.url = url;

            const wilderFromDB = await dataSource.manager.save(Wilder, newWilder);

            console.log(wilderFromDB)
            
            return wilderFromDB
        }

    @Mutation( () => Boolean)
    async deleteWilder(@Arg("id") id: number ): Promise<Boolean> {
        const wilderToDelete = await dataSource.manager.findOne(Wilder,  {where: {id} })
        await dataSource.manager.delete(Wilder , wilderToDelete)
        return true;
    }
}