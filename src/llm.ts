import type { AIMessage } from '../types'
import { openai } from './ai'


export const runLLM = async ({
  model = 'gpt-4o-mini',
  userMessage,
//   messages,
  temperature = 0.1,
}: { // this is the type of the argument passed to the function
//   messages: AIMessage[]
  userMessage: string
  temperature?: number
  model?: string
}) => {
  const response = await openai.chat.completions.create({ // a method from the OpenAI SDK to generate response from input prompt
    model,
    messages: [{ role: 'user', content: userMessage }],
    temperature //This is a parameter that controls the randomness of the model's responses. A low value (e.g., 0.1) makes the output more deterministic, while a higher value (e.g., 0.9) allows for more diverse and creative responses.
  })

  return response.choices[0].message
} // notice that the return type is not explicitly defined because it is inferred from the return value of the function