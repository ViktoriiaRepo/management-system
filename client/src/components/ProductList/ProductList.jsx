import { CircularProgress, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import ProductItem from './ProductItem/ProductItem';
import { useSelector } from 'react-redux';
import {
  selectIsLoading,
  selectProduct,
} from '../../redux/products/productSelectors';
import css from './ProductList.module.css';

const ProductList = ({ setCurrentId }) => {
  const products = useSelector(selectProduct);

  const isLoading = useSelector(selectIsLoading);

  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <Grid
      className={css.mainContainer}
      container
      alignItems='stretch'
      spacing={3}
    >
      {products.length === 0 ? (
        <Typography variant='h6' color='primary' className={css.noPosts}>
          No products yet
        </Typography>
      ) : (
        products.map((product) => (
          <Grid key={product._id} item xs={12} sm={6}>
            <ProductItem product={product} setCurrentId={setCurrentId} />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default ProductList;

ProductList.propTypes = {
  setCurrentId: PropTypes.func.isRequired,
};
