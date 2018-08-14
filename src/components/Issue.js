import React, {Component} from 'react';
import auth from "../auth";

type P = {}
type S = {}

class Issue extends Component<P, S> {
    render() {
        let {id, subject, assigned_to_name} = this.props.data || {};
        let {api_host: host} = auth.getAuth();
        return (
            <div style={{width: 200, display: 'flex', flexDirection: 'column', alignItems: 'start', alignContent: 'start'}}>
                <div> id:{id}</div>
                <div>{subject}</div>
                <div>{assigned_to_name}</div>
                <a target="_blank" href={`${host}/issues/${id}`}>Open External</a>
            </div>
        );
    }
}

export default Issue;