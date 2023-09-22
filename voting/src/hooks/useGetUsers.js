import { useState, useEffect } from 'react'

import { fetchUsers } from 'services/API/users'

const useGetUsers = navigation => {
  const [data, setData] = useState([])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUsers().then(res => setData(res.data?.users))
    })
    return unsubscribe
  }, [navigation])

  return data
}

export default useGetUsers
