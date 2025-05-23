import React, { useState } from 'react';
import BackButton from '../componentsTemp/BackButtonSeller';
import Spinner from '../componentsTemp/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = async () => {
    if (!id) {
      enqueueSnackbar('Invalid book ID', { variant: 'error' });
      return;
    }

    setLoading(true);
    try {
      await axios.delete(`http://localhost:5555/books/${id}`);
      enqueueSnackbar('Book deleted successfully', { variant: 'success' });
      navigate('/');
    } catch (error) {
      enqueueSnackbar(`Error: ${error.response?.data?.message || error.message}`, {
        variant: 'error',
      });
      console.error('Error deleting book:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>

      {loading && <Spinner />}

      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure you want to delete this book?</h3>

        <button
          className="p-4 bg-red-600 text-white m-8 w-full disabled:opacity-50"
          onClick={handleDeleteBook}
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Deleting...' : 'Yes, Delete it'}
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
