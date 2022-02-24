import React, {Component} from "react";

import CurrencyHeader from "./CurrencyHeader";
import CurrencyWidget from "./CurrencyWidget";

export default class App extends Component {
  static CURRENCY_CODES = [
    "HRN",
    "USD",
    "EUR",
  ]
  //   hrn: "HRN",
  //   usd: "USD",
  //   eur: "EUR",
  // }

  constructor() {
    super();

    this.state = {
      exchangeRates: null,
      currencyBase: App.CURRENCY_CODES[1],
      currencyRes: App.CURRENCY_CODES[0],
    }
  }

  async componentDidMount() {
    try {
      const responseNBU = await fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json");
      const exchangeRates = await responseNBU.json();
      const exchangeRatesSlice = exchangeRates.filter((currency) => {
        return App.CURRENCY_CODES.includes(currency.cc);
      });
      this.setState({ exchangeRates: exchangeRatesSlice });
    } catch (error) {
      console.log(error);
    }
  }

  setCurrencyExchange = (changedCurrency) => {
    const newCurrencies = { ...changedCurrency };

    //if we change to currency that is already active in another select, switch select values
    const secondCurrencyName = Object.keys(changedCurrency).includes("currencyBase") ? "currencyRes" : "currencyBase";
    
    if (this.state[secondCurrencyName] === Object.values(changedCurrency)[0]) { 
      newCurrencies[secondCurrencyName] = this.state[Object.keys(changedCurrency)[0]];
    }

    this.setState(newCurrencies);
  }

  getRate = (currencyCode) => {
    if (currencyCode === "HRN" || !this.state.exchangeRates) {
      return 1;
    }

    return this.state.exchangeRates.find((currency) => {
        return currency.cc === currencyCode
      }).rate;
  }

  getCurrentRate = () => {
    const baseRate = this.getRate(this.state.currencyBase);
    const resRate = this.getRate(this.state.currencyRes);

    return (baseRate / resRate);
  }

  render() {
    const rateUSD = this.getRate("USD");
    const rateEUR = this.getRate("EUR");
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
          { this.state.exchangeRates &&
          <>
            <p>1 USD = {rateUSD} HRN</p>
            <p>1 EUR = {rateEUR} HRN</p>
          </>
          } 
        </CurrencyHeader>
        <CurrencyWidget
          resRate={this.getCurrentRate()}
          currencyBase={this.state.currencyBase}
          currencyRes={this.state.currencyRes}
          onCurrencyChange={this.setCurrencyExchange}
          currencies={App.CURRENCY_CODES} />
      </div>
    );
  };
}