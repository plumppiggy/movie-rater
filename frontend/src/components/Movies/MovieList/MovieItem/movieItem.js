import React from "react";
import './movieItem.css';

const movieItem = props => (
        <li key={props._id}className='movie__list-item'>
            <div>
                <h1>{props.name}</h1>
                <h2>{props.rating}</h2>

            </div>
            <div>
                <button className="btn" onClick={props.onDetail.bind(this, props.movieId)}>View Details</button>
            </div>
            </li>
        
);

export default movieItem;