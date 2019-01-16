import {withStyles} from "@material-ui/core/styles";
import React from "react";
import {connect} from "react-redux";
import StatusFilter from "../components/StatusFilter";

const styles: any = (theme: { palette: { background: { paper: any; }; }; }) => ({
    root: {
        width: "100%",
        maxWidth: 200,
        backgroundColor: theme.palette.background.paper,
        overflowY: "scroll",
    },
    listItem: {},
});

class StatusRecentFilterContainer extends React.Component<any> {
    render() {
        return (
            <div style={{display: "flex", flex: "0 0 250px", overflowY: "scroll", minHeight: 0}}>
                <StatusFilter mode={"single"} data={this.props.data} onFilter={this.props.onFilter.bind(this)}/>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    data: state.recentStatus.list,
});
const mapDispatchToProps = (dispatch: any) => ({
    recent_project(project: any) {
        dispatch({type: "RECENT_STATUS", payload: project});
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StatusRecentFilterContainer));
