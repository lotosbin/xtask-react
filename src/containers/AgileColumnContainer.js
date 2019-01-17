/* tslint:disable:variable-name no-console */
import {withStyles} from "@material-ui/core/styles";
import gql from "graphql-tag";
import React from "react";
import {Mutation, Query} from "react-apollo";
import AgileColumn from "../components/AgileColumn";

const styles: any = (theme: { palette: { background: { paper: any; }; }; }) => ({
    root: {
        height: "100%",
        width: 300,
        // tslint:disable-next-line:object-literal-sort-keys
        flex: 0,
        flexShrink: 0,
        flexBasis: 300,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
    },
    // tslint:disable-next-line:object-literal-sort-keys
    listItem: {},
});
const TASK_UPDATE = gql`
    mutation TaskUpdate($issue_id: String!,$status_id:String!) {
        task_update(issue_id: $issue_id,status_id:$status_id) {
            id
        }
    }
`;
const query = gql`query Agile($assigned_to_id:String,$project_id:String) {
    issues(project_id:$project_id,assigned_to_id:$assigned_to_id,limit:500){
        id
        assigned_to_name
        assigned_to{
            id
            name:login
            mail
        }
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
        project{
            id
            name
        }
    }
}
`;

class AgileColumnContainer extends React.Component<any> {
    state = {
        checked: [],
    };

    onClickItem(e: any, item: any) {
        if (this.props.onClickItem) {
            this.props.onClickItem(item);
        }
    }

    render() {
        const {project_id, classes, status, assigned_to_id} = this.props;
        let {status_id} = this.props;
        console.log(`AgileColumn:assigned_to_id=${assigned_to_id}`);
        if (status) {
            status_id = status.id
        }
        return (
            <div className={classes.root}>
                <h1 style={{width: 300}} key={status_id}>{status.name}</h1>
                <div style={{minHeight: 0, overflowY: "scroll"}}>
                    <Query query={query} variables={{project_id, assigned_to_id}}>
                        {({loading, error, data}) => {
                            if (loading) {
                                return <p>Loading...</p>;
                            }
                            if (error) {
                                return <p>Error :(</p>;
                            }
                            const issues: any[] = data.issues || [];
                            const filter: any[] = issues.filter((it: any) => this.filterStatus(status_id)(it));
                            return <Mutation mutation={TASK_UPDATE}>
                                {(task_update, {data}) => (
                                    <AgileColumn
                                        status={status}
                                        data={filter}
                                        onClickItem={this.props.onClickItem}
                                        onDrop={(issue: { id: any; }, status: { id: any; }) => {
                                            console.log(`onDrop:${JSON.stringify(issue)},${JSON.stringify(status)}`);
                                            const variables = {
                                                issue_id: issue.id,
                                                status_id: status.id,
                                            };
                                            task_update({variables});
                                        }}
                                    />
                                )}
                            </Mutation>;
                        }}
                    </Query>
                </div>
            </div>
        );
    }

    filterStatus(status_id?: string) {
        return status_id ? (it) => (it.status || {}).id === status_id : true;
    }
}

export default withStyles(styles)(AgileColumnContainer);
