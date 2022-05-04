import React, { Component } from "react";
import AuthContext from '../context/auth-context';
import './movies.css';

class WatchlistPage extends Component {

    static contextType = AuthContext;

    state = {
        isLoading: false,
        movies: []
    }
    
    fetchMovies = () => {
        this.setState({isLoading : true});
        const curUserId = this.context.userId;
        const token = this.context.token;
        
        fetch('http://localhost:8000/watchlist/' + curUserId, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + token
            }
        })
        .then( res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('fail to get watchlist');
            }
            return res.json();
        })
        .then(resData => {
            console.log(resData);
            const movies = resData.watchlist;
            this.setState({movies: movies, isLoading: false});
        })
        .catch(err => {
            console.log(err);
        });
    }

    componentDidMount() {
        this.fetchMovies();

    }
    render() {
        return (
            <React.Fragment>
                {this.state.isLoading ? <div className='spinner'>
                <div className="lds-hourglass"></div>
            </div> : 
                <ul>
            {this.state.movies.map(movie => <li>{movie.movie.name}</li>)}
            </ul>
    }

            </React.Fragment>);

        
        
    }
}

export default WatchlistPage;