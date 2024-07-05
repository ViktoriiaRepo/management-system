import { TextField, Button, Typography, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './ProductForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct } from '../../redux/products/productSelectors';
import { addProduct, updateProduct } from '../../redux/products/operations';

const ProductForm = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();

  // const initialProduct = {};

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
  });

  const product = useSelector((state) => {
    const products = selectProduct(state);
    return currentId ? products.find((p) => p._id === currentId) : null;
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log('currentId :>> ', currentId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentId) {
      dispatch(addProduct(formData));
    }
    if (currentId) {
      console.log({ _id: currentId, updatedData: formData });
      dispatch(updateProduct({ _id: currentId, updatedData: formData }));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setFormData({ name: '', category: '', price: '', quantity: '' });
  };

  return (
    <Paper className={css.paper}>
      <form onSubmit={handleSubmit} className={css.form}>
        <Typography variant='h5'>
          {currentId ? 'Editing' : 'Creating'} a Product
        </Typography>
        <TextField
          name='name'
          label='Name'
          variant='outlined'
          fullWidth
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          name='category'
          label='Category'
          variant='outlined'
          fullWidth
          value={formData.category}
          onChange={handleChange}
          className={css.textField}
          required
        />
        <TextField
          name='price'
          label='Price'
          variant='outlined'
          fullWidth
          value={formData.price}
          onChange={handleChange}
          className={css.textField}
          required
        />
        <TextField
          name='quantity'
          label='Quantity'
          variant='outlined'
          fullWidth
          value={formData.quantity}
          onChange={handleChange}
          className={css.textField}
          required
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          size='large'
          fullWidth
          className={css.buttonSubmit}
        >
          Submit
        </Button>
        <Button
          style={{ marginTop: 10 }}
          variant='contained'
          color='secondary'
          size='small'
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

ProductForm.propTypes = {
  currentId: PropTypes.string,
  setCurrentId: PropTypes.func.isRequired,
};

export default ProductForm;
