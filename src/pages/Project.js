import React from "react";
import gql from "graphql-tag";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {Query} from "react-apollo";

const Project = ({match}) => (
    <div>
        <Query query={gql`
          query Project($id: String!) {
            projects(id:$id) {
              id
              name
              description
            }
          }
        `}
               variables={{id: match.params.projectId}}
        >
            {({loading, error, data}) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;
                let {id, name, description} = data.projects[0];
                return <div>{id}:{name}</div>
            }}
        </Query>
    </div>
);
export default Project;