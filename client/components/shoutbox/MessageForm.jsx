import React from 'react';


export default class MessageForm extends React.Component {
  constructor(props) {
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
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if ( ! this.state.input) {
      return;
    }
    const message = {
      text: this.state.input,
    }
    this.props.requestPostMessage(message);
    this.setState({
      input: ''
    })
  }

  render() {
    return(
      <form className={"d-flex animated fadeInUp " + this.props.className} onSubmit={this.handleSubmit}>
        <input
          className="form-control"
          placeholder="My message..."
          value={this.state.input}
          onChange={this.handleChange}
        />
        <button className="btn btn-success ml-3" type="submit">Submit</button>
      </form>
    );
  }
}
