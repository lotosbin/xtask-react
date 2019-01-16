import {Button} from "@material-ui/core";
import React from "react";
export class LinkButton extends React.Component<any, any> {
    render() {
        return <Button {...this.props} {...{to: this.props.to} }/>;
    }
}
