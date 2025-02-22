import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";

interface NumberInputProps {
  inputWidth?: string;
  inputHeight?: string;
  buttonSize?: string;
  value: number;
  setValue: (value: number) => void;
  minValue?: number;
  maxValue?: number;
}

const NumberInput: React.FC<NumberInputProps> = ({
  inputWidth = "2em",
  inputHeight = "1.8em",
  buttonSize = "1.8em",
  value,
  setValue,
  minValue = -Infinity,
  maxValue = Infinity,
}) => {
  const increment = () => setValue(Math.min(maxValue, value + 1));
  const decrement = () => setValue(Math.max(minValue, value - 1));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue)) {
      setValue(Math.max(minValue, Math.min(maxValue, newValue)));
    }
  };

  return (
    <div style={{ display: "inline-flex", alignItems: "center", width: "100%" }}>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        style={{
          width: inputWidth,
          height: inputHeight,
          textAlign: "center",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          marginRight: "5px",
        }}
      />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <IoIosRemoveCircle
          onClick={decrement}
          style={{
            width: buttonSize,
            height: buttonSize,
            color: "blue",
          }}
        />
        <IoIosAddCircle
          onClick={increment}
          style={{
            width: buttonSize,
            height: buttonSize,
            color: "blue",
          }}
        />
      </div>
    </div>
  );
};

export default NumberInput;
