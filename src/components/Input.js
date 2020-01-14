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

  render() {
    const { input } = this.state;

    return (
      <div>
        <input
          onChange={this.changeInput}
          value={input}
        />
        <button onClick={this.addTask}>add</button>
      </div>
    )
  }
}

export default TaskInput;
