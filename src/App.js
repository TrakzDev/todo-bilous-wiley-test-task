import React from 'react';
import Task from './components/Task';
import Input from './components/Input';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      tasks: []
    }
    this.taskAdd = this.taskAdd.bind(this);
  }

  componentDidMount() {
    let oldTasks = [];

    for (let i = 0; i < localStorage.length; i++) {
      let oldTask = JSON.parse(localStorage.getItem(localStorage.key(i))),
          addableTask = {
            id: i,
            title: oldTask.title,
            done: oldTask.done
          };

      oldTasks.push(addableTask);

      this.setState(state => {
        let { tasks } = state;
        tasks.push(addableTask);
        return tasks;
      })
    }

    localStorage.clear();

    for (let i = 0; i < oldTasks.length; i++) {
      localStorage.setItem(i, JSON.stringify(oldTasks[i]))
    }

    if (oldTasks.length === 0) {
      this.setState(state => {
        let { tasks } = state;
        tasks.push({
          id: 0,
          title: 'Add your first task below :)',
          done: true
        });
        return tasks;
      })
    }
  }

  taskAdd(task) {
    this.setState(state => {
      let { tasks } = state,
          id =  tasks.length !== 0 ? tasks.length : 0,
          newTask = {
            id: id,
            title: task,
            done: false
          }

      tasks.push(newTask);
      localStorage.setItem(id, JSON.stringify(newTask));

      return tasks;
    })
  }

  taskDone(id) {
    const index = this.state.tasks.map(task => task.id).indexOf(id);

    this.setState(state => {
      let { tasks } = state;

      tasks[index].done = true;
      localStorage.setItem(index, JSON.stringify(tasks[index]));

      return tasks;
    })
  }

  taskDelete(id) {
    const index = this.state.tasks.map(task => task.id).indexOf(id);

    this.setState(state => {
      let { tasks } = state;

      delete tasks[index];
      localStorage.removeItem(index)

      return tasks;
    })
  }

  reversSortTasks(tasks) {
    tasks.sort(function(title1, title2){
      let titleA = title1.title.toLowerCase(), titleB = title2.title.toLowerCase();

      if (titleA < titleB)
        return 1
      if (titleA > titleB)
        return -1
      return 0
    })

    return tasks;
  }

  render() {
    const { tasks } = this.state;

    this.reversSortTasks(tasks);

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
