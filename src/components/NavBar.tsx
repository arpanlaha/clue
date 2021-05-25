import React, { ReactElement } from "react";
import { Heading, HStack, Switch, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function NavBar(): ReactElement {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <nav>
      <a href="/">
        <Heading as="h1">Clue</Heading>
      </a>
      <HStack>
        <SunIcon />
        <Switch isChecked={colorMode === "dark"} onChange={toggleColorMode} />
        <MoonIcon />
      </HStack>
    </nav>
  );
}
