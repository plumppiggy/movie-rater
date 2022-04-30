import React, { Component } from 'react';
import '../index.css';
import './movies.css';
import Modal from '../components/Modal/modal';
import Backdrop from '../components/Backdrop/backdrop';


class MoviesPage extends Component {

    state = {
        creating: false
    };

    constructor(props) {
        super(props);
        this.nameElRef = React.createRef();
        this.ratingElRef = React.createRef();

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
            <div className='movies-control'>
            <button className='btn' onClick={this.startCreateEventHandler}>Create Movie</button>
            </div>
        </React.Fragment>
        
        );
    }
}

export default MoviesPage;