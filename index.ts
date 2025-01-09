import 'dotenv/config'
import { runLLM } from './src/llm'
import { addMessages, getMessages } from './src/memory'
import { runAgent } from './src/agent'
import { z } from 'zod'

const userMessage = process.argv[2]

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

const weatherTool = { // a demo tool, not interacting with any external API
  name: 'get_weather',
  parameters: z.object({}),
  description: 'use this tool to get the wheather of outside area'
}

const response = await runAgent({userMessage, tools: [weatherTool]})

console.log(response);