import { createStackNavigator } from '@react-navigation/stack'

import AddConstituency from './add'
import Constituency from './list'
import { NAV_HEADERS } from 'constants/variable'

const Stack = createStackNavigator()

const ConstituencyFlow = () => (
  <Stack.Navigator initialRouteName='Constituency'>
    <Stack.Screen
      name='AddConstituency'
      component={AddConstituency}
      options={NAV_HEADERS}
    />
    <Stack.Screen
      name='Constituency'
      component={Constituency}
      options={NAV_HEADERS}
    />
  </Stack.Navigator>
)

export default ConstituencyFlow
