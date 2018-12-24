import {withStyles} from "@material-ui/core/styles";
import gql from "graphql-tag";
import PropTypes from "prop-types";
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

class MemberIdFilterContainer extends React.Component<any> {

    public render() {

        return (
            <div style={{display: "flex", flex: "0 0 250px", overflowY: "scroll", minHeight: 0}}>
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
                        if (loading) {
                            return <p>Loading...</p>;
                        }
                        if (error) {
                            return <p>Error :(</p>;
                        }
                        const {users} = data;
                        return (
                            <MemberIdFilter mode={"single"} data={users || []} onFilter={this.props.onFilter.bind(this)}/>
                        );
                    }}
                </Query>
            </div>
        );
    }
}

export default withStyles(styles)(MemberIdFilterContainer);
