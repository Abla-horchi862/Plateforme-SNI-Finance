import React, { Component } from 'react'
import axios from 'axios'
import AddCharge from "./AddCharge"
import UpdateCharge from "./UpdateCharge"
import DeleteCharge from "./DeleteCharge"

class Charges extends Component {
	constructor(props) {
		super(props)

		this.state = {
      charges: [],
      errorMsg: ''
		}
	}

	componentDidMount() {
		axios
			.get('http://localhost:5000/charges')
			.then(response => {
				console.log(response)
				this.setState({ charges: response.data.charges })
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})
	}

	render() {
		const { charges, errorMsg } = this.state
		return (
			<div>
        <div>
        <h4>List of Charges</h4>
				{charges.length
					? charges.map(charge => <div key={charge._id}>
            <table class="table table-dark">
        <thead>
          <tr>
          <th>Charge ID</th>
            <th>Charge Name</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Department</th>
            <th>Status</th>
            <th>Description</th>
            
          </tr>
        </thead>
        <tbody>
        <tr>
                  <td>{charge._id}</td>
                  <td>{charge.name}</td>
                  <td>{charge.type}</td>
                  <td>{charge.amount}</td>
                  <td>{charge.department}</td>
                  <td>{charge.status}</td>
                  <td>{charge.description}</td>

                </tr>
           
        </tbody>
      </table>
            
            </div>)
          : null}
        {errorMsg ? <div>{errorMsg}</div> : null}
      
        </div>
        
        <div className="row">
          <div className="col"> <AddCharge /></div>
          <div className="col"><UpdateCharge /></div>
          <div className="col"><DeleteCharge /></div>
        </div>
			
			</div>
		)
	}
}

export default Charges