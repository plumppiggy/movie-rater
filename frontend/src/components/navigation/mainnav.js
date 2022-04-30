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
    					{context.token && <li>
							<NavLink to="/auth">Auth</NavLink>
						</li>}
    				</ul>
    			</nav>
   				</header>
			);
		}}
    
	</AuthContext.Consumer>
)
    
export default mainNav;