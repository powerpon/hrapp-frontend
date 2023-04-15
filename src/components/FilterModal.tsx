import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useEffect, useState} from "react";
import {Pagination} from "@mui/material";
import endpoints from "../api/endpoints";
import CheckboxList from "./CheckBoxList";
import BasicModal from "./BasicModal";

interface Skill {
    id: number;
    name: string;
}

export default function FilterModal(props: { setChecked: any; checked: any; setCurrentCandidateListPage:any; setSwitcher: any; switcher: any; setSearchClicked: any; setInputValue:any; }) {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [open, setOpen] = useState(false);
    const {setChecked, checked, setCurrentCandidateListPage, setSwitcher, switcher, setSearchClicked, setInputValue} = props;

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
        }, [open, currentPage]
    );

    return (
            <BasicModal buttonColor='primary' buttonText='Filter by skills' open={open} setOpen={setOpen} element={<>
                <Box>
                    <CheckboxList checked={checked} setChecked={setChecked} skills={skills} />
                </Box>
                <Pagination page={currentPage} count={totalPages} sx={{margin: '30px 0'}} onChange={(event, page) => {setCurrentPage(page)}} />
                <Box sx={{display:'flex', alignItems: 'baseline', justifyContent: 'space-evenly', width: '60%'}}>
                <Button sx={{width: '20%'}} variant="contained" color="success" onClick={() => {
                    setOpen(false);
                    setSearchClicked(false);
                    setInputValue('');
                    setCurrentCandidateListPage(1);
                    setSwitcher(!switcher);
                }}>Apply</Button>
                <Button sx={{width: '20%', mt: 5}} variant="contained" color="error" onClick={() => {
                    setOpen(false);
                }}>
                    Cancel
                </Button>
                </Box>
            </>}/>
    );
}