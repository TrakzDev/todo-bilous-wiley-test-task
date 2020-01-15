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

  const EditorBtn = () => (
    <div>
      { !task.done
        ?
        <button className="editorBtn" onClick={props.taskStartEdit}>edit</button>
        :
        ''
      }
    </div>
  );

  const className = 'task' + (task.done ? ' done' : '');

  return (
    <div className={className}>
      <p className="taskTitle">{task.title}</p>
      <ActionBtn/>
      <EditorBtn/>
    </div>
  )
}

export default Task;
