import {withStyles} from "@material-ui/core";
import AppBar from "@material-ui/core/es/AppBar/AppBar";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Slide from "@material-ui/core/es/Slide/Slide";
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import gql from "graphql-tag";
import React, {Component} from "react";
import {Query} from "react-apollo";
import Gantt, {IGanttIssue} from "../components/Gantt";
import Issue from "../components/Issue";
import AgileColumn from "../containers/AgileColumnContainer";
import ProjectMemberIdFilterContainer from "../containers/ProjectMemberIdFilterContainer";

const styles: any = {
    appBar: {
        position: "relative",
    },
    flex: {
        flex: 1,
    },
};

function Transition(props: any) {
    return <Slide direction="up" {...props} />;
}

const query = gql`query ProjectHomeGantt($id: String!,$assigned_to_id:String) {
    projects(id:$id,limit:1000) {
        id
        name
        description
        issues(assigned_to_id:$assigned_to_id){
            id
            assigned_to_name
            subject
            start_date
            due_date
            relations{
                relation_type
                issue_to_id
            }
        }
    }
}`;

class ProjectHome extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            filter: "",
            issue: null,
        };

    }

    public handleClose = () => {
        this.setState({issue: null});
    }

    public onFilter(user: Array<{ id: any; }>) {
        if (user && user.length) {
            this.setState({filter: user[0].id});
        } else {
            this.setState({filter: null});
        }
    }

    public onSelect(issue: IGanttIssue) {
        this.setState({issue});
    }

    public render() {
        const {match: {params: {projectId}}, classes} = this.props;

        return (
            <div style={{flex: 1, display: "flex"}}>
                <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "row"}}>
                    <div style={{display: "flex", flex: "0 0 250px", overflowY: "scroll"}}>
                        <ProjectMemberIdFilterContainer projectId={projectId} onFilter={(item: Array<{ id: any; }>) => this.onFilter(item)}/>
                    </div>
                    <div style={{flex: 1, minWidth: 0}}>
                        <div style={{width: "100%", height: "50%", overflowX: "scroll"}}>
                            <Query query={query} variables={{id: projectId, assigned_to_id: this.state.filter}}>
                                {({loading, error, data}) => {
                                    if (loading) {
                                        return <p>Loading...</p>;
                                    }
                                    if (error) {
                                        return <p>Error :(</p>;
                                    }
                                    const {issues} = data.projects[0];
                                    return <Gantt data={issues} onSelect={(i) => this.onSelect(i)}/>;
                                }}
                            </Query>
                        </div>
                        <div style={{width: "100%", height: "50%", overflowX: "scroll"}}>
                            <Query query={gql`query Status {
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
                                                {issue_statuses.map((it: { id: any; }) => <AgileColumn project_id={projectId} assigned_to_id={this.state.filter} status={it} key={it.id} data={[]} onClickItem={(item: any) => this.setState({issue: item})}
                                                />)}
                                            </div>
                                        </div>
                                    );
                                }}
                            </Query>
                        </div>
                    </div>
                </div>
                <Dialog fullScreen open={!!this.state.issue} onClose={this.handleClose} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon/>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Issue data={this.state.issue}/>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(ProjectHome);
