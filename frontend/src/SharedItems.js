import React from 'react'
import {Link} from 'react-router-dom'
import {getFromAPI, post, del} from './adapters/get'

class SharedItems extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            sharedList: [],
            name: '',
            quantity: '',
            error: false,
            errorMessage: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }
    
    //Helper Functions

    async setError(message){
        this.setState( {error: true, errorMessage: message} )
    }

    async unsetError(){
        this.setState( {error: false, errorMessage: ''} )
    }

    async checkResponse(res){
        if(!res.ok) 
            this.setError(await res.text()) 
        else 
            this.unsetError()
    }

    quantityIsValid(quantity){
        quantity = parseInt(quantity)
        return quantity > 0
    }

    //Handler Functions

    handleAdd(e){
        this.setState({showAddForm: true})
    }

    async handleSubmit(e){
        const itemName = this.state.name
        const quantity = this.state.quantity
        const data = {name: itemName, quantity: quantity}

        const res = await post('/itemList', data)

        this.checkResponse(res)
        this.fetchItems()
    }

    async handleDelete(e){
        const itemName = this.state.name
        const quantity = this.state.quantity
        const data = {name: itemName, quantity: quantity}

        const res = await del('/itemList', data)

        this.checkResponse(res)
        this.fetchItems()
    }

    handleCancel(e){
        this.setState({
            showAddForm: false,
            name: '',
            quantity: 0,
            error: false,
            errorMessage: ''
        })
    }

    handleChange(e){
        const{name, value} = e.target;

        if(name === 'quantity' && !this.quantityIsValid(value)){
            this.setState({quantity: ''})
            this.setError('Quantity must be positive')
            return
        }

        this.setState({[name]: value})
        this.unsetError()
    }

    //Fetching Functions

    async fetchItems(){
        let res = await getFromAPI('/itemList')

        if(!res.ok) this.setError(await res.text())
        else{
            delete res.ok
            this.setState({sharedList: res})
        }
    }

    //Lifecycle Functions

    componentDidMount(){
        this.fetchItems()
    }

    //Render Functions

    renderTableHeader(){
        return(
            <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Link</th>
            </tr>
        )
    }

    renderItemList(){
        return(
            Object.keys(this.state.sharedList).map((id) => {
                let item = this.state.sharedList[id];

                return (
                    <tr key={id}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>
                            <Link to={'/apibrowser'+item.url}>Link</Link>
                        </td>
                    </tr>
                )
            })
        )
    }

    renderAddForm(){
        return(
            <div>
                <form >
                    <label>Item Name:</label>
                    <input type='text' name='name' id='name' onChange={this.handleChange} value={this.state.name} required />
                    <label>Quantity:</label>
                    <input type='number' name='quantity' id='quantity' onChange={this.handleChange} value={this.state.quantity} required />
                </form>
                <button  onClick={this.handleSubmit}>Add</button>
                <button onClick={this.handleDelete}>Remove</button>
                <button onClick={this.handleCancel}>Cancel</button>
                {this.state.error ? <p>{this.state.errorMessage}</p> : null}
            </div>
        )
    }

    renderAddButton(){
        return(
            <button onClick={this.handleAdd}>Add/Remove Item</button>
        )
    }

    render(){
        return (
            <div>
                <table>
                    <tbody>
                        {this.renderTableHeader()}
                        {this.renderItemList()}
                    </tbody>
                </table>
                {!this.state.showAddForm ? this.renderAddButton() : null}
                {this.state.showAddForm ? this.renderAddForm() : null}
            </div>
        )
    }
}

export default SharedItems