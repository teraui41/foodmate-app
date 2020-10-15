import { connect } from 'react-redux';
import { addMessageAction } from '~/actions/messageActions';
import ChatScreen from './view';

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  addMessage: payload => {
    dispatch(addMessageAction(payload));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatScreen);
