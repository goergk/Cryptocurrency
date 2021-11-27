import React, { SetStateAction, useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { SelectValue } from 'antd/lib/select';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage: string = 'https://img.etimg.com/thumb/msid-82155859,width-320,height-258/markets/stocks/etmarkets-podcast/etmarkets-morning-podcast-why-are-indian-crypto-prices-getting-delinked-from-global-trends.jpg';

const countWords = (str: string) => 
{
    str = str.replace(/(^\s*)|(\s*$)/gi,"");
    str = str.replace(/[ ]{2,}/gi," ");
    str = str.replace(/\n /,"\n");
    return str.split(' ').length;
}
export interface IProps {
    simplified: boolean
}

const News:React.FC<IProps> = ({ simplified }) => {

    const [newsCategory, setNewsCategory] = useState<SelectValue>('Cryptocurrency')
    const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({newsCategory, count: simplified ? 6 : 12});
    const { data: cryptosList } = useGetCryptosQuery(100);

    console.log(cryptosList);

    if(isFetching){
        return (
            <>
                <Title level={2} className="heading">Loading...</ Title>                 
            </>
        )
    } else {
        return (
            <Row gutter={[24,24]}>
                {!simplified && (
                    <Col span={24}>
                        <Select
                            showSearch
                            className="select-news"
                            placeholder="Select a Crypto"
                            optionFilterProp="children"
                            onChange={value => setNewsCategory(value)}
                            filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="Cryptocurrency">All</Option>
                            {cryptosList?.data?.coins.map(coin => (
                                <Option value={coin.name} key={coin.id}>{coin.name}</Option>
                            ))}
                        </Select>
                    </Col>
                )}
                {cryptoNews?.value.map((news) => (
                    <Col xs={24} sm={12} lg={8} key={news.name}>
                        <Card hoverable className="news-card">
                            <a href={news.url} target="_blank" rel="noreferrer">
                                <div className="news-image-container">
                                    <Title className="news-title" level={4}>{news.name}</Title>
                                    <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImage } alt="news"></img>
                                </div>
                                <p>
                                    {countWords(news.description) > 100 ? `${news.description.substring(0,100)} ...` : news.description}
                                </p>
                                <div className="provider-container">
                                    <div>
                                        <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt=""/>
                                        <Text className="provider-name">{news.provider[0]?.name}</Text>
                                    </div>
                                    <Text>{moment(news.datePublished).startOf('s').fromNow()}</Text>
                                </div>
                            </a>
                        </Card>
                    </Col>
                    ))}   
            </Row>
            )        
        }   
}

export default News;
