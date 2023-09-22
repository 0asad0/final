import { createStackNavigator } from '@react-navigation/stack'

import ActiveElectionDetails from './details'
import ActiveElections from './elections'
import { NAV_HEADERS } from 'constants/variable'

const Stack = createStackNavigator()

const VotingFlow = () => (
  <Stack.Navigator initialRouteName='ActiveElections'>
    <Stack.Screen
      name='ActiveElections'
      component={ActiveElections}
      options={NAV_HEADERS}
    />
    <Stack.Screen name='Election Details' component={ActiveElectionDetails} />
  </Stack.Navigator>
)

export default VotingFlow
