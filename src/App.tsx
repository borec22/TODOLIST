import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {
    const tasks1: Array<TaskType> = [
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'HTML', isDone: true},
        {id: 3, title: 'REACT', isDone: false}
    ];
    const tasks2: Array<TaskType> = [
        {id: 1, title: 'RUN MARATHON', isDone: false},
        {id: 2, title: 'DONE 43 PULL UPS', isDone: false},
        {id: 3, title: 'DONE FLAG', isDone: false}
    ];
    return (
        <div className="App">
            <Todolist title='What to learn?' tasks={tasks1}/>
            <Todolist title='Sport mission.' tasks={tasks2}/>
        </div>
    );
}

export default App;
