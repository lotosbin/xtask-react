import moment from "moment";
import React, {Component} from "react";
import Chart from "react-google-charts";

const options = {
    height: 2000,
};

function daysToMilliseconds(days: any) {
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
    {type: "string", label: "Dependencies"},
];
const mapToRow = (issues: any) => issues.map((it: any) => {
    const start_date = moment(it.start_date).toDate() || new Date(2015, 0, 1);
    const due_date = moment(it.due_date).toDate() || moment(start_date).add(1, "d").toDate();
    const issue_id = it.id;
    const relation = it.relations && it.relations.length ? (it.relations || []).filter((it: any) => it.issue_to_id !== issue_id).map((it: any) => it.issue_to_id).join(",") : null;
    return [
        `${it.id}`,
        it.subject,
        it.assigned_to_name,
        start_date,
        due_date,
        null,
        100,
        null,
    ];
});

export interface IGanttIssue {
    id: string;
}

class Gantt extends Component <{ data: any, onSelect: (issue: IGanttIssue) => any }> {
    private readonly chartEvents: [any];

    constructor(props: any) {
        super(props);
        const {onSelect} = this.props;
        this.chartEvents = [
            {
                eventName: "select",
                callback(chartWrapper: any) {
                    if (onSelect) {
                        const selection = chartWrapper.getChart().getSelection();
                        const issue = props.data[selection[0].row];
                        onSelect(issue);
                    }
                },
            },
        ];
    }

    public render() {
        const {data: issues} = this.props;
        const rows = mapToRow(issues);
        return <Chart
            chartType="Gantt"
            data={[columns, ...rows]}
            width="100%"
            height="100%"
            options={options}
            chartEvents={this.chartEvents}
            legendToggle
        />;
    }
}

export default Gantt;
