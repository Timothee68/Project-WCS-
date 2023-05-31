import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Skill } from "../entity/Skill";
import dataSource from "../utils"

@Resolver()
export class SkillResolver {
  @Query(() => [Skill])
  async getAllSkills(): Promise<Skill[]> {
    return await dataSource.manager.find(Skill);
  }

  @Mutation(() => Skill)
  async createSkill( @Arg("name") name: string ): Promise<Skill> { 
    const newSkill = new Skill()
    newSkill.name = name;
    const skillFromDB = await dataSource.manager.save(Skill, newSkill);
    return skillFromDB;
  }

  @Mutation(() => Skill)
  async updateSkill( @Arg("id") id: number, @Arg("name") name: string ): Promise<Skill | null> {
    const skillToUpdate = await dataSource.manager.findOne(Skill, { where: { id } });
    if (skillToUpdate == null)  return null;
    skillToUpdate.name = name;
    const skillUpdated =  await dataSource.manager.save(Skill,skillToUpdate );
    return skillUpdated;
  }

  @Mutation(() => Boolean)
  async deleteSkill(
    @Arg("id") id: number
  ): Promise<boolean> {
    const skill = await  dataSource.manager.findOne(Skill, { where: { id } });
    if (skill == null)return false;
    await dataSource.manager.remove(Skill, skill);
    return true;
  }
}
