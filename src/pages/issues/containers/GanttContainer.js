// @flow weak
import gql from "graphql-tag";
import React, {Component} from "react";
import {Query} from "react-apollo";
import Gantt, {IGanttIssue} from "../../../components/Gantt";

type P = {
    projectId?: string,
    memberId?: string,
    statusId?: string,
};
type S = {
    issue?: any
}

const query = gql`query IssuesGantt($id: String,$assigned_to_id:String) {
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
            status{
                id
            }
        }
    }
}`;

class GanttContainer extends Component<P, S> {
    static defaultProps = {};

    constructor(props: P) {
        super(props);
        this.state = {
            issue: null,
        };

    }

    onSelect(issue: IGanttIssue) {
        this.setState({issue});
    }

    render() {
        const {statusId, memberId, projectId} = this.props;
        return (
            <Query query={query} variables={{id: projectId, assigned_to_id: memberId}}>
                {({loading, error, data}) => {
                    if (loading) {
                        return <p>Loading...</p>;
                    }
                    if (error) {
                        return <p>Error :(</p>;
                    }
                    let issues = data.projects[0].issues;
                    if (statusId) {
                        issues = issues.filter((it) => it.status && statusId === it.status.id);
                    }

                    return <Gantt data={issues} onSelect={(i: IGanttIssue) => this.onSelect(i)}/>;
                }}
            </Query>
        );
    }
}

export default GanttContainer;
