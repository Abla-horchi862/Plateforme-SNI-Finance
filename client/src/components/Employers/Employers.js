import React, { Component } from 'react'
import axios from 'axios'
import AddEmployer from "./AddEmployer"
import UpdateEmployer from './UpdateEmployer'
import DeleteEmployer from "./DeleteEmployer"

class Employers extends Component {
	constructor(props) {
		super(props)

		this.state = {
      employers: [],
      errorMsg: ''
		}
	}

	componentDidMount() {
		axios
			.get('http://localhost:5000/employers')
			.then(response => {
				console.log(response)
				this.setState({ employers: response.data.employers })
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})
	}

	render() {
		const { employers, errorMsg } = this.state
		return (
			<div>
        
				<h4>List of Employers</h4>
				{employers.length
					? employers.map(employer => <div key={employer._id}>
            <table class="table table-dark">
        <thead>
          <tr>
          <th>Employer ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Address</th>
            <th>Tel</th>
            <th>Email</th>
            
          </tr>
        </thead>
        <tbody>
        <tr>
                  <td>{employer._id}</td>
                  <td>{employer.name}</td>
                  <td>{employer.position}</td>
                  <td>{employer.salary}</td>
                  <td>{employer.address}</td>
                  <td>{employer.tel}</td>
                  <td>{employer.email}</td>

                </tr>
           
        </tbody>
      </table>
            
            </div>)
          : null}
        {errorMsg ? <div>{errorMsg}</div> : null}
        <div className="row">
          <div className="col"><AddEmployer /></div>
          <div className="col"><UpdateEmployer /></div>
          <div className="col"><DeleteEmployer /></div>
        </div>
       
      
			</div>
		)
	}
}

export default Employers