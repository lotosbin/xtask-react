import React, {Component} from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import AgileColumn from "../containers/AgileColumnContainer";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import AppBar from "@material-ui/core/es/AppBar/AppBar";
import Slide from "@material-ui/core/es/Slide/Slide";
import {withStyles} from "@material-ui/core";
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Issue from "../components/Issue";
import ProjectMemberIdFilterContainer from "../containers/ProjectMemberIdFilterContainer";
import Gantt from "../components/Gantt";

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class ProjectHome extends Component<{}> {
    handleClose = () => {
        this.setState({issue: null});
    };

    constructor(props) {
        super(props);
        this.state = {
            issue: null,
            filter: ''
        };

    }

    onFilter(user) {
        console.log(`onFilter:${JSON.stringify(user)}`);
        if (user && user.length) {
            this.setState({filter: user[0].id})
        } else {
            this.setState({filter: null})
        }
    }
    onSelect(i) {
        console.log(`select:${JSON.stringify(i)}`);
        let issue = this.data[i[0].row];
        console.dir(this.data);
        console.dir(issue);
        this.setState({issue: issue})
    }
    render() {
        let {match: {params: {projectId}}, classes} = this.props;
        return (
            <div style={{flex: 1, display: 'flex'}}>
                <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'row'}}>
                    <div style={{display: 'flex', flex: '0 0 250px', overflowY: 'scroll'}}>
                        <ProjectMemberIdFilterContainer projectId={projectId} onFilter={item => this.onFilter(item)}/>
                    </div>
                    <div style={{flex: 1, minWidth: 0}}>
                        <div style={{width: '100%', height: '50%', overflowX: 'scroll'}}>
                            <Query query={gql`query ProjectHomeGantt($id: String!,$assigned_to_id:String) {
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
}
        `}
                                   variables={{id: projectId, assigned_to_id: this.state.filter}}
                            >
                                {({loading, error, data}) => {
                                    if (loading) return <p>Loading...</p>;
                                    if (error) return <p>Error :(</p>;
                                    let {issues} = data.projects[0];

                                    this.data = issues;
                                    return <Gantt data={issues} onSelect={(i) => this.onSelect(i)}/>
                                }}
                            </Query>
                        </div>
                        <div style={{width: '100%', height: '50%', overflowX: 'scroll'}}>
                            <Query query={gql`query Status {
    issue_statuses {
        id
        name
    }
}
        `}
                            >
                                {({loading, error, data}) => {
                                    if (loading) return <p>Loading...</p>;
                                    if (error) return <p>Error :(</p>;
                                    let {issue_statuses} = data;
                                    return (
                                        <div style={{width: '100%', height: '100%'}}>
                                            <div style={{width: '100%', height: '100%', overflowY: 'scroll', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                                {issue_statuses.map(it => <AgileColumn
                                                    project_id={projectId}
                                                    assigned_to_id={this.state.filter}
                                                    status={it}
                                                    key={it.id} data={[]}
                                                    onClickItem={item => this.setState({issue: item})}
                                                />)}
                                            </div>
                                        </div>
                                    )
                                }}
                            </Query>
                        </div>
                    </div>
                </div>
                <Dialog
                    fullScreen
                    open={!!this.state.issue}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
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