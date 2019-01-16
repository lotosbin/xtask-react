import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";
import Gravatar from "react-gravatar";

const styles: any = (theme: { palette: { background: { paper: any; }; }; }) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        overflowY: "scroll",
        width: 250,
    },
    listItem: {},
});

class MemberIdFilter extends React.Component {
    state = {
        checked: [],
    };

    handleToggle(value: { id: any; }) {
        return () => {
            const {id} = value;
            const {checked}: { checked: any[] } = this.state;
            const currentIndex = checked.indexOf(id);
            let newChecked = [...checked];
            if (currentIndex === -1) {
                if (this.props.mode === "single") {
                    newChecked = [];
                }
                newChecked.push(id);
            } else {
                newChecked.splice(currentIndex, 1);
            }
            this.setState({
                checked: newChecked,
            });
            if (this.props.onFilter) {
                const filter = this.props.data.filter((it: { id: any; }) => newChecked.indexOf(it.id) >= 0);
                this.props.onFilter(filter);
            }
        };
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <List>
                    {this.props.data.map((item: IMember) => {
                        const {id, name, mail} = item;
                        return (
                            <ListItem
                                key={id}
                                role={undefined}
                                dense
                                button
                                onClick={this.handleToggle(item)}
                                className={classes.listItem}
                            >
                                <Gravatar email={mail}/>
                                <Checkbox
                                    checked={(this.state.checked).indexOf(id) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                />
                                <ListItemText primary={`${name}`}/>

                            </ListItem>
                        );
                    })}
                </List>
            </div>
        );
    }
}

export default withStyles(styles)(MemberIdFilter);
