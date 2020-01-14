import React from 'react';

const Task = ({task, ...props}) => {

  const ActionBtn = () => (
    <div>
      { task.done
        ?
        <button className="remove" onClick={props.taskDelete} />
        :
        <button className="makeDone" onClick={props.taskDone} />
      }
    </div>
  );

  const className = 'task' + (task.done ? ' done' : '');

  return (
    <div className={className}>
      <p className="taskTitle">{task.title}</p>
      <ActionBtn/>
    </div>
  )
}

export default Task;
