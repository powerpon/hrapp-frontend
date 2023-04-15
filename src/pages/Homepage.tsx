import {Fragment, useEffect, useState} from "react";
import CustomizedInputBase from "../components/CustomizedInputBase";
import {Box, Button, Pagination, Tooltip, Typography} from "@mui/material";
import endpoints from "../api/endpoints";
import CandidateItem from "../components/CandidateItem";
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import FilterModal from "../components/FilterModal";
import CreateCandidateModal from "../components/CreateCandidateModal";
import {Link} from "react-router-dom";
import {pages} from "../constants/pages";

interface Skill {
    id: number;
    name: string;
}

interface Candidate{
    id: string;
    name: string;
    dateOfBirth: Date;
    contactNumber: string;
    email: string;
    skills: Skill[];
}

export default function Homepage() {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [checked, setChecked] = useState([]);
    const [switcher, setSwitcher] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [searchClicked, setSearchClicked] = useState(false);

    async function applyFilter(){
            const axiosResponse = await endpoints.getFilteredCandidatesBySkills(checked, currentPage - 1);
            setCandidates(axiosResponse.data.content);
            setTotalPages(axiosResponse.data.totalPages);
    }

    async function search(){
            const axiosResponse = await endpoints.getCandidatesByName(inputValue.trim(), currentPage - 1);
            setCandidates(axiosResponse.data.content);
            setTotalPages(axiosResponse.data.totalPages);
    }

    useEffect(
        () => {
            if(!searchClicked || (searchClicked && inputValue.trim() === '')) {
                applyFilter();
            }
        }, [currentPage, switcher]
    );

    useEffect(
        () => {
            if(inputValue.trim() !== '' && searchClicked) {
                search();
            }
        }  , [currentPage, searchClicked, switcher]
    );

    return(
        <Fragment>
                <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-evenly', m: '50px 0'}}>
                    <CustomizedInputBase setChecked={setChecked} setSwitcher={setSwitcher} switcher={switcher} setSearchClicked={setSearchClicked} inputValue={inputValue} setCurrentCandidateListPage={setCurrentPage} setInputValue={setInputValue} />
                    <FilterModal setSearchClicked={setSearchClicked} setInputValue={setInputValue} setChecked={setChecked} checked={checked} setCurrentCandidateListPage={setCurrentPage} setSwitcher={setSwitcher} switcher={switcher} />
                    <CreateCandidateModal />
                </Box>
                <Box sx={{width: '100%', height: 700, display: 'flex', flexFlow: 'column', justifyContent: 'space-evenly'}}>
                    {
                           candidates.length !== 0 ?
                                (candidates.map((candidate, index) => {
                                    return (
                                    <Box key={index} sx={{display: 'flex', alignItems: 'center', width: '100%'}}>
                                        <Button component={Link} to={pages[1].path} state={{candidateId: candidates[index].id}}>
                                            <CandidateItem name={candidate.name} skills={candidate.skills} />
                                        </Button>
                                        <Tooltip title='Permanently Delete Candidate'>
                                            <IconButton onClick={async () => {
                                                await endpoints.deleteCandidate(candidates[index].id);
                                                setSwitcher(!switcher);
                                            }} size="large">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>);
                                })) : (currentPage === 1 ? (<Typography sx={{textAlign: 'center', fontSize: 50, color: '#B7B7B7'}}>No candidates found</Typography>) : (setCurrentPage(currentPage - 1), null))

                    }
                </Box>
                <Pagination page={currentPage} count={totalPages} sx={{margin: '30px 0', display: 'flex', justifyContent: 'center'}} onChange={(event, page) => {setCurrentPage(page)}} />
        </Fragment>
    );
}