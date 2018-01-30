// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles';

import Todo from '../../components/Todo';

export default class App extends Component {
    render () {
        return (
            <section className = { Styles.app }>
                <Todo />
            </section>
        );
    }
}
