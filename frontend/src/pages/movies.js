import React, { Component } from 'react';
import '../index.css';
import './movies.css';
import Modal from '../components/Modal/modal';
import Backdrop from '../components/Backdrop/backdrop';
import AuthContext from '../context/auth-context';
import MovieList from '../components/Movies/MovieList/MovieList';
import authContext from '../context/auth-context';


class MoviesPage extends Component {

    state = {
        creating: false,
        movies: []
    };

    static contextType = AuthContext;


    constructor(props) {
        super(props);
        this.nameElRef = React.createRef();
        this.ratingElRef = React.createRef();

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

        if (name.trim().length === 0 || rating.trim().length === 0) {
            return;
        }
        
        const event = {name, rating};
        console.log(event);

        const requestBody = {
            name: name,
            rating: rating,
            userId: this.context.userId
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
            if (res.status != 200 && res.status != 201) {
                throw new Error('fail');
            }
            return res.json();
        })
        .then(resData => {
            this.fetchMovies();
            console.log(resData);
        })
        .catch(err => {
            console.log(err);
        });

    };

    modalCancelHandler = () => {
        this.setState({creating: false});
        

    };

    fetchMovies () {
        fetch('http://localhost:8000/movies/', {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
            }
        })
        .then( res => {
            if (res.status != 200 && res.status != 201) {
                throw new Error('fail');
            }
            return res.json();
        })
        .then(resData => {
            console.log(resData);
            const movies = resData.movies;
            this.setState({movies: movies});
            console.log(movies);
        })
        .catch(err => {
            console.log(err);
        });
    }

    render () {

        
        return (
        <React.Fragment>
            {this.state.creating && <Backdrop />}
            {this.state.creating && 
            <Modal title="Add Movie" 
            canCancel canConfirm onCancel={this.modalCancelHandler} onConfirm={this.modalConfirmHandler}>
                <form>
                    <div className='form-control'>
                        <label htmlFor='name'>Name</label>
                        <input type="text" id='name' ref={this.nameElRef}></input>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='rating'>Rating</label>
                        <input type="number" id='rating' ref={this.ratingElRef}></input>
                    </div>
                </form>
            </Modal>}
            {this.context.token && (
            <div className='movies-control'>
            <button className='btn' onClick={this.startCreateEventHandler}>Create Movie</button>
            </div>)}
            <MovieList 
            movies={this.state.movies}
            authUserId={this.context.userId}/>
            
        </React.Fragment>
        
        );
    }
}

export default MoviesPage;