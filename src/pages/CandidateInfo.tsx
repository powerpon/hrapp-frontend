import {useEffect, useState} from "react";
import {Avatar, Chip, Grid, styled, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {Link, useLocation} from "react-router-dom";
import Button from "@mui/material/Button";
import * as React from "react";
import DateTimePicker from "react-datetime-picker";
import endpoints from "../api/endpoints";
import AddSkillModal from "../components/AddSkillModal";
import {pages} from "../constants/pages";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

interface Skill{
    id: number;
    name: string;
}

export default function CandidateInfo(){
    const [editable, setEditable] = useState(false);
    const location = useLocation();
    const {candidateId} = location.state;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [skills, setSkills] = useState<Skill[]>([]);
    const [refreshCandidate, setRefreshCandidate] = useState(false);

   async function handleCandidate(){
        const axiosResponse = await endpoints.getCandidateById(candidateId);
        setName(axiosResponse.data.name);
        setEmail(axiosResponse.data.email);
        setContactNumber(axiosResponse.data.contactNumber);
        setDateOfBirth(axiosResponse.data.dateOfBirth);
        setSkills(axiosResponse.data.skills);
    }

    useEffect(
        () => {
            handleCandidate();
        }, [refreshCandidate]
    )

    return(
        <Box sx={{ width: '100%', mt: 1.5 }}>
            <Button component={Link} to={pages[0].path} color='error' sx={{ml: 10}} variant='contained'>Back</Button>
            <Grid item container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item display='flex' justifyContent="center" alignItems="center" xs={6}>
                    <Avatar sx={{width: 200, height: 200}}></Avatar>
                </Grid>
                <Grid item xs={6}>
                    <Item sx={{display: 'flex', flexFlow: 'column', justifyContent: 'start', width: '90%'}}>
                        <TextField
                            label='Name'
                            sx={{m: '20px 0'}}
                            disabled={!editable}
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                            error={name.trim() === ''}
                            variant='standard'></TextField>
                        <TextField
                            label='Contact Number'
                            sx={{m: '20px 0'}}
                            disabled={!editable}
                            value={contactNumber}
                            onChange={(event) => {
                                setContactNumber(event.target.value);
                            }}
                            error={contactNumber.trim() === ''}
                            variant='standard'></TextField>
                        <TextField
                            label='Email'
                            sx={{m: '20px 0'}}
                            disabled={!editable}
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                            error={email.trim() === ''}
                            variant='standard'></TextField>
                        <Typography sx={{color: (editable ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.38)') }}>Date Of Birth</Typography>
                        <DateTimePicker
                            format='y-MM-dd'
                            disabled={!editable}
                            onChange={value => {setDateOfBirth(new Date(value?.getFullYear() ?? 1999,value?.getMonth() ?? 0,value?.getDate() ?? 1))}}
                            value={new Date(dateOfBirth)}
                        />
                    </Item>
                    <Button disabled={editable} sx={{width: '20%', m: 1}} variant="contained" color="primary" onClick={() => {
                        setEditable(!editable);
                    }}>Edit Details</Button>
                    <Button sx={{width: '20%', m: 1, display: editable ? 'span' : 'none'}} variant="contained" color="success" onClick={ async () => {
                        if(name.trim() !== '' && email.trim() !== '' && contactNumber.trim() !== ''){
                            setEditable(!editable);
                            await endpoints.updateCandidate(candidateId, name.trim(), contactNumber.trim(), email.trim(), dateOfBirth);
                        }
                    }}>Apply Changes</Button>
                </Grid>
                <Grid display='flex' justifyContent='space-evenly' item xs={12}>
                    <Item sx={{width: '80%', display: 'flex', flexWrap: 'wrap'}}>
                        {
                            skills.map(
                                (skill, index) => {
                                    return(
                                        <Chip
                                            component='span'
                                            sx={{m: '5px'}}
                                            key={index}
                                            label={skill.name.toUpperCase()}
                                            color='primary'
                                            onDelete={async () => {
                                                await endpoints.removeSkillFromCandidate(candidateId, skill.id);
                                                setRefreshCandidate(!refreshCandidate);
                                        }} />
                                    );
                                }
                            )
                        }
                    </Item>
                    <AddSkillModal
                        setRefreshCandidate={setRefreshCandidate}
                        refreshCandidate={refreshCandidate}
                        candidateId={candidateId}
                        candidateSkills={skills}
                        setCandidateSkills={setSkills} />
                </Grid>
            </Grid>
        </Box>
    );
}