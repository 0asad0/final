import { BackHandler } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { ROLES } from 'constants/variable'

import CandidateApplicationsList from './appliations'
import ConstituencyFlow from './constituencies'
import ElectionFlow from './elecions'
import LogoutScreen from 'auth/Logout'
import Profile from './profile'
import Register from './register'
import UserListScreen from './users'
import VotingFlow from './voting'


const Drawer = createDrawerNavigator()

const AppFlow = () => {
  const [token, setToken] = useState(null)
  const [role, setRole] = useState()

  useEffect(() => {
    checkAuthentication()
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (token) {
          BackHandler.exitApp()
          return true
        }
        return false
      }
    )

    return () => {
      backHandler.remove()
    }
  })

  const checkAuthentication = async () => {
    const storedToken = await AsyncStorage.getItem('token')
    if (storedToken) setToken(storedToken)

    const storedRole = await AsyncStorage.getItem('role')
    if (storedRole) setRole(storedRole)
  }

  return (
    <Drawer.Navigator initialRouteName='Profile'>
      <Drawer.Screen name='Profile' component={Profile} />
      <Drawer.Screen name='Election Results' component={ElectionFlow} />

      {role === ROLES.admin ? (
        <>
          <Drawer.Screen name='Constituency' component={ConstituencyFlow} />
          <Drawer.Screen name='Users List' component={UserListScreen} />
          <Drawer.Screen name='Register User' component={Register} />
          <Drawer.Screen
            name='Candidate Applications'
            component={CandidateApplicationsList}
          />
        </>
      ) : null}
      {role === ROLES.voter ? (
        <>
          <Drawer.Screen name='Votes' component={VotingFlow} />
          <Drawer.Screen name='Users List' component={UserListScreen} />
        </>
      ) : null}
      <Drawer.Screen name='Logout' component={LogoutScreen} />
    </Drawer.Navigator>
  )
}

export default AppFlow
