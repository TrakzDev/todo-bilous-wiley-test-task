import React from 'react';

class TaskInput extends React.Component {
  render() {
    return (
      <div className="readMe">
        <h3>ReadMe</h3>
        <p>Hi there! Here my test task app.</p>
        <p>The React framework helped me create the application. I used it without additional libraries.</p>
        <p>Let's go through the points of the requirements of the "customer":</p>
        <ul>
          <li>Add a task with title - done</li>
          <li>Task list is sorted in reverse order by the task title - done</li>
          <li>Mark a task as comlileted - done</li>
          <li>Remove a task - done</li>
          <li>Persist tasks between working sessions - done (imlilemented through LocalStorage)</li>
          <li>Edit a task - done (I think so, but not sure if this is friendly :) ) </li>
        </ul>
        <p>The following additional features have also been added:</p>
        <ul>
          <li>Sorting tasks by categories (active tasks at top)</li>
          <li>Customer can see number of active tasks</li>
          <li>Inputs (add task and edit task) can be confirmed with Enter button</li>
        </ul>
        <p>In general, the creation took 6 - 6.5 hours, with all the interruptions to other matters.</p>
      </div>
    )
  }
}

export default TaskInput;
