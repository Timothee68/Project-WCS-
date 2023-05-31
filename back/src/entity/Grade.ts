import {Entity, PrimaryGeneratedColumn ,Column, ManyToOne} from "typeorm";
import { ObjectType , Field } from "type-graphql";
import { Skill } from "./Skill";
import { Wilder } from "./Wilder";

@ObjectType()
@Entity()
    export class Grade {
        @Field()
        @PrimaryGeneratedColumn()
            id: number;
    
        @Field()    
        @Column()
            grade: number

        @Column()
            wilderId: number

        @Column()
            skillId: number

        @Field()
        @ManyToOne(() => Skill, (skill) => skill.grades)
        public skill: Skill;
        
        @ManyToOne(() => Wilder, (wilder) => wilder.grades)
         public wilder: Wilder;

    };

