// @flow
import _ from "lodash";
import moment from "moment";
import React, {Component} from "react";
import Chart from "react-google-charts";

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
    due_date?: string;
    start_date?: string;
    id: string;
}

type P = { data: any, onSelect: (issue: IGanttIssue) => any }

type S = {}

class Gantt extends Component <P, S> {
    chartEvents: [any];
    rows: any[] = [];

    constructor(props: any) {
        super(props);
        const {onSelect} = this.props;
        const that = this;
        this.chartEvents = [
            {
                eventName: "select",
                callback(options: any) {
                    if (onSelect) {
                        const chartWrapper = options.chartWrapper;
                        const chart = chartWrapper.getChart();
                        const selections = chart.getSelection();
                        const selection = selections[0];
                        const row = that.rows[selection.row];
                        const id = row[0];

                        onSelect(_.find(that.props.data, (it) => it.id === id));
                    }
                },
            },
        ];
        const rows = this.dataToRows();
        this.rows = rows;
        this.state = {data: [columns, ...rows]}
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        const rows = this.dataToRows(nextProps.data);
        this.rows = rows;
        this.state = {data: [columns, ...rows]}
    }

    dataToRows(data = this.props.data) {
        const issues: IGanttIssue[] = data;
        const exist = issues.filter((it) => !!it.start_date);
        const need = issues.filter((it) => !it.start_date);
        for (let i = 0; i < need.length; i++) {
            const max = _.maxBy(exist, (it) => moment(it.start_date).toDate());
            const max_date = (max || {start_date: moment(Date()).toString()}).start_date;
            const item = need[i];
            item.start_date = moment(max_date).add(1, "d").toString();
            exist.push(item);
        }
        exist.forEach((it) => {
            if (!it.due_date) {
                it.due_date = moment(it.start_date).add(5, "d").toString();
            }
        });
        const orderBy = _.orderBy(exist, ["start_date"]);
        return mapToRow(orderBy);
    }

    render() {

        return <Chart
            ref={"chart"}
            chartType="Gantt"
            data={this.state.data}
            width="100%"
            height="100%"
            options={{
                height: 2000,
            }}
            chartEvents={this.chartEvents}
            legendToggle
        />;
    }
}

export default Gantt;
