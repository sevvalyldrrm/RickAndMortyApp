import { View, Text } from 'react-native'
import React from 'react'
import useFetch from '../hooks/useFetch';
import {REACT_APP_RM} from '@env';


const CharactersDetail = ({route}) => {
  const {id} = route.params;
  const {loading, data} = useFetch(`${REACT_APP_RM}/character/${id}`);
  return (
    <View>
      <Text>{data.name}</Text>
      <Text>dfghjklş</Text>
    </View>
  )
}

export default CharactersDetail