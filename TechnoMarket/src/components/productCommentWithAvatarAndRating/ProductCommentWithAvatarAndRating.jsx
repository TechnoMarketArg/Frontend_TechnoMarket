import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import { Rating } from '@mui/material';

const ProductCommentWithAvatarAndRating = () => {


    const name = 'Sebastian'
    const rating = 3.5
    const comment = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde voluptatibus dolores minima, quasi sint harum doloremque, placeat pariatur exercitationem animi perferendis blanditiis facere cum sequi expedita assumenda optio non repellat?'

    return (
        <div className='max-w-[1240px] my-2 p-4'>
            <div className='flex gap-3 items-center'> 
                <Avatar>{name[0]}</Avatar>
                <div className='w-full'>
                    <div className='flex w-full items-center justify-between gap-8'>
                        <h5>{name}</h5>
                        <p className='text-sm'>hace 2 semanas</p>
                    </div>
                        <Rating name="half-rating" readOnly size="small" precision={0.5} defaultValue={rating} />
                </div>
            </div>
                <p className='text-justify my-3 max-w-[1040px]'>
                    {comment}
                </p>
                <hr />
        </div>
    );
};


ProductCommentWithAvatarAndRating.propTypes = {

};


export default ProductCommentWithAvatarAndRating;
