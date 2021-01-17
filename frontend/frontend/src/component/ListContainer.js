import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'

class ListContainer extends Component {
    constructor(props) {
      super(props)
       this.state= {
          createFormInputs: {
            name: "", content: "",
          },
       lists: [], inputValue: ''
       };
      }
    getLists() {
        axios.get('http://localhost:3002/api/v1/lists')
            .then(response => {
            this.setState({lists: response.data})
             })
            .catch(error => console.log(error))
          }

    createList = (e) => {
     if (e.key === 'Enter' && !(e.target.value === '')) {
     axios.post('http://localhost:3002/api/v1/lists.json', {list: {content: e.target.value}})
      .then(response => {
     const lists = update(this.state.lists, {
        $splice: [[0, 0, response.data]]
      })
     this.setState({
        lists: lists,
        inputValue: ''
          })
      })
      .catch(error => console.log(error))
       }
      }
    handleChange = (e) => {
    // eslint-disable-next-line 
      this .setState({inputValue: e.target.value});
    }
   updateList = (e, id) => {
     axios.patch(`http://localhost:3002/api/v1/lists/${id}`, {list: {done: e.target.checked}})
        .then(response => {
    const listIndex=this.state.lists.findIndex(x => x.id === response.data.id)
    const lists = update(this.state.lists, {
        [listIndex]: {$set: response.data}
         })
    this.setState({lists: lists
             })
          })
        .catch(error => console.log(error))
     }

   deleteList = (id) => {
     axios.delete(`http://localhost:3002/api/v1/lists/${id}`)
        .then(response =>{
     const listIndex = this.state.lists.findIndex(x => x.id === id)
     const lists = update(this.state.lists, {
        $splice: [[listIndex, 1]]
       })
     this.setState({
        lists: lists
           })
        })
        .catch(error => console.log(error))
     }

     componentDidMount() {
       this.getLists()
         }

   render() {
      return (
        <div>
         <div className="inputContainer">
          <input className="taskInput" type="text"
            placeholder="Add a task" maxLength="50"
            onKeyPress={this.createList}
            value={this.state.inputValue} onChange={this.handleChange} />
         </div>
        <div className="listWrapper">
          <ul className="taskList">
           {this.state.lists.map((list) => {
       return(
            <li className="task" key={list.id}>
              <input className="taskCheckbox" type="checkbox"
               checked={list.done}
               onChange={(e) => this.updateList(e, list.id)} />
            <label className="taskLabel">{list.title}</label>
             <span className="deleteListBtn"
                onClick={(e) => this.delete(list.id)}>
             </span>
            </li>
            )
          })}
          </ul>
         </div>
        </div>
      )
    }
  }
 export default ListContainer