import { colours } from "../subatoms/Theme";
import { SearchBar, SearchBarProps } from "react-native-elements";

interface CustomSearchBarProps {
  search: string;
  setSearch: any;
  placeholder: string;
  searchBarProps?: SearchBarProps;
}

export const CustomSearchBar = (props: CustomSearchBarProps) => {
  return (
    // @ts-ignore
    <SearchBar
      {...props.searchBarProps}
      platform="default"
      inputContainerStyle={{
        borderRadius: 6,
        height: 38,
        backgroundColor: "#ebebeb",
      }}
      /* 
      // @ts-ignore */
      inputStyle={{ outlineWidth: 0 }}
      containerStyle={{
        borderWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        margin: 8,
        padding: 0,
        backgroundColor: "transparent",
        borderColor: "transparent",
        shadowColor: "transparent",
        height: 38,
      }}
      onChange={(value) => {
        props.setSearch(value.nativeEvent.text);
      }}
      placeholder={props.placeholder}
      // placeholderTextColor="white"
      value={props.search}
      autoCapitalize="none"
      selectionColor={colours.purple}
    />
  );
};
