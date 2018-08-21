import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import MemberIdFilter from "../components/MemberIdFilter";

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 200,
        backgroundColor: theme.palette.background.paper,
        overflowY: 'scroll',
    },
    listItem: {}
});

class ProjectMemberIdFilterContainer extends React.Component {

    render() {
        let {projectId} = this.props;
        return (
            <div style={{display: 'flex', flex: '0 0 250px', overflowY: 'scroll', minHeight: 0}}>
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
                       variables={{"projectId": projectId}}
                >
                    {({loading, error, data}) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error :(</p>;
                        let {projects} = data;

                        let project = {};
                        if (projects && projects.length > 0) {
                            project = projects[0];
                        }
                        let users = (project.memberships || []).filter(it => !!it.user && !!it.user.id).map(it => it.user);
                        return (
                            <MemberIdFilter mode={'single'} data={users || []} onFilter={this.props.onFilter.bind(this)}/>
                        )
                    }}
                </Query>
            </div>
        );
    }
}

ProjectMemberIdFilterContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    projectId: PropTypes.string.isRequired,
    onFilter: PropTypes.func,
};

export default withStyles(styles)(ProjectMemberIdFilterContainer);