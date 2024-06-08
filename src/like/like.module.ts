import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Like } from "./like.entity";
import { User } from "src/user/entities/user.entity";
import { Movie } from "src/movie/entities/movie.entity";
import { LikeService } from "./like.service";
import { LikeController } from "./like.controller";



@Module({
    imports: [TypeOrmModule.forFeature([Like, User, Movie])],
    providers: [LikeService],
    controllers: [LikeController],
})

export class LikeModule {}