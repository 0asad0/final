import { createDrawerNavigator } from '@react-navigation/drawer'
import { LogBox, SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
// import { Provider } from 'react-redux'
import React from 'react'

import AppFlow from 'screens'
import AuthFlow from 'auth'
// import store from '@utils/redux'
import { NAV_HEADERS } from 'constants/variable'

const Drawer = createDrawerNavigator()

LogBox.ignoreAllLogs()

const App = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName='Auth'
        drawerContentOptions={{
          activeTintColor: 'blue',
          labelStyle: { fontSize: 16 }
        }}
      >
        <Drawer.Screen name='Auth' component={AuthFlow} options={NAV_HEADERS} />
        <Drawer.Screen name='App' component={AppFlow} options={NAV_HEADERS} />
      </Drawer.Navigator>
    </NavigationContainer>
  </SafeAreaView>
)

export default App
