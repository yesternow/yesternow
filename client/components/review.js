import React, { Component } from 'react';
import { Form, Rating, Button } from 'semantic-ui-react';
import { addReview } from '../store';
import { connect } from 'react-redux';

class Review extends Component {
  constructor() {
    super();

    this.state = { rating: 3, description: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRate = this.handleRate.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleRate(e, { rating, maxRating }) {
    this.setState({ rating });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.sendReview({
      ...this.state,
      userId: this.props.userId,
      productId: this.props.productId,
    });

    this.setState({ rating: 3, description: '' });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <Rating maxRating={5} onRate={this.handleRate} />
        </Form.Field>
        <Form.Field>
          <Form.TextArea
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
            placeholder="Leave a review"
          />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  sendReview: review => dispatch(addReview(review)),
});

export default connect(null, mapDispatchToProps)(Review);
