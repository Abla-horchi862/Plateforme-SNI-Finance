import React, { Component } from 'react'
import axios from 'axios'


class AddProduct extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			price: '',
            fournisseur: '',
            number: '',
            status: ''
		}
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
		e.preventDefault()
		console.log(this.state)
		axios
			.post('http://localhost:5000/products', this.state)
			.then(response => {
				console.log(response)
			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
		const { name, price, fournisseur, number, status } = this.state
		return (
			<div class="col-md-10">
                <h4>Add a Product</h4>
				<form onSubmit={this.submitHandler}>
					<div>
						Name
						<input
							type="text"
							name="name"
							value={name}
							onChange={this.changeHandler}
						/>
					</div>
					<div>
						Price
						<input
							type="number"
							name="price"
							value={price}
							onChange={this.changeHandler}
						/>
					</div>
					<div>
						Fournisseur
						<input
							type="text"
							name="fournisseur"
							value={fournisseur}
							onChange={this.changeHandler}
						/>
					</div>
                    <div>
						Number
						<input
							type="number"
							name="number"
							value={number}
							onChange={this.changeHandler}
						/>
					</div>
                    <div>
						Status
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

export default AddProduct