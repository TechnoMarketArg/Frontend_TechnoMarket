import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import { Rating } from '@mui/material';
import ProductCommentWithAvatarAndRating from '../productCommentWithAvatarAndRating/ProductCommentWithAvatarAndRating';

const ProductReviews = () => {

    const ratingTotal = 4.5
    const reviews = 28

    return (
        <div className='flex flex-col my-16 max-h-[530px] max-w-[1240px] bg-gray-100 p-4 rounded-xl'>
            <div className=' '>
                <h3 className='text-lg font-semibold'>Qualification</h3>
                <div className='flex flex-row items-center gap-3 my-2'>
                    <h4 className='text-2xl font-bold'>{ratingTotal}</h4>
                    <Rating name="half-rating" readOnly size="large" precision={0.5} defaultValue={ratingTotal} />
                    <p className='text-sm'>{reviews} review</p>
                </div>
                <hr />
            </div>
            <div className='max-h-[420px] overflow-scroll'>
                <ProductCommentWithAvatarAndRating/>
                <ProductCommentWithAvatarAndRating/>
                <ProductCommentWithAvatarAndRating/>
                <ProductCommentWithAvatarAndRating/>
            </div>
        </div>
    );
};


ProductReviews.propTypes = {

};


export default ProductReviews;
