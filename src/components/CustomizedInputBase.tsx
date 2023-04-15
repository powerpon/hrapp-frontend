import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


export default function CustomizedInputBase(props: { setCurrentCandidateListPage:any; inputValue:any; setInputValue:any; setSearchClicked:any; setSwitcher:any; switcher:any; setChecked:any; }) {
    const {setCurrentCandidateListPage, inputValue, setInputValue, setSearchClicked, setSwitcher, switcher, setChecked} = props;

    return (
        <Paper
            sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search By Name"
                value={inputValue}
                onChange={event => {setInputValue(event.target.value)}}
            />
            <IconButton onClick={() => {
                setChecked([]);
                setSearchClicked(true);
                setCurrentCandidateListPage(1);
                setSwitcher(!switcher);
            }} type="button" sx={{ p: '10px' }}>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}