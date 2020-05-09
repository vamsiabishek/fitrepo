import React, {Component} from 'react';
import {Text, View, Animated, Easing, UIManager, Platform} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Timeline from 'react-native-timeline-flatlist';
import {
  styles,
  stylesExtended,
} from '../../../assets/style/stylesMealContainer';
import {MEALS_ICON} from '../../common/Common';
import {
  styleCommon,
  fontsCommon,
} from '../../../assets/style/stylesCommonValues';

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

  shouldComponentUpdate = (nextProps) => {
    return this.props.meals !== nextProps.meals;
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
                <Text style={styles.mealItemQuantity}>{quantity}</Text>
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
    const {heartClicked} = this.state;
    //console.log('heart status: ', heartClicked);
    const {
      meals,
      dayBarScrollY,
      showDayLabelOnScroll,
      hideDayLabelOnScroll,
    } = this.props;
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
                size={fontsCommon.font30}
                color={styleCommon.textInputDarkColor}
                style={{
                  marginRight: Platform.OS === 'ios' ? 2 : 0,
                }}
              />
            }
            iconRight
            type="clear"
            onPress={this.onPressFeedback}
            containerStyle={styles.bottomButtonContainerStyle}
          />
          <Button
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
          />
        </View>
      </Animated.ScrollView>
    );
  }
}
