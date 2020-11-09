import React, { Component } from 'react'
import axios from 'axios'
import AddIncident from "./AddIncident"
import UpdateInident from "./UpdateIncident"
import DeleteIncident from "./DeleteIncident"

class Incidents extends Component {
	constructor(props) {
		super(props)

		this.state = {
      incidents: [],
      errorMsg: ''
		}
	}

	componentDidMount() {
		axios
			.get('http://localhost:5000/incidents')
			.then(response => {
				console.log(response)
				this.setState({ incidents: response.data.incidents })
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})
	}

	render() {
		const { incidents, errorMsg } = this.state
		return (
			<div>
        
				<h4>List of Incidents</h4>
				{incidents.length
					? incidents.map(incident => <div key={incident._id}>
            <table class="table table-dark">
        <thead>
          <tr>
          <th>Incident ID</th>
            <th>Incident Name</th>
            <th>Type</th>
            <th>Department</th>
            <th>Responsable ID</th>
            <th>Responsable Name</th>
            <th>Status</th>
            <th>Description</th>
            
          </tr>
        </thead>
        <tbody>
        <tr>
                  <td>{incident._id}</td>
                  <td>{incident.name}</td>
                  <td>{incident.type}</td>
                  <td>{incident.department}</td>
                  <td>{incident.employer._id}</td>
                  <td>{incident.employer.name}</td>
                  <td>{incident.status}</td>
                  <td>{incident.description}</td>

                </tr>
           
        </tbody>
      </table>
            
            </div>)
          : null}
        {errorMsg ? <div>{errorMsg}</div> : null}
        <div className="row">
          <div className="col"> <AddIncident /></div>
          <div className="col"> <UpdateInident /></div>
          <div className="col"> <DeleteIncident /></div>
        </div>
       
      
			</div>
		)
	}
}

export default Incidents