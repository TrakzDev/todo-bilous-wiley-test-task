import React from 'react';

class TaskInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ''
    }
  }

  addTask = () => {
    const { input } = this.state;

    if ( input ) {
      this.props.taskAdd(input);
      this.setState({input: ''})
    }
  }

  changeInput = event => {
    this.setState({input: event.target.value})
  }

  pressedEnter = event => {
    if (event.key === 'Enter') {
      this.addTask();
    }
  }

  render() {
    const { input } = this.state;

    return (
      <div>
        <input
          onChange={this.changeInput}
          onKeyPress={this.pressedEnter}
          value={input}
        />
        <button onClick={this.addTask}>add</button>
      </div>
    )
  }
}

export default TaskInput;
