// @flow
import {Tab, Tabs} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {AccessTime, List} from "@material-ui/icons";
import FavoriteIcon from "@material-ui/icons/Favorite";
import gql from "graphql-tag";
import React, {Component} from "react";
import {Query} from "react-apollo";
import IssueList from "../components/IssueList";
import MemberIdFilterContainer from "../containers/MemberIdFilterContainer";
import ProjectIdFilterContainer from "../containers/ProjectIdFilterContainer";
import ProjectIdRecentFilterContainer from "../containers/ProjectIdRecentFilterContainer";
import StatusFilterContainer from "../containers/StatusFilterContainer";
import IssueDialog from "./issues/components/IssueDialog";
import GanttContainer from "./issues/containers/GanttContainer";
import MemberIdFilterTabContainer from "./issues/containers/MemberIdFilterTabContainer";
import ProjectIdFilterTabContainer from "./issues/containers/ProjectIdFilterTabContainer";
import StatusFilterTabContainer from "./issues/containers/StatusFilterTabContainer";
import ViewTabContainer from "./issues/containers/ViewTabContainer";
import KeywordFilter from "../components/KeywordFilter";
import {connect} from "react-redux";
import {IMember} from "../components/MemberIdFilter";

const styles: any = {
    card_container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflowY: "scroll",
    },
};

type P = {}
type S = {}

class Issues extends Component<P, S> {
    constructor(props: any) {
        super(props);
        this.state = {
            filter: {},
            filter_project: {},
            issue: null,
            status: {},
            keyword: null,
            value: 0,
            hidden1: false,
        };
    }

    onProjectFilter(project: any[]) {
        if (project && project.length) {
            this.setState({filter_project: project[0]});
        } else {
            this.setState({filter_project: {}});
        }
        this.forceUpdate();
    }

    onFilter(user: any[]) {
        if (user && user.length) {
            this.setState({filter: user[0]});
        } else {
            this.setState({filter: {}});
        }
        this.forceUpdate();
    }

    onClose1 = (hidden) => {
        this.setState({hidden1: hidden})
    };
    render() {
        const {classes, select} = this.props;
        const {value, keyword} = this.state;
        const {id: assigned_to_id} = this.state.filter || {};
        const {id: project_id} = this.state.filter_project || {};
        const {id: status_id} = (this.state.status || {});
        return (
            <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "row"}}>
                <div>
                    <ProjectIdFilterTabContainer onFilter={(item: any[]) => this.onProjectFilter(item)}/>
                    <MemberIdFilterTabContainer onFilter={(item: any[]) => this.onFilter(item)}/>
                    <StatusFilterTabContainer onFilter={(item: any[]) => this.onStatusFilter(item)}/>
                </div>
                <div style={{flex: 1, minWidth: 0}}>
                    <div style={{width: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <KeywordFilter onFilter={this.onKeywordFilter}/>
                    </div>
                    <div style={{width: "100%", height: this.state.hidden1 ? "auto" : "50%", overflowX: "scroll"}}>
                        <ViewTabContainer projectId={project_id} memberId={assigned_to_id} statusId={status_id} keyword={keyword} onClickItem={this.showIssueDetail} onClose={this.onClose1}/>
                    </div>
                    <div style={{width: "100%", height: "50%", overflowX: "scroll"}}>
                        <ViewTabContainer projectId={project_id} memberId={assigned_to_id} statusId={status_id} keyword={keyword} onClickItem={this.showIssueDetail}/>
                    </div>
                </div>
                <IssueDialog ref={(dialog: IssueDialog) => this.dialog = dialog} onClose={this.onCloseDialog}/>
            </div>
        );
    }

    onStatusFilter(it: any[]) {
        if (it && it.length > 0) {
            this.setState({status: it[0]});
        } else {
            this.setState({status: {}});
        }
        this.forceUpdate();
    }

    handleChange(event: any, value: any) {
        this.setState({value});
    }

    onKeywordFilter = (keyword: string) => {
        console.log(`onKeywordFilter:${keyword}`);
        this.setState({keyword})
    };
    showIssueDetail = (issue: any) => {
        const {select} = this.props;
        let {issue: selectIssue} = this.state;
        if (selectIssue && issue && selectIssue.id === issue.id) {
            if (this.dialog) {
                this.dialog.show(issue);
            }
        } else {
            select(issue.id);
            this.setState({issue: issue})
        }

    };
    onCloseDialog = () => {
        this.setState({issue: null})
    }
}

let mapStateToProps = () => ({});
let mapDispatchToProps = (dispatch) => ({
    select(issueId?: string) {
        dispatch({type: "SELECT", payload: issueId});
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Issues));
