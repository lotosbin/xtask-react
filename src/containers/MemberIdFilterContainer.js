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
            <div style={{display: 'flex', flex: '0 0 250px', overflowY: 'scroll', minHeight: 0}}>
                <Query query={gql`
          query Status {
            users (limit:1000){
              id
              name:firstname
              mail
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
            </div>
        );
    }
}

MemberIdFilterContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    onFilter: PropTypes.func,
};

export default withStyles(styles)(MemberIdFilterContainer);