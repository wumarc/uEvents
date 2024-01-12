# This file generates emoji_list_final.tsx from emoji_list.tsx

every_emoji = []

# Open file emoji_list.tsx
with open('src/assets/emoji_list.tsx', 'r') as f:
    # Read file line by line
    for line in f:
        # Skip first and last line
        if line.strip() == 'export const emojiList = [':
            continue
        if line.strip() == ']':
            continue

        # If line is not empty
        if line.strip():
            # Remove all quotes
            line = line.replace('"', '')
            # Remove all commas
            line = line.replace(',', '')
            # Append line to every_emoji
            every_emoji.append(line.strip())

# Create file emoji_list_final.tsx
with open('src/assets/emoji_list_final.tsx', 'w') as f:
    # Write to file
    f.write('export const EMOJI_REQUIRE_LIST = {\n')
    for emoji in every_emoji:
        f.write('"{emoji}": require("./openmoji/{emoji}"),\n'.format(emoji=emoji))
    f.write('}\n')
