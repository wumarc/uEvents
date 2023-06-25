import { colours } from "./colours"

export const ScreenSpacing = {
    marginHorizontal: 10,
    marginVertical: 20,
    paddingHorizontal: 8,
    paddingVertical: 10,
}

export const fontSize = {
    extraSmall: 10,
    small: 14,
    medium: 16,
    large: 20,
}

export const fontWeight = {
    light: "300",
    normal: "400",
    bold: "700" as "bold", // what is this weird ass error?
}

const fontStyle = {
    regular: "Tahoma"
}

export const Title = {
    fontSize: fontSize.large,
    fontWeight: fontWeight.bold,
    color: colours.blackText,
}

export const Subtitle = {
    fontSize: fontSize.medium,
    fontWeight: fontWeight.light,
}

export const regularText = {
    fontSize: fontSize.medium,
    fontWeight: fontWeight.light
}