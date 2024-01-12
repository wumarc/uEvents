import { Dropdown } from "react-native-element-dropdown";
import { colours, windowHeight } from "../subatoms/Theme";

interface CustomDropdownProps {
  searchPlaceholder: string;
  data: any;
  labelField: any;
  valueField: any;
  placeholder: string;
  onChange: (item: any) => void;
  style: any;
}

export const CustomDropdown = (props: CustomDropdownProps) => {
  return (
    <Dropdown
      search
      searchPlaceholder={props.searchPlaceholder}
      placeholderStyle={{ fontSize: 17, padding: 7 }}
      data={props.data}
      labelField={props.labelField}
      valueField={props.valueField}
      placeholder={props.placeholder}
      style={{
        ...props.style,
        borderWidth: 1,
        borderColor: colours.grey,
        borderRadius: 6,
        height: windowHeight * 0.05,
        marginLeft: 10,
        marginRight: 10,
      }}
      onChange={props.onChange}
    />
  );
};
