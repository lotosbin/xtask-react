import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import gql from "graphql-tag";
import {Mutation, Query} from "react-apollo";
import AgileColumn from "../components/AgileColumn";

const styles = theme => ({
    root: {
        height: '100%',
        width: 300,
        flex: 0,
        flexShrink: 0,
        flexBasis: 300,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
    },
    listItem: {}
});
const TASK_UPDATE = gql`
    mutation TaskUpdate($issue_id: String!,$status_id:String!) {
        task_update(issue_id: $issue_id,status_id:$status_id) {
            id
        }
    }
`;
class AgileColumnContainer extends React.Component {
    state = {
        checked: [],
    };
    onClickItem = (e, item) => {
        if (this.props.onClickItem) this.props.onClickItem(item)
    };


    render() {
        const {project_id, classes, status, assigned_to_id} = this.props;
        console.log(`AgileColumn:assigned_to_id=${assigned_to_id}`);
        return (
            <div className={classes.root}>
                <h1 style={{width: 300}} key={status.id}>{status.name}</h1>
                <div style={{minHeight: 0, overflowY: 'scroll'}}>
                    <Query query={gql`
          query Agile($assigned_to_id:String,$project_id:String) {
            issues(project_id:$project_id,assigned_to_id:$assigned_to_id,limit:500){
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
                project{
                id
                name
                }
            }
          }
        `}
                           variables={{project_id: project_id, assigned_to_id}}
                    >
                        {({loading, error, data}) => {
                            if (loading) return <p>Loading...</p>;
                            if (error) return <p>Error :(</p>;
                            let {issues} = data;
                            let filter = issues.filter(it => this.filterStatus(status)(it));
                            return <Mutation mutation={TASK_UPDATE}>
                                {(task_update, {data}) => (
                                    <AgileColumn
                                        status={status}
                                        data={filter}
                                        onClickItem={this.props.onClickItem}
                                        onDrop={(issue, status) => {
                                            console.log(`onDrop:${JSON.stringify(issue)},${JSON.stringify(status)}`);
                                            let variables = {
                                                issue_id: issue.id,
                                                status_id: status.id,
                                            };
                                            task_update({variables: variables});
                                        }}
                                    />
                                )}
                            </Mutation>
                        }}
                    </Query>
                </div>
            </div>
        );
    }

    filterStatus(status) {
        return it => (it.status || {}).id === (status || {}).id;
    }
}

AgileColumnContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    status: PropTypes.object.isRequired,
    project_id: PropTypes.object.isRequired,
};

export default withStyles(styles)(AgileColumnContainer);