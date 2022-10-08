import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {useDeviceContext} from 'twrnc';
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
            </PersistGate>
          </ReduxProvider>
        </NativeBaseProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
