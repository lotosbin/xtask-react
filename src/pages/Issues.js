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
import IssueListContainer from "./issues/containers/IssueListContainer";
import AgileContainer from "./issues/containers/AgileContainer";

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
            value: 0,
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

    render() {
        const {classes} = this.props;
        const {value} = this.state;
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
                    <div style={{width: "100%", height: "50%", overflowX: "scroll"}}>
                        <GanttContainer projectId={project_id} memberId={assigned_to_id} statusId={status_id}/>
                    </div>
                    <div style={{width: "100%", height: "50%", overflowX: "scroll"}}>
                        <IssueListContainer projectId={project_id} memberId={assigned_to_id} statusId={status_id}/>
                    </div>
                    <div style={{width: "100%", height: "50%", overflowX: "scroll"}}>
                        <AgileContainer projectId={project_id} memberId={assigned_to_id} statusId={status_id}/>
                    </div>
                </div>
                <IssueDialog ref={(dialog: IssueDialog) => this.dialog = dialog}/>
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

    showIssueDetail(issue: any) {
        if (this.dialog) {
            this.dialog.show(issue);
        }
    }
}

export default withStyles(styles)(Issues);
