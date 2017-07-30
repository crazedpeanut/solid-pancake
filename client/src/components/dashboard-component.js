const React = require('react');
const PubCrawl = require('./pub-crawl-component');

function pubCrawlList(pubCrawls) {
    return (
        pubCrawls.map(pubCrawl =>
            <PubCrawl key={`${pubCrawl.UserID}-${pubCrawl.PubCrawlName}`} pubCrawl={pubCrawl}/>
        )
    );
}

const quotes = [
    ['"I kept crawling and it kept working"', 'Uni Student'],
    ['"Oh god, it never ends. Please make it stop"', 'Uni Student'],
    ['"I have never pubbed so hard in my life!"', 'Uni Student'],
    ['"PUB DATA!!!!!!11one"', 'Uni Student'],
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

    render() {

        console.log('render dashboard');
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