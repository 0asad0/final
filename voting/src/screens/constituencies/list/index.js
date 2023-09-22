import { Button } from 'react-native-paper'
import { FlatList, View } from 'react-native'
import React from 'react'

import ConstituencyItem from 'components/ConstituencyItem'
import useGetConstituencies from 'hooks/useGetConstituencies'

import styles from 'styles'

const Constituency = ({ navigation }) => {
  const constituenciesData = useGetConstituencies(navigation)

  return (
    <View style={styles.container}>
      <Button
        mode='contained'
        style={styles.button}
        onPress={() => {
          navigation.navigate('AddConstituency')
        }}
      >
        Add Constituency
      </Button>
      <FlatList
        data={constituenciesData}
        renderItem={ConstituencyItem}
        keyExtractor={item => item._id}
      />
    </View>
  )
}

export default Constituency
