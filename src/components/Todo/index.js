// Core
import React, { Component } from 'react';

//Instruments
import Task from '../Task';
import Composer from '../Composer';
import Styles from './styles';

export default class Todo extends Component {

    constructor () {
        super();
        this.createTask = ::this._createTask;
        this.deleteTask = ::this._deleteTask;
    }

    state = {
        tasks: [
            {
                taskDescription: 'task1',
                isCompleted:     true
            }
        ]
    };

    _createTask (taskDescription) {
        const { tasks } = this.state;

        this.setState(() => ({
            tasks: [{ taskDescription }, ...tasks]
        }));
    }

    _deleteTask (id) {
        const { tasks } = this.state;

        if (id > -1) {
            tasks.splice(id, 1);
            this.setState(() => ({
                tasks: [...tasks]
            }));

        }
    }

    render () {
        const { tasks } = this.state;

        const mappedTasks = tasks.map((task, index) => (
            <Task
                deleteTask = { this.deleteTask }
                id = { index }
                key = { index }
                taskDescription = { task.taskDescription }
            />
        ));

        return (
            <section className = { Styles.todo }>
                { mappedTasks }
                <Composer createTask = { this.createTask } />
            </section>
        );
    }
}
