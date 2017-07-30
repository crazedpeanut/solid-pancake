import React from 'react';
import {Route, Link, Redirect} from 'react-router-dom'
import Dashboard from '../containers/dashboard-container';
import CrawlBuilder from '../components/pub-crawl-builder';
import PubCrawl from '../containers/pub-crawl-container';
import PubCrawlSearch from '../containers/pub-crawl-search-container';
const pubCrawlService = require('../services/pub-crawl-service');

class AppComponent extends React.Component {

    componentDidMount() {
        console.log('Dashboard loaded');
        pubCrawlService.getPubCrawls()
            .then(pubCrawls => {
                console.log('Got new pub crawls' + JSON.stringify(pubCrawls));
                this.props.onRefreshPubCrawls(pubCrawls);
            })
            .catch(err => console.error(err));
    }

    render() {
        return (
            <div id="solid-pancake">
                <div className="ui menu">
                    <div className="header item">
                        <Link to="/dashboard"><img width="100%" src="/assets/img/Pubcrawlersmollogo.png"/></Link>
                    </div>
                    <Link to="/crawlBuilder" className="item">
                        Build a Crawl
                    </Link>
                    <div className="header item">
                        <PubCrawlSearch/>
                    </div>
                </div>

                <Redirect from="/" to="/dashboard"/>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/pubCrawl" component={PubCrawl} />
                <Route path="/crawlBuilder" component={CrawlBuilder} />
            </div>
        );
    }
}

export default AppComponent;