import React, { Component } from 'react'
import axios from 'axios'


class UpdateIncident extends Component {
	constructor(props) {
		super(props)

		this.state = {
            _id:'',
			name: '',
			type: '',
            department: '',
			employerId: '',
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
			.patch('http://localhost:5000/incidents/'+this.state._id, {
                "name":this.state.name,
                "type":this.state.type,
                "department":this.state.department,
                "employer":this.state.employerId,
                "status":this.state.status,
                "description":this.state.description

            })
			.then(response => {
				console.log(response)
			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
		const { _id,name, type, department, employerId, status,description } = this.state
		return (
			<div class="col-md-10">
                <h4>Update an Incident</h4>
				<form onSubmit={this.submitHandler}>
                <div>
						Incident ID
						<input
							type="text"
							name="_id"
							value={_id}
							onChange={this.changeHandler}
						/>
					</div>
					<div>
						Incident Name
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
						Department
						<input
							type="text"
							name="department"
							value={department}
							onChange={this.changeHandler}
						/>
					</div>
                    <div>
						Responsable ID
						<input
							type="text"
							name="employerId"
							value={employerId}
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
						Description
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

export default UpdateIncident