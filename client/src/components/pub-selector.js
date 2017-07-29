import React from 'react';
import PubSelectItem from './pub-select-item-component';

class PubSelector extends React.Component {

    render() {
        return (
            <div className="ui list">
                {this.props.pubs.map(pub => (
                    <PubSelectItem key={pub.PubID} pub={pub} onDelete={this.props.onDelete} onUp={this.props.onUp} onDown={this.props.onDown}/>
                ))}
            </div>
        );
    }
}

export default PubSelector;