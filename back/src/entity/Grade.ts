import {Entity, PrimaryGeneratedColumn ,Column, ManyToOne,JoinColumn} from "typeorm";
import { Skill } from "./Skill";
import { Wilder } from "./Wilder";

@Entity()
    export class Grade {

        @PrimaryGeneratedColumn()
            id: number;
    
        @Column()
            grade: number

        @ManyToOne(() => Skill, { cascade: true })
        @JoinColumn({ name: "skillId" })
            skill: Skill;
        
        @ManyToOne(() => Wilder, { cascade: true })
        @JoinColumn({ name: "wilderId" })
            wilder: Wilder;

    };

