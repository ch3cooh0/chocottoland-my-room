import React from "react";

interface SelectComponentProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  width?: string;
  height?: string;
}

const SelectComponent: React.FC<SelectComponentProps> = ({ options, value, onChange, width = "100%", height = "2em" }) => {
  return (
    <select 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
        style={{ 
          width: width, 
          height: height, 
          padding: "0.5rem", 
          borderRadius: "4px", 
          border: "1px solid #ccc" 
        }}
      >
        <option value=""></option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
      ))}
    </select>
  );
};

export default SelectComponent;