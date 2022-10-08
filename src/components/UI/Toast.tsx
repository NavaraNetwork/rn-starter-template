import React from 'react';
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
} from 'react-native-heroicons/solid';
import Toast, {
  BaseToast,
  BaseToastProps,
  ToastShowParams,
} from 'react-native-toast-message';
import tw from '../../libs/tailwind';
import {View} from 'react-native';

const DURATION = 1000;
const defaultConfig: ToastShowParams = {
  visibilityTime: DURATION,
};

const toast = {
  info: (message = '', config: ToastShowParams = {}) => {
    Toast.show({
      ...defaultConfig,
      ...config,
      type: 'info',
      text1: message,
    });
  },
  success: (message = '', config: ToastShowParams = {}) => {
    Toast.show({
      ...defaultConfig,
      text1: message,
      type: 'success',
      ...config,
    });
  },
  error: (message = '', config: ToastShowParams = {}) => {
    Toast.show({
      ...defaultConfig,
      text1: message,
      type: 'error',
      ...config,
    });
  },
  warning: (message = '', config: ToastShowParams = {}) => {
    Toast.show({
      ...defaultConfig,
      text1: message,
      type: 'warning',
      ...config,
    });
  },
};

export default toast;

const defaultProps: BaseToastProps = {
  text1Style: tw`text-black dark:text-white`,
  text2Style: tw`text-black dark:text-white`,
};

const baseStyle = tw`rounded-lg bg-white/80 dark:bg-gray-800/60`;

export const toastConfig = {
  info: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      {...defaultProps}
      renderLeadingIcon={() => renderIcon('info')}
      style={[baseStyle, tw`border-l-blue-300 dark:border-l-blue-500`]}
    />
  ),
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      {...defaultProps}
      renderLeadingIcon={() => renderIcon('success')}
      style={[baseStyle, tw`border-l-green-300 dark:border-l-green-500`]}
    />
  ),
  error: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      {...defaultProps}
      renderLeadingIcon={() => renderIcon('error')}
      style={[baseStyle, tw`border-l-red-300 dark:border-l-red-500`]}
    />
  ),
  warning: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      {...defaultProps}
      renderLeadingIcon={() => renderIcon('warning')}
      style={[baseStyle, tw`border-l-yellow-300 dark:border-l-yellow-500`]}
    />
  ),
};

const renderIcon = (type: string) => {
  const iconSize = 24;
  switch (type) {
    case 'info':
      return (
        <View style={tw`ml-1 center`}>
          <InformationCircleIcon color={'blue'} size={iconSize} />
        </View>
      );
    case 'success':
      return (
        <View style={tw`ml-1 center`}>
          <CheckCircleIcon color={'green'} size={iconSize} />
        </View>
      );
    case 'error':
      return (
        <View style={tw`ml-1 center`}>
          <ExclamationCircleIcon color={'red'} size={iconSize} />
        </View>
      );
    case 'warning':
      return (
        <View style={tw`ml-1 center`}>
          <ExclamationCircleIcon color={'yellow'} size={iconSize} />
        </View>
      );
    default:
      return <></>;
  }
};
