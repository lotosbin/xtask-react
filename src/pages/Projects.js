import React, {Component} from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ProjectCardList from "../components/ProjectCardList";
import ProjectList from "../components/ProjectList";
import _ from 'lodash';
import Button from "@material-ui/core/es/Button/Button";

const styles = {
    card_container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflowY: 'scroll',
    },
    card: {
        width: 300,
        margin: 10
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

class Projects extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'list'
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <div style={{height: '100%', minHeight: 0}}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <Button variant="contained" color={this.state.mode === 'list' ? "primary" : ""} onClick={event => this.setState({mode: 'list'})}>
                        List
                    </Button>
                    <Button variant="contained" color={this.state.mode === 'grid' ? "primary" : ""} onClick={event => this.setState({mode: 'grid'})}>
                        Grid
                    </Button>
                </div>
                <Query query={gql`
          {
            projects {
              id
              name
              description
            }
          }
        `}
                >
                    {({loading, error, data}) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error :(</p>;
                        let projects = _.orderBy(data.projects || [], ['id']);
                        return this.state.mode === 'grid' ? <ProjectCardList data={projects}/> : <ProjectList data={projects}/>;
                    }}
                </Query>
            </div>
        );
    }
}

Projects.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Projects);
;