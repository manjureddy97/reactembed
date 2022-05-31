import React from "react";
import { render } from "react-dom";
import moment from "moment";
import { CRYPTO_COMPARE } from "../keys";
import { TradingViewEmbed, widgetType } from "react-tradingview-embed";

import {
  XYPlot,
  Hint,
  LineSeries,
  FlexibleXYPlot,
  VerticalBarSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  AreaSeries,
} from "react-vis";

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    times: [],
    high: [],
    low: [],
    chartData: [],
    query: "BTC",
    leaderboard: [],
    addressData: "",
    symbol: "",
  };

  componentDidMount() {
    this.loadChartData();
  }

  loadChartData = async () => {
    const URL =
      "https://api.tradehorn.com/trade/chart/history?symbol=TRX%2FBTC&resolution=15&from=1653618456&to=1653627456";
    // const URL = `https://min-api.cryptocompare.com/data/blockchain/histo/day?fsym=${this.state.query}&api_key=${CRYPTO_COMPARE}&limit=30`

    const response = await fetch(URL);
    const data = await response.json();
    // const bulkData = data.Data.Data;
    const bulkData = data;
    console.log({ bulkData });
    // const dataArray = [];
    // {

    //   bulkData.map((y) =>
    //     dataArray.push({
    //       x: y.time * 1000,
    //       y: y.transaction_count * y.average_transaction_value,
    //     })
    //   );
    // }
    // this.setState({ chartData: dataArray });
    // this.setState({ symbol: this.state.query });
  };

  handleInputChange = () => {
    this.setState({
      query: this.search.value,
    });
  };
  render() {
    const { chartData, query, addressData, symbol } = this.state;

    return (
      <div>
        <div className="inputDiv">
          <input
            placeholder="Search for a symbol"
            ref={(input) => (this.search = input)}
            onChange={this.handleInputChange}
            className="dataRequest"
          />
          <button onClick={this.loadChartData} className="dataRequest">
            Load Onchain Data
          </button>
        </div>
        <div className="charty">
          {query.length > 2 ? (
            <TradingViewEmbed
              widgetType={widgetType.ADVANCED_CHART}
              widgetConfig={{
                interval: "1D",
                colorTheme: "dark",
                width: "100%",
                symbol: query + "USD",
                studies: [
                  "MACD@tv-basicstudies",
                  "StochasticRSI@tv-basicstudies",
                  "TripleEMA@tv-basicstudies",
                ],
              }}
            />
          ) : (
            "BTCUSD"
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard;
