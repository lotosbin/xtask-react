import gql from "graphql-tag";
import React, {Component} from "react";
import {Query} from "react-apollo";
import Gantt, {IGanttIssue} from "../components/Gantt";
import Issue from "../components/Issue";
import ProjectMemberIdFilterContainer from "../containers/ProjectMemberIdFilterContainer";

const query = gql`query ProjectGantt($id: String!,$assigned_to_id:String) {
    projects(id:$id,limit:1000) {
        id
        name
        description
        issues(assigned_to_id:$assigned_to_id){
            id
            assigned_to_name
            subject
            start_date
            due_date
            relations{
                relation_type
                issue_to_id
            }
        }
    }
}`;

class ProjectGantt extends Component<any, any> {
    issues: any[] = [];

    constructor(props: any) {
        super(props);
        this.state = {
            data: [],
            filter: [],
            issue: {},
            issues: [],
        };
    }

    render() {
        const {match: {params: {projectId}}} = this.props;

        return (
            <div style={{flex: 1, display: "flex"}}>
                <div style={{flex: 1, display: "flex", flexDirection: "row", width: "100%"}}>
                    <ProjectMemberIdFilterContainer projectId={projectId} onFilter={(it: any) => this.onFilter(it)}/>
                    <Query query={query} variables={{id: projectId, assigned_to_id: (this.state.filter || {}).id}}>
                        {({loading, error, data}) => {
                            if (loading) {
                                return <p>Loading...</p>;
                            }
                            if (error) {
                                return <p>Error :(</p>;
                            }
                            const {issues} = data.projects[0];
                            this.issues = issues;
                            return <div style={{height: "100%", width: "100%", overflowY: "scroll"}}>
                                <Gantt data={issues} onSelect={(i: IGanttIssue) => this.onSelect(i)}/>
                            </div>;
                        }}
                    </Query>
                    <Issue data={this.state.issue} issues={this.state.issues}/>
                </div>
            </div>
        );
    }

    onSelect(issue: IGanttIssue) {
        this.setState({
            issue,
            issues: this.issues,
        });
    }

    onFilter(it: any[]) {
        if (it && it.length > 0) {
            this.setState({filter: it[0]});
        } else {
            this.setState({filter: null});
        }
        this.forceUpdate();
    }
}

export default ProjectGantt;
