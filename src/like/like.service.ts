import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like } from "./like.entity";
import { Repository } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { Movie } from "src/movie/entities/movie.entity";
import { promises } from "dns";



@Injectable()
export class LikeService {
    constructor(
        @InjectRepository(Like)
        private readonly likeRepository: Repository<Like>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Movie)
        private readonly movieRepository: Repository<Movie>,
    ) {}

    async likeMovie(userId: number, movieId: number): Promise<Like> {
        const user = await this.userRepository.findOneBy({id: userId});
        const movie = await this.movieRepository.findOneBy({ id: movieId});

        const like = new Like();
        like.user = user;
        like.movie = movie;

        return this.likeRepository.save(like);
    }

    async findLikesByUser(userId: number): Promise<Like[]> {
        return this.likeRepository.find({ where: { user: {id: userId}}, relations: ['movie']});
    
    }


    async findLikesByMovie(movieId: number): Promise<Like[]> {
      return this.likeRepository.find({ where: { movie: { id: movieId}}, relations: ['user'] });
    }
}