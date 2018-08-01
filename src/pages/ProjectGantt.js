import React from "react";
import Gantt from "../components/Gantt";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import moment from "moment";

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
const ProjectGantt = ({match}) => (
    <div style={{flex: 1}}>
        <Query query={gql`
          query Project($id: String!) {
            projects(id:$id) {
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
                let rows = issues.map(it => {
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
                        relation
                    ]
                });
                console.dir(rows);
                return <Gantt columns={columns} rows={rows}/>
            }}
        </Query>

    </div>
);
export default ProjectGantt;