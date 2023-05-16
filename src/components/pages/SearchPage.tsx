import { View, Text } from "react-native";
import { useState } from "react";
import { SearchBar } from '@rneui/themed';

const SearchPage = () => {

  const [value, setValue] = useState("");

  return (
    <SearchBar
      platform="default"
      containerStyle={{}}
      inputContainerStyle={{}}
      inputStyle={{}}
      leftIconContainerStyle={{}}
      rightIconContainerStyle={{}}
      lightTheme
      loadingProps={{}}
      onChangeText={newVal => setValue(newVal)}
      placeholder="Type here..."
      placeholderTextColor="#888"
      round
      value={value}
    />
  );
    
};
  
export default SearchPage;