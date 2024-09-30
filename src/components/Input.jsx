function transformToKey(str) {
  return str
    .split(" ")
    .map((word, index) =>
      index === 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join("");
}

export default function Input({ labelName, inputValues, onValueChange }) {
  const key = transformToKey(labelName);

  const handleChangeEvent = (e) => {
    onValueChange((prevValues) => {
      return { ...prevValues, [key]: +(e.target.value)};
    });
  }

  return (
    <p>
      <label>{labelName}</label>
      <input
        type="number"
        value={inputValues && inputValues[labelName]}
        onChange={(e) => {handleChangeEvent(e)}}
        required
      />
    </p>
  );
}