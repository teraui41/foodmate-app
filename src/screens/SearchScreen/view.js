import React, { useState } from "react";
import isEmpty from 'lodash/isEmpty';
import { View } from "react-native";
import { SearchBar, Header, Card, Icon } from 'react-native-elements';
import Button from '~/components/Button';
import Text from '~/components/Text';


const EmptyView = () => (
  <View style={{ flex: 1 }}>
    <Text>無資料</Text>
  </View>);

const ValidateButton = ({ user, handleInviteFriend }) => {
  const status = user.get('status');
  const userId = user.get('id');
  if(status === 0) {
    return (
      <Button
        title='邀請'
        onPress={() => handleInviteFriend({userId: user.get('id')})}
      />
    );
  }
  if(status === 1) {
    return userId ===  user.get('friendCreatorId')
      ? <Text>等待對方審核</Text>
      : <Button title='同意' />;
  }
  return <Text>已經是好友</Text>
}

const Content = ({ user, handleInviteFriend }) => {
  console.log(`Content -> user.get('status')`, user.get('status'))
  return (
    <Card containerStyle={{ borderWidth: 0 }}>
      <Card.Image wrapperStyle={{ borderWidth: 0 }} source={{ uri: user.get('avatar') }} />
      <Card.Title style={{ color: 'black' }}>{user.get('name')}</Card.Title>
      <ValidateButton user={user} handleInviteFriend={handleInviteFriend}/>
    </Card>
  );
}


const SearchScreen = ({ user, handleGetUserById, handleInviteFriend }) => {
  const [value, setValue] = useState('5f898ff8f5a2442d02e38410');

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={(text) => setValue(text)}
        value={value}
        showCancel={false}
        rightIcon={<Icon name='search' />}
        onBlur={() => {
          if (!isEmpty(value)) {
            handleGetUserById({ userId: value })
          }
        }}
      />
      {
        user.isEmpty()
          ? <EmptyView />
          : <Content user={user} handleInviteFriend={handleInviteFriend} />
      }
    </View>
  );
};

export default SearchScreen;
