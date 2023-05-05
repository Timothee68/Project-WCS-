import {Entity, PrimaryGeneratedColumn ,Column, OneToMany} from "typeorm";
import { Grade } from "./Grade";
@Entity()
    export class Wilder {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
        name: string

    @Column()
        city: string
    
    @Column( { nullable: true } )
        url: string

    @OneToMany(() => Grade , (grade) => grade.wilder)
        public grades: Grade[]

};