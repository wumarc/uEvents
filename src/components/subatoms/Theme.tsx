import { createTheme } from "@rneui/themed";
import { TextStyle } from "react-native"
import {Dimensions} from 'react-native';
import { Platform } from "react-native";

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const colours = {
    purple: '#B075AE',
    black: '#222222', // For big text
    grey: '#777777',
    primaryGrey: '#EDEDED',
    white: '#FFFFFF',
    darkPurple: '#8A4287',
    // textGrey: '#99A1AA',
    // titleGrey: '#47494F',
}

export const spacing = {
    horizontalMargin1: windowWidth * 0.05,
    verticalMargin1: {marginVertical: windowWidth * 0.03},
    verticalMargin2: {marginVertical: windowWidth * 0.01},
    bottomMargin1: {marginBottom: windowWidth * 0.02},
    verticalPadding1: {paddingVertical: windowWidth * 0.1}, // to be changed
    verticalPadding2: {paddingVertical: windowWidth * 0.01},
    page: windowWidth * 0.03,
    page2: windowWidth * 0.07,
}

export const borderRadius = {
    small: 8,
    medium: 10,
    large: 15,
}

export const fonts = {
    title1: {color: colours.black, fontSize: 27, fontWeight: '500' as TextStyle['fontWeight']},
    title2: {color: colours.black, fontSize: 20, fontWeight: '500' as TextStyle['fontWeight']},
    title3: {color: colours.black, fontSize: 17, fontWeight: '300' as TextStyle['fontWeight']},
    regular: {color: colours.grey, fontSize: 16, fontWeight: '300' as TextStyle['fontWeight']},
    small: {color: colours.grey, fontSize: 14, fontWeight: '200' as TextStyle['fontWeight']}
}

export const buttons = {
    button1: {backgroundColor: colours.purple, padding: 10, borderRadius: borderRadius.small,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
            },
            android: {
                elevation: 4,
            },
    })
    }
}

export const renTheme = createTheme({
    lightColors: {
      primary: colours.purple,
    },
    darkColors: {
    //   primary: 'blue',
    },
    components: {
      Button: {
        color: colours.purple,
        style: {
            paddingHorizontal: '2.5%',
            borderRadius: borderRadius.large,
            marginVertical: '1%'
        }
      },
    },
});