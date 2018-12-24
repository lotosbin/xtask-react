import {withStyles} from "@material-ui/core/styles";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import React from "react";
import {Query} from "react-apollo";
import StatusFilter from "../components/StatusFilter";

const styles: any = (theme: { palette: { background: { paper: any; }; }; }) => ({
    root: {
        width: "100%",
        maxWidth: 200,
        backgroundColor: theme.palette.background.paper,
        overflowY: "scroll",
    },
    listItem: {},
});

class StatusFilterContainer extends React.Component<any> {

    public render() {

        return (
            <div style={{display: "flex", flex: "0 0 250px", overflowY: "scroll", minHeight: 0}}>
                <Query query={gql`
          query Status {
            issue_statuses {
              id
              name
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
                        const {issue_statuses} = data;
                        return (
                            <StatusFilter mode={"single"} data={issue_statuses || []} onFilter={this.props.onFilter.bind(this)}/>
                        );
                    }}
                </Query>
            </div>
        );
    }
}

export default withStyles(styles)(StatusFilterContainer);
