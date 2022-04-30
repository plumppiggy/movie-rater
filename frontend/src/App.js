import './App.css';
import React, {Component, Redirect} from 'react';
import {BrowserRouter, Route, Routes, Link, Navigate} from 'react-router-dom';

import MainNav from './components/navigation/mainnav';
import Auth from './pages/auth';
import Movies from './pages/movies';
import AuthContext from './context/auth-context';

class App extends Component {
  state = {
    token: null,
    userId: null
  };

  login = (token, userId) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
    <React.Fragment>
      <AuthContext.Provider value={{
        token: this.state.token, 
        userId: this.state.userId, 
        login: this.login, 
        logout: this.logout
        }}>
      <MainNav />
      <main className='main-content'>
      <Routes>
        {this.state.token && <Route path="/" element={<Navigate replace to="/movies" />}></Route>}
        <Route path="/movies" element={<Movies />} />
        <Route path="/auth" element={<Auth />} />
        </Routes>
      </main>
      </AuthContext.Provider>
    </React.Fragment>
  );
}
}

export default App;


  
  