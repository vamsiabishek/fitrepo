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
      iconDataStyleHW,
      showSelectedLabel,
      label
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
            if (item === selectedItem) {
              iconStyle = {
                ...iconStyle,
                height: selectedHW !== undefined ? selectedHW : 28, //20, Make dynamic
                width: selectedHW !== undefined ? selectedHW : 28, //20,  Make dynamic
                backgroundColor: styleCommon.selectedButtonColor,
                borderRadius: 40
              };
              iconDataStyle = {
                ...iconDataStyle,
                height: selectedHW !== undefined ? selectedHW : 28, //20, Make dynamic
                width: selectedHW !== undefined ? selectedHW : 28 //20  Make dynamic
              };
              iconTextStyle = {
                ...iconTextStyle,
                fontSize: 12,
                fontWeight: "bold",
                color: styleCommon.primaryButtonTextColor
              };
            }
            const selectedMealContainerStyle =
              item === selectedItem ? { marginTop: iconStyle.height } : {};
            return (
              <View style={styles.subContainer}>
                {index !== 0 && <View style={styles.lineContainer} />}
                <View style={selectedMealContainerStyle}>
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
                  {item === selectedItem && showSelectedLabel && (
                    <View style={styles.labelContainer}>
                      <Text style={styles.labelText}>{label}</Text>
                    </View>
                  )}
                </View>
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
