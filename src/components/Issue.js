import React, {Component} from 'react';
import auth from "../auth";
import Button from "@material-ui/core/es/Button/Button";
import moment from "moment";
import gql from "graphql-tag";
import {Mutation} from "react-apollo";

type P = {}
type S = {}
const TASK_UPDATE = gql`
    mutation TaskUpdate($issue_id: String!,$start_date:String!,$due_date:String!) {
        task_update(issue_id: $issue_id,start_date:$start_date,due_date:$due_date) {
            id
            subject
            start_date
            due_date
        }
    }
`;
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
                <Mutation mutation={TASK_UPDATE}>
                    {(task_update, {data}) => (
                        <Button onClick={
                            e => {
                                this.onClickDelay(e, task_update, 1, 'd');
                            }}>delay 1 day</Button>

                    )}
                </Mutation>
                <Mutation mutation={TASK_UPDATE}>
                    {(task_update, {data}) => (
                        <Button onClick={
                            e => {
                                this.onClickDelay(e, task_update, 2, 'd');
                            }}>delay 2 day</Button>

                    )}
                </Mutation>
                <Mutation mutation={TASK_UPDATE}>
                    {(task_update, {data}) => (
                        <Button onClick={
                            e => {
                                this.onClickDelay(e, task_update, 3, 'd');
                            }}>delay 3 day</Button>

                    )}
                </Mutation>
                <Mutation mutation={TASK_UPDATE}>
                    {(task_update, {data}) => (
                        <Button onClick={
                            e => {
                                this.onClickDelay(e, task_update, 4, 'd');
                            }}>delay 4 day</Button>

                    )}
                </Mutation>
                <Mutation mutation={TASK_UPDATE}>
                    {(task_update, {data}) => (
                        <Button onClick={
                            e => {
                                this.onClickDelay(e, task_update, 5, 'd');
                            }}>delay 5 day</Button>

                    )}
                </Mutation>
            </div>
        );
    }

    onClickDelay(e, task_update, amount, unit) {
        e.preventDefault();
        let {id, start_date, due_date} = this.props.data || {};
        let new_start_date = moment(start_date).add(amount, unit).format('YYYY-MM-DD');
        let new_due_date = moment(due_date).add(amount, unit).format('YYYY-MM-DD');
        let variables = {
            issue_id: id,
            start_date: new_start_date,
            due_date: new_due_date,
        };
        task_update({variables: variables});
    }
}

export default Issue;