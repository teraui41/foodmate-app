import { connect } from 'react-redux';
import LoginScreen from '~/screens/LoginScreen/view';
import { loginAction, getConfirmationCodeAction } from '~/actions/authActions';

const mapStateToProps = ({auth}) => ({
  isAuth: auth.get('isAuth'),
  confirmation: auth.get('confirmation'),
});

const mapDispatchToProps = dispatch => ({
  handleGetConfirmationCode: payload => {
    dispatch(getConfirmationCodeAction(payload));
  },
  handleLogin: payload => {
  console.log('payload', payload)
    dispatch(loginAction(payload));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
