import React from "react";
import {withStyles} from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';

const styles = {
    card_container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflowY: 'scroll',
        minHeight: 0,
        height: '100%',
    },
};

let IssueList = props => {
    const {classes, data: issues} = props;
    return <div className={classes.card_container}>
        <List component="nav">
            {issues.map(({id, subject, project: {name: project_name}, assigned_to_name}) => (
                <ListItem key={id} button>
                    <Chip label={project_name}/>
                    <ListItemText primary={`${id}:${subject}`}/>
                    <Chip label={assigned_to_name}/>
                </ListItem>
            ))}
        </List>
    </div>;
};
export default withStyles(styles)(IssueList);