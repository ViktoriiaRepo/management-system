import { useEffect, useState } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/products/operations';
import { Container, Grid, Grow } from '@mui/material';
import ProductForm from '../../components/ProductForm/ProductForm';
import css from './ProductPage.module.css';

const ProductPage = () => {
  const [currentId, setCurrentId] = useState(null);
  console.log('currentId', currentId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [currentId, dispatch]);
  return (
    <Grow in>
      <Container>
        <Grid
          container
          spacing={3}
          justifyContent='space-between'
          className={css.containerGreed}
          alignItems='stretch'
        >
          <Grid item xs={12} md={8}>
            <ProductList setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} md={4}>
            <ProductForm currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default ProductPage;
