import {
    MDBBtn,
    

  
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody
} from "mdb-react-ui-kit";

import {
    MDBInput,
    
    

    
  } from 'mdb-react-ui-kit';
import PropTypes from 'prop-types'

const PublishProduct = ({ optSmModal, setOptSmModal, toggleOpen }) => {
    return (
        <>

            <MDBModal open={optSmModal} tabIndex='-1' setOpen={setOptSmModal}>
                <MDBModalDialog size='xl'>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Publis Product</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                        <form>
      <MDBInput id='form4Example1' wrapperClass='mb-4' label='Name' />
      <MDBInput type='text' id='form4Example2' wrapperClass='mb-4' label='Description' />
      <MDBInput wrapperClass='mb-4' textarea id='form4Example3' rows={4} label='Price' />

      

      <MDBBtn type='submit' className='mb-4' block>
        Save
      </MDBBtn>
    </form>
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            
        </>
    );

};

    PublishProduct.propTypes = {
        optSmModal: PropTypes.bool,
        setOptSmModal: PropTypes.func,
        toggleOpen: PropTypes.func,
    }

export default PublishProduct

