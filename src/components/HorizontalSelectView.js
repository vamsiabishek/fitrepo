import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { styleCommon } from "../../assets/style/stylesCommonValues";
import { styles } from "../../assets/style/stylesHorizontalSelectView";

export default class HorizontalComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  _keyExtractor = item => `key${item}`;
  render() {
    const {
      items,
      selectedItem,
      onSelectionChange,
      selectedHW,
      lineWidth,
      iconStyleHW,
      iconDataStyleHW
    } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={items}
          horizontal={true}
          renderItem={({ item, index }) => {
            let {
              lineContainer,
              iconStyle,
              iconDataStyle,
              iconTextStyle
            } = styles;
            if (lineWidth !== undefined) {
              lineContainer = {
                ...lineContainer,
                width: lineWidth
              };
            }
            if (iconStyleHW !== undefined) {
              iconStyle = {
                ...iconStyle,
                width: iconStyleHW,
                height: iconStyleHW
              };
            }
            if (iconDataStyleHW !== undefined) {
              iconDataStyle = {
                ...iconDataStyle,
                width: iconDataStyleHW,
                height: iconDataStyleHW
              };
            }
            console.log(iconStyle);
            if (item === selectedItem) {
              iconStyle = {
                ...iconStyle,
                height: selectedHW !== undefined ? selectedHW : 25, //20, Make dynamic
                width: selectedHW !== undefined ? selectedHW : 25, //20,  Make dynamic
                backgroundColor: styleCommon.selectedButtonColor,
                borderRadius: 40
              };
              iconDataStyle = {
                ...iconDataStyle,
                height: selectedHW !== undefined ? selectedHW : 25, //20, Make dynamic
                width: selectedHW !== undefined ? selectedHW : 25 //20  Make dynamic
              };
              iconTextStyle = {
                ...iconTextStyle,
                fontSize: 11,
                fontWeight: "bold",
                color: styleCommon.primaryButtonTextColor
              };
            }
            return (
              <View style={styles.subContainer}>
                {index !== 0 && <View style={styles.lineContainer} />}
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  onPress={() => onSelectionChange(item)}
                >
                  <View style={iconStyle}>
                    <View style={iconDataStyle}>
                      <Text style={iconTextStyle}>{item}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={this._keyExtractor}
          extraData={selectedItem}
        />
      </View>
    );
  }
}
