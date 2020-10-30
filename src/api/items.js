import React from 'react'
import axios from 'axios'
import apiUrl from './apiConfig'
import { Redirect } from 'react-router-dom'

class ItemCreate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      item: {
        itemName: '',
        itemPrice: ''
      },
      createdItemId: ''
    }
  }

  handleChange = (event) => {
    // get value the user typed in
    const userInput = event.target.value
    // get the name of the input they typed in
    const itemKey = event.target.name // "title" or "author"
    // make a copy of the state
    const itemCopy = Object.assign({}, this.state.item)
    // updating the key in our copy with what the user typed
    itemCopy[itemKey] = userInput
    // updating the state with our new copy
    this.setState({ item: itemCopy })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const item = this.state.item
    // make POST request to API /games route with item data
    axios({
      url: `${apiUrl}/items`,
      method: 'POST',
      data: {
        item: item
      }
    })
      .then((response) => this.setState({ createdItemId: response.data.item._id }))
      .catch(console.error)
  }

  render () {
    if (this.state.createdItemId !== '') {
      return <Redirect to="/items" />
    }

    return (
      <div>
        <h2>Items Create</h2>
        <form onSubmit={this.handleSubmit}>
          <input name="itemName" type="text" value={this.state.item.itemName} onChange={this.handleChange}/>
          <input name="itemPrice" type="text" value={this.state.item.itemPrice} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default ItemCreate