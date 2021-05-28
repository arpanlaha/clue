# Clue

A simple, client-only implementation of Clue.

## Overview

To use this application, select which characters you are playing with and generate a game. The application will randomly select the murderer, murder weapon, and murder room, then dividing up the remaining cards amongst the active players. This game state is encoded in Base64 and stored in the URL for easy sharing with friends while obfuscating game data to prevent inadvertent cheating.

### Disclaimer

This application is made for my friends and I and as such only implements the necessary functionality for us to play clue remotely. Any true state (e.g. the placement of pieces on the game board) is excluded from this application and needs to be handled externally, which in my case is done in a Google Sheets document (contact me if you want a copy of this). There is no enforcing of security, and this application operates on the assumption that players will not cheat.
