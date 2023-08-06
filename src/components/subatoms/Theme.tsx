import { TextStyle } from "react-native"
import {Dimensions} from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const colours = {
    // primaryPurple: '#8A4287', This is to be removed
    purple: '#D6A9D5',
    black: '#222222', // For big text
    grey: '#777777',
    primaryGrey: '#EDEDED',
    white: '#FFFFFF',
    // textGrey: '#99A1AA',
    // titleGrey: '#47494F',
}

export const ScreenSpacing = {
    marginHorizontal: 10,
    marginVertical: 20,
    paddingHorizontal: 8,
    paddingVertical: 10,
}

export const borderRadius = {
    small: 5,
    medium: 10,
    large: 15,
}

export const fonts = {
    title1: {color: colours.black, fontSize: 30, fontWeight: '500' as TextStyle['fontWeight']},
    title2: {color: colours.black, fontSize: 20, fontWeight: '500'},
    title3: {color: colours.black, fontSize: 17, fontWeight: '300' as TextStyle['fontWeight']},
    regular: {color: colours.grey, fontSize: 16, fontWeight: '200'},
    small: {color: colours.grey, fontSize: 14, fontWeight: '200'}
}