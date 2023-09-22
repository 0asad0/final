import { createStackNavigator } from '@react-navigation/stack'
import { NAV_HEADERS } from 'constants/variable'

import AddConstituency from 'screens/constituencies/add'
import Constituencies from 'screens/profile/consituencies'
import ProfileScreen from 'screens/profile/Profile'
import Users from './users'

const Stack = createStackNavigator()
const UserListScreen = () => (
  <Stack.Navigator initialRouteName='Users'>
    <Stack.Screen name='Users' component={Users} options={NAV_HEADERS} />
    <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
    <Stack.Screen name='AddConstituency' component={AddConstituency} />
    <Stack.Screen name='Constituencies' component={Constituencies} />
  </Stack.Navigator>
)

export default UserListScreen
