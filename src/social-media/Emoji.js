import React, { useState } from "react";
import Picker from "emoji-picker-react";

export default function Emoji() {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [emoji, setEmoji] = useState([]);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setEmoji((prevdata) => [...prevdata, emojiObject]);
  };
  // console.log(emoji, "emojiadded");
  return (
    <div>
      {chosenEmoji ? (
        <div>
          {emoji.map((data) => {
            return <div>{data.emoji}</div>;
          })}
        </div>
      ) : (
        <span>No Emoji</span>
      )}
      <Picker onEmojiClick={onEmojiClick} />
    </div>
  );
}
