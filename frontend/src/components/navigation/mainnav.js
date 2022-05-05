import React from "react";
import { NavLink } from 'react-router-dom';
import './mainnav.css';
import AuthContext from "../../context/auth-context";

const mainNav = props => (
	<AuthContext.Consumer>
		{(context) => {
			return (
				<header className="main-nav">
    			<div className="main-nav__title">
    				<h1>Movie Rater</h1>
    			</div>
    			<nav className="main-nav__items">
    				<ul>
    					{!context.token && <li>
							<NavLink to="/auth">Auth</NavLink>
						</li>}
						{context.token && (
							<React.Fragment>
								<li>
								<button onClick={context.logout}>Logout</button>
								</li>
								
							</React.Fragment>
						)}
						<li>
							<NavLink to="/movies">Movies</NavLink>
						</li>
						<li>
							<NavLink to="/watchlist">Watchlist</NavLink>
						</li>
    				</ul>
    			</nav>
   				</header>
			);
		}}
    
	</AuthContext.Consumer>
)
    
export default mainNav;