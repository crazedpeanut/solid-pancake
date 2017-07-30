const React = require('react');
import {Search} from 'semantic-ui-react';

class PubCrawlSearch extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            results: [],
            value: ''
        };

        this.onResultSelect = this.handleResultSelect.bind(this);
        this.onSearchChange = this.handleSearchChange.bind(this);
    }

    handleResultSelect(e, {result}) {
        this.setState({ value: result.title });
        this.props.onSelected(result);
    }

    handleSearchChange(e, {value}) {
        this.setState({ isLoading: true, value });

        if (this.state.value.length < 1) return this.resetComponent();

        const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
        const isMatch = (result) => re.test(result.TradingName);

        this.setState({
            isLoading: false,
            results: _.filter(this.props.pubCrawls, isMatch).map(result => (Object.assign({
                title: result.TradingName,
                description: result.TradingName,

            }, result))),
        })
    }

    render() {
        return (
            <Search
                loading={this.state.isLoading}
                onResultSelect={this.onResultSelect}
                onSearchChange={this.onSearchChange}
                results={this.state.results}
                value={this.state.value}
            >
                Search for a Pub Crawl
            </Search>
        );
    }
}

export default PubCrawlSearch;