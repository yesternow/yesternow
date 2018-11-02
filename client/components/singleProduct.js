import React, { Component } from 'react'
import { connect }  from 'react-redux'
import { fetchProduct } from '../store'
import { Button, Container, Image, Item, Icon } from 'semantic-ui-react'
export class SingleProduct extends Component {
    componentDidMount(){
        this.props.loadProduct(this.props.match.params.id)
    }
    render() {
        const { title, description, price, quantity, images, reviews, weight, dimensions, brand }= this.props.product

        return (
         <Container>
            <Item>
                <Item.Content>
                    <Item.Header>{title}</Item.Header>
                    <Item.Meta>{price}</Item.Meta>
                    <Item.Description>{description}</Item.Description>
                    <Item.Extra>
                    <Button floated="right" color="orange">
                        <Icon name='shop' />
                    </Button>
                    </Item.Extra>
                </Item.Content>
                {images && images.map(image => <Image key={image.id} src={image.imageUrl} size="medium" bordered/>)}
            </Item>
         </Container>
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
