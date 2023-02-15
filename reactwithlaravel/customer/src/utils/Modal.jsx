import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import '../hide.css';

const Modals = ({ opens, pageTitle, children, setOpenPopup }) => {

    return (
        <>
            <Dialog open={opens} onClose={setOpenPopup} >
                <DialogTitle className='fonts' >
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {pageTitle}
                    </Typography>
                    <span className='modal__close' onClick={(e) => setOpenPopup(false)}><CloseIcon /></span>
                </DialogTitle>
                <DialogContent style={{ width: '500px' }} >
                    {children}
                </DialogContent>
            </Dialog></>
    );
}
export default Modals;