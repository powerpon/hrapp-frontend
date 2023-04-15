import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import ListItem from "@mui/material/ListItem";
import {Chip} from "@mui/material";

interface Skill{
    id: number;
    name: string;
}

interface Props{
    name: string;
    skills: Skill[];
}

export default function CandidateItem(props: Props) {
    return(
        <ListItem>

            <ListItemAvatar>
                <Avatar/>
            </ListItemAvatar>
            <ListItemText
                primary={props.name}
                secondary={
                    <React.Fragment>
                        {
                            props.skills.map((skill, index) => {
                                return (
                                    <Chip component='span' sx={{margin: '5px', cursor: 'pointer'}} key={index} label={skill.name} color='primary' size='small' />
                                )})
                        }
                    </React.Fragment>
                }
            />
        </ListItem>
    );
}