/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import ProductsScreen from './App/Products';
import ProductDetailScreen from './App/ProductDetail';

const Stack = createSharedElementStackNavigator();
export type RootStackParamList = {
  Products: undefined;
  ProductDetail: undefined;
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Products" component={ProductsScreen} />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={() => ({
            gestureEnabled: false,
            transitionSpec: {
              open: {animation: 'timing', config: {duration: 500}},
              close: {animation: 'timing', config: {duration: 500}},
            },
            cardStyleInterpolator: ({current: {progress}}) => {
              return {
                cardStyle: {
                  opacity: progress,
                },
              };
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
