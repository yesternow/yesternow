import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar } from './components';
import { fetchProducts } from './store';
import Routes from './routes';

class App extends Component {
  componentDidMount() {
    this.props.loadProducts();
  }
  render() {
    return (
      <div>
        <Navbar />
        {isFetching ? <div>FETCHING DATA</div> : <Routes />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.products.isFetching,
});

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(fetchProducts()),
});

export default connect(null, mapDispatchToProps)(App);
