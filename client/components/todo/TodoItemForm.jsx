import React from 'react';


export default class TodoItemForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      input: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    if ( ! event.target.text.value) return;
    const item = {
      uid: new Date() + Math.random(),
      isDone: false,
      text: event.target.text.value
    }
    this.props.createNewItem(item);
    this.setState({
      input: ''
    })
  }

  render() {
    return(
      <form className="bg-white p-3 rounded shadow d-flex" method="POST" onSubmit={this.handleSubmit}>
        <input className="form-control" name="text" placeholder="Add new item..." value={this.state.input} onChange={this.handleChange} />
        <button className="btn btn-warning font-weight-bold ml-3">Submit</button>
      </form>
    );    
  }
}
