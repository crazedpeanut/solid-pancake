const React = require('react');

function getPubImg(name) {
    const val = (name.charCodeAt(0) % 3) + 1;

    return `/assets/img/PubIcon${val}.png`;
}

class PubCrawlPubComponent extends React.Component {

    constructor(props) {
        super(props);

        this.clickHandler = props.onClick;
    }

    render() {
        return(

            <div>
                <br/><br/>
                <div className="ui grid" id="pub1">
                    <div className="six wide column">
                        <div className="row ui medium header">{this.props.pub.ItemName}</div>
                        <div className="row">{this.props.pub.StreetAddress}</div>
                        <div className="row">Phone: 03 9123 4567</div>
                    </div>
                    <div className="two wide column">
                        <div className="row ui medium header"><br/></div>
                        <div className="row">Rating: 4/5</div>
                        <div className="row">Capacity: {this.props.pub.NumberOfPatrons}</div>
                    </div>
                    <div className="eight wide column">
                        <img className="ui image" src={getPubImg(this.props.pub.ItemName)} width="75px"/>
                    </div>
                    <div className="reviews"><ul className="review-list"></ul></div>
                    <div id="map"> </div>
                    <hr/>
                    <div><strong>Overall rating:</strong> <span id="rating"> </span></div>
                    </div>

                <div className="reviews"><ul className="review-list"></ul></div>
                <div id="map"></div>
                <hr/>
                <div><strong>Overall rating:</strong> <span id="rating"></span></div>
            </div>
        
        );
    }
}

module.exports = PubCrawlPubComponent;