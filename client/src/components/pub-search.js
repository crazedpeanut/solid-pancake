const React = require('react');
import {Search} from 'semantic-ui-react';
const pubCrawlService = require('../services/pub-crawl-service');

import _ from 'lodash';

class PubSearch extends React.Component{

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

    resetComponent() {
        this.setState({ isLoading: false, results: [], value: '' });
    }

    handleResultSelect(e, {result}) {
        this.setState({ value: result.title });
        this.props.onSelected(result);
    }

    handleSearchChange(e, {value}) {
        this.setState({ isLoading: true, value });

        pubCrawlService.getAllPubs()
            .then(pubs => {
                if (this.state.value.length < 1) return this.resetComponent();

                const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
                const isMatch = (result) => re.test(result.TradingName);

                this.setState({
                    isLoading: false,
                    results: _.filter(pubs, isMatch).map(result => (Object.assign({
                        title: result.TradingName,
                        description: result.TradingName,

                    }, result))),
                })
            });
    }

    render() {
        return (
            <Search
                loading={this.state.isLoading}
                onResultSelect={this.onResultSelect}
                onSearchChange={this.onSearchChange}
                results={this.state.results}
                value={this.state.value}
            />
        )
    }
}

export default PubSearch;