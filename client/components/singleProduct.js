import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Review } from './index';
import { fetchProduct, sendAddToCart } from '../store';
import {
  Button,
  Container,
  Image,
  Item,
  Icon,
  Grid,
  Divider,
  Rating,
} from 'semantic-ui-react';
export class SingleProduct extends Component {
  constructor() {
    super();
    this.state = { updateToggle: false };

    this.handleUpdateClick = this.handleUpdateClick.bind(this);
  }
  componentDidMount() {
    this.props.loadProduct(this.props.match.params.id);
  }

  handleUpdateClick() {
    this.setState({ updateToggle: !this.state.updateToggle });
  }

  render() {
    const {
      id,
      title,
      description,
      price,
      quantity,
      images,
      reviews,
      weight,
      dimensions,
      brand,
    } = this.props.product;

    if (!this.props.product) {
      return <div>No product available</div>;
    }
    return (
      <Container border="3px">
        <Grid>
          <Grid.Row />
          <Grid.Row>
            <Grid.Column width={2} />
            <Grid.Column width={12}>
              <Image.Group size="medium">
                {images &&
                  images.map(image => (
                    <Image key={image.id} src={image.imageUrl} bordered />
                  ))}
                <Divider hidden />
              </Image.Group>
            </Grid.Column>
            <Grid.Column width={2} />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={2} />
            <Grid.Column width={12}>
              <Item>
                <Item.Content>
                  <Item.Header as="h3">{title}</Item.Header>
                  <Item.Meta>${(price / 100).toFixed(2)}</Item.Meta>
                  <Item.Meta>
                    {quantity < 5 && `Only ${quantity} left!`}
                  </Item.Meta>

                  <Item.Description>{description}</Item.Description>
                  <Item.Extra>Dimensions: {dimensions}</Item.Extra>
                  <Item.Extra>
                    <Button
                      floated="right"
                      onClick={() =>
                        this.props.sendAddToCart({
                          quantity: 1,
                          productId: id,
                          cartId: this.props.cartId,
                        })
                      }
                      color="orange"
                    >
                      <Icon name="shop" />
                    </Button>
                  </Item.Extra>
                </Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={2} />
          </Grid.Row>
          <Grid.Row>
            <Divider />
            <Grid.Column width={2} />
            <Grid.Column width={12}>
              <h3>Reviews</h3>
              <Divider />
              {reviews &&
                reviews.map(review => (
                  <Item key={review.id}>
                    <Item.Header>
                      <Image src={review.user.imageUrl} avatar />{' '}
                      <span>{review.user.firstName}</span>
                      <span>
                        <Rating rating={review.rating} maxRating={5} disabled />
                      </span>
                    </Item.Header>
                    {review.createdAt.substring(0, 10)}
                    <Item.Description>{review.description}</Item.Description>
                    <Divider />
                  </Item>
                ))}
            </Grid.Column>
            <Grid.Column width={2} />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={2} />
            <Grid.Column width={12}>
              {this.props.userId ? (
                <Review productId={id} userId={this.props.userId} />
              ) : (
                'Log in to leave a review'
              )}
            </Grid.Column>
            <Grid.Column width={2} />
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product.product,
  cartId: state.carts.cart.id,
  userId: state.user.id,
});

const mapDispatchToProps = dispatch => ({
  loadProduct: productId => dispatch(fetchProduct(productId)),
  sendAddToCart: product => dispatch(sendAddToCart(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
