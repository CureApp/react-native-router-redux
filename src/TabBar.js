import React, { Component } from 'react';
import Tabs from 'react-native-tabs';
import { Image, StyleSheet, Text, View } from 'react-native';

const onSelect = props => el => {
  props.actions.changeTab({
    from: props.activeTab,
    name: el.props.name,
    navigator: props.navigator,
  });

  return {
    selectionColor: props.tabStyles.tint || '#037AFF',
  };
};

const IMAGE_STYLE_DEFAULT = {
  resizeMode: 'contain',
  width: 30,
  height: 25,
}
const imageStyle = (props, icon) => {
  const result = Object.assign({}, IMAGE_STYLE_DEFAULT)
  if (props.tabStyles.tint) {
    Object.assign(result, {
      tintColor: props.tabStyles.tint,
    })
  }
  if (icon.width) {
    Object.assign(result, {
      width: icon.width
    })
  }
  if (icon.height) {
    Object.assign(result, {
      height: icon.height
    })
  }
  return result
};

const tabBarStyle = props => {
  const result = {
    backgroundColor: props.tabBackgroundImage
      ? 'rgba(0, 0, 0, 0)'
      : (props.tabStyles.barTint || '#F9F9F9'),
  }
  if (props.tabBorderWidth) {
      result.borderTopWidth = props.tabBorderWidth
  }
  if (props.tabBorderColor) {
      result.borderTopColor = props.tabBorderColor
  }
  return result
};

const TAB_CONTAINER_STYLE_DEFAULT = {
  alignItems: 'center',
  justifyContent: 'center',
}
const tabContainerStyle = props => {
  if (props.selected) {
    return Object.assign({
      opacity: props.tabStyles.selectedOpacity,
    }, TAB_CONTAINER_STYLE_DEFAULT)
  }
  return TAB_CONTAINER_STYLE_DEFAULT
};

const textStyle = props => ({
  color: props.selectionColor || '#929292',
  fontSize: 10,
  letterSpacing: 0.2,
  marginTop: 4,
});

class TabBarIcon extends Component {
  render() {
    const { name, tabItem } = this.props;

    return (
      <View name={name} style={tabContainerStyle(this.props)}>
        {tabItem.icon &&
          <Image
            source={tabItem.icon}
            style={imageStyle(this.props, tabItem.icon)}
            />
        }
        {tabItem.title &&
          <Text style={textStyle(this.props)}>{tabItem.title}</Text>
        }
      </View>
    );
  }
}

export default class TabBar extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    const { tabs } = this.props;

    const tabBarItems = Object.keys(tabs).map(tabName => {
      const tab = tabs[tabName];
      const tabItem = tab.tabItem || {};

      return (
        <TabBarIcon
          key={tabName}
          name={tabName}
          tabItem={tabItem}
          tabStyles={this.props.tabStyles}
          />
      );
    });

    if (this.props.tabBackgroundImage) {
      return (
        <Image
          source={this.props.tabBackgroundImage}
          style={{height: 50}}
        >
          <Tabs
            activeOpacity={1.0}
            onSelect={onSelect(this.props)}
            selected={this.props.activeTab}
            style={tabBarStyle(this.props)}
          >
            {tabBarItems}
          </Tabs>
        </Image>
      );
    }

    return (
      <Tabs
        activeOpacity={1.0}
        onSelect={onSelect(this.props)}
        selected={this.props.activeTab}
        style={tabBarStyle(this.props)}
      >
        {tabBarItems}
      </Tabs>
    );
  }
}
