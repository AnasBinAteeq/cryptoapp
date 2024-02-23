import React, { useState } from "react";
import millify from "millify";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import Loader from "./Loader";
import LineChart from "./LineChart";

const { Text, Title } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });

  if (isFetching) return <Loader/>;
  const cryptoDetails = data?.data?.coin;
  console.log(timePeriod);
  console.log(coinHistory);

  const time = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails["24hVolume"] && millify(cryptoDetails["24hVolume"])
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <>
      <Col className="coin-detail-container">
        <Col className="coin-heading-container">
          <Title level={2} className="coin-name">
            {cryptoDetails.name}
          </Title>
          <p>
            {cryptoDetails.name} live price in US Dollars. View value
            statistics, market cap and supply.
          </p>
        </Col>

        <Select
          defaultValue="7d"
          className="select-timeperiod"
          placeholder="Select time period"
          onChange={(value) => setTimePeriod(value)}
        >
          {time.map((date) => (
            <Option key={date}>{date}</Option>
          ))}
        </Select>
        <LineChart
          coinHistory={coinHistory}
          currentPrice={millify(cryptoDetails?.price)}
          coinName={cryptoDetails.name}
        />
        <Col className="stats-container">
          <Col className="coin-value-statistics">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">
                {cryptoDetails.name} Value Statistics
              </Title>
              <p>
                An overview showing the statistics of {cryptoDetails.name}, such
                as the base and quote currency, the rank, and trading volume.
              </p>
              {stats.map(({ icon, title, value }) => (
                <Col className="coin-stats">
                  <Col className="coin-stats-name">
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                    <Text className="stats">{value}</Text>
                  </Col>
                </Col>
              ))}
            </Col>
          </Col>

          <Col className="other-stats-info">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">
                Other Statistics
              </Title>
              <p>An overview showing the statistics of all Cryptocurrencies.</p>
              {genericStats.map(({ icon, title, value }) => (
                <Col className="coin-stats">
                  <Col className="coin-stats-name">
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                    <Text className="stats">{value}</Text>
                  </Col>
                </Col>
              ))}
            </Col>
          </Col>
        </Col>

        <Col className="coin-desc-link">
          <Row className="coin-desc">
            <Title level={3} className="coin-details-heading">
              What is {cryptoDetails.name} ?
              <p>{HTMLReactParser(cryptoDetails.description)}</p>
            </Title>
          </Row>
          <Col className="coin-links">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Links
            </Title>
            {cryptoDetails.links.map((link) => (
              <Row className="coin-link" key={link.name}>
                <Title level={5} className="link-name">
                  {link.type}
                </Title>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
              </Row>
            ))}
          </Col>
        </Col>
      </Col>
    </>
  );
};

export default CryptoDetails;
