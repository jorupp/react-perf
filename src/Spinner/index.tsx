import * as React from 'react';

import './index.scss';

export interface SpinnerProps {
    startNumber: number;
    endNumber: number;
    fullNumber?: number;
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
        const pct = Math.ceil(this.state.currentNumber / (this.props.fullNumber || 100) * 100);
        return (
            <div className="spinner">
                <div className="number">{number}</div>
                <svg className="graph">
                    <linearGradient id="gradient1">
                        <stop offset="0%" className="gradient-50"></stop>
                        <stop offset="100%" className="gradient-100"></stop>
                    </linearGradient>
                    <linearGradient id="gradient2">
                        <stop offset="0%" className="gradient-50"></stop>
                        <stop offset="100%" className="gradient-0"></stop>
                    </linearGradient>

                    <circle className={"circle1 fill-" + pct }/>
                    <circle className={"circle2 fill-" + pct }/>
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