import React, { Component } from 'react'
import axios from 'axios'


class AddCharge extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			type: '',
            amount: '',
			department: '',
			status: '',
            description: ''
		}
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
		e.preventDefault()
		console.log(this.state)
		axios
			.post('http://localhost:5000/charges', this.state)
			.then(response => {
				console.log(response)
			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
		const { name, type, amount, department, status,description } = this.state
		return (
			<div class="col-md-10">
                <h4>Add a Charge</h4>
				<form onSubmit={this.submitHandler}>
					<div>
						 Charge Name
						<input
							type="text"
							name="name"
							value={name}
							onChange={this.changeHandler}
						/>
					</div>
					<div>
						Type
						<input
							type="text"
							name="type"
							value={type}
							onChange={this.changeHandler}
						/>
					</div>
					<div>
						Amount
						<input
							type="number"
							name="amount"
							value={amount}
							onChange={this.changeHandler}
						/>
					</div>
                    <div>
						Department
						<input
							type="text"
							name="department"
							value={department}
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
					<div>
						Descritpion
						<input
							type="text"
							name="description"
							value={description}
							onChange={this.changeHandler}
						/>
					</div>
					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}
}

export default AddCharge