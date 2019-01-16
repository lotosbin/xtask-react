import {withStyles} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";

const styles: any = {
    card_container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflowY: "scroll",
        minHeight: 0,
        height: "100%",
    },
};

interface IIssueListItem {
    id: any;
    subject: any;
    project: any;
    assigned_to_name: any
}

interface IIssueListProps {
    classes: any;
    data: any[];

    onClickItem(parameter: IIssueListItem): any;
}

const IssueList = (props: IIssueListProps) => {
    const {classes, data: issues} = props;
    return <div className={classes.card_container}>
        <List component="nav">
            {issues.length > 0 ? issues.map((issue) => (
                <ListItem key={issue.id} button onClick={() => props.onClickItem(issue)}>
                    <Chip label={issue.project.name}/>
                    <ListItemText primary={`${issue.id}:${issue.subject}`}/>
                    <Chip label={issue.assigned_to_name}/>
                </ListItem>
            )) : <div>No Data</div>}
        </List>
    </div>;
};
export default withStyles(styles)(IssueList);
