//@flow
import React, {Component} from "react";
import GanttComponent from "../components/Gantt";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import Issue from "../components/Issue";
import MemberIdFilterContainer from "../containers/MemberIdFilterContainer";

class Gantt extends Component<{ match: * }> {
    constructor(props) {
        super(props);
        this.state = {
            filter: [],
            data: [],
            issue: {},
        };
        this.data = []
    }

    render() {
        let {match} = this.props;
        return (
            <div style={{flex: 1, display: 'flex'}}>
                <div style={{flex: 1, display: 'flex', flexDirection: 'row'}}>
                    <MemberIdFilterContainer onFilter={item => this.onFilter(item)}/>
                    <Query query={gql`query Issues($assigned_to_id:String) {
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
    }
}
        `}
                           variables={{"assigned_to_id": (this.state.filter || {}).id}}
                    >
                        {({loading, error, data}) => {
                            if (loading) return <p>Loading...</p>;
                            if (error) return <p>Error :(</p>;
                            let issues = data.issues || [];
                            this.data = issues;
                            return <div style={{height: '100%', overflowY: 'scroll', flex: 1}}>
                                <GanttComponent data={issues} onSelect={(i) => this.onSelect(i)}/>
                            </div>
                        }}
                    </Query>
                    <Issue data={this.state.issue}/>
                </div>
            </div>
        );
    }

    onSelect(i) {
        console.log(`select:${JSON.stringify(i)}`);
        let issue = this.data[i[0].row];
        console.dir(this.data);
        console.dir(issue);
        this.setState({issue: issue})
    }

    onFilter(it) {
        console.log(`onFilter:${JSON.stringify(it)}`);
        console.dir(it);
        if (it && it.length > 0) {
            this.setState({filter: it[0]});
        } else {
            this.setState({filter: null});
        }
        this.forceUpdate()
    }
}

export default Gantt;