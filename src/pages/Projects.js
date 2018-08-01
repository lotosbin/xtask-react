import React from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag";

const Projects = () => (
    <Query query={gql`
      {
        projects {
          id
          name
          description
        }
      }
    `}
    >
        {({loading, error, data}) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return data.projects.map(({id, name, description}) => (
                <div key={id}>
                    <p>{`${id}: ${name}`}</p>
                    <p>{description}</p>
                </div>
            ));
        }}
    </Query>
);
export default Projects;