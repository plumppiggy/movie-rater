import React from "react";
import './watchlistList.css';

const watchlistList = props => (
    <ul className="watchlist">
        {props.movies.map(movie => {
            console.log(movie);
            return <li className="watchlist__item">
                    <div className="watchlist__item-data">
                        {movie.movie.name}
                    </div>
                    <div className="watchlist__item-actions">
                        <button className="btn" onClick={props.onDelete.bind(this, movie._id)}>Delete from watchlist</button>
                    </div>
                    </li>
        }
        )}
    </ul>
)

export default watchlistList;

