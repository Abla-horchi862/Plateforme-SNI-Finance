import React, { Component } from 'react'
import axios from 'axios'


class AddEmployer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			position: '',
            salary: '',
            address: '',
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
			.post('http://localhost:5000/employers', this.state)
			.then(response => {
				console.log(response)
			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
		const { name, position, salary, address, tel, email } = this.state
		return (
			<div class="col-md-10">
                <h4>Add an Employer</h4>
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
						Position
						<input
							type="text"
							name="position"
							value={position}
							onChange={this.changeHandler}
						/>
					</div>
					<div>
						Salary
						<input
							type="Number"
							name="salary"
							value={salary}
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
						Telephone
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

export default AddEmployer