import React, { ChangeEvent, ReactElement } from "react";
import { Select as ChakraSelect } from "@chakra-ui/react";

interface SelectProps {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: readonly string[];
  placeholder?: string;
}

export default function Select(props: SelectProps): ReactElement {
  const { options } = props;

  return (
    <ChakraSelect {...props}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </ChakraSelect>
  );
}
