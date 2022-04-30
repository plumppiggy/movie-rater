import React, { Component } from 'react';
import '../index.css';
import './movies.css';
import Modal from '../components/Modal/modal';
import Backdrop from '../components/Backdrop/backdrop';


class MoviesPage extends Component {

    state = {
        creating: false
    };

    startCreateEventHandler = () => {
        this.setState({creating: true});
    };
    modalConfirmHandler = () => {
        this.setState({creating: false});
    };
    modalCancelHandler = () => {
        this.setState({creating: false});
    };

    render () {
        return (
        <React.Fragment>
            {this.state.creating && <Backdrop />}
            {this.state.creating && 
            <Modal title="Add Movie" 
            canCancel canConfirm onCancel={this.modalCancelHandler} onConfirm={this.modalConfirmHandler}>
                <p>Modal Content</p>
            </Modal>}
            <div className='movies-control'>
            <button className='btn' onClick={this.startCreateEventHandler}>Create Movie</button>
            </div>
        </React.Fragment>
        
        );
    }
}

export default MoviesPage;