import React from 'react';
import Task from './components/Task';
import Input from './components/Input';
import ReadMe from './ReadMe';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      tasks: [],
      editor: {
        id: -1,
        text: ''
      }
    }
    this.taskAdd = this.taskAdd.bind(this);
    this.taskChange = this.taskChange.bind(this);
    this.hideChangeInput = this.hideChangeInput.bind(this);
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

  taskStartEdit(id) {
    let { tasks, editor } = this.state;
    const index = tasks.map(task => task.id).indexOf(id);

    if (editor.id !== -1) {
      this.hideChangeInput();
    } else {
      this.setState({ editor: { id: index, text: tasks[index].title }});
    }
  }

  taskChange(changedTaskTitle) {
    this.setState(state => {
      let { tasks, editor } = state,
          id = editor.id;

      tasks[id].title = changedTaskTitle;
      localStorage.setItem(id, JSON.stringify(tasks[id]));

      return tasks;
    })
    this.hideChangeInput();
  }

  hideChangeInput() {
    this.setState({ editor: { id: -1, text: '' }});
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
    const { tasks, editor } = this.state;
    let activeTasks = tasks.filter(task => !task.done),
        doneTasks = tasks.filter(task => task.done),
        editorInput;

    this.reversSortTasks(activeTasks);
    this.reversSortTasks(doneTasks);

    if (editor.id > -1) {
      editorInput = <Input usage={'editTask'} value={editor.text} taskChange={this.taskChange} hideChangeInput={this.hideChangeInput}/>;
    }

    return (
      <div className="todo-app">
        <div className='mainBlock'>
          <h1>Active tasks: {activeTasks.length}</h1>
          {[...activeTasks, ...doneTasks].map(task =>
            <Task
              task={task}
              key={task.id}
              taskDone={() => this.taskDone(task.id)}
              taskDelete={() => this.taskDelete(task.id)}
              taskStartEdit={() => this.taskStartEdit(task.id)}
            />
          )}
          <Input
            usage={'taskAdd'}
            taskAdd={this.taskAdd}
          />
          {editorInput}
        </div>
        <ReadMe/>
      </div>
    )
  }
}

export default App;
