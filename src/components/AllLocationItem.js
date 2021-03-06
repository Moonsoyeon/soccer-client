import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { STATES } from '../constants/constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    justifyContent: "space-between"
  },
  info: {
    marginTop: 15,
    marginLeft: 8,
    fontSize: 18
  },
  input: {
    margin: 7,
    width: '95%',
    height: 40,
    alignSelf: 'center',
    borderColor: "grey",
    borderWidth: 0.8
  }
})

const AllLocationItem = (props) => {
  const setLocation = props.setLocation;
  const [state, setState] = useState('All');
  const [district, setDistrict] = useState('All');

  useEffect(() => {
    setLocation({ state: state, district: district });
  }, [state, district]);

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={state}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => {
          setState(itemValue);
        }
        }>
        <Picker.Item label="전체" value="All" />
        <Picker.Item label="부산광역시" value="Busan" />
        <Picker.Item label="서울특별시" value="Seoul" />
      </Picker>

      <Picker
        selectedValue={district}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => {
          setDistrict(itemValue);
        }}>
        {
          {
            ...STATES,
            All: [{ label: "전체", value: "All" }]
          }[state].map(
            ({ label, value }) => <Picker.Item key={label + value} label={label} value={value} />
          )
        }
      </Picker>
    </View>
  );
};

export default AllLocationItem;