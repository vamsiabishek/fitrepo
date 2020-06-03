import React, {Component} from 'react';
import {
  Text,
  View,
  Animated,
  Easing,
  UIManager,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Timeline from 'react-native-timeline-flatlist';
import {styles} from '../../../assets/style/stylesMealContainer';
import {MEALS_ICON} from '../../common/Common';
import {
  styleCommon,
  fontsCommon,
  SCREEN_HEIGHT,
} from '../../../assets/style/stylesCommonValues';
import Modal from 'react-native-modal';
import {getSourceInfo, getSourceByKey} from '../../common/SourceUtil';
import GradiantContainer from '../../components/GradiantContainer';

// Enable LayoutAnimation for Android Devices
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class MealsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setIconUp: false,
      selected: null,
      heartClicked: false,
      infoPopUpVisible: false,
      infoSource: null,
    };
    this.onLoadAnimatedValue = new Animated.Value(0);
  }

  componentDidUpdate = () => {
    Animated.timing(this.onLoadAnimatedValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => (this.onLoadAnimatedValue = new Animated.Value(0)));
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    return this.props.meals !== nextProps.meals || this.state !== nextState;
  };

  handlePressIn = () => {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };
  handlePressOut = () => {
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  renderSelected = () => {
    /* if (this.state.selected)
      return (
        <Text style={{ marginTop: 10 }}>
          Selected event: {this.state.selected.title} at{" "}
          {this.state.selected.time}
        </Text>
      ); */
  };

  onEventPress = (data) => {
    this.setState({selected: data});
  };

  showInfoPopUp = (sourceKey) => {
    const infoSource = getSourceByKey(sourceKey);
    //console.log('infoSource', infoSource);
    this.setState({infoPopUpVisible: true, infoSource});
  };

  closeInfoPopUp = () => {
    this.setState({infoPopUpVisible: false});
  };

  renderDetail = (rowData, sectionID, rowID) => {
    let title = (
      <View style={styles.titleContainer}>
        <Text style={[styles.title]}>{rowData.name}</Text>
      </View>
    );
    var desc = null;
    const rotateX = this.onLoadAnimatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['0deg', '45deg', '0deg'],
    });
    const onLoadAnimatedStyle = {
      transform: [{rotateX}],
    };
    if (rowData.sources) {
      desc = (
        <View style={styles.descriptionContainer}>
          {/* <View style={styles.mealItem}>
            <Text style={styles.mealItemName} />
            <Text style={styles.mealItemQuantityLabel}>Quantity</Text>
          </View> */}
          {rowData.sources.map((source, index) => {
            let metricUnit = 'gm';
            if (source.isPerSingleUnit) {
              metricUnit = '';
            }
            if (source.hasTableSpoon) {
              metricUnit = 'tbsp';
            }
            let quantity = `${source.macroValue} ${metricUnit}`;
            if (source.isVeggie || source.isFruit) {
              quantity = source.macroValueAlt;
            }
            return (
              <View style={styles.mealItem} key={index}>
                <Text style={styles.mealItemName}>{source.name}</Text>
                <View style={styles.mealItemQuantityContainer}>
                  <Text style={styles.mealItemQuantity}>{quantity}</Text>
                  {getSourceInfo(source.id) && (
                    <TouchableOpacity
                      onPress={() => this.showInfoPopUp(source.id)}>
                      <Icon
                        name="information-outline"
                        size={fontsCommon.font22}
                        color={styleCommon.textInputDarkColor}
                        style={
                          {
                            //paddingLeft: 3,
                            // marginRight: Platform.OS === 'ios' ? 2 : 0,
                          }
                        }
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      );
    }

    return (
      <Animated.View style={[styles.mealContainer, onLoadAnimatedStyle]}>
        {title}
        {desc}
      </Animated.View>
    );
  };

  onPressFeedback = () => {
    const {onClickFeedback} = this.props;
    onClickFeedback();
  };

  onHeartClicked = () => {
    //console.log('heart clicked !');
    this.setState({heartClicked: true});
  };

  render() {
    //const {heartClicked} = this.state;
    //console.log('heart status: ', heartClicked);
    const {
      meals,
      dayBarScrollY,
      showDayLabelOnScroll,
      hideDayLabelOnScroll,
    } = this.props;
    const {infoPopUpVisible, infoSource} = this.state;
    if (meals.length > 0) {
      meals.map((meal) => (meal.icon = MEALS_ICON));
    }
    const timeStyle = {
      textAlign: 'center',
      color: 'white',
      borderRadius: 13,
    };
    const descriptionStyle = {color: 'gray'};
    return (
      <Animated.ScrollView
        style={{flex: 1}}
        removeClippedSubviews={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: dayBarScrollY,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={320}
        onScrollEndDrag={(e) => showDayLabelOnScroll(e)}
        onMomentumScrollEnd={(e) => hideDayLabelOnScroll(e)}>
        {/*this.renderSelected()*/}
        <Timeline
          style={styles.list}
          data={meals}
          circleSize={fontsCommon.font35}
          circleColor="#00DB8D"
          //circleColor="white"
          lineColor="lightgrey"
          timeStyle={timeStyle}
          descriptionStyle={descriptionStyle}
          options={{
            style: {paddingTop: 5},
            enableEmptySections: true,
          }}
          showTime="false"
          innerCircle={'icon'}
          //dotColor="skyblue"
          //onEventPress={this.onEventPress}
          renderDetail={this.renderDetail}
        />
        <View style={styles.buttonRowContainer}>
          <Button
            icon={
              <Icon
                name="comment-text"
                size={fontsCommon.font22}
                color={styleCommon.textInputDarkColor}
                style={{
                  paddingTop: 3,
                  // marginRight: Platform.OS === 'ios' ? 2 : 0,
                }}
              />
            }
            type="clear"
            onPress={this.onPressFeedback}
            containerStyle={styles.bottomButtonContainerStyle}
            titleStyle={styles.bottomTitleStyle}
            title={' Feedback'}
          />
          {/* <Button
            icon={
              <Icon
                name={heartClicked ? 'heart' : 'heart-outline'}
                size={fontsCommon.font30}
                color={'#d32724'}
                style={{
                  marginRight: Platform.OS === 'ios' ? 2 : 0,
                }}
              />
            }
            iconRight
            type="clear"
            onPress={this.onHeartClicked}
            containerStyle={stylesExtended.bottomHeartButtonContainerStyle}
          /> */}
        </View>

        <Modal
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
          isVisible={infoPopUpVisible}
          backdropColor="black"
          backdropOpacity={0.5}>
          {infoSource && (
            <View style={styles.modalOuterContainer}>
              <View style={styles.modalHeader}>
                <GradiantContainer>
                  <TouchableOpacity
                    style={styles.closeButtonContainerStyle}
                    onPress={() => this.closeInfoPopUp()}>
                    <Icon
                      name="close-circle"
                      size={SCREEN_HEIGHT * 0.04}
                      color={styleCommon.secondaryColorNew}
                      style={{marginLeft: 1}}
                    />
                  </TouchableOpacity>
                  <View style={styles.popUpImageContainer}>
                    <Image
                      source={infoSource.imageUrl}
                      style={styles.popUpImage}
                    />
                  </View>
                  <View style={styles.popUpTitleContainer}>
                    <Text style={styles.popUpTitle}>{infoSource.name}</Text>
                  </View>
                </GradiantContainer>
              </View>
              <View style={styles.modalContainer}>
                {infoSource.info.map(({label, value}) => (
                  <View style={styles.infoItem} key={label}>
                    <Text style={styles.infoLabel}>{label}</Text>
                    <Text style={styles.infoValue}>{value}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </Modal>
      </Animated.ScrollView>
    );
  }
}
