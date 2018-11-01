import React, { Component } from 'react'
import { connect }  from 'react-redux'
import { fetchProduct } from '../store'

export class SingleProduct extends Component {
    componentDidMount(){
        this.props.loadProduct(this.props.match.params.id)
    }
    render() {
        const { title, description, price, quantity, images, reviews, weight, dimensions, brand }= this.props.product

        return (
            <div>
                <h4>{title}</h4>
                <h3>{price}</h3>
                <p>{description}</p>
                <button>Add To Cart</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    product: state.product.product
})

const mapDispatchToProps = dispatch => ({
    loadProduct: (productId) => dispatch(fetchProduct(productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
