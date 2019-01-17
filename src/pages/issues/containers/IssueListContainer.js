// @flow weak
import gql from "graphql-tag";
import React, {Component} from "react";
import {Query} from "react-apollo";
import {IGanttIssue} from "../../../components/Gantt";
import {withStyles} from "@material-ui/core";
import IssueList from "../../../components/IssueList";

const styles: any = {
    card_container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflowY: "scroll",
    },
};
type P = {
    projectId?: string,
    memberId?: string,
    statusId?: string,
};
type S = {
    issue?: any
}

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

class IssueListContainer extends Component<P, S> {
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
        const {classes} = this.props;
        const {statusId, memberId, projectId, onClickItem} = this.props;
        return (
            <Query query={query} variables={{assigned_to_id: memberId, project_id: projectId}}>
                {({loading, error, data}) => {
                    if (loading) {
                        return <p>Loading...</p>;
                    }
                    if (error) {
                        return <p>Error :(</p>;
                    }
                    const issues = (data.issues || [])
                        .filter((it: { status: { id: any; }; }) => !statusId || statusId === it.status.id)
                        .map((it: { subject: any; status: { name: any; }; }) => ({...it, subject: `${it.subject}[${it.status.name}]`}));
                    return <div className={classes.card_container}>
                        <IssueList data={issues} onClickItem={onClickItem}/>
                    </div>;
                }}
            </Query>
        );
    }
}

export default withStyles(styles)(IssueListContainer);
