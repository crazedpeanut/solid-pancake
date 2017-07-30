import React from 'react';
import {Route, Link, Redirect} from 'react-router-dom'
import Dashboard from '../containers/dashboard-container';
import CrawlBuilder from '../components/pub-crawl-builder';
import PubCrawl from '../containers/pub-crawl-container';

class AppComponent extends React.Component {

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
                    <a className="item">
                        Nearby Crawls
                    </a>
                    <a className="item">
                        Login/Register
                    </a>
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