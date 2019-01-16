import gql from "graphql-tag";
import React, {Component} from "react";
import {Query} from "react-apollo";
import {Link} from "react-router-dom";
import {LinkButton} from "../components/LinkButton";
import PrivateRoute from "../router/PrivateRoute";
import ProjectAgile from "./ProjectAgile";
import ProjectGantt from "./ProjectGantt";
import ProjectHome from "./ProjectHome";

const query = gql`query Project($id: String!) {
    projects(id:$id) {
        id
        name
        description
    }
}
`;

class Project extends Component<any, any> {
    render() {
        const {match} = this.props;
        const projectId = match.params.projectId;
        return <div style={{height: "100%", minHeight: 0, display: "flex", flexDirection: "column"}}>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center"}}>
                <Query query={query} variables={{id: projectId}}>
                    {({loading, error, data}) => {
                        if (loading) {
                            return <p>Loading...</p>;
                        }
                        if (error) {
                            return <p>Error :(</p>;
                        }
                        const {id, name, description}: { id: any, name: any, description: any } = (data.projects || [])[0] || {};
                        return (<h1 title={description}>{id}:{name}</h1>);
                    }}
                </Query>
                <div>
                    <LinkButton size="small" component={Link} to={`/project/${projectId}/home`}>Home</LinkButton>
                    <LinkButton size="small" component={Link} to={`/project/${projectId}/gantt`}>Gantt</LinkButton>
                    <LinkButton size="small" component={Link} to={`/project/${projectId}/agile`}>Agile</LinkButton>
                </div>
            </div>
            <PrivateRoute path="/project/:projectId/home" match={match} component={ProjectHome}/>
            <PrivateRoute path="/project/:projectId/gantt" match={match} component={ProjectGantt}/>
            <PrivateRoute path="/project/:projectId/agile" match={match} component={ProjectAgile}/>
        </div>;
    }
}

export default Project;
