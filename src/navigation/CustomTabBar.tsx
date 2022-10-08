import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {CogIcon, HomeIcon} from 'react-native-heroicons/solid';
import colors from '../configs/colors';
import tw from '../libs/tailwind';

const CustomTabBar = ({state, descriptors, navigation}: any) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const isHideTabBar = focusedOptions?.tabBarStyle?.display === 'none';
  const barHeight = 60;
  if (isHideTabBar) {
    return null;
  }

  return (
    <View style={tw`absolute bottom-0 z-50 w-full shadow-lg`}>
      <View
        style={[
          {
            height: barHeight,
          },
          tw`absolute bottom-0 z-50 flex flex-row items-center justify-around w-full`,
        ]}>
        {state?.routes.map(
          (
            route: {key: string | number; name: any},
            index: number,
            array: any[],
          ) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                navigation.navigate({name: route.name, merge: true});
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <View
                key={index}
                style={tw`items-center justify-center flex-1 bg-white`}>
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityState={isFocused ? {selected: true} : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={tw`items-center justify-center flex-1`}>
                  {getIcon(label, 24, isFocused ? colors.primary : colors.gray)}
                  <Text
                    style={tw`font-medium text-[${
                      isFocused ? colors.primary : colors.gray
                    }]`}>
                    {label}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          },
        )}
      </View>
    </View>
  );
};

const getIcon = (name: string, size: number, color: string) => {
  switch (name) {
    case 'Home':
      return <HomeIcon width={size} height={size} fill={color} />;
    case 'Settings':
      return <CogIcon width={size} height={size} fill={color} />;
    default:
      return <></>;
  }
};

export default CustomTabBar;
