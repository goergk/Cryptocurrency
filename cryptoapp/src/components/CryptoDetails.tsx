import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Select, Typography } from 'antd';
import { useGetCryptoDetailsQuery } from '../services/cryptoApi';
import { CheckOutlined, DollarCircleOutlined, ExclamationCircleOutlined, FundOutlined, MoneyCollectOutlined, NumberOutlined, StopOutlined, ThunderboltOutlined, TrophyOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {

    const { coinId } = useParams<{ coinId: string }>();
    const [timePeriod, setTimePeriod] = useState('7d')
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);

    const cryptoDetails = data?.data?.coin;
    
    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    let stats: ({
        title: string;
        value: string;
        icon: JSX.Element;
    } | {
        title: string;
        value: number | undefined;
        icon: JSX.Element;
    })[] = []

    let genericStats: ({
        title: string;
        value: number | undefined;
        icon: JSX.Element;
    } | {
        title: string;
        value: JSX.Element;
        icon: JSX.Element;
    } | {
        title: string;
        value: string;
        icon: JSX.Element;
    })[] = []

    if (!isFetching){
        stats = [
            { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
            { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
            { title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <ThunderboltOutlined /> },
            { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
            { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails?.allTimeHigh?.price!)}`, icon: <TrophyOutlined /> },
          ];
        
          genericStats = [
            { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
            { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
            { title: 'Aprroved Supply', value: cryptoDetails?.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
            { title: 'Total Supply', value: `$ ${millify(cryptoDetails?.totalSupply!)}`, icon: <ExclamationCircleOutlined /> },
            { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails?.circulatingSupply!)}`, icon: <ExclamationCircleOutlined /> },
          ];
    }    

    if(isFetching){
        return (
            <>
                <Title level={2} className="heading">Loading...</ Title>                 
            </>
        )
    } else{
        return (
            <Col className="coin-detail-container">
                <Col className="coin-heading-container">
                    <Title level={2} className="coin-name">
                        {cryptoDetails?.name} ({cryptoDetails?.slug}) Price
                    </Title>
                    <p>
                        {cryptoDetails?.name} live price in US dollars.
                        View value statistics, market cap and supply.
                    </p>
                </Col>
                <Select 
                    defaultValue='7d'
                    className="select-timeperiod"
                    placeholder="Select Time Period"
                    onChange={(value) => setTimePeriod(value)}
                >
                    {time.map(date => (
                        <Option key={date} value={date}>
                            {date}
                        </ Option>
                    ))}
                </Select>
                {/* Line chart */}
                <Col className="stats-container">
                    <Col className="coin-value-statistics">
                        <Col className="coin-value-statistics-heading">
                            <Title level={3} className="coin-details-heading">
                                {cryptoDetails?.name} Value statistics
                            </Title>
                            <p>
                                An overview showing the stats of {cryptoDetails?.name}
                            </p>
                        </Col>
                        {stats.map(({ icon, title, value }) => (
                            <Col className="coin-stats">
                                <Col className="coin-stats-name">
                                    <Text>{icon}</Text>
                                    <Text>{title}</Text>
                                </Col>
                                <Text className="stats">
                                    {value}
                                </Text>
                            </Col>
                        ))}                    
                    </Col>

                    <Col className="other-stats-info">
                        <Col className="coin-value-statistics-heading">
                            <Title level={3} className="coin-details-heading">
                                Other statistics
                            </Title>
                            <p>
                                An overview showing the stats of all cryptocurrencies
                            </p>
                        </Col>
                        {genericStats.map(({ icon, title, value }) => (
                            <Col className="coin-stats">
                                <Col className="coin-stats-name">
                                    <Text>{icon}</Text>
                                    <Text>{title}</Text>
                                </Col>
                                <Text className="stats">
                                    {value}
                                </Text>
                            </Col>
                        ))}                    
                    </Col>
                </Col>

                <Col className="coin-desc-link">
                    <Row className="coin-desc">
                    <Title level={3} className="coin-details-heading">What is {cryptoDetails?.name}?</Title>
                    {HTMLReactParser(cryptoDetails?.description!)}
                    </Row>
                    <Col className="coin-links">
                    <Title level={3} className="coin-details-heading">{cryptoDetails?.name} Links</Title>
                    {cryptoDetails?.links?.map((link) => (
                        <Row className="coin-link" key={link.name}>
                        <Title level={5} className="link-name">{link.type}</Title>
                        <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
                        </Row>
                    ))}
                    </Col>
                </Col>
            </Col>
        )
    }
}

export default CryptoDetails;
