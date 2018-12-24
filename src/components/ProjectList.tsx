import {withStyles} from "@material-ui/core";
import ListItemSecondaryAction from "@material-ui/core/es/ListItemSecondaryAction/ListItemSecondaryAction";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {StyleRules} from "@material-ui/core/styles";
import InboxIcon from "@material-ui/icons/Inbox";
import React from "react";
import {Link} from "react-router-dom";
import Button from "../../node_modules/@material-ui/core/Button/Button";

const styles: StyleRules<string> = {
    card_container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflowY: "scroll",
        minHeight: 0,
        height: "100%",
    },
    card: {
        width: 300,
        margin: 10,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

const ProjectCardList = (props: { classes?: any; data: any; }) => {
    const {classes, data: projects} = props;
    return <div className={classes.card_container}>
        <List component="nav">
            {projects.map(({id, name, description}: { id: any, name: any, description: any }) => (
                <ListItem key={id} button>
                    <ListItemText primary={`${id}:${name}`} secondary={`${description}`}/>
                    <ListItemSecondaryAction>
                        <Button size="small" component={Link} {...{to: `/project/${id}`} as any}>Detail</Button>
                        <Button size="small" component={Link} {...{to: `/project/${id}/gantt`} as any}>Gantt</Button>
                        <Button size="small" component={Link} {...{to: `/project/${id}/agile`} as any}>Agile</Button>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    </div>;
};
export default withStyles(styles)(ProjectCardList);
