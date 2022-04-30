import React, { Component } from 'react';
import './auth.css';
import AuthContext from '../context/auth-context';

class AuthPage extends Component {
    state = {
        isLogin: true
    };

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
    }
    switchModeHandler = () => {
        this.setState(prevState => {
            return {isLogin: !prevState.isLogin};
        })
    };

    submitHandler = (event) => {
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;

        if (email.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        const requestBody = {
            email: email,
            password: password
        };

        var choice = 'login';

        if (!this.state.isLogin) {
            choice = 'signup';
        }

        fetch('http://localhost:8000/user/' + choice, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then( res => {
            if (res.status != 200 && res.status != 201) {
                throw new Error('fail');
            }
            return res.json();
        })
        .then(resData => {
            if (this.state.isLogin) {
                this.context.login(resData.token, resData.userId);
            }
        })
        .catch(err => {
            console.log(err);
        });
        console.log(email, password);
    };

    render () {
        return <form className='auth-form' onSubmit={this.submitHandler}>
            <div className='form-control'>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" ref={this.emailEl}/>
            </div>
            <div className='form-control'>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" ref={this.passwordEl}/>
            </div>
            <div className='form-actions'>
                <button type="submit">Submit</button>
                <button type="button" onClick={this.switchModeHandler}>Switch to {this.state.isLogin ? 'Signup' : 'Login'}</button>
            </div>
        </form>;
    }
}

export default AuthPage;