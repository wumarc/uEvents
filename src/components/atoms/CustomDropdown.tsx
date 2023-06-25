import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { colours } from '../subatoms/colours';

const CustomDropdown = () => {
  const dropdownOptions = [
    { label: 'All', value: 'All'},
    { label: 'On-campus', value: 'On-campus'},
    { label: 'Off-campus', value: 'Off-campus'},
  ];

  const [selectedValue, setSelectedValue] = useState(dropdownOptions[0].value);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const renderDropdownItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => {
        setSelectedValue(item.value);
        toggleDropdown();
      }}
    >
        <Text style={{
            color: 'white', 
            fontSize: '15', 
            fontWeight: '700',
        }}>
            {item.label}
        </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
        <Text style={{color: 'white', fontSize: '15', fontWeight: '700'}}>{selectedValue}</Text>
      </TouchableOpacity>
      {isDropdownOpen && (
        <View style={styles.dropdownList}>
          <FlatList
            data={dropdownOptions}
            renderItem={renderDropdownItem}
            keyExtractor={(item) => item.value}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.secondaryPurple,
    borderRadius: 20,
    padding: 5,
    marginTop: 120,// remove this
    alignItems: 'center',
    width: 130,
  },
  dropdown: {
    borderWidth: 0,
    paddingVertical: 5,
  },
  dropdownList: {
    borderTopWidth: 1,
    borderColor: 'grey',
    maxHeight: 110,
  },
  dropdownItem: {
    padding: 10,
    backgroundColor: colours.secondaryPurple,
  },
});

export default CustomDropdown;