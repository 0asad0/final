import { createStackNavigator } from '@react-navigation/stack'

import Elections from './all'
import ElectionDetails from './details'
import StartElection from './add'
import { NAV_HEADERS } from 'constants/variable'

const Stack = createStackNavigator()

const ElectionFlow = () => (
  <Stack.Navigator initialRouteName='Elections'>
    <Stack.Screen
      name='Elections'
      component={Elections}
      options={NAV_HEADERS}
    />
    <Stack.Screen name='Election Details' component={ElectionDetails} />
    <Stack.Screen name='Start Election' component={StartElection} />
  </Stack.Navigator>
)

export default ElectionFlow
