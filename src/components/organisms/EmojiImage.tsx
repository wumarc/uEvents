import { Platform, View, ViewStyle, Image } from "react-native";
import { SvgUri, SvgXml } from "react-native-svg";
// @ts-ignore
import emojiUnicode from "emoji-unicode";
import { ALL_EMOJIS } from "../../assets/emoji_list";
// import { EMOJI_REQUIRE_LIST } from "../../assets/emoji_list_final";

export function emojiUrl(emoji: string) {
  if (emoji == undefined) {
    return "";
  }
  let unicodeStringRaw = emojiUnicode(emoji) as string;
  if (unicodeStringRaw.length == 0) {
    return "";
  }
  if (unicodeStringRaw == undefined) {
    return "";
  }
  for (let i = 0; i < unicodeStringRaw.length; i++) {
    if (unicodeStringRaw[i] == " ") {
      // replace with "-"
      unicodeStringRaw = unicodeStringRaw.slice(0, i) + "-" + unicodeStringRaw.slice(i + 1);
    }
  }
  let currentUrl = unicodeStringRaw.toUpperCase() + ".svg";

  if (ALL_EMOJIS.includes(currentUrl)) {
    return currentUrl;
  }
  while (!ALL_EMOJIS.includes(currentUrl)) {
    if (!currentUrl.includes("-")) {
      return "";
    }
    let parts = currentUrl.split("-");
    // remove last part
    parts.pop();
    currentUrl = parts.join("-") + ".svg";
  }

  return currentUrl;
}

interface EmojiImageProps {
  emoji?: string;
  style?: ViewStyle;
}

export const EmojiImage = (props: EmojiImageProps) => {
  if (props.emoji == undefined || props.emoji == "") {
    return <></>;
  }

  let url = emojiUrl(props.emoji);
  if (url == "") {
    return <></>;
  }

  if (Platform.OS === "web") {
    // let emoji = (EMOJI_REQUIRE_LIST as any)[url];
    let emoji = "https://openmoji.org/data/color/svg/" + url;
    return (
      <View style={props.style}>
        <img
          src={emoji}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>
    );
  } else {
    return (
      // Mobile has shit support for SVG files
      // The best solution would probably be to use the local ones in /assets instead of fetching the emojis across the web every time
      // But for now this is the solution
      // Refer to the react-native-svg library docs for more details
      <View style={props.style}>
        <SvgUri uri={"https://openmoji.org/data/color/svg/" + url} width="100%" height="100%" fill="black" />
      </View>
    );
  }
};
