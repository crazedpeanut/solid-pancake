import {connect} from 'react-redux'
import PubCrawlDisplay from '../components/pub-crawl-display'
import {refreshPubCrawlDisplay} from '../actions/actions';
import {withRouter} from 'react-router';

const mapPubCrawlDispatchToProps = dispatch => {
    return {
        onRefreshPubCrawlDisplay: pubCrawl => {
            dispatch(refreshPubCrawlDisplay(pubCrawl))
        }
    }
};

const mapPubCrawlStateToProps = (state, ownProps) => {
    return {
        PubCrawlDisplay: state.PubCrawlDisplay.pubCrawl
    }
};

const PubCrawlDisplayContainer = withRouter(connect(
    mapPubCrawlStateToProps,
    mapPubCrawlDispatchToProps
)(PubCrawlDisplay));

export default PubCrawlDisplayContainer;