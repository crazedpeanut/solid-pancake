const React = require('react');
const PubComponent = require('./pub-component');

function pubList(pubs) {

    return pubs.map(pub =>
        <PubComponent key={pub.ItemID} pub={pub}/>
    );
}

function getPubImg() {
    return `/assets/img/PubIcon${Math.floor(Math.random() * 3  + 1)}.png`;
}

class PubCrawlComponent extends React.Component {
    render(){
        return (
            <div className="pub-crawl item">
                <div className="image">
                    <img src={getPubImg()}/>
                </div>
                <div className="content">
                    <div className="pubCrawlName">
                        <span className="ui large header">{this.props.pubCrawl.PubCrawlName}</span>
                    </div>
                    <div className="pubCrawlUserId">
                        <p className="ui tiny header">By {this.props.pubCrawl.UserID}</p>
                    </div>
                    <div className="ui large horizontal divided list">
                        {pubList(this.props.pubCrawl.PubCrawlItem)}
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = PubCrawlComponent;