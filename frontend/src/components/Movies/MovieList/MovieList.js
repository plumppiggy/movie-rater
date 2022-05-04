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
            description={movie.description}
            rating={movie.rating}
            userId={props.authUserId}
            creatorId={movie.creatorId}
            onDetail={props.onViewDetail} />
        );
    });

    return <ul className="movie__list">{movies}</ul>;
    
};

export default movieList;