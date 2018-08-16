import React from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";

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

const Projects = (props) => {
    const {classes} = props;

    return (
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

                return <div className={classes.card_container}>
                    {data.projects.map(({id, name, description}) => (
                        <Card key={id} className={classes.card}>
                            <CardContent>
                                <Typography variant="headline" component="h2">
                                    {id}:{name}
                                </Typography>
                                <Typography component="p">
                                    {description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" component={Link} to={`/project/${id}`}>Detail</Button>
                                <Button size="small" component={Link} to={`/project/${id}/gantt`}>Gantt</Button>
                                <Button size="small" component={Link} to={`/project/${id}/agile`}>Agile</Button>
                            </CardActions>
                        </Card>
                    ))}
                </div>;
            }}
        </Query>
    );
};
Projects.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Projects);
;