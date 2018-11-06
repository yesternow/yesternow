import axios from 'axios';
import { fetchProduct } from '../store';

const NEW_REVIEW = 'NEW_REVIEW';

const newReview = review => ({
  type: NEW_REVIEW,
  review,
});

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

// const initialState = {
//   reviews: [],
// };

// export default (state = initialState, action) => {
//   switch (action.type) {
//     case NEW_REVIEW:
//       return { ...state, reviews: [...state.reviews, action.review] };
//     default:
//       return state;
//   }
// };
