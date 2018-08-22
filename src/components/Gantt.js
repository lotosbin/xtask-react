// @flow
import React, {Component} from 'react';
import Chart from "react-google-charts";
import moment from "moment";
import PropTypes from 'prop-types';

type P = {}
type S = {}
const options = {
    height: 2000,
};

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

class Gantt extends Component<P, S> {
    // noinspection JSUnusedGlobalSymbols
    static propsType = {
        data: PropTypes.array.isRequired,
    };


    constructor(props: P) {
        super(props);
        let {onSelect} = this.props;
        this.chartEvents = [
            {
                eventName: "select",
                callback(chartWrapper) {
                    console.log("Selected ", chartWrapper.getChart().getSelection());
                    if (onSelect) onSelect(chartWrapper.getChart().getSelection());
                }
            }
        ];
    }

    render() {
        let {data: issues} = this.props;
        let rows = mapToRow(issues);
        console.dir(rows);

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