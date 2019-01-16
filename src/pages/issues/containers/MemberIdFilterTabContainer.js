import {Tab, Tabs} from "@material-ui/core";
import {AccessTime, List} from "@material-ui/icons";
import React, {Component} from "react";
import {connect} from "react-redux";
import MemberIdFilterContainer from "../../../containers/MemberIdFilterContainer";
import MemberIdRecentFilterContainer from "../../../containers/MemberIdRecentFilterContainer";
import {IMember} from "../../../components/MemberIdFilter";

class MemberIdFilterTabContainer extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: 1,
        };
    }

    handleChange(event: any, value: any) {
        this.setState({value});
    }

    render() {
        const {value} = this.state;
        return (
            <div style={{display: "flex", flex: "0 0 250px", flexDirection: "column"}}>
                <div style={{width: "250px"}}>
                    <Tabs value={value} onChange={this.handleChange.bind(this)} fullWidth>
                        <Tab icon={<List/>}/>
                        <Tab icon={<AccessTime/>}/>
                    </Tabs>
                </div>
                <div style={{display: "flex", flex: "1 0 250px", overflowY: "scroll"}}>
                    {value === 0 && <MemberIdFilterContainer onFilter={(item: IMember[]) => this.onFilter(item)}/>}
                    {value === 1 && <MemberIdRecentFilterContainer onFilter={(item: IMember[]) => this.onFilter(item)}/>}
                </div>
            </div>
        );
    }

    onFilter(item: IMember[]) {
        this.props.recentMember(item[0]);
        return this.props.onFilter(item);
    }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({
    recentMember(item: IMember) {
        dispatch({type: "RECENT_MEMBER", payload: item});
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(MemberIdFilterTabContainer);
