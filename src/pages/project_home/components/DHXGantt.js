/*global gantt*/
import "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import React, {Component} from "react";

const data = {
    data: [
        {id: 1, text: "Task #1", start_date: "15-04-2017", duration: 3, progress: 0.6},
        {id: 2, text: "Task #2", start_date: "18-04-2017", duration: 3, progress: 0.4},
    ],
    links: [
        {id: 1, source: 1, target: 2, type: "0"},
    ],
};

export default class Gantt extends Component<any> {
    ganttContainer: any = null;

    componentDidMount() {
        (window ).gannt.init(this.ganttContainer);
        (window ).gannt.parse(this.props.tasks);
    }

    render() {
        return (
            <div ref={(input) => this.ganttContainer = input} style={{width: "100%", height: "100%"}}/>
        );
    }
}
