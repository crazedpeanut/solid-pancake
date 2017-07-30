const React = require('react');
const pubCrawlService = require('../services/pub-crawl-service');
const queryString = require('query-string');


class PubCrawlDisplay extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const parsed = queryString.parse(this.props.location.search);

        console.log('Pub crawl Display loaded');
        console.log('ID: '+parsed.id);
        pubCrawlService.getPubCrawl(parsed.id)
            .then(pubCrawl => {
                console.log('Got the pub crawl' + JSON.stringify(pubCrawl));
                this.props.onRefreshPubCrawlDisplay(pubCrawl);
                setTimeout(this.forceUpdate.bind(this), 200);
            })
            .catch(err => console.error(err));
    }
    render() {
        console.log(this.props.pubCrawl);

        return (
            <div>

            </div>
        )
    }
}

module.exports = PubCrawlDisplay;