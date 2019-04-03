import * as React from 'react';

import './index.scss';

export interface SpinnerProps {
    startNumber: number;
    endNumber: number;
    increment: number;
    speed: number;
    precision?: number;
}

interface SpinnerState {
    currentNumber: number;
}

export default class Spinner extends React.Component<SpinnerProps, SpinnerState> {
    private timeout?: number;
    constructor(props: SpinnerProps) {
        super(props);
        this.state = {
            currentNumber: props.startNumber,
        };
    }

    public componentDidMount() {
        this.start();
    }

    public componentDidUpdate(prevProps: SpinnerProps) {
        if (this.props.startNumber !== prevProps.startNumber || this.props.endNumber !== prevProps.endNumber || this.props.increment !== prevProps.increment || this.props.speed !== prevProps.speed) {
            this.start();            
        }
    }

    public render() {
        const number = this.props.precision === undefined ? this.state.currentNumber : this.state.currentNumber.toFixed(this.props.precision);
        return (
            <div className="spinner">
                <div className="number">{number}</div>
                <svg className="graph">
                    <linearGradient id="gradient1">
                        <stop offset="0%"></stop>
                        <stop offset="100%"></stop>
                    </linearGradient>
                    <linearGradient id="gradient2">
                        <stop offset="0%"></stop>
                        <stop offset="100%"></stop>
                    </linearGradient>

                    <circle className={"circle1 fill-" + this.state.currentNumber.toFixed(0) }/>
                    <circle className={"circle2 fill-" + this.state.currentNumber.toFixed(0) }/>
                </svg>
            </div>
        );
    }

    private start = () => {
        if (this.timeout) {
            window.clearTimeout(this.timeout);
        }
        this.setState({
            currentNumber: this.props.startNumber,
        }, this.queueIncrement);
    }

    private doIncrement = () => {
        if (this.props.increment > 0 && this.state.currentNumber >= this.props.endNumber) {
            return;
        }
        if (this.props.increment < 0 && this.state.currentNumber <= this.props.endNumber) {
            return;
        }
        if (this.props.increment === 0) {
            return;
        }

        this.setState({
            currentNumber: this.props.increment > 0 
                ? Math.min(this.state.currentNumber + this.props.increment, this.props.endNumber)
                : Math.max(this.state.currentNumber + this.props.increment, this.props.endNumber)
        }, this.queueIncrement)
    }

    private queueIncrement = () => {
        this.timeout = window.setTimeout(this.doIncrement, this.props.speed);
    }
}