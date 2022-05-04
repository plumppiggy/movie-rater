import React, { Component } from "react";
import AuthContext from '../context/auth-context';
import './movies.css';
import WatchlistList from '../components/watchlist/watchlistList/watchlistList';

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

deleteWatchlistHandler = watchlistId => {
		const curUserId = this.context.userId;
		const token = this.context.token;

		const requestBody = {
			userId: curUserId
		}
		
		fetch('http://localhost:8000/watchlist/' + watchlistId, {
		method: 'DELETE',
		body: JSON.stringify(requestBody),
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
		this.setState(prevState => {
			const newMovies = prevState.movies.filter(movie => {
				return movie._id !== watchlistId;
			});
			return { movies : newMovies, isLoading: false};

		})
	})
	.catch(err => {
		console.log(err);
	});

}


render() {
	return (
		<React.Fragment>
		{this.state.isLoading ? <div className='spinner'>
		<div className="lds-hourglass"></div>
		</div> : 
		<WatchlistList movies={this.state.movies} onDelete={this.deleteWatchlistHandler}/>
		}
	</React.Fragment>);
	
	
	
}
}

export default WatchlistPage;