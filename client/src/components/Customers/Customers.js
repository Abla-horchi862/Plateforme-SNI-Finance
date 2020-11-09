import React, { Component } from 'react'
import axios from 'axios'
import AddCustomer from "./AddCustomer"
import UpdateCustomer from "./UpdateCustomer"
import DeleteCustomer from "./DeleteCustomer"

class Customers extends Component {
	constructor(props) {
		super(props)

		this.state = {
      customers: [],
      errorMsg: ''
		}
	}

	componentDidMount() {
		axios
			.get('http://localhost:5000/customers')
			.then(response => {
				console.log(response)
				this.setState({ customers: response.data.customers })
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})
	}

	render() {
		const { customers, errorMsg } = this.state
		return (
			<div>
        
				<h4>List of Customers</h4>
				{customers.length
					? customers.map(customer => <div key={customer._id}>
            <table class="table table-dark">
        <thead>
          <tr>
          <th>Customer ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Company</th>
            <th>Telephone</th>
            <th>Email</th>
            
          </tr>
        </thead>
        <tbody>
        <tr>
                  <td>{customer._id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.address}</td>
                  <td>{customer.company}</td>
                  <td>{customer.tel}</td>
                  <td>{customer.email}</td>

                </tr>
           
        </tbody>
      </table>
            
            </div>)
          : null}
        {errorMsg ? <div>{errorMsg}</div> : null}
        <div className="row">
          <div className="col"><AddCustomer /></div>
          <div className="col"><UpdateCustomer /></div>
          <div className="col"><DeleteCustomer /></div>
        </div>
        
      
			</div>
		)
	}
}

export default Customers