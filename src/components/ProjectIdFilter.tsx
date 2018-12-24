import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {withStyles} from "@material-ui/core/styles";
import React from "react";

const styles: any = (theme: { palette: { background: { paper: any; }; }; }) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        overflowY: "scroll",
        width: 250,
    },
    listItem: {},
});

export interface IProject {
    id: string;
    name?: string;
}

interface IProjectIdFilterProps {
    data: IProject[];
    onFilter: any;
    classes?: any;
    mode?: "single" | undefined | null;
}

class ProjectIdFilter extends React.Component<IProjectIdFilterProps> {
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
                    {this.props.data.map((project) => {
                        return <ListItem key={project.id} role={undefined} dense button onClick={this.handleToggle({id: project.id})} className={classes.listItem}>
                            <Checkbox checked={(this.state.checked as any[]).indexOf(project.id) !== -1} tabIndex={-1} disableRipple/>
                            <ListItemText primary={`${project.name}`}/>

                        </ListItem>;
                    })}
                </List>
            </div>
        );
    }
}

export default withStyles(styles)(ProjectIdFilter);
