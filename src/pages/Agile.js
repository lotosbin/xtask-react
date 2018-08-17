import React, {Component} from "react";
import MemberIdFilterContainer from "../containers/MemberIdFilterContainer";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import Dialog from "../../node_modules/@material-ui/core/es/Dialog/Dialog";
import AppBar from "../../node_modules/@material-ui/core/es/AppBar/AppBar";
import Toolbar from "../../node_modules/@material-ui/core/es/Toolbar/Toolbar";
import IconButton from "../../node_modules/@material-ui/core/es/IconButton/IconButton";
import CloseIcon from "../../node_modules/@material-ui/core/SvgIcon/SvgIcon";
import Issue from "../components/Issue";
import AgileColumnContainer from "../containers/AgileColumnContainer";
import Slide from "../../node_modules/@material-ui/core/es/Slide/Slide";
import {withStyles} from "@material-ui/core";

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

class Agile extends Component<{}> {
    handleClose = () => {
        this.setState({issue: null});
    };

    constructor(props) {
        super(props);
        this.state = {
            issue: null,
            filter: null
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
            <div style={{flex: 1, width: '100%', height: '100%', display: 'flex', flexDirection: 'row'}}>
                <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'row'}}>
                    <MemberIdFilterContainer onFilter={item => this.onFilter(item)}/>
                    <div style={{flex: 1, minWidth: 0}}>
                        <div style={{width: '100%', height: '100%', overflowX: 'scroll'}}>
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
                                            <div style={{width: '100%', height: '100%', overflowY: 'scroll', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                                {issue_statuses.map(it => <AgileColumnContainer
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

export default withStyles(styles)(Agile);