import React from 'react';

class TaskInput extends React.Component {
  constructor(props) {
    super(props);

    let inputVal = props.value ? props.value : ''

    this.state = {
      input: inputVal,
      startInput: inputVal
    }
  }

  taskAdd = () => {
    const { input } = this.state;

    if ( input ) {
      this.props.taskAdd(input);
      this.setState({input: ''})
    }
  }

  taskChange = () => {
    const { input, startInput } = this.state;

    if ( input && input !== startInput ) {
      this.props.taskChange(input);
      this.setState({input: ''})
    } else {
      this.props.hideChangeInput();
    }
  }

  changeInput = event => {
    this.setState({input: event.target.value})
  }

  pressedAddEnter = event => {
    if (event.key === 'Enter') {
      this.taskAdd();
    }
  }

  pressedChangeEnter = event => {
    if (event.key === 'Enter') {
      this.taskChange();
    }
  }

  render() {
    const { input } = this.state;
    let actionBtn, onKeyPressFunc;

    if (this.props.usage === 'taskAdd') {
      actionBtn = <button onClick={this.taskAdd}>add</button>;
      onKeyPressFunc = this.pressedAddEnter;
    } else {
      actionBtn = <button onClick={this.taskChange}>edit</button>;
      onKeyPressFunc = this.pressedChangeEnter;
    }

    return (
      <div>
        <input
          onChange={this.changeInput}
          onKeyPress={onKeyPressFunc}
          value={input}
        />
        {actionBtn}
      </div>
    )
  }
}

export default TaskInput;
