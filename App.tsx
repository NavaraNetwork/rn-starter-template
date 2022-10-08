import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import Toast from 'react-native-toast-message';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {useDeviceContext} from 'twrnc';
import {toastConfig} from './src/components/UI/Toast';
import {persistor, store} from './src/data/store';
import tw from './src/libs/tailwind';
import AppRoutes from './src/navigation';

const App = () => {
  const queryClient = new QueryClient();

  const colorScheme = useColorScheme();
  useDeviceContext(tw);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <NativeBaseProvider>
          <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <AppRoutes />
              <Toast config={toastConfig} />
            </PersistGate>
          </ReduxProvider>
        </NativeBaseProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
