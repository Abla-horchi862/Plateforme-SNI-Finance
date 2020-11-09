import React, { Component } from 'react'
import axios from 'axios'


class UpdateEmployer extends Component {
	constructor(props) {
		super(props)

		this.state = {
            _id:'',
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
			.patch('http://localhost:5000/employers/'+this.state._id, {
                "name":this.state.name,
                "position":this.state.position,
                "salary":this.state.salary,
                "address":this.state.address,
                "tel":this.state.tel,
                "email":this.state.email

            })
			.then(response => {
				console.log(response)
			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
		const { _id,name, position, salary, address, tel, email } = this.state
		return (
			<div class="col-md-10">
                <h4>Update an Employer</h4>
				<form onSubmit={this.submitHandler}>
                <div>
						Employer ID
						<input
							type="text"
							name="_id"
							value={_id}
							onChange={this.changeHandler}
						/>
					</div>
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

export default UpdateEmployer