import React, { Component } from 'react'
import axios from 'axios'
import AddOrder from './AddOrder'
import UpdateOrder from './UpdateOrder'
import DeleteOrder from './DeleteOrder'

class Orders extends Component {
	constructor(props) {
		super(props)

		this.state = {
      orders: [],
      errorMsg: ''
		}
	}

	componentDidMount() {
		axios
			.get('http://localhost:5000/orders')
			.then(response => {
				console.log(response)
				this.setState({ orders: response.data.orders })
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})
	}

	render() {
		const { orders, errorMsg } = this.state
		return (
			<div>
        
				<h4>List of Orders</h4>
				{orders.length
					? orders.map(order => <div key={order._id}>
            <table class="table table-dark">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Product Status</th>
            <th>Customer ID</th>
            <th>Customer Address</th>
            <th>Customer Name</th>
            <th>Quantity</th>
            <th>Order Status</th>
            
          </tr>
        </thead>
        <tbody>
        <tr>
                  <td>{order._id}</td>
                  <td>{order.product._id}</td>
                  <td>{order.product.name}</td>
                  <td>{order.product.status}</td>
                  <td>{order.customer._id}</td>
                  <td>{order.customer.address}</td>
                  <td>{order.customer.name}</td>
                  <td>{order.quantity}</td>
                  <td>{order.status}</td>

                </tr>
           
        </tbody>
      </table>
            
            </div>)
          : null}
        {errorMsg ? <div>{errorMsg}</div> : null}
        <div className="row">
          <div className="col"><AddOrder /></div>
          <div className="col"><UpdateOrder /></div>
          <div className="col"><DeleteOrder /></div>
        </div>
        
			</div>
		)
	}
}

export default Orders