const React = require('react');

function getPubImg(name) {
    const val = (name.charCodeAt(0) % 3) + 1;

    return `/assets/img/PubIcon${val}.png`;
}

class PubComponent extends React.Component {

    constructor(props) {
        super(props);

        this.clickHandler = props.onClick;
    }

    render() {
        return(
            <div className="item pub" onClick={this.clickHandler}>
                <img className="ui image" src={getPubImg(this.props.pub.ItemName)}/>
                    <div className="content">
                        <div className="header">{this.props.pub.ItemName}</div>
                    </div>
            </div>
        );
    }
}

module.exports = PubComponent;