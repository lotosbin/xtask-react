import React, {Component} from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import IssueList from "../components/IssueList";
import MemberIdFilterContainer from "../containers/MemberIdFilterContainer";
import StatusFilterContainer from "../containers/StatusFilterContainer";

const styles = {
    card_container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflowY: 'scroll',
    },
};

class Issues extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            filter: {},
            status: {},
        };
    }

    onFilter(user) {
        console.log(`onFilter:${JSON.stringify(user)}`);
        if (user && user.length) {
            this.setState({filter: user[0]})
        }
        else {
            this.setState({filter: {}})
        }
        this.forceUpdate()
    }

    render() {
        const {classes} = this.props;
        let {id: assigned_to_id} = this.state.filter;
        return (
            <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'row'}}>
                <div style={{display: 'flex', flex: '0 0 250px', overflowY: 'scroll'}}>
                    <MemberIdFilterContainer onFilter={item => this.onFilter(item)}/>
                </div>
                <StatusFilterContainer onFilter={item => this.onStatusFilter(item)}/>
                <div style={{flex: 1, minWidth: 0}}>
                    <div style={{width: '100%', height: '100%', overflowX: 'scroll'}}>
                        <Query query={gql`
          query Issues($assigned_to_id:String) {
            issues(assigned_to_id:$assigned_to_id,limit:500){
                id
                assigned_to_name
                subject
                start_date
                due_date
                relations{
                    relation_type
                    issue_to_id
                }
                status{
                    id
                    name
                }
                project{
                id
                name
                }
            }
          }
        `}
                               variables={{assigned_to_id: assigned_to_id}}
                        >
                            {({loading, error, data}) => {
                                if (loading) return <p>Loading...</p>;
                                if (error) return <p>Error :(</p>;
                                let statusFilterId = this.state.status.id;
                                let issues = (data.issues || [])
                                    .filter(it => !statusFilterId || statusFilterId === it.status.id)
                                    .map(it => ({...it, subject: `${it.subject}[${it.status.name}]`}));
                                return <div className={classes.card_container}>
                                    <IssueList data={issues}/>
                                </div>;
                            }}
                        </Query>
                    </div>
                </div>
            </div>
        );
    }

    onStatusFilter(it) {
        if (it && it.length > 0) {
            this.setState({status: it[0]});
        } else {
            this.setState({status: {}});
        }
        this.forceUpdate()
    }
}

Issues.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Issues);
