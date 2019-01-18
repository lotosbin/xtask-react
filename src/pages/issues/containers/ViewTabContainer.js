import {Tab, Tabs} from "@material-ui/core";
import {AccessTime, Close, List, Schedule, ViewColumn} from "@material-ui/icons";
import React, {Component} from "react";
import {connect} from "react-redux";
import MemberIdFilterContainer from "../../../containers/MemberIdFilterContainer";
import MemberIdRecentFilterContainer from "../../../containers/MemberIdRecentFilterContainer";
import {IMember} from "../../../components/MemberIdFilter";
import AgileContainer from "./AgileContainer";
import IssueListContainer from "./IssueListContainer";
import GanttContainer from "./GanttContainer";
import IconButton from "@material-ui/core/IconButton";

type P = {
    keyword?: string,
    onClose?: (hidden: boolean)=>{}
}
type S = {
    hidden: boolean
}

class ViewTabContainer extends Component<P, S> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: 0,
            hidden: false
        };
    }

    handleChange = (event: any, value: any) => {
        this.setState({
            value,
        });
        this.toggle(false)
    };

    handleClose = () => {
        let hidden = !this.state.hidden;
        this.toggle(hidden);
    };

    toggle(hidden) {
        this.props.onClose && this.props.onClose(hidden);
        this.setState({hidden: hidden})
    }
    render() {
        const {projectId: project_id, memberId: assigned_to_id, statusId: status_id, onClickItem, keyword} = this.props;
        const {value} = this.state;
        return (
            <div style={{display: "flex", flex: "0 0 1", flexDirection: "column"}}>
                <div style={{width: "100%", display: "flex", flex: "0 0 1", flexDirection: "row", justifyContent: 'flex-end'}}>
                    <Tabs value={value} onChange={this.handleChange}>
                        <Tab icon={<List/>}/>
                        <Tab icon={<ViewColumn/>}/>
                        <Tab icon={<Schedule/>}/>
                    </Tabs>
                    <IconButton>
                        <Close onClick={this.handleClose}/>
                    </IconButton>
                </div>
                {!this.state.hidden && <div style={{display: "flex", flex: "1 0 250px", overflowY: "scroll"}}>
                    <div style={{width: "100%", height: "100%", overflowX: "scroll"}}>
                        {value === 0 && <IssueListContainer projectId={project_id} memberId={assigned_to_id} statusId={status_id} keyword={keyword} onClickItem={onClickItem}/>}
                        {value === 1 && <AgileContainer projectId={project_id} memberId={assigned_to_id} statusId={status_id} keyword={keyword} onClickItem={onClickItem}/>}
                        {value === 2 && <GanttContainer projectId={project_id} memberId={assigned_to_id} statusId={status_id} keyword={keyword} onClickItem={onClickItem}/>}
                    </div>
                </div>}
            </div>
        );
    }
}

export default ViewTabContainer;
