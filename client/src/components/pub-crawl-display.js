const React = require('react');
const pubCrawlService = require('../services/pub-crawl-service');

class PubCrawlDisplay extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('Pub crawl Display loaded');
        console.log('ID: '+this.props.params.id);
        pubCrawlService.getPubCrawl()
            .then(pubCrawl => {
                console.log('Got the pub crawl' + JSON.stringify(pubCrawl));
                //this.props.onRefreshPubCrawls(pubCrawls);
                setTimeout(this.forceUpdate.bind(this), 200);
            })
            .catch(err => console.error(err));
    }



    render() {
        console.dir(this.props);


        return (
            <div>
                test
            </div>
        )
    }
}

export default PubCrawlDisplay;