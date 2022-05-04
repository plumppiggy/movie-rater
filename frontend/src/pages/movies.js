import React, { Component } from 'react';
import '../index.css';
import './movies.css';
import Modal from '../components/Modal/modal';
import Backdrop from '../components/Backdrop/backdrop';
import AuthContext from '../context/auth-context';
import MovieList from '../components/Movies/MovieList/MovieList';
import authContext from '../context/auth-context';


class MoviesPage extends Component {

    isActive = true;

    state = {
        creating: false,
        movies: [],
        isLoading: false,
        selectedMovie: null
    };

    static contextType = AuthContext;


    constructor(props) {
        super(props);
        this.nameElRef = React.createRef();
        this.ratingElRef = React.createRef();
        this.descriptionElRef = React.createRef();

    }

    componentDidMount () {
        this.fetchMovies();
    }


    startCreateEventHandler = () => {
        this.setState({creating: true});
    };

    modalConfirmHandler = () => {
        this.setState({creating: false});
        const name = this.nameElRef.current.value;
        const rating = this.ratingElRef.current.value;
        const description = this.descriptionElRef.current.value;

        if (name.trim().length === 0 || rating.trim().length === 0 || description.trim().length === 0) {
            return;
        }
        
        const event = {name, rating, description};
        console.log(event);

        const requestBody = {
            name: name,
            rating: rating,
            userId: this.context.userId,
            description: description
        };


        const token = this.context.token;

        fetch('http://localhost:8000/movies/', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + token
            }
        })
        .then( res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('fail');
            }
            return res.json();
        })
        .then(resData => {
            console.log(resData);
            this.setState(prevState => {
                const updatedMovies = [...prevState.movies];
                updatedMovies.push({
                    _id: resData._id,
                    name: resData.name,
                    creatorId: this.context.userId,
                    rating: resData.rating,
                    description: resData.description
                });
                return {movies: updatedMovies};
            });
            
        })
        .catch(err => {
            console.log(err);
        });

    };

    modalCancelHandler = () => {
        this.setState({creating: false});
        

    };

    fetchMovies () {
        this.setState({isLoading: true});
        fetch('http://localhost:8000/movies/', {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
            }
        })
        .then( res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('fail');
            }
            return res.json();
        })
        .then(resData => {
            console.log(resData);
            const movies = resData.movies;
            if (this.isActive) {
                this.setState({movies: movies, isLoading : false});
            }
            console.log(movies);
        })
        .catch(err => {
            console.log(err);
            if (this.isActive) {
                this.setState({isLoading: false});
            }
        });
    }

    showDetailHandler = movieId => {
        this.setState(prevState => {
            const selectedMovie = prevState.movies.find(e => e._id === movieId);
            console.log(selectedMovie);
            return {selectedMovie : selectedMovie};
        });

    }

    addToWatchlist = () => {
        if (!this.context.token) {
            this.setState({selectedMovie : null});
            return;
        }
        const token = this.context.token;
        console.log(this.state.selectedMovie);
        const requestBody = {
            movieId: this.state.selectedMovie._id,
            userId : this.context.userId
        };
        fetch('http://localhost:8000/watchlist/', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + token
            }
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('fail');
            }
            return res.json();
        })
        .then(resData => {
            console.log(resData);
            this.setState({selectedMovie:null});
            
            
        })
        .catch(err => {
            console.log(err);
        });
    };

    componentWillUnmount() {
        this.isActive = false;
    }

    render () {

        
        return (
        <React.Fragment>
            {(this.state.creating || this.state.selectedMovie )&& <Backdrop />}
            {this.state.creating && 
            <Modal title="Add Movie" 
            canCancel canConfirm onCancel={this.modalCancelHandler} onConfirm={this.modalConfirmHandler}
            confirmText={this.context.token ? 'Book' : 'Confirm'}>
                <form>
                    <div className='form-control'>
                        <label htmlFor='name'>Name</label>
                        <input type="text" id='name' ref={this.nameElRef}></input>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='rating'>Rating</label>
                        <input type="number" id='rating' ref={this.ratingElRef}></input>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='description'>Description</label>
                        <input type="text" id='description' ref={this.descriptionElRef}></input>
                    </div>
                </form>
            </Modal>}
            {this.state.selectedMovie && 
            <Modal title="Movie" 
            canCancel canConfirm onCancel={this.modalCancelHandler} onConfirm={this.addToWatchlist}
            confirmText="Add to watchlist">
                <h1>{this.state.selectedMovie.name}</h1>
                <p>{this.state.selectedMovie.description}</p>
            </Modal>}
            {this.context.token && (
            <div className='movies-control'>
            <button className='btn' onClick={this.startCreateEventHandler}>Create Movie</button>
            </div>)}
            {this.state.isLoading ? 
            <div className='spinner'>
                <div className="lds-hourglass"></div>
            </div>
             : 
            <MovieList 
            movies={this.state.movies}
            authUserId={this.context.userId}
            onViewDetail={this.showDetailHandler}/>}
            
            
        </React.Fragment>
        
        );
    }
}

export default MoviesPage;