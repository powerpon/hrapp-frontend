import {useEffect, useState} from "react";
import BasicModal from "./BasicModal";
import * as React from "react";
import Box from "@mui/material/Box";
import {TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import endpoints from "../api/endpoints";

export default function CreateCandidateModal() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());

    useEffect(
        () => {
            if(!open){
                setName('');
                setDateOfBirth(new Date());
                setEmail('');
                setContactNumber('');
            }
        }, [open]
    )

    return (
        <BasicModal buttonColor='success' buttonText='Create new candidate' element={<>
            <Box sx={{width: '100%', display: 'flex', flexFlow: 'column', alignItems: 'center'}}>
                <TextField
                    sx={{m: '15px 0', width: '80%'}}
                    error={name.trim() === ''}
                    id="outlined-required"
                    placeholder='Enter Fullname'
                    onChange={event => {
                        setName(event.target.value)
                    }}
                    helperText='*Required Input'
                />
                <TextField
                    sx={{m: '15px 0', width: '80%'}}
                    error={email.trim() === ''}
                    id="outlined-required"
                    placeholder='Enter Email'
                    onChange={event => {
                        setEmail(event.target.value)
                    }}
                    helperText='*Required Input'
                />
                <TextField
                    sx={{m: '20px 0', width: '80%'}}
                    error={contactNumber === ''}
                    id="outlined-required"
                    placeholder='Enter Contact Number'
                    onChange={event => {
                        setContactNumber(event.target.value)
                    }}
                    helperText='*Required Input'
                />
                <Box sx={{display:'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '60%'}}>
                    <Typography>Input Date Of Birth:</Typography>
                    <DateTimePicker
                        format='y-MM-dd'
                        onChange={value => {setDateOfBirth(new Date(value?.getFullYear() ?? 1999,value?.getMonth() ?? 0,value?.getDate() ?? 1))}}
                        value={dateOfBirth}
                    />
                </Box>
                </Box>
            <Box sx={{display:'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '60%'}}>
                <Button sx={{width: '20%', mt: 5}} variant="contained" color="success" onClick={ async () => {
                    if(name.trim() !== '' && contactNumber.trim() !== '' && email.trim() !== '') {
                        await endpoints.createNewCandidate(name.trim(), contactNumber.trim(), email.trim(), dateOfBirth);
                        setOpen(false);
                        window.location.reload();
                    }
                }}>Apply</Button>
            <Button sx={{width: '20%', mt: 5}} variant="contained" color="error" onClick={() => {
                setOpen(false);
            }}>
                Cancel
            </Button>
            </Box>
                </>} open={open} setOpen={setOpen} />
    )
}