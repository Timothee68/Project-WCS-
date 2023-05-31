import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Grade } from "../entity/Grade";
import dataSource from "../utils";

@Resolver()
export class GradeResolver {
  @Query(() => [Grade])
  async getAllGrades(): Promise<Grade[]> {
    return await dataSource.manager.find(Grade);
  }

  @Mutation(() => Grade)
  async createGrade(
    @Arg("grade") grade: number,
    @Arg("wilderId") wilderId: number,
    @Arg("skillId") skillId: number
  ): Promise<Grade> {
    const newGrade = new Grade();
    newGrade.grade = grade;
    newGrade.wilderId = wilderId;
    newGrade.skillId = skillId;
    const gradeFromDB = await dataSource.manager.save(Grade, newGrade);
    return gradeFromDB;
  }

  @Mutation(() => Grade)
  async updateGrade(
    @Arg("id") id: number,
    @Arg("grade") grade: number
  ): Promise<Grade | null> {
    const gradeToUpdate = await dataSource.manager.findOne(Grade, { where: { id } });
    if (gradeToUpdate == null) return null;
    gradeToUpdate.grade = grade;
    const updatedGrade = await dataSource.manager.save(Grade, gradeToUpdate);
    return updatedGrade;
  }

  @Mutation(() => Boolean)
  async deleteGrade(@Arg("id") id: number): Promise<boolean> {
    const grade = await dataSource.manager.findOne(Grade, { where: { id } });
    if (grade == null) return false;
    await dataSource.manager.remove(Grade, grade);
    return true;
  }
}