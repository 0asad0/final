import { useState, useEffect } from 'react'

import { getConstituencies } from 'services/API/constituencies'

const useGetConstituencies = navigation => {
  const [data, setData] = useState([])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getConstituencies().then(res => setData(res))
    })
    return unsubscribe
  }, [navigation])

  return data
}

export default useGetConstituencies
