import React, {Component} from 'react';
import Chart from "react-google-charts";
import gql from "graphql-tag";
import {Query} from "react-apollo";

type P = {}
type S = {}
const options = {
    height: 2000,
};

class Gantt extends Component<P, S> {
    constructor(props) {
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
        let {columns, rows} = this.props;

        return (

            <Chart
                chartType="Gantt"
                data={[columns, ...rows]}
                width="100%"
                height="100%"
                options={options}
                chartEvents={this.chartEvents}
                legendToggle
            />
        );
    }
}

Gantt.propsType = {
    columns: Array,
    rows: Array,
};

export default Gantt;