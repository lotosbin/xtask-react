import React, {Component} from "react";
import Gantt from "../components/Gantt";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import moment from "moment";
import * as R from "rambda";
import MemberFilter from "../components/MemberFilter";
import Issue from "../components/Issue";

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

class ProjectGantt extends Component<{ match: * }> {
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
                <Query query={gql`
          query Project($id: String!) {
            projects(id:$id,limit:1000) {
              id
              name
              description
              issues{
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
                       variables={{id: match.params.projectId}}
                >
                    {({loading, error, data}) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error :(</p>;
                        let {issues} = data.projects[0];
                        let mapToRow = issues => issues.map(it => {
                            let start_date = moment(it.start_date).toDate() || new Date(2015, 0, 1);
                            let due_date = moment(it.due_date).toDate() || moment(start_date).add(1, 'd').toDate();
                            let issue_id = it.id;
                            let relation = it.relations && it.relations.length ? (it.relations || []).filter(it => it.issue_to_id != issue_id).map(it => it.issue_to_id).join(",") : null;
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
                        let filterByAssignedToName = filters => issues => filters && filters.length ? issues.filter(it => filters.filter(e => e == it.assigned_to_name).length) : issues;
                        let filteredIssues = filterByAssignedToName(this.state.filter)(issues);
                        // this.setState({data: filteredIssues});
                        this.data = filteredIssues;
                        let rows = (mapToRow)(filteredIssues);
                        console.dir(rows);
                        const get_assigned_to_name = (issues) => issues.map(it => it.assigned_to_name);
                        const filterNotEmpty = (issues) => issues.filter(it => !!it);
                        const members = R.compose(R.uniq, filterNotEmpty, get_assigned_to_name)(issues);

                        return <div style={{flex: 1, display: 'flex', flexDirection: 'row', width: '100%'}}>
                            <MemberFilter data={members} onFilter={(it) => this.onFilter(it)}/>
                            <div style={{height: '100%', width: '100%', overflowY: 'scroll'}}>
                                <Gantt columns={columns} rows={rows} onSelect={(i) => this.onSelect(i)}/>
                            </div>
                            <Issue data={this.state.issue}/>
                        </div>

                    }}
                </Query>

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
        this.setState({filter: it});
        this.forceUpdate()
    }
}

export default ProjectGantt;