import type { AIMessage } from '../types'
import { openai } from './ai'
import { zodFunction} from 'openai/helpers/zod'
import { systemPrompt } from './systemPrompts'


export const runLLM = async ({
  model = 'gpt-4o-mini',
  messages,
  temperature = 0.1,
  tools
}: { // this is the type of the argument passed to the function
  messages: AIMessage[]
  temperature?: number
  model?: string
  tools: any[]
}) => {

    const formattedTools = tools.map(zodFunction);

  const response = await openai.chat.completions.create({ // a method from the OpenAI SDK to generate response from input prompt
    model,
    messages: [{role: 'system', content: systemPrompt}, ...messages],
    tools: formattedTools,
    tool_choice: 'auto', // for beginners put it to auto to figure ai what tool to use
    parallel_tool_calls: false, // one tool at a time
    temperature //This is a parameter that controls the randomness of the model's responses. A low value (e.g., 0.1) makes the output more deterministic, while a higher value (e.g., 0.9) allows for more diverse and creative responses.
  })

  return response.choices[0].message
} // notice that the return type is not explicitly defined because it is inferred from the return value of the function