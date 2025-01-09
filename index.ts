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
  parameters: z.object({ // parameters are inputs required by the tool
    reasoning: z.string().describe('Why did you pick this tool?'), // so that i response we can know why ai used this tool // the sample response is given below-
  }),
  description: 'use this tool to get the wheather of outside area'
}

const response = await runAgent({userMessage, tools: [weatherTool]})

console.log(response);

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
