import React, {Component} from "react";
import GanttComponent from "../components/Gantt";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import moment from "moment";
import Issue from "../components/Issue";
import MemberIdFilterContainer from "../containers/MemberIdFilterContainer";

function daysToMilliseconds(days) {
    return days * 24 * 60 * 60 * 1000;
}

const columns = [
    {type: "string", label: "Task ID"},
    {type: "string", label: "Task Name"},
    {type: "string", label: "Resource"},
    {type: "date", label: "Start Date"},
    {type: "date", label: "End Date"},
    {type: "number", label: "Duration"},
    {type: "number", label: "Percent Complete"},
    {type: "string", label: "Dependencies"}
];

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
                            let mapToRow = issues => issues.map(it => {
                                let start_date = moment(it.start_date).toDate() || new Date(2015, 0, 1);
                                let due_date = moment(it.due_date).toDate() || moment(start_date).add(1, 'd').toDate();
                                let issue_id = it.id;
                                let relation = it.relations && it.relations.length ? (it.relations || []).filter(it => it.issue_to_id !== issue_id).map(it => it.issue_to_id).join(",") : null;
                                return [
                                    `${it.id}`,
                                    it.subject,
                                    it.assigned_to_name,
                                    start_date,
                                    due_date,
                                    null,
                                    100,
                                    null
                                ]
                            });
                            this.data = issues;
                            let rows = (mapToRow)(issues);
                            console.dir(rows);
                            return <div style={{height: '100%', overflowY: 'scroll', flex: 1}}>
                                <GanttComponent columns={columns} rows={rows} onSelect={(i) => this.onSelect(i)}/>
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