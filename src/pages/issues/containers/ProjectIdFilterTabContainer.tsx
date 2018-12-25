import {Tab, Tabs} from "@material-ui/core";
import {AccessTime, List} from "@material-ui/icons";
import React, {Component} from "react";
import {connect} from "react-redux";
import {IProject} from "../../../components/ProjectIdFilter";
import ProjectIdFilterContainer from "../../../containers/ProjectIdFilterContainer";
import ProjectIdRecentFilterContainer from "../../../containers/ProjectIdRecentFilterContainer";

class ProjectIdFilterTabContainer extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: 1,
        };
    }

    public handleChange(event: any, value: any) {
        this.setState({value});
    }

    public render() {
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
                    {value === 0 && <ProjectIdFilterContainer onFilter={(item: IProject[]) => this.onFilter(item)}/>}
                    {value === 1 && <ProjectIdRecentFilterContainer onFilter={(item: IProject[]) => this.onFilter(item)}/>}
                </div>
            </div>
        );
    }

    private onFilter(item: IProject[]) {
        this.props.recentMember(item[0]);
        return this.props.onFilter(item);
    }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({
    recentMember(item: IProject) {
        dispatch({type: "RECENT_PROJECT", payload: item});
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(ProjectIdFilterTabContainer);
