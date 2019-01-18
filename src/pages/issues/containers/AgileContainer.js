// @flow weak
import gql from "graphql-tag";
import React, {Component} from "react";
import {Query} from "react-apollo";
import {IGanttIssue} from "../../../components/Gantt";
import {withStyles} from "@material-ui/core";
import AgileColumnContainer from "../../../containers/AgileColumnContainer";
import {connect} from "react-redux";

const styles: any = {
    card_container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflowY: "scroll",
    },
};
type P = {
    projectId?: string,
    memberId?: string,
    statusId?: string,
};
type S = {
    issue?: any
}
let query = gql`
    query Status {
        issue_statuses {
            id
            name
        }
    }
`;

class IssueListContainer extends Component<P, S> {
    static defaultProps = {};

    constructor(props: P) {
        super(props);
        this.state = {
            issue: null,
        };

    }

    onSelect(issue: IGanttIssue) {
        this.setState({issue});
    }

    render() {
        const {statusId: status_id, memberId, projectId, onClickItem, selectIssueId} = this.props;

        return (
            <Query query={query}
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
                        <div style={{width: "100%", height: "100%"}}>
                            <div style={{width: "100%", height: "100%", overflowY: "scroll", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                {issue_statuses.map((it: { id: any; }) => <AgileColumnContainer
                                    selectIssueId={selectIssueId}
                                    project_id={projectId}
                                    assigned_to_id={memberId}
                                    status={it}
                                    key={it.id} data={[]}
                                    onClickItem={(item: any) => onClickItem(item)}
                                />)}
                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default connect(({viewSelect}) => ({selectIssueId: viewSelect}))(withStyles(styles)(IssueListContainer));
