import {Button} from "@material-ui/core";
import {ButtonProps} from "@material-ui/core/Button";
import * as H from "history";
import React from "react";

export interface ILinkButtonProps extends ButtonProps {
    to: H.LocationDescriptor;
}

export class LinkButton extends React.Component<any, any> {
    public render() {
        return <Button {...this.props} {...{to: this.props.to} as any}/>;
    }
}
