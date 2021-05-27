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
        <a
          href="https://github.com/arpanlaha/clue"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img src="/github.svg" alt="GitHub logo" />
        </a>
      </HStack>
    </nav>
  );
}
