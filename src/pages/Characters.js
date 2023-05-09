import { View, Text, Button, FlatList } from 'react-native';
import React , {useState} from 'react';
import axios from 'axios';

export const CharacterCard = ({character}) => {
 return (
  <View>
    <Text>{character.name}</Text>
  </View>
 )
}

const Characters = () => {
  const [character, setCharacter] = useState([])

  async function fetchData() {
    const response = await axios.get(
      'https://rickandmortyapi.com/api/character'
    );
    setCharacter(response.data.results);

    // const responsenext = await axios.get(
    //   response.data.info.next
    // );
  }

  const renderItem = ({item}) => (
    <CharacterCard character={item} />
  )

  return (
    <View>
      <FlatList 
      data={character}
      renderItem= {renderItem}
      keyExtractor={(item) => item.id.toString()}
      />
      <Button title='Fetch Data' onPress={fetchData}/>
    </View>
  )
}

export default Characters;