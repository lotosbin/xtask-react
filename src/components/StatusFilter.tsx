import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

const styles: any = (theme: { palette: { background: { paper: any; }; }; }) => ({
    root: {
        width: 250,
        backgroundColor: theme.palette.background.paper,
        overflowY: "scroll",
    },
    listItem: {},
});

export interface IStatus {
    id: any;
    name?: any;
}

interface IStatusFilterProps {
    data: IStatus[];
    mode?: "single";
    onFilter: any;
    classes?: any;
}

class StatusFilter extends React.Component<IStatusFilterProps> {
    public static propTypes: { classes: PropTypes.Validator<object>; data: PropTypes.Validator<object>; onFilter: PropTypes.Requireable<(...args: any[]) => any>; };
    public state = {
        checked: [],
    };

    public handleToggle(value: { id: any; }) {
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

    public render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <List>
                    {this.props.data.map((item: IStatus) => {
                        const {id, name} = item;
                        return (
                            <ListItem
                                key={id}
                                role={undefined}
                                dense
                                button
                                onClick={this.handleToggle(item)}
                                className={classes.listItem}
                            >
                                <Checkbox
                                    checked={(this.state.checked as any[]).indexOf(id) !== -1}
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

export default withStyles(styles)(StatusFilter);
