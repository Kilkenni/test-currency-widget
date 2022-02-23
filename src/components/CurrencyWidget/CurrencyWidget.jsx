import React, { Component } from "react";
import propTypes from "prop-types";

export default class CurrencyWidget extends Component {
    constructor() {
        super();

        this.state = {
            currencyBase: 0,
            currencyRes: 0,
        };
    }

    // onAmountChange = (event) => {
    //     // console.log(event.target.name);
    //     const { name, value } = event.target;
    //     this.setState({
    //         [name]: value,
    //     });
    // }

    roundToTwo = (floatNumber) => {
        return Math.round((floatNumber + Number.EPSILON) * 100) / 100;
    }

    onBaseValueChange = (event) => {
        const { value } = event.target;
        const { resRate } = this.props;

        this.setState({
            currencyBase: value,
            currencyRes: this.roundToTwo(value * resRate),
        });
    }

    onResChangeValue = (event) => {
    }

    render() {
        return (
            <form action="none">
                <h5>Currency conversion</h5>
                <p>USD to UAH</p>
                <label >
                    Base currency:
                    <input type="number" name="currencyBase" onChange={this.onBaseValueChange} value={ this.state.currencyBase}/>
                </label>
                <label >
                    Result:
                    <input type="number" name="currencyRes" onChange={this.onResChangeValue} value={this.state.currencyRes}/>
                </label>
            </form>
        );
    }
}

CurrencyWidget.propTypes = {
    resRate: propTypes.number.isRequired,
}