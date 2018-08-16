import React, {Component} from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import AgileColumn from "../components/AgileColumn";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import AppBar from "@material-ui/core/es/AppBar/AppBar";
import Slide from "@material-ui/core/es/Slide/Slide";
import {withStyles} from "@material-ui/core";
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Issue from "../components/Issue";
import MemberIdFilterContainer from "../containers/MemberIdFilterContainer";

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

class ProjectAgile extends Component<{}> {
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
        }
        else {
            this.setState({filter: null})
        }
    }
    render() {
        let {match, classes} = this.props;
        return (
            <div style={{flex: 1, display: 'flex'}}>
                <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'row'}}>
                    <div>
                        <MemberIdFilterContainer onFilter={item => this.onFilter(item)}/>
                    </div>
                    <div style={{flex: 1}}>
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
                                if (loading) return <p>Loading...</p>;
                                if (error) return <p>Error :(</p>;
                                let {issue_statuses} = data;
                                return (
                                    <div style={{width: '100%', height: '100%'}}>
                                        <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                            {issue_statuses.map(it => <h1 style={{width: 300}} key={it.id}>{it.name}</h1>)}
                                        </div>
                                        <div style={{width: '100%', height: '100%', overflowY: 'scroll', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                            {issue_statuses.map(it => <AgileColumn
                                                project_id={match.params.projectId}
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

export default withStyles(styles)(ProjectAgile);