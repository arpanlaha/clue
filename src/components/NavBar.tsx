import React, { ReactElement } from "react";
import { Heading, HStack, Switch, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function NavBar(): ReactElement {
  const { toggleColorMode } = useColorMode();

  return (
    <nav>
      <a href="/">
        <Heading as="h1">Clue</Heading>
      </a>
      <HStack>
        <SunIcon />
        <Switch onChange={toggleColorMode} />
        <MoonIcon />
      </HStack>
    </nav>
  );
}
