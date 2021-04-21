import React from 'react';

import {scrollBottom} from './../../utils.js';

import ItemForm from './TodoItemForm.jsx';
import ItemsList from './TodoItemsList.jsx';


export default class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
    this.createNewItem = this.createNewItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.toggleItemIsDone = this.toggleItemIsDone.bind(this);
    this.loadStorage = this.loadStorage.bind(this);
    this.saveStorage = this.saveStorage.bind(this);
  }

  componentDidMount() {
    const items = this.loadStorage();
    if (items) {
      this.setState({items}, () => scrollBottom());
    }
  }

  createNewItem(item) {
    let items = [...this.state.items];
    items.push(item);
    this.setState({items}, () => {
      this.saveStorage();
      scrollBottom();
    });
  }

  deleteItem(itemId) {
    let items = [...this.state.items];
    for (let i = 0; i < items.length; i++) {
      if (itemId === items[i].uid) {
        items.splice(i, 1);
        break;
      }
    }
    this.setState({items}, () => this.saveStorage());
  }

  toggleItemIsDone(itemId) {
    let items = [...this.state.items];
    for (let i = 0; i < items.length; i++) {
      if (itemId === items[i].uid) {
        items[i].isDone = items[i].isDone ? false : true;
        break;
      }
    }
    this.setState({items}, () => this.saveStorage());
  }

  loadStorage() {
    const content = JSON.parse(window.localStorage.getItem('todoItems'));
    return content ? content : null;
  }

  saveStorage() {
    window.localStorage.setItem('todoItems', JSON.stringify(this.state.items));
  }

  render() {
    return(
      <div className="container mt-3 mb-3">
        <ItemsList
          items={this.state.items}
          deleteItem={this.deleteItem}
          toggleItemIsDone={this.toggleItemIsDone}
        />
        <ItemForm
          createNewItem={this.createNewItem}
        />
      </div>
    );    
  }
}
