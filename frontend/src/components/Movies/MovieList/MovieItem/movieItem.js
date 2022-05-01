import React from "react";
import './movieItem.css';

const movieItem = props => (
        <li key={props._id}className='movie__list-item'>
            <div>
                <h1>{props.name}</h1>
                <h2>{props.rating}</h2>

            </div>
            <div>
                <button className="btn">View Details</button>
                {props.userId === props.creatorId && <button className="btn">Edit Rating</button>}
            </div>
            </li>
        
);

export default movieItem;