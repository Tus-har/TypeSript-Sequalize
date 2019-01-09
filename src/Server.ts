// import User from "./db/models/user";
import faker from 'faker';
import Lodash from 'lodash';
import Actor from './db/models/actor';
import Genre from './db/models/genre';
import Movie from './db/models/movie';
import MovieActor from './db/models/movieactor';
import MovieGenre from './db/models/moviegenre';
import sequelize from './db/sequelize';
import {col, Op, Sequelize, where} from 'sequelize';
import genre from "./db/models/genre";

const test = async () => {
    sequelize.addModels([Actor, Movie, Genre, MovieActor, MovieGenre]);

    // const user = new User({firstName: 'anas', lastName:'md', email: 'anas.ansal10@gmail.com'});
    // await user.save();
    // console.log(user);
    // const genre = await Genre.create({name: 'Horror'})
    // const movie = await Movie.create({title: 'URI'})
    // const actor = await Actor.create({name: 'Kush'})
    let genres: Genre[] = await Genre.findAll()
    let actors: Actor[] = await Actor.findAll()
    let movies: Movie[] = await Movie.findAll()
    if (genres.length == 0) {
        genres = await addGenres();
    }
    if (movies.length == 0) {
        movies = await addMovies(genres);
    }
    if (actors.length == 0) {
        actors = await addActors(movies);
    }

    // genre.$set('movies', [movie.id]).then((res)=>{
    //     console.log(res)
    // }).catch((err)=>{
    //     console.log(err)
    // })
    // // movie.$add('cast', actor.id)
    // movie.$set('cast', [actor.id]).then((res)=>{
    //     console.log(res)
    // }).catch((err)=>{
    //     console.log(err)
    // })
    // let oneMovie = await Movie.findById(1398)
    const sampleActor: Actor = Lodash.sample(actors);
    // const sampleMovie: Movie = Lodash.sample(await Movie.findAll());
    // const sampleGenre: Genre = Lodash.sample(await Genre.findAll());

    // @ts-ignore
    // const getMoviesFromActor: Movie[] = await sampleActor.$get('movies');
    // const getCast = await sampleMovie.$get('cast');
    // const getMoviesFromGenre = await sampleGenre.$get('movies');
    await testThirdLevelQuerying(sampleActor);
    await testThirdLevelQueryingWithTwoQueries(sampleActor);
    await testThirdLevelQueryingWithOneQuery(sampleActor);
    //
    // console.log('getMoviesFromActor', getMoviesFromActor, '\ngetCast', getCast, '\ngetMoviesFromGenre', getMoviesFromGenre);
    // const movieTitlesActor = actorResult.movies.map((movie) => {
    //     return movie.title;
    // });
    //
    // const genreNames = movieResult.genres.map((genre) => {
    //     return genre.name;
    // });
    //
    // const actorNames = movieResult.cast.map((actor) => {
    //     return actor.name;
    // });
    //
    // const movieTitlesGenre = genreResult.movies.map((movie) => {
    //     return movie.title;
    // });
    // console.log('actor result \nname: ', actorResult.name, '\nmovies: ', movieTitlesActor);
    // console.log('movie result \ntitle: ', movieResult.title, '\ngenres: ', genreNames, '\nactors: ', actorNames);
    // console.log('genre result \ntitle: ', genreResult.name, '\nmovies: ', movieTitlesGenre);

    // let movieIds = associations[0].map((movie)=>{
    //      return movie.id
    //  })
    // console.log(movieIds)

};

const addGenres = async () => {
    const genres = [];
    for (let i = 0; i < 100; i++) {
        const result = await Genre.create({name: faker.random.word()});
        genres.push(result);
    }
    return genres;
};

const addMovies = async (genres) => {
    const movies = [];
    for (let i = 0; i < 100; i++) {
        const result = await Movie.create({title: faker.random.word()});
        for(let j = 0; j<5; j++){
            const genre: Genre = Lodash.sample(genres);
            await genre.$add('movies', result.id);
        }
        movies.push(result);
    }
    return movies;
};

const addActors = async (movies) => {
    const actors = [];
    for (let i = 0; i < 100; i++) {
        const result = await Actor.create({name: faker.name.findName()});
        for(let j = 0; j < 5; j++){
            const movie: Movie = Lodash.sample(movies);
            await movie.$add('cast', result.id);
        }
        actors.push(result);
    }
    return actors;
};

const testThirdLevelQuerying = async (actor) => {
    const moviesFromActor: Movie[] = await actor.$get('movies');

    console.log('testThirdLevelQuerying');
    const movieNames: string[]= moviesFromActor.map(m => {return m.title;});
    console.log(movieNames);
    for (const movie of moviesFromActor) {
        // @ts-ignore
        const genres: Genre[] = await movie.$get('genres');
        console.log('Genres\n', genres.map((genre) => {
            return genre.name;
        }));
    }
};

const testThirdLevelQueryingWithTwoQueries = async (actor) => {
    const moviesFromActor: Movie[] = await actor.$get('movies');

    console.log('testThirdLevelQueryingWithTwoQueries');
    const movieIds: number[] = moviesFromActor.map((m: Movie) => {
        return m.id;
    });
    const genres: Genre[] = await Genre.findAll({include: [{model: Movie, where: { id: {[Op.in]: movieIds}}}]});
    console.log('genres of movie ids ', movieIds, '\n', genres.map(genre => genre.name));
};

const testThirdLevelQueryingWithOneQuery = async (actor) => {
    const genres: Genre[] = await Genre.findAll({
        include:
            [
                {
                    model: Movie,
                    include:[
                        {
                            model: Actor,
                            where: {
                                id: actor.id
                            },
                        },
                    ],
                },
            ],
    });
    console.log('testThirdLevelQueryingWithOneQuery');
    console.log(genres.map((genre: Genre)=>{return genre.name}))
};

test();
