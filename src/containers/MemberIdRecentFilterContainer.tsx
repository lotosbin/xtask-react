import {withStyles} from "@material-ui/core/styles";
import React from "react";
import {connect} from "react-redux";
import MemberIdFilter from "../components/MemberIdFilter";

const styles: any = (theme: { palette: { background: { paper: any; }; }; }) => ({
    root: {
        width: "100%",
        maxWidth: 200,
        backgroundColor: theme.palette.background.paper,
        overflowY: "scroll",
    },
    listItem: {},
});

class MemberIdRecentFilterContainer extends React.Component<any> {
    public render() {
        return <div style={{display: "flex", flex: "0 0 250px", overflowY: "scroll", minHeight: 0}}>
            <MemberIdFilter mode={"single"} data={this.props.data} onFilter={this.props.onFilter.bind(this)}/>
        </div>;
    }
}

export default connect((state: any) => ({data: state.recentMember.list}))(withStyles(styles)(MemberIdRecentFilterContainer));
