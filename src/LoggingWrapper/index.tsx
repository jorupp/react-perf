import * as React from 'react';

export default class LoggingWrapper extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }
    public render() {
        console.log("Rendering LoggingWrapper");
        return <div>{this.props.children}</div>;
    }
}