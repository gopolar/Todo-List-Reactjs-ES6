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
        taskDescription:    '',
        allChecked:         false
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
        const { allChecked } = this.state;

        this.setState(() => ({ allChecked: !allChecked }));

        !allChecked ? this.props.isCompletedAll() : null; //все буду сделанные если Complete All не checked
    }


    render () {
        const { taskDescription, charactersExceeded, allChecked } = this.state;

        return (
            <section className = { Styles.composer } >
                <form onSubmit = { this.handleSubmit } >

                    <label><input
                        checked = { allChecked }
                        type = 'checkbox'
                        onChange = { this.handleIsCompletedAll }
                    />Done all</label>

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
