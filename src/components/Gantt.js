import React, {Component} from 'react';
import Chart from "react-google-charts";
import gql from "graphql-tag";
import {Query} from "react-apollo";

type P = {}
type S = {}

class Gantt extends Component<P, S> {
    render() {
        let {columns, rows} = this.props;

        return (

            <Chart
                chartType="Gantt"
                data={[columns, ...rows]}
                width="100%"
                height="100%"
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