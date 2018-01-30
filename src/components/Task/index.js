//Core
import React, { Component } from 'react';
import { string, number, func } from 'prop-types';

//Instruments
import Styles from './styles';

export default class Task extends Component {

    static propTypes = {
        deleteTask:      func.isRequired,
        id:              number.isRequired,
        taskDescription: string.isRequired
    };

    constructor () {
        super();
        this.handleDeleteTask = ::this._handleDeleteTask;
    }

    _handleDeleteTask () {
        const { id } = this.props;

        this.props.deleteTask(id);
    }

    render () {
        const { taskDescription } = this.props;


        return (
            <section className = { Styles.task }>
                <form>
                    <input type = 'checkbox' /><span>{ taskDescription }</span>
                    <i className = { Styles.cross } onClick = { this.handleDeleteTask } />
                </form>
            </section>
        );
    }
}
