import Button from "@material-ui/core/es/Button/Button";
import gql from "graphql-tag";
import moment from "moment";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {Mutation} from "react-apollo";
import auth from "../auth";

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

class Issue extends Component<{ data: any }> {
    public static propTypes: { data: PropTypes.Validator<object>; };

    public render() {
        const {id = "", subject = "", assigned_to_name = "", start_date = "", due_date = ""} = this.props.data || {};
        const {api_host: host} = auth.getAuth();
        return (
            <div style={{width: 200, display: "flex", flexDirection: "column", alignItems: "start", alignContent: "start"}}>
                <div> id:{id}</div>
                <div>{subject}</div>
                <div>{assigned_to_name}</div>
                <div>{start_date}</div>
                <div>{due_date}</div>
                <a target="_blank" href={`${host}/issues/${id}`}>Open External</a>
                <Mutation mutation={TASK_UPDATE}>
                    {(task_update, {data}) => (
                        <Button onClick={
                            (e) => {
                                this.onClickDelay({e, task_update, amount: 1, unit: "d"});
                            }}>delay 1 day</Button>

                    )}
                </Mutation>
                <Mutation mutation={TASK_UPDATE}>
                    {(task_update, {data}) => (
                        <Button onClick={
                            (e) => {
                                this.onClickDelay({e, task_update, amount: 2, unit: "d"});
                            }}>delay 2 day</Button>

                    )}
                </Mutation>
                <Mutation mutation={TASK_UPDATE}>
                    {(task_update, {data}) => (
                        <Button onClick={
                            (e) => {
                                this.onClickDelay({e, task_update, amount: 3, unit: "d"});
                            }}>delay 3 day</Button>

                    )}
                </Mutation>
                <Mutation mutation={TASK_UPDATE}>
                    {(task_update, {data}) => (
                        <Button onClick={
                            (e) => {
                                this.onClickDelay({e, task_update, amount: 4, unit: "d"});
                            }}>delay 4 day</Button>

                    )}
                </Mutation>
                <Mutation mutation={TASK_UPDATE}>
                    {(task_update, {data}) => (
                        <Button onClick={
                            (e) => {
                                this.onClickDelay({e, task_update, amount: 5, unit: "d"});
                            }}>delay 5 day</Button>

                    )}
                </Mutation>
            </div>
        );
    }

    public onClickDelay(parameters: { e: any, task_update: any, amount: any, unit: any }) {
        const {e, task_update, amount, unit} = parameters;
        e.preventDefault();
        const {id = "", start_date = "", due_date = ""} = this.props.data || {};
        const new_start_date = moment(start_date).add(amount, unit).format("YYYY-MM-DD");
        const new_due_date = moment(due_date).add(amount, unit).format("YYYY-MM-DD");
        const variables = {
            issue_id: id,
            start_date: new_start_date,
            due_date: new_due_date,
        };
        task_update({variables});
    }
}

export default Issue;
