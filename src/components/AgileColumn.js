/* tslint:disable:variable-name */
import {ListItemAvatar} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";
import Gravatar from "react-gravatar";

const styles: any = (theme: any) => ({
    root: {
        height: "100%",
        width: 300,
        // tslint:disable-next-line:object-literal-sort-keys
        flex: 0,
        flexShrink: 0,
        flexBasis: 300,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
    },
    // tslint:disable-next-line:object-literal-sort-keys
    listItem: {},
});

interface IAgileColumn {
    classes: any;
    data: any[];
    project_id?: string;
    onClickItem: any;
    onDrop: any;
    status: any;
}

class AgileColumn extends React.Component<IAgileColumn> {
    state = {
        checked: [],
    };


    onDragOver(parameters: { e: any }) {
        const e = parameters.e;
        e.preventDefault();
    }

    onDrop(parameters: { e: any, status: any }) {
        const {e, status} = parameters;
        const issue = JSON.parse(e.dataTransfer.getData("issue"));
        if (this.props.onDrop) {
            this.props.onDrop(issue, status);
        }
    }

    onDragStart(parameters: { e: any, data: any }) {
        const {e, data} = parameters;
        e.dataTransfer.setData("issue", JSON.stringify(data));
    }

    render() {
        const {classes, data = [], status, onClickItem} = this.props;
        return (
            <div className={classes.root}
                 onDragOver={(e) => this.onDragOver({e})}
                 onDrop={(e) => this.onDrop({e, status})}>

                <List style={{flex: 1, overflowY: "scroll", minHeight: "300px"}}>
                    {data.map((issue: any) => {
                        const {id, subject, assigned_to: {name: assigned_to_name, mail: assigned_to_mail}, project: {name: project_name}} = issue;
                        return (
                            <ListItem
                                key={id}
                                role={undefined}
                                dense
                                button
                                draggable
                                onDragStart={(e) => this.onDragStart({e, data: issue})}
                                className={classes.listItem}
                                onClick={(e) => onClickItem(issue)}
                            >
                                <ListItemText primary={`${subject}`} secondary={`${assigned_to_name}`}>
                                    <h1>{project_name}</h1>
                                    <p>{id}:{subject}</p>
                                </ListItemText>
                                <ListItemAvatar>
                                    <Gravatar email={assigned_to_mail}/>
                                </ListItemAvatar>
                            </ListItem>
                        );
                    })}
                </List>
            </div>
        );
    }
}

export default withStyles(styles)(AgileColumn);
