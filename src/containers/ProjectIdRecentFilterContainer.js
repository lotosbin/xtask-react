import {withStyles} from "@material-ui/core/styles";
import React from "react";
import {connect} from "react-redux";
import ProjectIdFilter from "../components/ProjectIdFilter";

const styles: any = (theme: { palette: { background: { paper: any; }; }; }) => ({
    root: {
        width: "100%",
        height: "20%",
        maxWidth: 200,
        backgroundColor: theme.palette.background.paper,
        overflowY: "scroll",
    },
    listItem: {},
});

class ProjectIdRecentFilterContainer extends React.Component<any> {
    render() {
        return <div style={{display: "flex", flex: "0 0 250px", overflowY: "scroll", minHeight: 0}}>
            <ProjectIdFilter mode={"single"} data={this.props.projects} onFilter={(item: any) => this.onFilter(item)}/>
        </div>;
    }

    onFilter(item: any): any {
        this.props.recent_project(item[0]);
        this.props.onFilter(item);
    }
}

const mapStateToProps = (state: any) => ({
    projects: state.recentProject.recent_project_list,
});
const mapDispatchToProps = (dispatch: any) => ({
    recent_project(project: any) {
        dispatch({type: "RECENT_PROJECT", payload: project});
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProjectIdRecentFilterContainer));
