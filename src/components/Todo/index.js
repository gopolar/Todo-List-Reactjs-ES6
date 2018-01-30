//Core
import React, { Component } from 'react';

//Instruments
import Styles from './styles';
import Composer from '../Composer';
import TasksList from '../TasksList';


export default class Todo extends Component {

    constructor () {
        super();
        this.createTask = ::this._createTask;
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

    render () {
        const { tasks } = this.state;

        console.log('Todo - tasks:', tasks);

        return (
            <section className = { Styles.todo }>
                <TasksList tasks = { tasks } />
                <Composer createTask = { this.createTask } />
            </section>
        );
    }
}
