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


    render() {
        const {classes, data} = this.props;
        return (
            <div className={classes.root}>
                <List style={{flex: 1, overflowY: 'scroll'}}>
                    {data.map((issue) => {
                        let {id, subject, assigned_to_name, project: {name: project_name}} = issue;
                        return (
                            <ListItem
                                key={id}
                                role={undefined}
                                dense
                                button
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