import React, { useState } from "react";
import { Select, Typography, Row, Col, Card, Avatar } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImageUrl = "https://dummyimage.com/600x400/a4a5ab/ffffff.jpg&text=Cryptocurrency+News"

const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState("Cryptocurrency")
    const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 10 })
    const { data: cryptos } = useGetCryptosQuery(100)

    if (isFetching) return 'Loading...'
    return (
        <>
            {!simplified && (
                <Select
                    showSearch
                    className="select-news"
                    placeholder="Select a Crypto"
                    optionFilterProp="children"
                    onChange={(value) => setNewsCategory(value)}
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    <Option value="Cryptocurency">Cryptocurrency</Option>
                    {cryptos?.data?.coins?.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}
                </Select>
            )}
            <Row gutter={[24, 24]}>
                {cryptoNews.news.map((news, i) => (
                    <Col xs={24} sm={12} lg={8} key={i}>
                        <Card hoverable className="news-card">
                            <a href={news.Url} target="_blank" rel="noreferrer">
                                <div className="news-image-container">
                                    <Title className="news-title" level={4}><span className="truncate-text">{news.Title}</span></Title>
                                    <img src={news?.Image || demoImageUrl} />
                                </div>
                                <p className="news-description">
                                    {news.Summary.length > 300 ? `${news.Summary.substring(0, 300)} ...` : news.Summary}
                                </p>
                                <div className="provider-container">
                                    <Text className="privder-name">{news.Source}</Text>
                                    <Text>{moment(news.PublishedOn).startOf('ss').fromNow()}</Text>
                                </div>
                            </a>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default News;