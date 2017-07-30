import {connect} from 'react-redux'
import AppComponent from '../components/app-component'
import {refreshPubCrawls} from '../actions/actions';
import {withRouter} from 'react-router';

const mapDispatchToProps = dispatch => {
    return {
        onRefreshPubCrawls: pubCrawls => {
            dispatch(refreshPubCrawls(pubCrawls))
        }
    }
};

const mapStateToProps = (state, ownProps) => {
    return {

    }
};

const AppContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AppComponent));

export default AppContainer;