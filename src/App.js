import React from 'react';
import Task from './components/Task';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      tasks: [
          {id: 0, title: 'task1', done: false},
          {id: 1, title: 'task2', done: false},
          {id: 2, title: 'task3', done: true}
        ]
    }
  }

  taskDone(id) {
    const index = this.state.tasks.map(task => task.id).indexOf(id);

    this.setState(state => {
      let { tasks } = state;

      tasks[index].done = true;

      return tasks;
    })
  }

  taskDelete(id) {
    const index = this.state.tasks.map(task => task.id).indexOf(id);

    this.setState(state => {
      let { tasks } = state;

      delete tasks[index];

      return tasks;
    })
  }

  render() {
    const { tasks } = this.state;

    return (
      <div className="todo-app">
        {tasks.map(task =>
          <Task
            task={task}
            key={task.id}
            taskDone={() => this.taskDone(task.id)}
            taskDelete={() => this.taskDelete(task.id)}
          />
        )}
      </div>

    )
  }
}

export default App;
