import React from 'react';
import Task from './components/Task';
import Input from './components/Input';

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
    this.taskAdd = this.taskAdd.bind(this);
  }

  taskAdd(task) {
    this.setState(state => {
      let { tasks } = state,
          id =  tasks.length !== 0 ? tasks.length : 0;

      tasks.push({
        id: id,
        title: task,
        done: false
      });

      return tasks;
    })
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
        <Input
          taskAdd={this.taskAdd}
        />
      </div>

    )
  }
}

export default App;
