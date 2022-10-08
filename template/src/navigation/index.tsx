import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import {StatusBar, useColorScheme, View} from 'react-native';
import colors from '../configs/colors';
import tw from '../libs/tailwind';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import CustomTabBar from './CustomTabBar';

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

interface ITab {
  name: string;
  label: string;
  component?: any;
}

const tabs: ITab[] = [
  {
    name: 'Home',
    label: 'Home',
    component: Home,
  },
  {
    name: 'Settings',
    label: 'Settings',
    component: Settings,
  },
];

const TabsNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.primary,
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      {tabs.map((tab: ITab) => (
        <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
      ))}
    </Tab.Navigator>
  );
};

const AppRoutes = () => {
  const scheme = useColorScheme();
  return (
    <View style={tw`flex-1`}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={scheme === 'light' ? 'white' : '#18191A'}
      />
      <RootStack.Navigator
        screenOptions={{
          animationEnabled: false,
        }}>
        <RootStack.Screen
          name="TabsNavigation"
          options={{headerShown: false}}
          component={TabsNavigation}
        />
      </RootStack.Navigator>
    </View>
  );
};

export default AppRoutes;
