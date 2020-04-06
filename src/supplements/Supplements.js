import React, { Component } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  ImageBackground
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../../assets/style/stylesSupplementsScreen";
import { f, database } from "../common/FirebaseConfig";
import { GRADIENT_BG_IMAGE } from "../common/Common";
import { getSupplementsByKeyList } from "../common/SupplementsUtil";
import { styleCommon, ICON_SIZE_SMALL, ICON_SIZE } from "../../assets/style/stylesCommonValues";

export default class Supplements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supplements: []
      //supplements: getSupplementsByKeyList(['wheyConcentrate', 'multivitamin', 'lGlutamine', 'glucosamine', 'ashwagandha'])
    };
  }
  _keyExtractor = item => `key${item.key}`;
  componentDidMount = async () => {
    this.setState({ isLoading: true });
    const { navigation } = this.props;
    const dietId = navigation.getParam("dietId");
    //const currentUser = await f.auth().currentUser;
    await database
      .ref(`/supplements/${dietId}`)
      .once("value")
      .then(snap => {
        let supplements = [];
        if (snap.val()) {
          supplements = snap.val()[Object.keys(snap.val())[0]];
          supplements = getSupplementsByKeyList(supplements);
        }
        //supplements = getSupplementsByKeyList(['wheyConcentrate', 'multivitamin', 'lGlutamine', 'glucosamine', 'ashwagandha']);
        this.setState({ supplements });
      })
      .catch(error => {
        console.log(
          "error while fetching user details in componentDidMount of Supplements:",
          error
        );
      });
  };
  render() {
    const { supplements } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.supplementContainer}>
          <View style={styles.backHeaderContainer}>
            <View style={styles.backButtonContainerStyle}>
              <Button
                icon={{
                  name: "arrow-left-thick",
                  size: ICON_SIZE,
                  color: styleCommon.panelHeaderIconColor,
                  type: "material-community"
                }}
                containerStyle={styles.backButtonStyle}
                buttonStyle={styles.backButtonStyle}
                titleStyle={styles.backButtonTitleStyle}
                onPress={() => navigate("MyDiet")}
              />
              <View style={styles.pageTitleContainer}>
                <Text style={styles.pageTitle}>Supplements</Text>
              </View>
            </View>
          </View>
          <FlatList
            style={styles.flatListContainer}
            contentContainerStyle={styles.flatListContentContainer}
            data={supplements}
            renderItem={({ item, index }) => {
              const { name, desc, detailedDesc, image } = item.value;
              return (
                <View style={styles.listItemContainer}>
                  <View style={styles.badgeContainer}>
                    <TouchableOpacity style={styles.touchableContainerView}>
                      <View style={styles.iconDataStyle}>
                        <Image source={image} style={styles.iconImageStyle} />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.supplementDescContainer}>
                    <Text style={styles.supplementName}>{name}</Text>
                    <Text style={styles.supplementDesc}>{desc}</Text>
                    <Text style={styles.supplementDetailedDesc}>
                      {detailedDesc}
                    </Text>
                    <View>
                      <TouchableOpacity style={styles.timingsLabel}>
                        <View style={{flexDirection: 'row'}}>
                          <Icon
                            name="calendar-clock"
                            size={ICON_SIZE_SMALL}
                            color="#4CAF50"
                            style={styles.timingIconStyle}
                          />
                          <Text style={styles.timingsLabelText}>
                            Best timings to consume:
                          </Text>
                        </View>
                        <Text style={styles.timingsOptions}>
                          -Morning after breakfast
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }}
            keyExtractor={this._keyExtractor}
          />
        </View>
      </View>
    );
  }
}
