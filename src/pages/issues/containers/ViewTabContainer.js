import {Tab, Tabs} from "@material-ui/core";
import {AccessTime, List, Schedule, ViewColumn} from "@material-ui/icons";
import React, {Component} from "react";
import {connect} from "react-redux";
import MemberIdFilterContainer from "../../../containers/MemberIdFilterContainer";
import MemberIdRecentFilterContainer from "../../../containers/MemberIdRecentFilterContainer";
import {IMember} from "../../../components/MemberIdFilter";
import AgileContainer from "./AgileContainer";
import IssueListContainer from "./IssueListContainer";
import GanttContainer from "./GanttContainer";

type P = {
    keyword?: string,
}

class ViewTabContainer extends Component<P, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: 0,
        };
    }

    handleChange(event: any, value: any) {
        this.setState({value});
    }

    render() {
        const {projectId: project_id, memberId: assigned_to_id, statusId: status_id, onClickItem, keyword} = this.props;
        const {value} = this.state;
        return (
            <div style={{display: "flex", flex: "0 0 1", flexDirection: "column"}}>
                <div style={{width: "100%"}}>
                    <Tabs value={value} onChange={this.handleChange.bind(this)} fullWidth>
                        <Tab icon={<List/>}/>
                        <Tab icon={<ViewColumn/>}/>
                        <Tab icon={<Schedule/>}/>
                    </Tabs>
                </div>
                <div style={{display: "flex", flex: "1 0 250px", overflowY: "scroll"}}>
                    <div style={{width: "100%", height: "100%", overflowX: "scroll"}}>
                        {value === 0 && <IssueListContainer projectId={project_id} memberId={assigned_to_id} statusId={status_id} keyword={keyword} onClickItem={onClickItem}/>}
                        {value === 1 && <AgileContainer projectId={project_id} memberId={assigned_to_id} statusId={status_id} keyword={keyword} onClickItem={onClickItem}/>}
                        {value === 2 && <GanttContainer projectId={project_id} memberId={assigned_to_id} statusId={status_id} keyword={keyword} onClickItem={onClickItem}/>}
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewTabContainer;
