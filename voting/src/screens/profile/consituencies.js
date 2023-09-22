import React from 'react'
import { FlatList, View } from 'react-native'
import { Button } from 'react-native-paper'

import { showToast } from 'utils/toast'
import UpdateConstituencyItems from 'components/ConstituencyItem/Update'
import useGetConstituencies from 'hooks/useGetConstituencies'
import { updateUserConstituency } from 'services/API/constituencies'

import styles from 'styles'

const Constituencies = ({ route, navigation }) => {
  const constituencies = useGetConstituencies(navigation)

  const handleConstituencySelection = async item => {
    const res = await updateUserConstituency(item, route.params.id)
    if (res?.status === 200) {
      showToast(res?.data.message)
      navigation.pop()
    }
  }

  return (
    <View style={styles.container}>
      <Button
        mode='contained'
        style={styles.button}
        onPress={() => navigation.navigate('AddConstituency')}
      >
        Add Constituency
      </Button>
      <FlatList
        data={constituencies}
        renderItem={({ item }) => (
          <UpdateConstituencyItems
            item={item}
            handleConstituencySelection={handleConstituencySelection}
          />
        )}
        keyExtractor={item => item._id}
      />
    </View>
  )
}

export default Constituencies
