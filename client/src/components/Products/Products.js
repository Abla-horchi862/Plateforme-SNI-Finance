import React, { Component } from 'react'
import axios from 'axios'
import AddProduct from "./AddProduct"
import UpdateProduct from "./UpdateProduct"
import DeleteProduct from "./DeleteProduct"



class Products extends Component {
	constructor(props) {
		super(props)

		this.state = {
      products: [],
      errorMsg: ''
		}
	}

	componentDidMount() {
		axios
			.get('http://localhost:5000/products')
			.then(response => {
				console.log(response)
				this.setState({ products: response.data.products })
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})
	}

	render() {
		const { products, errorMsg } = this.state
		return (
			<div>
        
				<h4>List of products</h4>
				{products.length
					? products.map(product => <div key={product._id}>
            <table class="table table-dark">
        <thead>
          <tr>
          <th>Product ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Fournisseur</th>
            <th>Number</th>
            <th>Status</th>
            
          </tr>
        </thead>
        <tbody>
        <tr>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.fournisseur}</td>
                  <td>{product.number}</td>
                  <td>{product.status}</td>

                </tr>
           
        </tbody>
      </table>
            
            </div>)
          : null}
        {errorMsg ? <div>{errorMsg}</div> : null}
        <div className="row">
          <div className="col"> <AddProduct /></div>
          <div className="col"> <UpdateProduct /></div>
          <div className="col"> <DeleteProduct /></div>

        </div>
       
			</div>
		)
	}
}

export default Products