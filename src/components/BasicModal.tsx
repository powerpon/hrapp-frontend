import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {Fragment} from "react";

interface Props {
    element: JSX.Element;
    open: boolean;
    setOpen: any;
    buttonText: string;
    buttonColor: any;

}

export default function BasicModal(props: Props) {

    return (
        <Fragment>
            <Button sx={{maxHeight: '60px'}} color={props.buttonColor} variant='contained' onClick={() => {props.setOpen(true)}}>{props.buttonText}</Button>
            <Modal
                open={props.open}
                onClose={() => {props.setOpen(false)}}
            >
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '50%',
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    display: 'flex',
                    flexFlow: 'column',
                    alignItems: 'center'
                }}>
                    {props.element}
                </Box>
            </Modal>
        </Fragment>
    );
}