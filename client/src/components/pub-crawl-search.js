import React,{PropTypes} from 'react';
import {Search, Label} from 'semantic-ui-react';
import _ from 'lodash';
import {Link} from 'react-router-dom';


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
    }

    resetComponent() {
        this.setState({
            isLoading: false,
            results: [],
            value: ''
        })
    }

    handleSearchChange(e, {value}) {
        this.setState({ isLoading: true, value });

       /* if (this.state.value.length < 1) return this.resetComponent();*/

        const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
        const isMatch = (result) => re.test(result.PubCrawlName);

        this.setState({
            isLoading: false,
            results: _.filter(this.props.pubCrawls, isMatch).map(result => (Object.assign({
                title: result.PubCrawlName,
                description: result.PubCrawlName,
                url: `/pubCrawl?id=${result.PubCrawlName}`
            }, result))),
        })
    }

    render() {

        const resultRenderer = ({ title, description, url }) => <Link to={url}><Label content={title} /></Link>

        resultRenderer.propTypes = {
            title: PropTypes.string,
            description: PropTypes.string,
            url:  PropTypes.string
        };

        return (
            <Search
                loading={this.state.isLoading}
                onResultSelect={this.onResultSelect}
                onSearchChange={this.onSearchChange}
                results={this.state.results}
                resultRenderer={resultRenderer}
                placeholder="Pub Crawl Search"
                value={this.state.value}>
            </Search>
        );
    }
}

export default PubCrawlSearch;