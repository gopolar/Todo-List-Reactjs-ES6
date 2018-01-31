// Core
import React, { Component } from 'react';
import { func } from 'prop-types';

//Instruments
import Styles from './styles';

export default class Composer extends Component {

    static propTypes = {
        createTask:     func.isRequired,
        isCompletedAll: func.isRequired
    };

    constructor () {
        super();
        this.handleSubmit = ::this._handleSubmit;
        this.handleIsCompletedAll = ::this._handleIsCompletedAll;
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
            this.setState(() => ({ taskDescription: '' }));
        }
    }

    _handleTextAreaChange = ({ target }) => {
        const { value: taskDescription } = target;

        if (taskDescription.length <= 30) {
            this.setState({ charactersExceeded: false });
            this.setState({ taskDescription });
        } else {
            this.setState({ charactersExceeded: true });
        }
    };

    _handleIsCompletedAll () {
        this.props.isCompletedAll();
    }


    render () {
        const { taskDescription, charactersExceeded } = this.state;

        return (
            <section className = { Styles.composer } >
                <form onSubmit = { this.handleSubmit } >
                    <input
                        // checked = { isCompleted }
                        type = 'checkbox'
                        onChange = { this.handleIsCompletedAll }
                    /><span>Done all</span>
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
