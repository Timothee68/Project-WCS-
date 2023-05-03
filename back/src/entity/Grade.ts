import {Entity, PrimaryGeneratedColumn ,Column, ManyToOne} from "typeorm";
import { Skill } from "./Skill";
import { Wilder } from "./Wilder";


@Entity()
    export class Grade {

        @PrimaryGeneratedColumn()
            id: number;
    
        @Column()
            grade: number

        @Column()
            wilderId: number

        @Column()
            skillId: number 

        @ManyToOne(() => Skill, (skill) => skill.grade)
        public skill: Skill;
        
        @ManyToOne(() => Wilder, (wilder) => wilder.grades)
         public wilder: Wilder;

    };

