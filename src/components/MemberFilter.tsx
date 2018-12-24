/* tslint:disable:object-literal-sort-keys */
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

const styles: any = (theme: { palette: { background: { paper: any; }; }; }) => ({
    root: {
        width: "100%",
        maxWidth: 200,
        backgroundColor: theme.palette.background.paper,
        overflowY: "scroll",
    },
    listItem: {},
});

class MemberFilter extends React.Component<any, { checked: string[] }> {
    public static propTypes: {
        classes: PropTypes.Validator<object>;
        data: PropTypes.Validator<object>;
        onFilter: PropTypes.Requireable<(...args: any[]) => any>;
    };
    public state = {
        checked: [],
    };

    public handleToggle(value: string) {
        const checked: string[] = this.state.checked;
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
            this.props.onFilter(newChecked);
        }
    }

    public render() {
        const {classes} = this.props;

        const data: any[] = this.props.data;
        return (
            <div className={classes.root}>
                <List>
                    {data.map((value: any) => (
                        <ListItem
                            key={value}
                            role={undefined}
                            dense
                            button
                            onClick={() => this.handleToggle(value)}
                            className={classes.listItem}
                        >
                            <Checkbox
                                checked={((this.state.checked) as string[]).indexOf(value) !== -1}
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
