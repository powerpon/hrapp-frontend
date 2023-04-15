import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import {Typography} from "@mui/material";

interface Skill {
    id: number;
    name: string;
}

interface Props {
    checked: any;
    setChecked: any;
    skills: Skill[];

}

export default function CheckboxList(props: Props) {
    const {checked, setChecked, skills} = props;

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {
                skills.length !== 0 ? (skills.map((skill) => {
                    const labelId = `checkbox-list-label-${skill.id}`;
                    return (
                        <ListItem
                            key={skill.id}
                            disablePadding
                        >
                            <ListItemButton role={undefined} onClick={handleToggle(skill.id)} dense>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(skill.id) !== -1}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={skill.name} />
                            </ListItemButton>
                        </ListItem>
                    )})) : (<Typography sx={{textAlign: 'center', fontSize: 20, color: '#B7B7B7'}}>No skills found</Typography>)
            }
        </List>
    );
}
