// Core
import React, { Component } from 'react';
import { func } from 'prop-types';

//Instruments
import Styles from './styles';

export default class Composer extends Component {

    static propTypes = {
        createTask: func.isRequired
    };

    constructor () {
        super();
        this.handleSubmit = ::this._handleSubmit;
    }

    state = {
        charactersExceeded: false,
        taskDescription:    ''
    };

    _handleSubmit (event) {
        event.preventDefault();

        const { taskDescription } = this.state;

        if (taskDescription) {
            this.props.createTask(taskDescription);
            this.setState(() => ({ taskDescription }));
        }
    }

    _handleTextAreaChange = ({ target }) => {
        const { value: taskDescription } = target;

        console.log(taskDescription);
        if (taskDescription.length < 30) {
            this.setState({ charactersExceeded: false });
            this.setState({ taskDescription });
        } else {
            this.setState({ charactersExceeded: true });
        }
    };


    render () {
        const { taskDescription, charactersExceeded } = this.state;

        return (
            <section className = { Styles.composer } >
                <form onSubmit = { this.handleSubmit } >
                    <input
                        className = { `
                        ${charactersExceeded ? Styles.limitWarning : null}
                        ${Styles.inputStyle}
                        ` }
                        placeholder = { 'Write here' }
                        type = 'text'
                        value = { taskDescription }
                        onChange = { this._handleTextAreaChange }
                    />
                    <input type = 'submit' value = 'Add' />
                </form>
            </section>
        );
    }
}
