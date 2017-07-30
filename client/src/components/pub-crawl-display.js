const React = require('react');
const pubCrawlService = require('../services/pub-crawl-service');
const queryString = require('query-string');
const PubCrawlPubComponent = require('./pubcrawl-pub-component');


function pubCrawlPubList(pubs) {
    if(pubs)
        return pubs.map(pub =>
            <PubCrawlPubComponent key={pub.Index} pub={pub}/>
        );
}

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
            })
            .catch(err => console.error(err));
    }

    render() {
        let crawl = this.props.pubCrawlDisplay;
        console.log(crawl);
        return (
            <div className="ui grid centered container viewPubCrawl">
                <div className="ui twenty wide column">

                    <div className="seven wide column">
                        <div className="ui huge header">{crawl.PubCrawlName}</div>
                        <div>
                            By {crawl.UserID}
                            <i className="large star icon"> </i>
                            <i className="large star icon"> </i>
                            <i className="large star icon"> </i>
                            <i className="large star half empty icon"> </i>
                            <i className="large empty star icon"> </i>
                        </div>
                        {pubCrawlPubList(crawl.PubCrawlItem)}
                    </div>
                </div>
            </div>

        )
    }
}

module.exports = PubCrawlDisplay;