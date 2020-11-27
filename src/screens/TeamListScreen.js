import React, { useEffect, useState } from "react";
import { View, Text, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import LocationItem from '../components/LocationItem';
import TeamItem from '../components/TeamItem'
import { api } from '../api';
import AsyncStorage from "@react-native-async-storage/async-storage";

async function getTeamList(setTeams, search, location) {
  console.log(location)
  try {
    const token = await AsyncStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token
      }
    }
    const res = await api.get(`/api/teams?teamName=${search}&state=${location.state}&district=${location.district}`, config);
    setTeams(res.data);
    console.log(res.data);
  } catch (error) {
    console.log(error)
  }
}

const TeamListScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [teams, setTeams] = useState([]);
  const [location, setLocation] = useState();

  useEffect(() => {
    getTeamList(setTeams, search, location);
  }, [search, location])

  return (
    <>
      <View style={{ flex: 1, padding: 20 }}>
        <SearchBar
          placeholder="Team Seach"
          onChangeText={setSearch}
          value={search}
          onSubmitEditing={() => console.log('search:' + search)}
          containerStyle={{ backgroundColor: '#DCDCDC' }}
          lightTheme round
          style={{ margin: 5, height: 5 }}
        />
        <View style={{ flexDirection: "row", alignItems: 'center' }}>
          <LocationItem all setLocation={setLocation} />
        </View>

        <FlatList
          data={teams}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TeamItem team={item} navigation={navigation} />}
          style={{ backgroundColor: 'white' }}
        />

        <Button
          title="팀 만들기"
          onPress={() => navigation.navigate('TeamCreate')}
        />

      </View>
    </>

  )
}
export default TeamListScreen;