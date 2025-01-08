import OpenAI from 'openai'


// This is the union of all the types of possible messages that can be sent to the AI
export type AIMessage =
  | OpenAI.Chat.Completions.ChatCompletionAssistantMessageParam // predefined message type from OpenAI SDK
  | { role: 'user'; content: string } // Represents a message sent by a user, containing a role and the message content.
  | { role: 'tool'; content: string; tool_call_id: string } // Represents a message sent by a tool, containing a role, the message content, and the tool_call_id.


// It’s an interface describing a function type for "tools" used in AI system
export interface ToolFn<A = any, T = any> {
  (input: { userMessage: string; toolArgs: A }): Promise<T>
}
