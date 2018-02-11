// Core
import React, { Component } from 'react';

//Instruments
import Task from '../Task';
import Composer from '../Composer';
import Styles from './styles';
import Header from '../Header';

export default class Todo extends Component {

    constructor () {
        super();
        this.createTask = ::this._createTask;
        this.deleteTask = ::this._deleteTask;
        this.isCompletedToggle = ::this._isCompletedToggle;
        this.isCompletedAll = ::this._isCompletedAll;
        this.search = ::this._search;
    }

    state = {
        tasks: [
            {
                taskDescription: 'task1',
                isCompleted:     false
            },
            {
                taskDescription: 'task2',
                isCompleted:     true
            }
        ],
        term: ''
    };

    componentWillMount () {
        localStorage.getItem('tasks') && this.setState({
            tasks: JSON.parse(localStorage.getItem('tasks'))
        });
    }

    //saving to localStorage
    componentWillUpdate (nextProps, nextState) {
        localStorage.setItem('tasks', JSON.stringify(nextState.tasks));
    }


    _createTask (taskDescription) {

        const { tasks } = this.state;

        this.setState(() => ({
            tasks: [{ taskDescription, isCompleted: false }, ...tasks]
        }));

    }

    _deleteTask (id) {

        console.time('olesya');

        const { tasks } = this.state;

        if (id > -1) {
            tasks.splice(id, 1);
            this.setState(() => ({
                tasks: [...tasks]
            }));

        }

        console.timeEnd('olesya');
    }

    _isCompletedToggle (id) {
        const { tasks } = this.state;

        tasks[id].isCompleted = !tasks[id].isCompleted;
        this.setState(() => ({
            tasks: [...tasks]
        }));
    }

    _isCompletedAll (allChecked) {
        const { tasks } = this.state;


        tasks.forEach((task) => task.isCompleted = allChecked);

        this.setState(() => ({
            tasks: [...tasks]
        }));
    }


    _search (term) {
        this.setState({ term });
    }

    render () {
        const { tasks, term } = this.state;

        let filteredItems = [];

        if (term) {
            filteredItems = tasks.filter((word) => {
                const searchValue = word.taskDescription.toLowerCase();

                return searchValue.indexOf(term.toLowerCase()) !== -1;
            });
        } else {
            filteredItems = tasks;
        }

        const mappedTasks = filteredItems.map((task, index) => (
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
                <Header
                    search = { this.search }
                />
                { mappedTasks }
                <Composer
                    createTask = { this.createTask }
                    isCompletedAll = { this.isCompletedAll }
                />
            </section>
        );
    }
}
