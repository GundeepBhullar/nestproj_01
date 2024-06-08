

import { Like } from "src/like/like.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('movies')
export class Movie {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    cast: string;

    @Column()
    release: string;

    @OneToMany(() => Like, like=> like.movie)
    likes: Like[]
}
