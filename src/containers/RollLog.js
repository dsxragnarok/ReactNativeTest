import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LogView from '../components/LogView';
import { actions } from '../actions/log';

const mapStateToProps = ({ messageLog }) => ({ items: messageLog });
const mapDispatchToProps = (dispatch) => bindActionCreators({ ...actions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LogView);
