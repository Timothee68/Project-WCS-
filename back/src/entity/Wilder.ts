import {Entity, PrimaryGeneratedColumn ,Column, OneToMany} from "typeorm";
import { ObjectType , Field } from "type-graphql";
import { Grade } from "./Grade";

@ObjectType()
@Entity()
    export class Wilder {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
        name: string

    @Field()
    @Column()
        city: string
    
    @Field()    
    @Column( { nullable: true } )
        url: string

    @Field( () => [Grade])     
    @OneToMany(() => Grade , (grade) => grade.wilder)
        public grades: Grade[]

};