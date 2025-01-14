import OpenAI from "openai";
import { imageGenerator, imageGeneratorDefinition } from "./tools/imageGeneration.tool";
import { jokes, jokeToolDefination } from "./tools/jokes.tool";
import { reddit, redditToolDefinition } from "./tools/reddit.tool";


export const runTool = async(
    toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
    userMessage: string
) => {
    const input = { // the arguments we need to pass to the tool
        userMessage,
        toolArgs: JSON.parse(toolCall.function.arguments) || {},
    }

    switch (toolCall.function.name) {
        case imageGeneratorDefinition.name:
            return imageGenerator(input);
        case jokeToolDefination.name:
            return jokes(input);
        case redditToolDefinition.name:
            return reddit(input);
        default:
            return `Never run this tool: ${toolCall.function.name} again`;
    }
}