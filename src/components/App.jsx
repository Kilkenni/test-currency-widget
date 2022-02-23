import React, {Component} from "react";

import CurrencyHeader from "./CurrencyHeader";
import CurrencyWidget from "./CurrencyWidget";

export default class App extends Component {
  static CURRENCY_CODES = {
    hrn: "HRN",
    usd: "USD",
    eur: "EUR",
  }

  constructor() {
    super();

    this.state = {
      exchangeRates: null,
      currencyBase: App.CURRENCY_CODES.hrn,
      currencyRes: App.CURRENCY_CODES.usd,
    }
  }

  async componentDidMount() {
    try {
      const responseNBU = await fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json");
      const exchangeRates = await responseNBU.json();
      const exchangeRatesSlice = exchangeRates.filter((currency) => {
        return Object.values(App.CURRENCY_CODES).includes(currency.cc);
      });
      this.setState({ exchangeRates: exchangeRatesSlice });
    } catch (error) {
      console.log(error);
    }
  }

  setCurrencyExchange = (curBase, curRes) => {
    this.setState({
      currencyBase: curBase,
      currencyRes: curRes,
    });
  }

  render() {
    const rateUSD = this.state.exchangeRates ?
      this.state.exchangeRates.find((currency) => { return currency.cc === App.CURRENCY_CODES.usd }).rate :
      1;
    const rateEUR = this.state.exchangeRates ?
      this.state.exchangeRates.find((currency) => { return currency.cc === App.CURRENCY_CODES.eur }).rate :
      1;
    //console.log(this.state.exchangeRates);

    return (
      <div
        style={{
          height: '100vh',
          fontSize: 20,
          color: '#010101',
        }}
      >
        <CurrencyHeader>
          <p>1 USD = {rateUSD} HRN</p>
          <p>1 EUR = {rateEUR} HRN</p>
        </CurrencyHeader>
        <CurrencyWidget resRate={ rateUSD}/>
      </div>
    );
  };
}