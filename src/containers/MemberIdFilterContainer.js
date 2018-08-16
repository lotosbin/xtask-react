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

class MemberIdFilterContainer extends React.Component {

    render() {

        return (
            <Query query={gql`
          query Status {
            users (limit:1000){
              id
              name:firstname
            }
          }
        `}
            >
                {({loading, error, data}) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;
                    let {users} = data;
                    return (
                        <MemberIdFilter data={users || []} onFilter={this.props.onFilter.bind(this)}/>
                    )
                }}
            </Query>
        );
    }
}

MemberIdFilterContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    onFilter: PropTypes.func,
};

export default withStyles(styles)(MemberIdFilterContainer);