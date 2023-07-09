import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { colours } from '../subatoms/colours';

const CustomDropdown = ({dropdownOptions, dropdownName}: any) => {

  const [selectedValue, setSelectedValue] = useState("All"); // might need to fix this
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const renderDropdownItem = ({item}: any) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => {
        setSelectedValue(item);
        toggleDropdown();
      }}
    >
      <Text style={styles.text}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
        <Text style={styles.text}>
          <Text style={{fontWeight: '300'}}>
            {dropdownName}
          </Text>
        {selectedValue}
        </Text>
      </TouchableOpacity>
      {isDropdownOpen && (
        <View style={styles.dropdownList}>
          <FlatList
            data={dropdownOptions}
            renderItem={renderDropdownItem}
            keyExtractor={(item) => item}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    width: '100%',
  },
  dropdown: {
    borderWidth: 0,
    paddingVertical: 5,
  },
  dropdownList: {
    borderTopWidth: 0,
    borderColor: 'grey',
    maxHeight: 110,
  },
  dropdownItem: {
    padding: 3,
  //   backgroundColor: colours.secondaryPurple,
  },
  text: {
    color: 'grey',
    fontSize: 15,
    fontWeight: '700'
  }
});

export default CustomDropdown;