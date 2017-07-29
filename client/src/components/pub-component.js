const React = require('react');

function getPubImg() {
    return `/assets/img/PubIcon${Math.floor(Math.random() * 3  + 1)}.png`;
}

class PubComponent extends React.Component {

    constructor(props) {
        super(props);

        this.clickHandler = props.onClick;
    }

    render() {
        return(
            <div className="item pub" onClick={this.clickHandler}>
                <img className="ui image" src={getPubImg()}/>
                    <div className="content">
                        <div className="header">{this.props.pub.ItemName}</div>
                    </div>
            </div>
        );
    }
}

module.exports = PubComponent;