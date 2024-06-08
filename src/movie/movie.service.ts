import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MovieService {

  constructor(
    @InjectRepository(Movie) private readonly movieRepository: Repository<Movie>
  ) {}

  createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie: Movie = new Movie();
    movie.name = createMovieDto.name;
    movie.cast = createMovieDto.cast;
    movie.release = createMovieDto.release;
    return this.movieRepository.save(movie);
  }

  findAllMovie() : Promise<Movie[]> {
    return this.movieRepository.find();
  }

  viewMovie(id: number): Promise<Movie> {
    return this.movieRepository.findOneBy({id});
  }

  updateMovie(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie: Movie = new Movie();
    movie.name = updateMovieDto.name;
    movie.cast = updateMovieDto.cast;
    movie.release = updateMovieDto.release;
    movie.id = id;
    return this.movieRepository.save(movie);
  }

  removeMovie(id: number): Promise<{ affected?: number }> {
    return this.movieRepository.delete(id);
  }
}
