import React, { Component } from 'react'
import axios from 'axios'


class AddOrder extends Component {
	constructor(props) {
		super(props)

		this.state = {
			productId: '',
			customerId:'',
			quantity: '',
			status:''
            
		}
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
		e.preventDefault()
		console.log(this.state)
		axios
			.post('http://localhost:5000/orders', this.state)
			.then(response => {
				console.log(response)
			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
		const { productId,customerId,quantity,status} = this.state
		return (
			<div class="col-md-10">
                <h4>Add an Order</h4>
				<form onSubmit={this.submitHandler}>
					<div>
						ProductID
						<input
							type="text"
							name="productId"
							value={productId}
							onChange={this.changeHandler}
						/>
					</div>
					<div>
						CustomerID
						<input
							type="text"
							name="customerId"
							value={customerId}
							onChange={this.changeHandler}
						/>
					</div>
					<div>
						Quantity
						<input
							type="number"
							name="quantity"
							value={quantity}
							onChange={this.changeHandler}
						/>
					</div>
					<div>
						Order Status
						<input
							type="text"
							name="status"
							value={status}
							onChange={this.changeHandler}
						/>
					</div>
					
					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}
}

export default AddOrder