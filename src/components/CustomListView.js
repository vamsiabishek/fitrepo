import React from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import CustomListViewRow from './CustomListViewRow';
import {styles} from '../../assets/style/stylesCustomListView';

class CustomListview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentDidUpdate = () => {
    const {refreshing} = this.state;
    if (refreshing) {
      this.setState({refreshing: false});
    }
  };

  _onRefresh = () => {
    const {onRefresh, uid} = this.props;
    onRefresh(uid); // this uid can be some times null
    this.setState({refreshing: true});
  };
  _keyExtractor = (item) => item.key;

  render() {
    const {diets, navigation, uid} = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={diets}
          renderItem={({item}) => (
            <CustomListViewRow uid={uid} item={item} navigation={navigation} />
          )}
          keyExtractor={this._keyExtractor}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    );
  }
}
export default CustomListview;
