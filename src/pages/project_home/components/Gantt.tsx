import moment from "moment";
import React, {Component} from "react";
import DHXGantt from "./DHXGantt";

const datasample = {
    data: [
        {id: 1, text: "Task #1", start_date: "15-04-2017", duration: 3, progress: 0.6},
        {id: 2, text: "Task #2", start_date: "18-04-2017", duration: 3, progress: 0.4},
    ],
    links: [
        {id: 1, source: 1, target: 2, type: "0"},
    ],
};

export interface IGanttIssue {
    id: string;
    subject: string;
    assigned_to_name: string;
    start_date: string;
    due_date: string;
}

class Gantt extends Component<{ data: [IGanttIssue] }, {}> {
    public render() {
        const {data} = this.props;
        const issues = {
            data: data.map((it) => ({id: it.id, text: it.subject, start_date: moment(it.start_date).toString(), duration: 3, progress: 0.6})),
        };
        return (
            <DHXGantt tasks={issues}/>
        );
    }
}

export default Gantt;
