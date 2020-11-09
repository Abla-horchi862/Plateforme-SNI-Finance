import React, { Component } from 'react'
import axios from 'axios'


class AddCustomer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			address: '',
            company: '',
            tel: '',
            email: ''
		}
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
		e.preventDefault()
		console.log(this.state)
		axios
			.post('http://localhost:5000/customers', this.state)
			.then(response => {
				console.log(response)
			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
		const { name, address, company, tel, email } = this.state
		return (
			<div class="col-md-10">
                <h4>Add a Customer</h4>
				<form onSubmit={this.submitHandler}>
					<div>
						Customer Name
						<input
							type="text"
							name="name"
							value={name}
							onChange={this.changeHandler}
						/>
					</div>
					<div>
						Adresse
						<input
							type="text"
							name="address"
							value={address}
							onChange={this.changeHandler}
						/>
					</div>
					<div>
						Company	
						<input
							type="text"
							name="company"
							value={company}
							onChange={this.changeHandler}
						/>
					</div>
                    <div>
						Téléphone
						<input
							type="Number"
							name="tel"
							value={tel}
							onChange={this.changeHandler}
						/>
					</div>
                    <div>
						Email
						<input
							type="text"
							name="email"
							value={email}
							onChange={this.changeHandler}
						/>
					</div>
					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}
}

export default AddCustomer