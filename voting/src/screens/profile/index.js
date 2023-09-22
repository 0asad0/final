import { createStackNavigator } from '@react-navigation/stack'

import CandidateApplication from './candidateApplication'
import Constituencies from './consituencies'
import ProfileScreen from './Profile'
import { NAV_HEADERS } from 'constants/variable'

const Stack = createStackNavigator()

const Profile = () => (
  <Stack.Navigator initialRouteName='ProfileScreen'>
    <Stack.Screen
      name='Constituencies'
      component={Constituencies}
      options={NAV_HEADERS}
    />
    <Stack.Screen
      name='ProfileScreen'
      component={ProfileScreen}
      options={NAV_HEADERS}
    />
    <Stack.Screen
      name='CandidateApplication'
      component={CandidateApplication}
      options={NAV_HEADERS}
    />
  </Stack.Navigator>
)

export default Profile
