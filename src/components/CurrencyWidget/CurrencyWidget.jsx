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

    onResValueChange = (event) => {
        const { value } = event.target;
        const { resRate } = this.props;

        this.setState({
            currencyBase: this.roundToTwo(value / resRate),
            currencyRes: value,
        });
    }

    onCurrencySelect = (event) => {
        const { name, value } = event.target;
        const changedCurrency = {
            [name] : value,
        }
        this.props.onCurrencyChange(changedCurrency);
    }

    render() {
        const { currencyBase, currencyRes } = this.props;

        return (
            <form action="none">
                <h5>Конвертація</h5>
                <label >
                    <span>За чинним курсом НБУ </span>
                    <input type="number" name="currencyBase" onChange={this.onBaseValueChange} value={ this.state.currencyBase}/>
                </label>
                <select
                    name="currencyBase"
                    value={currencyBase}
                    onChange={this.onCurrencySelect}
                >
                    {this.props.currencies.map((currency) => {
                        return (<option value={currency} key={ currency }>{currency}</option>);
                    })}                   
                </select>
                <label >
                    <span> дорівнює </span>
                    <input type="number" name="currencyRes" onChange={this.onResValueChange} value={this.state.currencyRes}/>
                </label>
                <select
                    name="currencyRes"
                    value={currencyRes}
                    onChange={this.onCurrencySelect}
                >
                    {this.props.currencies.map((currency) => {
                        return (<option value={currency} key={ currency }>{currency}</option>);
                    })} 
                </select>
            </form>
        );
    }
}

CurrencyWidget.propTypes = {
    resRate: propTypes.number.isRequired,
    currencyBase: propTypes.string.isRequired,
    currencyRes: propTypes.string.isRequired,
    onCurrencyChange: propTypes.func,
    currencies: propTypes.arrayOf(propTypes.string).isRequired,
}