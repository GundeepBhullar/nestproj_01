
import { Movie } from "src/movie/entities/movie.entity";
import { User } from "src/user/entities/user.entity";
import { Entity,  ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity()

export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.likes)
    user: User;

    @ManyToOne(() => Movie, movie => movie.likes)
    movie: Movie;
}