import BasicModal from "./BasicModal";
import {useEffect, useState} from "react";
import {Box, Chip, Divider, Fab, Pagination, TextField, Tooltip} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import endpoints from "../api/endpoints";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from "@mui/material/Button";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import DoneIcon from '@mui/icons-material/Done';

interface Skill {
    id: number;
    name: string;
}

export default function AddSkillModal(props: { setCandidateSkills: any; candidateSkills: Skill[]; candidateId: string; refreshCandidate: any; setRefreshCandidate: any;}){
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [skills, setSkills] = useState<Skill[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const {setCandidateSkills, candidateSkills, candidateId, refreshCandidate, setRefreshCandidate} = props;
    const [refreshSkills, setRefreshSkills] = useState(false);
    const [editable, setEditable] = useState(false);
    const [newSkillName, setNewSkillName] = useState('');
    const [indexForEditing, setIndexForEditing] = useState(-1);

    async function getSkills(){
        const axiosResponse = await endpoints.getAllSkills(currentPage - 1);
        setSkills(axiosResponse.data.content);
        setTotalPages(axiosResponse.data.totalPages);
    }

    useEffect(
        () => {
            if(open) {
                getSkills();
            }
            setEditable(false);
        }, [open, currentPage, refreshSkills]
    );

    return(
            <BasicModal element={<>
                <Box sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Fab onClick={async () => {
                        if(inputValue.trim() !== ''){
                            await endpoints.createNewSkill(inputValue.trim());
                            if(currentPage !== 1) {
                                setCurrentPage(1);
                                setInputValue('');
                                return;
                            }
                            setRefreshSkills(!refreshSkills);
                        }
                        setInputValue('');
                    }} color='primary'>
                        <AddIcon />
                    </Fab>
                    <TextField
                        label='Create New Skill'
                        sx={{m: '20px'}}
                        value={inputValue}
                        placeholder='Skill Name'
                        onChange={(event) => {
                            setInputValue(event.target.value);
                        }}
                        variant='standard'></TextField>
                </Box>
                <Divider sx={{width: '100%', mb: '15px'}} color='#000' variant='fullWidth' />
                <Box sx={{width: '100%', display: 'flex', flexFlow:'column', alignItems: 'center'}}>
                    {
                        skills.map(
                            (skill, index) => {
                                return(
                                    <Box key={index} sx={{display: 'flex', justifyContent: 'center', width:'100%', alignItems: 'center', m: '7px 0'}}>
                                        <Chip
                                            component='span'
                                            sx={{m: '5px'}}
                                            key={index}
                                            label={
                                                (editable && index === indexForEditing) ?
                                                (<TextField
                                                disabled={!editable}
                                                value={newSkillName}
                                                onChange={(event) => {
                                                setNewSkillName(event.target.value);
                                            }}
                                                variant='standard'></TextField>) : (skill.name.toUpperCase())
                                            }
                                            color='primary'
                                            onDelete={(editable && index === indexForEditing) ? async () => {
                                                if(newSkillName.trim() != '') {
                                                    await endpoints.updateSkill(skill.id, newSkillName.trim());
                                                    setRefreshSkills(!refreshSkills);
                                                }
                                                setNewSkillName('');
                                                setEditable(false);
                                                if(candidateSkills.map(skill => {return skill.id}).includes(skill.id)){
                                                    setRefreshCandidate(!refreshCandidate);
                                                }
                                            } : undefined}
                                            deleteIcon={<DoneIcon/>}
                                        />
                                        <Tooltip title='Add Skill'>
                                            <Button
                                                sx={{p: 0, display: (candidateSkills.map(skill => {return skill.id}).includes(skill.id) || editable ? 'none' : 'inline-flex')}}
                                                onClick={async () => {
                                                await endpoints.addSkillToCandidate(candidateId, skill.id);
                                                setCandidateSkills([...candidateSkills, skill]);
                                            }}>
                                                <AddCircleIcon  sx={{color: 'green'}} />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title='Change Skill Name'>
                                            <Button
                                                sx={{p: 0, display: (editable ? 'none' : 'inline-flex')}}
                                                onClick={async () => {
                                                    setIndexForEditing(index);
                                                    setEditable(true);
                                                }}>
                                                <EditRoundedIcon  sx={{color: 'black'}} />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title='Delete Skill'>
                                            <Button
                                                sx={{p: 0, display: (editable ? 'none' : 'inline-flex')}}
                                                onClick={async () => {
                                                    await endpoints.deleteSkill(skill.id);
                                                    if(candidateSkills.map(skill => {return skill.id}).includes(skill.id)){
                                                        setRefreshCandidate(!refreshCandidate);
                                                    }
                                                    if(currentPage !== 1) {
                                                        setCurrentPage(1);
                                                        return;
                                                    }
                                                    setRefreshSkills(!refreshSkills);
                                                }}>
                                                <DeleteForeverRoundedIcon  sx={{color: 'red'}} />
                                            </Button>
                                        </Tooltip>
                                    </Box>
                                )
                            }
                        )
                    }
                </Box>
                <Pagination page={currentPage} count={totalPages} sx={{margin: '30px 0'}} onChange={(event, page) => {setCurrentPage(page)}} />
            </>} open={open} setOpen={setOpen} buttonText='Add Skill' buttonColor='primary' />
    );
}