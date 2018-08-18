import Button from "../../node_modules/@material-ui/core/Button/Button";
import {Link} from "react-router-dom";
import React from "react";
import {withStyles} from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import ListItemSecondaryAction from "@material-ui/core/es/ListItemSecondaryAction/ListItemSecondaryAction";

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
    card: {
        width: 300,
        margin: 10
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

let ProjectCardList = props => {
    const {classes, data: projects} = props;
    return <div className={classes.card_container}>
        <List component="nav">
            {projects.map(({id, name, description}) => (

                <ListItem key={id} button>
                    <ListItemIcon>
                        <InboxIcon/>
                    </ListItemIcon>
                    <ListItemText primary={`${id}:${name}`} secondary={`${description}`}/>
                    <ListItemSecondaryAction>
                        <Button size="small" component={Link} to={`/project/${id}`}>Detail</Button>
                        <Button size="small" component={Link} to={`/project/${id}/gantt`}>Gantt</Button>
                        <Button size="small" component={Link} to={`/project/${id}/agile`}>Agile</Button>

                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    </div>;
};
export default withStyles(styles)(ProjectCardList);