import {withStyles} from "@material-ui/core/styles";
import gql from "graphql-tag";
import React from "react";
import {Query} from "react-apollo";
import MemberIdFilter from "../components/MemberIdFilter";

const styles: any = (theme: { palette: { background: { paper: any; }; }; }) => ({
    root: {
        width: "100%",
        maxWidth: 200,
        backgroundColor: theme.palette.background.paper,
        overflowY: "scroll",
    },
    listItem: {},
});

interface IProjectMemberShip {
    user: any;
}

class ProjectMemberIdFilterContainer extends React.Component<any> {

    public render() {
        const {projectId} = this.props;
        return (
            <div style={{display: "flex", flex: "0 0 250px", overflowY: "scroll", minHeight: 0}}>
                <Query query={gql`query Status ($projectId:String!){
    projects(id:$projectId){
        memberships{
            user {
                id
                name:firstname
                mail
            }
        }

    }
}
        `}
                       variables={{projectId}}
                >
                    {({loading, error, data}) => {
                        if (loading) {
                            return <p>Loading...</p>;
                        }
                        if (error) {
                            return <p>Error :(</p>;
                        }
                        const {projects} = data;

                        let project = {memberships: []};
                        if (projects && projects.length > 0) {
                            project = projects[0];
                        }
                        const users = ((project.memberships || []) as IProjectMemberShip[]).filter((it) => !!it.user && !!it.user.id).map((it) => it.user);
                        return (
                            <MemberIdFilter mode={"single"} data={users || []} onFilter={this.props.onFilter.bind(this)}/>
                        );
                    }}
                </Query>
            </div>
        );
    }
}

export default withStyles(styles)(ProjectMemberIdFilterContainer);
