import Card from "../../node_modules/@material-ui/core/Card/Card";
import CardContent from "../../node_modules/@material-ui/core/CardContent/CardContent";
import Typography from "../../node_modules/@material-ui/core/Typography/Typography";
import CardActions from "../../node_modules/@material-ui/core/CardActions/CardActions";
import Button from "../../node_modules/@material-ui/core/Button/Button";
import {Link} from "react-router-dom";
import React from "react";
import {withStyles} from "@material-ui/core";

const styles = {
    card_container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflowY: 'scroll',
        minHeight: 0,
        height: '100%',
    },
    card: {
        width: 300,
        margin: 10,
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column',
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

let ProjectCardList = props => {
    const {classes, data: projects} = props;
    return <div className={classes.card_container}>
        {projects.map(({id, name, description}) => (
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
};
export default withStyles(styles)(ProjectCardList);