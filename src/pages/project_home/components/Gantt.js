import moment from "moment";
import React, {Component} from "react";
import DHXGantt from "./DHXGantt";
export interface IGanttIssue {
    id: string;
    subject: string;
    assigned_to_name: string;
    start_date: string;
    due_date: string;
}

class Gantt extends Component<{ data: [IGanttIssue] }, {}> {
    render() {
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
