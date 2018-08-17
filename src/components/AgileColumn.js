import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    root: {
        height: '100%',
        width: 300,
        flex: 0,
        flexShrink: 0,
        flexBasis: 300,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column'
    },
    listItem: {}
});

class AgileColumn extends React.Component {
    state = {
        checked: [],
    };
    onClickItem = (e, item) => {
        if (this.props.onClickItem) this.props.onClickItem(item)
    };

    onDragOver(e) {
        e.preventDefault();
    }

    onDrop(e, status) {
        const issue = JSON.parse(e.dataTransfer.getData("issue"));
        console.log(`onDrop,issue=${JSON.stringify(issue)},status=${JSON.stringify(status)}`);
        if (this.props.onDrop) {
            this.props.onDrop(issue, status)
        }
    }

    onDragStart(e, data) {
        console.log(`onDragStart,data=${JSON.stringify(data)}`);
        e.dataTransfer.setData("issue", JSON.stringify(data))
    }
    render() {
        const {classes, data, status} = this.props;
        return (
            <div className={classes.root}
                 onDragOver={(e) => this.onDragOver(e)}
                 onDrop={(e) => this.onDrop(e, status)}>

                <List style={{flex: 1, overflowY: 'scroll', minHeight: '300px'}}>
                    {data.map((issue) => {
                        let {id, subject, assigned_to_name, project: {name: project_name}} = issue;
                        return (
                            <ListItem
                                key={id}
                                role={undefined}
                                dense
                                button
                                draggable
                                onDragStart={(e) => this.onDragStart(e, issue)}
                                className={classes.listItem}
                                onClick={e => this.onClickItem(e, issue)}
                            >
                                <ListItemText primary={`${subject}`} secondary={`${assigned_to_name}`}>
                                    <h1>{project_name}</h1>
                                    <p>{id}:{subject}</p>
                                </ListItemText>
                            </ListItem>
                        );
                    })}
                </List>
            </div>
        );
    }
}

AgileColumn.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    status: PropTypes.object.isRequired,
    project_id: PropTypes.object.isRequired,
};

export default withStyles(styles)(AgileColumn);