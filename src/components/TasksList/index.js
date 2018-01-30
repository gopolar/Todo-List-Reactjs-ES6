// Core
import React, { Component } from 'react';
import { array } from 'prop-types';

//Instruments
import Task from '../Task';

export default class TasksList extends Component {

    static propTypes = {
        tasks: array.isRequired
    };

    render () {

        const { tasks } = this.props;

        const mappedTasks = tasks.map((task, index) => <Task key = { index } taskDescription = { task.taskDescription } />);

        return (
            <section>
                { mappedTasks }
            </section>
        );
    }
}
