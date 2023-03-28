# ChatGPT Discord Chatbot
This project is a starter kit for using OpenAI on Discord. It's running the latest version of the API for all and only requires Discord Bot setup and API key setup.

## Introduction

To start using the project, you will need the following. Node version 16 or above, a Discord acocunt and an OpenAI account.

### Current Configuration
The last tested version of this was performed on the following:

- Node Version 18.1.0
- NPM Version 8.8.0

### Starting Guide

Prepare the following items

- OpenAI account + API Key
- Dicord Account and Channel
- NodeJS

### Installation

- Create a Discord Channel
- Head to Developer Applications
- - https://discord.com/developers/applications/
- Create a Discord Application
- Create a Discord Bot
- Update the .env file with the Bot Token
- Create OpenAI account
- Generate an API token
- Update the .env API key and Org Id
- Perform an NPM install
- Run node ./index.js

The application is set to listen for tags from ChatGPT and the word ``ChatGPT`` in sentences and reply to users.

It is also set to reply to other prompts such as the word ``Josh``.

It is configured to not respond to itself or other bots.

The current prompt is engineered to prepare OpenAI AI as a chatbot. You can update this prompt in many ways, such a reciept bot, or a informational bot, or much more.