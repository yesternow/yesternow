import axios from 'axios';
import { fetchProduct } from '../store';


export const addReview = review => {
  return async dispatch => {
    try {
      const { productId } = review;
      await axios.post('/api/reviews', review);
      dispatch(fetchProduct(productId));
    } catch (error) {
      console.log(error);
    }
  };
};

