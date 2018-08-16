import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import gql from "graphql-tag";
import {Query} from "react-apollo";

const styles = theme => ({
    root: {
        width: 300,
        backgroundColor: theme.palette.background.paper,
    },
    listItem: {}
});

class AgileColumn extends React.Component {
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
                <Query query={gql`
          query Project($id: String!,$assigned_to_id:String) {
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
          }
        `}
                       variables={{id: project_id, assigned_to_id}}
                >
                    {({loading, error, data}) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error :(</p>;
                        let {issues} = data.projects[0];
                        let filter = issues.filter(it => this.filterStatus(status)(it));
                        return <List>
                            {filter.map((issue) => {
                                let {id, subject, assigned_to_name} = issue;
                                return (
                                    <ListItem
                                        key={id}
                                        role={undefined}
                                        dense
                                        button
                                        className={classes.listItem}
                                        onClick={e => this.onClickItem(e, issue)}
                                    >
                                        <ListItemText primary={`${subject}`} secondary={`${assigned_to_name}`}/>
                                    </ListItem>
                                );
                            })}
                        </List>
                    }}
                </Query>

            </div>
        );
    }

    filterStatus(status) {
        return it => (it.status || {}).id === (status || {}).id;
    }
}

AgileColumn.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    status: PropTypes.object.isRequired,
    project_id: PropTypes.object.isRequired,
};

export default withStyles(styles)(AgileColumn);