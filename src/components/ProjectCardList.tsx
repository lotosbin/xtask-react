import {withStyles} from "@material-ui/core";
import React from "react";
import {Link} from "react-router-dom";
import Button from "../../node_modules/@material-ui/core/Button/Button";
import Card from "../../node_modules/@material-ui/core/Card/Card";
import CardActions from "../../node_modules/@material-ui/core/CardActions/CardActions";
import CardContent from "../../node_modules/@material-ui/core/CardContent/CardContent";
import Typography from "../../node_modules/@material-ui/core/Typography/Typography";

const styles: any = {
    card_container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflowY: "scroll",
        minHeight: 0,
        height: "100%",
    },
    card: {
        width: 300,
        margin: 10,
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "column",
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

const ProjectCardList = (props: { classes?: any; data: any; }) => {
    const {classes, data: projects} = props;
    return <div className={classes.card_container}>
        {projects.map((project: { id: any, name: any, description: any }) => (
            <Card key={project.id} className={classes.card}>
                <CardContent>
                    <Typography variant="headline" component="h2">
                        {project.id}:{project.name}
                    </Typography>
                    <Typography component="p">
                        {project.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" component={Link} {...{to: `/project/${project.id}`} as any}>Detail</Button>
                    <Button size="small" component={Link} {...{to: `/project/${project.id}/gantt`} as any} >Gantt</Button>
                    <Button size="small" component={Link} {...{to: `/project/${project.id}/agile`} as any}>Agile</Button>
                </CardActions>
            </Card>
        ))}
    </div>;
};
export default withStyles(styles)(ProjectCardList);
