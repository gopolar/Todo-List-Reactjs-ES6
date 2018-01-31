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
        this.isCompletedToggle = ::this._isCompletedToggle;
        this.isCompletedAll = ::this._isCompletedAll;


    }

    state = {
        tasks: [
            {
                taskDescription: 'task 1',
                isCompleted:     false
            },
            {
                taskDescription: 'task 2',
                isCompleted:     true
            }
        ]
    };

    _createTask (taskDescription) {
        const { tasks } = this.state;

        this.setState(() => ({
            tasks: [{ taskDescription, isCompleted: false }, ...tasks]
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

    _isCompletedToggle (id) {
        const { tasks } = this.state;

        tasks[id].isCompleted = !tasks[id].isCompleted;
        this.setState(() => ({
            tasks: [...tasks]
        }));
    }

    _isCompletedAll () {
        const { tasks } = this.state;


        tasks.forEach((task) => task.isCompleted = true);

        this.setState(() => ({
            tasks: [...tasks]
        }));
    }

    render () {
        const { tasks } = this.state;

        const mappedTasks = tasks.map((task, index) => (
            <Task
                deleteTask = { this.deleteTask }
                id = { index }
                isCompleted = { task.isCompleted }
                isCompletedToggle = { this.isCompletedToggle }
                key = { index }
                taskDescription = { task.taskDescription }
            />
        ));

        return (
            <section className = { Styles.todo }>
                { mappedTasks }
                <Composer
                    createTask = { this.createTask }
                    isCompletedAll = { this.isCompletedAll }
                />
            </section>
        );
    }
}
