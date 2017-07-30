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
                        <div className="row ui medium header">this.props.pub.ItemName}</div>
                        <div className="row">123 Something Street</div>
                        <div className="row">Phone: 03 9123 4567</div>
                    </div>
                    <div className="six wide column">
                        <div className="row ui medium header"><br/></div>
                        <div className="row">Rating: 4/5</div>
                        <div className="row">Capacity: 100</div>
                    </div>
                    <div className="four column">
                        <img className="ui image" src={getPubImg(this.props.pub.ItemName)}/>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = PubCrawlPubComponent;