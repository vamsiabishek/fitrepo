import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyButton from '../components/MyButton';

export default class SourceSelectorModal extends Component {
  render() {
    // const { showModal, modalContains } = this.props;
    const {
      showModal,
      sources,
      selectedSources,
      onSourceToggle,
      onCancel,
      onConfirm,
      searchTerm,
      onSearch,
    } = this.props;
    const searchPlaceholderTextColor = 'grey';
    const searchPlaceholderText = 'Search sources...';
    const searchSelectionColor = 'black'; //"rgba(0,0,0,0.2)";

    return (
      <View>
        <Modal
          isVisible={showModal}
          backdropColor="black"
          backdropOpacity={0.5}>
          <View style={styles.modalContent}>
            <View style={styles.searchBar}>
              <View style={styles.center}>
                <Icon name="search" size={18} style={{marginHorizontal: 15}} />
              </View>
              <TextInput
                value={searchTerm}
                selectionColor={searchSelectionColor}
                onChangeText={(searchTerm) => onSearch(searchTerm)}
                placeholder={searchPlaceholderText}
                autoFocus={false}
                selectTextOnFocus
                placeholderTextColor={searchPlaceholderTextColor}
                underlineColorAndroid="transparent"
                style={styles.searchTextInput}
              />
            </View>
            <ScrollView>
              <View
                style={[
                  {
                    flex: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: 5,
                    marginHorizontal: 15,
                    justifyContent: 'space-evenly',
                  },
                  //styles.center
                ]}>
                {sources.map((source, index) => (
                  <View
                    style={[{width: 80, margin: 5}, styles.center]}
                    key={source.name}>
                    <TouchableOpacity
                      style={{flexDirection: 'row'}}
                      onPress={() => onSourceToggle(index, source.selected)}>
                      <Image
                        source={source.uri}
                        style={{
                          width: 80,
                          height: 60,
                          //backgroundColor: "indigo"
                        }}
                      />
                      {source.selected && (
                        <MaterialIcon
                          name="check-circle"
                          reversed
                          raised
                          size={17}
                          style={{
                            position: 'absolute',
                            right: 5,
                            color: 'blue',
                          }}
                        />
                      )}
                    </TouchableOpacity>
                    <Text style={[{marginTop: 2}, styles.center]}>
                      {source.name}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginVertical: 50,
              }}>
              <MyButton
                label={selectedSources.length > 0 ? 'Confirm' : 'Cancel'}
                width={200}
                height={60}
                onButtonClick={
                  selectedSources.length > 0 ? onConfirm : onCancel
                }
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
const SCREEN_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    paddingVertical: 5,
    backgroundColor: '#6ac8c2',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
  },
  searchTextInput: {
    flex: 1,
    fontSize: 17,
    paddingVertical: 8,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#6ac8c2',
    height: SCREEN_HEIGHT - 100,
    marginTop: 20,
    //justifyContent: "center",
    //alignItems: "center",
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});
