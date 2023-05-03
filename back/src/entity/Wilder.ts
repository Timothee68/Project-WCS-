import {Entity, PrimaryGeneratedColumn ,Column} from "typeorm";

@Entity()
    export class Wilder {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
        name: string

    @Column()
        city: string       
};