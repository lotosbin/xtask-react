// @flow
import {withStyles} from "@material-ui/core/styles";
import React from "react";
import TextField from "@material-ui/core/TextField";
import _ from "lodash";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
});

export interface IStatus {
    id: any;
    name?: any;
}

interface IStatusFilterProps {
    data: IStatus[];
    mode?: "single";
    onFilter: (keyword: string)=>{};
    classes?: any;
}

class KeywordFilter extends React.Component<IStatusFilterProps> {
    state = {
        keyword: '',
    };

    constructor(props) {
        super(props);
        let {onFilter} = this.props;
        this.filter = _.debounce((keyword) => {
            console.log(`debounce`);
            onFilter(keyword)
        }, 200);
    }


    handleChange = name => event => {
        let keyword = event.target.value;
        this.setState({
            [name]: keyword,
        });
        this.filter(keyword)
    };

    render() {
        const {classes} = this.props;

        return (
            <TextField
                id="outlined-name"
                label="Keyword"
                className={classes.textField}
                value={this.state.keyword}
                onChange={this.handleChange('keyword')}
                margin="normal"
                variant="outlined"
            />
        );
    }
}

export default withStyles(styles)(KeywordFilter);
