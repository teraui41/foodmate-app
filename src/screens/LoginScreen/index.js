import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View } from 'react-native';
import { Avatar, Input, Button } from 'react-native-elements';
import { ReducerContext } from '../../reducers';

function mockFetch() {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  });
}

const LoginScreen = props => {
  const [{auth}, dispatch] = useContext(ReducerContext);

  const handleLogin = () => dispatch({types: ['LOGIN', 'LOGIN_SUCCESS', 'LOGIN_ERROR'], promise: mockFetch()});

  return (
    <View style={styles.container}>
      <Avatar rounded size="large" title="MD" />
      <Input
        containerStyle={styles.inputContainer}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        placeholder="INPUT WITH CUSTOM ICON"
        leftIcon={<Icon name="user" size={24} color="black" />}
      />
      <Button
        buttonStyle={{ width: 300, borderRadius: 25 }}
        title="Login"
        onPress={handleLogin}
      />
    </View>
  );
};

LoginScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: 300,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 25,
    margin: 10,
  },
});
export default LoginScreen;