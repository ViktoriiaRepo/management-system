import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import css from './ProductItem.module.css';
import { deleteProduct } from '../../../redux/products/operations';

const ProductItem = ({ product, setCurrentId }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    try {
      dispatch(deleteProduct(product._id));
    } catch (error) {
      throw new Error('Error deleting product');
    }
  };

  return (
    <Card className={css.cardStyle}>  

      <CardContent className={css.overlay}>
        <Button
          color='secondary'
          size='small'
          onClick={() => {
            setCurrentId(product._id);
          }}
        >
          <MoreHorizOutlinedIcon fontSize='medium' />
          Edit
        </Button>
      </CardContent>

      <CardContent className={css.detailStyle}>
        <Typography variant='h6'>Name: {product.name}</Typography>
        <Typography variant='h6'>Category: {product.category}</Typography>
        <Typography variant='h6'>Price: {product.price}</Typography>
        <Typography variant='h6'>Quantity: {product.quantity}</Typography>
      </CardContent>
      <CardActions className={css.cardAction}>
        <Button size='small' color='primary' onClick={handleDelete}>
          <DeleteOutlineOutlinedIcon fontSize='small' />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductItem;

ProductItem.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
  }).isRequired,
  setCurrentId: PropTypes.func.isRequired,
};
