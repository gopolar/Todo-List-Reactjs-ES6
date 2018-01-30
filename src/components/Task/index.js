//Core
import React, { Component } from 'react';
import { string } from 'prop-types';

export default class Task extends Component {

    static propTypes = {
        taskDescription: string.isRequired
    };

    render () {
        const { taskDescription } = this.props;


        return (
            <section>
                <form>
                    <input type = 'checkbox' /> { taskDescription }
                    <hr />
                </form>
            </section>
        );
    }
}
