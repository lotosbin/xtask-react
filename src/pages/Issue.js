import React, {Component} from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag";

class Issue extends Component<{ match: * }> {
    render() {
        let {match} = this.props;
        return (
            <div>
                <Query query={gql`
          query Issue($id: String!) {
              issues:tasks(issue_id:$id){
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
        `}
                       variables={{id: match.params.id}}
                >
                    {({loading, error, data}) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error :(</p>;
                        let issue = data.issues[0];
                        return <Issue data={issue}/>

                    }}
                </Query>

            </div>
        );
    }
}

export default Issue;