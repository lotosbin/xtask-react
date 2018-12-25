import gql from "graphql-tag";
import React, {Component} from "react";
import {Query} from "react-apollo";
import Gantt, {IGanttIssue} from "../../../components/Gantt";

const query = gql`query IssuesGantt($id: String!,$assigned_to_id:String) {
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

class GanttContainer extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            issue: null,
        };

    }

    public onSelect(issue: IGanttIssue) {
        this.setState({issue});
    }

    public render() {
        const {statusId} = this.props;
        return (
            <Query query={query} variables={{id: this.props.projectId, assigned_to_id: this.props.memberId}}>
                {({loading, error, data}) => {
                    if (loading) {
                        return <p>Loading...</p>;
                    }
                    if (error) {
                        return <p>Error :(</p>;
                    }
                    const issues = data.projects[0].issues.filter((it: { status: { id: any; }; }) => !statusId || statusId === it.status.id);
                    return <Gantt data={issues} onSelect={(i: IGanttIssue) => this.onSelect(i)}/>;
                }}
            </Query>
        );
    }
}

export default GanttContainer;
