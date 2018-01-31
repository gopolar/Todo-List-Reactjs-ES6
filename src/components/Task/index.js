//Core
import React, { Component } from 'react';
import { string, number, func, bool } from 'prop-types';

//Instruments
import Styles from './styles';

export default class Task extends Component {

    static propTypes = {
        deleteTask:        func.isRequired,
        id:                number.isRequired,
        isCompleted:       bool.isRequired,
        isCompletedToggle: func.isRequired,
        taskDescription:   string.isRequired
    };

    constructor () {
        super();
        this.handleDeleteTask = ::this._handleDeleteTask;
        this.handleIsCompletedToggle = ::this._handleIsCompletedToggle;
    }

    _handleDeleteTask () {
        const { id } = this.props;

        this.props.deleteTask(id);
    }

    _handleIsCompletedToggle () {
        const { id } = this.props;

        this.props.isCompletedToggle(id);
    }

    render () {
        const { taskDescription, isCompleted } = this.props;


        return (
            <section className = { Styles.task }>
                <form>
                    <input
                        checked = { isCompleted }
                        type = 'checkbox'
                        onChange = { this.handleIsCompletedToggle }
                    /><span>{ taskDescription }</span>
                    <i className = { Styles.cross } onClick = { this.handleDeleteTask } />
                    {/*<i className = { Styles.pencil } onClick = { this.handleEditTask } />*/}
                </form>
            </section>
        );
    }
}
