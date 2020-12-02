import React, {Fragment, useState} from 'react';
import isEmpty from 'lodash/isEmpty';
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useNavigationButtonPress} from 'react-native-navigation-hooks';
import {Card, Avatar} from 'react-native-elements';
import colors from '~/theme/color';
import Text from '~/components/Text';
import Button from '~/components/Button';
import SearchBar from '~/components/SearchBar';
import QRCodeScanner from 'react-native-qrcode-scanner';
import QRCodeScannerModal from '~/components/QRCodeScannerModal';

const {width} = Dimensions.get('window');

const TOP_BAR_RIGHT_BUTTON_ID = '#$%_right_button';

const EmptyView = () => (
  <View style={{flex: 1}}>
    <Text style={styles.emptyContent}>查無使用者資料，請重新搜尋。</Text>
  </View>
);

const ValidateButton = ({
  authUserId,
  user,
  handleInviteFriend,
  handleRejectInviteFriend,
  handleApproveInviteFriend,
}) => {
  const status = user.get('status');
  const userId = user.get('id');
  const creatorId = user.getIn(['friendCreator', 'id']);
  const friendId = user.get('friendId');

  if (authUserId === userId) {
    return <Text>這是你自己</Text>;
  }

  if (status === 0) {
    return <Button title='邀請' onPress={() => handleInviteFriend({userId})} />;
  }

  if (status === 1) {
    return authUserId === creatorId ? (
      <Fragment>
        <Text>等待對方同意</Text>
        <Button
          title='取消邀請'
          onPress={() => handleRejectInviteFriend({friendId})}
        />
      </Fragment>
    ) : (
      <Fragment>
        <Button
          title='同意'
          onPress={() => handleApproveInviteFriend({friendId})}
        />
        <Button
          title='拒絕'
          onPress={() => handleRejectInviteFriend({friendId})}
        />
      </Fragment>
    );
  }
  return <Text>已經是好友</Text>;
};

const Content = ({
  hide,
  authUserId,
  user,
  onClose,
  handleInviteFriend,
  handleRejectInviteFriend,
  handleApproveInviteFriend,
}) => {
  if (hide) return <EmptyView />;
  console.log(user.get('avatar'));
  return (
    <View style={styles.resultMask}>
      <Avatar rounded size='xlarge' source={{uri: user.get('avatar')}} />
      <Text h3 style={styles.resultTitle}>
        {user.get('name')}
      </Text>
      <View style={styles.buttonZone}>
        <ValidateButton
          user={user}
          authUserId={authUserId}
          handleInviteFriend={handleInviteFriend}
          handleRejectInviteFriend={handleRejectInviteFriend}
          handleApproveInviteFriend={handleApproveInviteFriend}
        />
        <Button title='返回' type='outline' onPress={onClose} />
      </View>
    </View>
  );
};

const SearchScreen = ({
  componentId,
  authUserId,
  user,
  handleGetUserByAccount,
  handleInviteFriend,
  handleRejectInviteFriend,
  handleApproveInviteFriend,
  handleClearSearchResult,
}) => {
  const [value, setValue] = useState('');
  const [showModal, setShowModal] = useState(false);

  useNavigationButtonPress((e) => {
    if (
      componentId === e.componentId &&
      e.buttonId === TOP_BAR_RIGHT_BUTTON_ID
    ) {
      setShowModal(true);
    }
  });

  return (
    <View style={{flex: 1}}>
      <QRCodeScannerModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onRead={({data}) => {
          setValue(data);
          setShowModal(false);
          handleGetUserByAccount({account: value});
        }}
      />
      <SearchBar
        value={value}
        placeholder='請輸入好友帳號進行搜尋'
        onChangeText={(text) => setValue(text)}
        onSearch={() => {
          handleGetUserByAccount({account: value});
        }}
      />
      <Content
        user={user}
        hide={user.isEmpty()}
        authUserId={authUserId}
        onClose={handleClearSearchResult}
        handleInviteFriend={handleInviteFriend}
        handleRejectInviteFriend={handleRejectInviteFriend}
        handleApproveInviteFriend={handleApproveInviteFriend}
      />
    </View>
  );
};

SearchScreen.options = {
  topBar: {
    rightButtons: [
      {
        id: TOP_BAR_RIGHT_BUTTON_ID,
        icon: require('assets/icons/scan.png'),
        color: colors.grey,
      },
    ],
  },
};

const styles = StyleSheet.create({
  resultMask: {
    position: 'absolute',
    backgroundColor: '#fff',
    width,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultTitle: {
    fontWeight: '500',
    color: '#000',
    margin: 8,
    textAlign: 'center',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonZone: {
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  emptyContent: {
    textAlign: 'center'
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default SearchScreen;
