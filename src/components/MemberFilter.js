import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 200,
        backgroundColor: theme.palette.background.paper,
        overflowY: 'scroll',
    },
    listItem: {}
});

class MemberFilter extends React.Component {
    state = {
        checked: [],
    };

    handleToggle = value => () => {
        const {checked} = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked,
        });
        if (this.props.onFilter) {
            this.props.onFilter(newChecked)
        }
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <List>
                    {this.props.data.map(value => (
                        <ListItem
                            key={value}
                            role={undefined}
                            dense
                            button
                            onClick={this.handleToggle(value)}
                            className={classes.listItem}
                        >
                            <Checkbox
                                checked={this.state.checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                            />
                            <ListItemText primary={`${value}`}/>
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }
}

MemberFilter.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    onFilter: PropTypes.func,
};

export default withStyles(styles)(MemberFilter);