import React from "react";
import './MovieList.css';
import MovieItem from './MovieItem/movieItem'; 

const movieList = props => {
    const movies = props.movies.map(movie => {
        return (
            <MovieItem 
            key={movie._id} 
            movieId={movie._id} 
            name={movie.name}
            userId={props.authUserId}
            creatorId={movie.creatorId} />
        );
    });

    return <ul className="movie__list">{movies}</ul>;
    
};

export default movieList;