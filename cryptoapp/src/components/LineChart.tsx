import { Col, Row, Typography } from 'antd';
import { CoreChartOptions, DatasetChartOptions, ElementChartOptions, PluginChartOptions, ScaleChartOptions } from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { RootObject_3 } from '../services/cryptoApi';

const { Title } = Typography;

export interface IProps{
    coinHistory?: RootObject_3
    currentPrice: string,
    coinName?: string
}

const LineChart:React.FC<IProps> = ({ coinHistory, currentPrice, coinName }) => {
    const coinPrice = [];
    const coinTimestamp = [];

    for(let i = 0; i < coinHistory?.data?.history?.length!; i += 1){
        coinPrice.push(coinHistory?.data.history[i].price);
        coinTimestamp.push(new Date(coinHistory?.data.history[i].timestamp!).toLocaleDateString());
    }

    const data = {
        labels: coinTimestamp,
        datasets: [
          {
            label: 'Price In USD',
            data: coinPrice,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
          },
        ],
      };
    
    return (
        <>
            <Row className="chart-header">
                <Title level={2} className="chart-title">{coinName} Price Chart </Title>
                <Col className="price-container">
                <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
                <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
                </Col>
            </Row>
            <Line data={data} />
        </>
    )
}

export default LineChart;
