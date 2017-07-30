import {connect} from 'react-redux'
import PubCrawlDisplay from '../components/pub-crawl-display'
import {refreshPubCrawlDisplay} from '../actions/actions';
import {withRouter} from 'react-router';

const mapPubCrawlDispatchToProps = dispatch => {
    return {
        onRefreshPubCrawlDisplay: pubCrawlDisplay => {
            dispatch(refreshPubCrawlDisplay(pubCrawlDisplay))
        }
    }
};

const mapPubCrawlStateToProps = (state, ownProps) => {
    return {
        pubCrawlDisplay: state.PubCrawlDisplay.pubCrawlDisplay
    }
};

const PubCrawlDisplayContainer = withRouter(connect(
    mapPubCrawlStateToProps,
    mapPubCrawlDispatchToProps
)(PubCrawlDisplay));

export default PubCrawlDisplayContainer;