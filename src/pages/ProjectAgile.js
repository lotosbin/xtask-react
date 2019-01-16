import {withStyles} from "@material-ui/core";
import gql from "graphql-tag";
import React, {Component} from "react";
import {Query} from "react-apollo";
import AgileColumn from "../containers/AgileColumnContainer";
import ProjectMemberIdFilterContainer from "../containers/ProjectMemberIdFilterContainer";
import IssueDialog from "./issues/components/IssueDialog";

const styles: any = {
    appBar: {
        position: "relative",
    },
    flex: {
        flex: 1,
    },
};
class ProjectAgile extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            filter: "",
            issue: null,
        };
    }

    onFilter(user: Array<{ id: any; }>) {
        if (user && user.length) {
            this.setState({filter: user[0].id});
        } else {
            this.setState({filter: null});
        }
    }

    render() {
        const {match: {params: {projectId}}} = this.props;
        return (
            <div style={{flex: 1, display: "flex"}}>
                <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "row"}}>
                    <div style={{display: "flex", flex: "0 0 250px", overflowY: "scroll"}}>
                        <ProjectMemberIdFilterContainer projectId={projectId} onFilter={(item: Array<{ id: any; }>) => this.onFilter(item)}/>
                    </div>
                    <div style={{flex: 1, minWidth: 0}}>
                        <div style={{width: "100%", height: "100%", overflowX: "scroll"}}>
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
                                        <div style={{width: "100%", height: "100%"}}>
                                            <div style={{width: "100%", height: "100%", overflowY: "scroll", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                                {issue_statuses.map((it: { id: any; }) => <AgileColumn
                                                    project_id={projectId}
                                                    assigned_to_id={this.state.filter}
                                                    status={it}
                                                    key={it.id} data={[]}
                                                    onClickItem={(item: any) => this.setState({issue: item})}
                                                />)}
                                            </div>
                                        </div>
                                    );
                                }}
                            </Query>
                        </div>
                    </div>
                </div>
                <IssueDialog data={this.state.issue}/>
            </div>
        );
    }
}

export default withStyles(styles)(ProjectAgile);
