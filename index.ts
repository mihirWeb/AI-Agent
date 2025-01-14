import 'dotenv/config'
import { runLLM } from './src/llm'
import { addMessages, getMessages } from './src/memory'
import { runAgent } from './src/agent'
import { z } from 'zod'
import { tools } from './src/tools'

const userMessage = process.argv[2]

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

await runAgent({userMessage, tools})

// console.log(response);

// sample response-
// {
//   "tool_calls": [
//     {
//       "tool_name": "get_weather",
//       "parameters": {
//         "reasoning": "The user asked about the weather." // reasoning
//       }
//     }
//   ],
//   "response": "I am using the weather tool to get information about today's weather."
// }
