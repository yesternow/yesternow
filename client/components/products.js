import React, {Component} from 'react';
import {fetchProducts, setVisibility, setSort, fetchCategories, sendAddToCart} from '../store';
import {connect} from 'react-redux';
import {Container, Card, Image, Grid, Button, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class Products extends Component {
	constructor() {
		super();
		this.state = {
			visibilityFilter: 'all'
		};
		this.handleChange = this.handleChange.bind(this);
	}
	componentDidMount() {
		this.props.loadProducts();
		this.props.loadCategories();
	}

	handleChange(event) {
		console.log('event changed', event.target.value);
		this.props.setVisibility(event.target.value);
	}

	render() {
		if (!this.props.products || !this.props.categories.length) {
			return <div>Hello there are no products yet</div>;
		}
		//Need this for dropdown


		return (
			<Container>
				<Grid>
					<Grid.Row>
						<select onChange={this.handleChange}>
							<option value="all">All</option>
							{this.props.categories &&
								this.props.categories.map((category) => (
									<option key={category.id} value={category.id}>
										{category.name}
									</option>
								))}
						</select>
					</Grid.Row>
					<Grid.Row>
						<Card.Group itemsPerRow={4}>
							{this.props.products.map((product) => (
								<Card key={product.title}>
									<Image as={Link} to={`/products/${product.id}`} src={product.images[0].imageUrl} />
									<Card.Content>
										<Card.Header>{product.title}</Card.Header>
										<Card.Description>${(product.price / 100).toFixed(2)}</Card.Description>
									</Card.Content>
									<Button
										animated="vertical"
										color="orange"
										onClick={() =>
											this.props.sendAddToCart({
												quantity: 1,
												productId: product.id,
												cartId: this.props.cartId
											})}
									>
										<Button.Content hidden>Add To Cart</Button.Content>
										<Button.Content visible>
											<Icon name="shop" />
										</Button.Content>
									</Button>
								</Card>
							))}
						</Card.Group>
					</Grid.Row>
					{!this.props.products.length && <p>No products under this category</p>}
				</Grid>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	products: state.product.products.filter((product) => product.isActive).filter((product) => {
		if (state.product.visibilityFilter === 'all') {
			return true;
		} else {
			const filtered = product.categories.filter(
				(category) => category.id === Number(state.product.visibilityFilter)
			);
			if (filtered.length) return true;
			return false;
		}
	}),
	categories: state.product.categories,
	cartId: state.carts.cart.id
});

const mapDispatchToProps = (dispatch) => ({
	loadProducts: () => dispatch(fetchProducts()),
	loadCategories: () => dispatch(fetchCategories()),
	setVisibility: (visibility) => dispatch(setVisibility(visibility)),
	setSort: (sort) => dispatch(setSort(sort)),
	sendAddToCart: (product) => dispatch(sendAddToCart(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
