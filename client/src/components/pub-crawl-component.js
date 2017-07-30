const React = require('react');
const PubComponent = require('./pub-component');
import {Link} from 'react-router-dom';

function pubList(pubs) {

    return pubs.map(pub =>
        <PubComponent key={pub.Index} pub={pub}/>
    );
}

function getPubImg(name) {
    const val = (name.charCodeAt(0) % 3) + 1;

    return `/assets/img/PubIcon${val}.png`;
}

class PubCrawlComponent extends React.Component {
    render(){
        return (
            <div className="pub-crawl item">
                <div className="image">
                    <img src={getPubImg(this.props.pubCrawl.PubCrawlItem[0].ItemName)}/>
                </div>
                <div className="content">
                    <div className="pubCrawlName">
                        <Link key={this.props.pubCrawl.UserID + this.props.pubCrawl.PubCrawlName} to={`/pubCrawl?id=${this.props.pubCrawl.PubCrawlName}`}>
                            <span className="ui large header">{this.props.pubCrawl.PubCrawlName}</span>
                        </Link>
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