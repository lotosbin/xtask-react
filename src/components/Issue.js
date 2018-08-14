import React, {Component} from 'react';
import auth from "../auth";
import Button from "@material-ui/core/es/Button/Button";
import moment from "moment";

type P = {}
type S = {}

class Issue extends Component<P, S> {
    render() {
        let {id, subject, assigned_to_name, start_date, due_date} = this.props.data || {};
        let {api_host: host} = auth.getAuth();
        return (
            <div style={{width: 200, display: 'flex', flexDirection: 'column', alignItems: 'start', alignContent: 'start'}}>
                <div> id:{id}</div>
                <div>{subject}</div>
                <div>{assigned_to_name}</div>
                <div>{start_date}</div>
                <div>{due_date}</div>
                <a target="_blank" href={`${host}/issues/${id}`}>Open External</a>
                <Button onClick={e => this.onClickDelay(e, "1d")}>delay 1 day</Button>
            </div>
        );
    }

    onClickDelay(e, s) {
        let {id, subject, assigned_to_name, start_date, due_date} = this.props.data || {};
        let new_start_date = moment(start_date).add(s).toString('yyyy-MM-dd')
        let new_due_date = moment(due_date).add(s).toString('yyyy-MM-dd')
    }
}

export default Issue;