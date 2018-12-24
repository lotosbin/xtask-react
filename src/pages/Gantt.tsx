import gql from "graphql-tag";
import React, {Component} from "react";
import {Query} from "react-apollo";
import GanttComponent from "../components/Gantt";
import Issue from "../components/Issue";
import MemberIdFilterContainer from "../containers/MemberIdFilterContainer";
import StatusFilterContainer from "../containers/StatusFilterContainer";

class Gantt extends Component<any, any> {
    private data: any[];

    constructor(props: any) {
        super(props);
        this.state = {
            filter: [],
            status: [],
            data: [],
            issue: {},
        };
        this.data = [];
    }

    public render() {
        const {match} = this.props;
        return (
            <div style={{flex: 1, display: "flex"}}>
                <div style={{flex: 1, display: "flex", flexDirection: "row"}}>
                    <MemberIdFilterContainer onFilter={(item: any) => this.onFilter(item)}/>
                    <StatusFilterContainer onFilter={(item: any) => this.onStatusFilter(item)}/>
                    <Query query={gql`query Issues($assigned_to_id:String) {
    issues(assigned_to_id:$assigned_to_id,limit:500){
        id
        assigned_to_name
        subject
        start_date
        due_date
        relations{
            relation_type
            issue_to_id
        }
        status{
            id
            name
        }
    }
}
        `}
                           variables={{assigned_to_id: (this.state.filter || {}).id}}
                    >
                        {({loading, error, data}) => {
                            if (loading) {
                                return <p>Loading...</p>;
                            }
                            if (error) {
                                return <p>Error :(</p>;
                            }
                            const statusFilterId = (this.state.status || {}).id;
                            const issues = (data.issues || [])
                                .filter((it: { status: { id: any; }; }) => !statusFilterId || it.status.id === statusFilterId)
                                .map((it: { subject: any; status: any; }) => ({
                                    ...it,
                                    subject: `${it.subject}[${(it.status || {}).name}]`,
                                }));
                            this.data = issues;
                            return <div style={{height: "100%", overflowY: "scroll", flex: 1}}>
                                <GanttComponent data={issues} onSelect={(i: any) => this.onSelect(i)}/>
                            </div>;
                        }}
                    </Query>
                    <Issue data={this.state.issue}/>
                </div>
            </div>
        );
    }

    public onSelect(i: Array<{ row: any }>) {
        const issue = this.data[i[0].row];
        this.setState({issue});
    }

    public onFilter(it: any[]) {
        if (it && it.length > 0) {
            this.setState({filter: it[0]});
        } else {
            this.setState({filter: null});
        }
        this.forceUpdate();
    }

    public onStatusFilter(it: any[]) {
        if (it && it.length > 0) {
            this.setState({status: it[0]});
        } else {
            this.setState({status: null});
        }
        this.forceUpdate();
    }
}

export default Gantt;
