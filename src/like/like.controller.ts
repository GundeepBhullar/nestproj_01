import { Controller, Param, Post, Request, UseGuards } from "@nestjs/common";
import { LikeService } from "./like.service";
//import { JwtAuthGuard} from "../auth/jwt-auth.guard";




@Controller('like')
export class LikeController {
    constructor(private readonly likeService: LikeService) {}

    //@UseGuards(JwtAuthGuard)
    @Post(':movieId')
    async likeMovie(@Request() req, @Param('movieId') movieId: number) {
        const userId = req.user.id;
        return this.likeService.likeMovie(userId, movieId);

    }
}