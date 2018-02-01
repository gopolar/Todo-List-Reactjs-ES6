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
        // this.search = ::this._search;
        // this.state.displayedItems = this.state.tasks;
    }

    state = {
        tasks: [
            {
                taskDescription: 'aa',
                isCompleted:     false
            },
            {
                taskDescription: 'ab',
                isCompleted:     true
            }
        ],
        displayedItems: [] //новый массив для Search
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


    // _search (term) {
    //     const { tasks, displayedItems } = this.state;
    //
    //     this.setState(() => ({
    //         displayedItems: tasks.filter(function(el) {
    //             var searchValue = el.taskDescription.toLowerCase();
    //             return searchValue.indexOf(term.toLowerCase()) !== -1;
    //         })
    //     }));
    // }


    render () {

        const { tasks, displayedItems } = this.state;

        console.log('displayedItems', displayedItems);


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
