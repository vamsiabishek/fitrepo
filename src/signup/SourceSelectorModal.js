import React from 'react';
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
import {
  styleCommon,
  SCREEN_HEIGHT,
} from '../../assets/style/stylesCommonValues';

export default function SourceSelectorModal(props) {
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
  } = props;

  const searchPlaceholderTextColor = 'lightgrey';
  const searchPlaceholderText = 'Search sources...';
  const searchSelectionColor = 'white'; //"rgba(0,0,0,0.2)";

  return (
    <View>
      <Modal isVisible={showModal} backdropColor="black" backdropOpacity={0.5}>
        <View style={styles.modalContent}>
          <View style={styles.searchBar}>
            <View style={styles.center}>
              <Icon
                name="search"
                size={18}
                style={{marginHorizontal: 15, color: 'white'}}
              />
            </View>
            <TextInput
              value={searchTerm}
              selectionColor={searchSelectionColor}
              onChangeText={(term) => onSearch(term)}
              placeholder={searchPlaceholderText}
              autoFocus={false}
              selectTextOnFocus
              placeholderTextColor={searchPlaceholderTextColor}
              underlineColorAndroid="transparent"
              style={styles.searchTextInput}
            />
          </View>

          <TouchableOpacity
            style={styles.closeButtonContainerStyle}
            onPress={() => onCancel()}>
            <MaterialIcon
              name="close-circle"
              size={SCREEN_HEIGHT * 0.04}
              color={styleCommon.secondaryColorNew}
              style={{marginLeft: 1}}
            />
          </TouchableOpacity>

          <ScrollView>
            <View style={styles.sourceContainer}>
              {sources.map((source, index) => (
                <View
                  style={[styles.sourceItem, styles.center]}
                  key={source.name}>
                  <TouchableOpacity
                    style={{flexDirection: 'row'}}
                    onPress={() => onSourceToggle(index, source.selected)}>
                    <Image source={source.uri} style={styles.sourceImage} />
                    {source.selected && (
                      <MaterialIcon
                        name="check-circle"
                        reversed
                        raised
                        size={17}
                        style={styles.sourceSelectIcon}
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
          <View style={styles.footerBtnContainer}>
            <MyButton
              label={selectedSources.length > 0 ? 'Confirm' : 'Cancel'}
              width={200}
              height={60}
              onButtonClick={selectedSources.length > 0 ? onConfirm : onCancel}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  sourceContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    marginHorizontal: 15,
    justifyContent: 'space-evenly',
  },
  sourceItem: {
    width: 80,
    margin: 5,
  },
  sourceImage: {
    width: 80,
    height: 60,
  },
  sourceSelectIcon: {
    position: 'absolute',
    right: 5,
    color: 'blue',
  },
  searchBar: {
    flexDirection: 'row',
    paddingVertical: 5,
    backgroundColor: styleCommon.textInputDarkColor, //'#6ac8c2',
    borderWidth: 0.3,
    borderColor: 'lightgrey',
  },
  searchTextInput: {
    flex: 1,
    fontSize: 17,
    paddingVertical: 8,
    color: styleCommon.textColorWhite,
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
  footerBtnContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 50,
  },
  closeButtonContainerStyle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: -12,
    right: -12,
    height: SCREEN_HEIGHT * 0.04,
    width: SCREEN_HEIGHT * 0.04,
    backgroundColor: styleCommon.textInputDarkColor, //styleCommon.secondaryColorNew,
    borderRadius: SCREEN_HEIGHT * 0.04,
  },
});
