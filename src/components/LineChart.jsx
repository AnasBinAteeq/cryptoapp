import React from "react";
import { Row, Col, Typography } from "antd";
import { Line } from "react-chartjs-2";

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  // Push coin price and timestamp data into arrays
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
    );
  }

  // Define chart data
  // const data = {
  //   labels: coinTimestamp,
  //   datasets: [
  //     {
  //       label: "Price In USD",
  //       data: coinPrice,
  //       fill: false,
  //       backgroundColor: "#0071bd",
  //       borderColor: "#0071bd",
  //     },
  //   ],
  // };

  // Define chart options

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart{" "}
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      {/* Render Line chart */}
      {/* <Line data={data} /> */}
    </>
  );
};

export default LineChart;
