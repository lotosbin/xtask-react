import {withStyles} from "@material-ui/core/styles";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import React from "react";
import {Query} from "react-apollo";
import MemberIdFilter from "../components/MemberIdFilter";
import ProjectIdFilter from "../components/ProjectIdFilter";

const styles: any = (theme: { palette: { background: { paper: any; }; }; }) => ({
    root: {
        width: "100%",
        maxWidth: 200,
        backgroundColor: theme.palette.background.paper,
        overflowY: "scroll",
    },
    listItem: {},
});
const query: any = gql`query Status {
    projects (limit:1000){
        id
        name:name
    }
} `;

class ProjectIdFilterContainer extends React.Component<any> {
    public render() {
        return <div style={{display: "flex", flex: "0 0 250px", overflowY: "scroll", minHeight: 0}}>
            <Query query={query}>
                {({loading, error, data}) => {
                    if (loading) {
                        return <p>Loading...</p>;
                    }
                    if (error) {
                        return <p>Error :(</p>;
                    }
                    return <ProjectIdFilter mode={"single"} data={data.projects || []} onFilter={this.props.onFilter.bind(this)}/>;
                }}
            </Query>
        </div>;
    }
}

export default withStyles(styles)(ProjectIdFilterContainer);
