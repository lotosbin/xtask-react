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

const styles: any = {
    card_container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflowY: "scroll",
    },
};
const query: any = gql`query Issues($assigned_to_id:String, $project_id:String) {
    issues(assigned_to_id:$assigned_to_id,limit:500,project_id:$project_id){
        id
        assigned_to_name
        subject
        start_date
        due_date
        relations{
            relation_type
            issue_to_id
        }
        status{
            id
            name
        }
        project{
            id
            name
        }
    }
} `;

class Issues extends Component<any, any> {
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
        const {id: assigned_to_id} = this.state.filter;
        const {id: project_id} = this.state.filter_project;

        return (
            <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "row"}}>
                <ProjectIdFilterTabContainer onFilter={(item: any[]) => this.onProjectFilter(item)}/>
                <MemberIdFilterTabContainer onFilter={(item: any[]) => this.onFilter(item)}/>
                <StatusFilterTabContainer onFilter={(item: any[]) => this.onStatusFilter(item)}/>
                <div style={{flex: 1, minWidth: 0}}>
                    <div style={{width: "100%", height: "50%", overflowX: "scroll"}}>
                        <GanttContainer projectId={project_id} memberId={assigned_to_id}/>
                    </div>
                    <div style={{width: "100%", height: "50%", overflowX: "scroll"}}>
                        <Query query={query} variables={{assigned_to_id, project_id}}>
                            {({loading, error, data}) => {
                                if (loading) {
                                    return <p>Loading...</p>;
                                }
                                if (error) {
                                    return <p>Error :(</p>;
                                }
                                const statusFilterId = this.state.status.id;
                                const issues = (data.issues || [])
                                    .filter((it: { status: { id: any; }; }) => !statusFilterId || statusFilterId === it.status.id)
                                    .map((it: { subject: any; status: { name: any; }; }) => ({...it, subject: `${it.subject}[${it.status.name}]`}));
                                return <div className={classes.card_container}>
                                    <IssueList data={issues} onClickItem={(issue) => this.showIssueDetail(issue)}/>
                                </div>;
                            }}
                        </Query>
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
