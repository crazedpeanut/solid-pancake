const React = require('react');
const PubCrawl = require('./pub-crawl-component');
const pubCrawlService = require('../services/pub-crawl-service');
import {Link} from 'react-router-dom';

function pubCrawlList(pubCrawls) {
    return (
        pubCrawls.map(pubCrawl =>
            <Link key={pubCrawl.UserId + pubCrawl.PubCrawlName} to={`/pubCrawl?id=${pubCrawl.PubCrawlName}`}>
                <PubCrawl pubCrawl={pubCrawl}/>
            </Link>
        )
    );
}

const quotes = [
    ['"I kept crawling and it kept working"', 'Uni Student'],
    ['"Oh god, it never ends. Please make it stop"', 'Uni Student'],
];

function randomQuote() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    return (
        <div className="quote">
            <span className="ui huge header">{quote[0]}</span>
            <span className="ui medium header"><br/>- {quote[1]}</span>
        </div>
    )
}

class DashboardComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('Dashboard loaded');
        pubCrawlService.getPubCrawls()
            .then(pubCrawls => {
                console.log('Got new pub crawls' + JSON.stringify(pubCrawls));
                this.props.onRefreshPubCrawls(pubCrawls);
            })
            .catch(err => console.error(err));
    }

    render() {
        return (
            <div className="ui grid">
                <div className="ui eight wide column">
                    {randomQuote()}
                </div>
                <div className="ui eight wide column">
                    <div className="ui items">
                        {pubCrawlList(this.props.pubCrawls)}
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = DashboardComponent;