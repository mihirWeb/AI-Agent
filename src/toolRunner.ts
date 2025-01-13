import OpenAI from "openai";

const getWeather = () => `Hot, it's 90 deg`;


export const runTool = async(
    toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
    userMessage: string
) => {
    const input = { // the arguments we need to pass to the tool
        userMessage,
        toolArgs: JSON.parse(toolCall.function.arguments) || {},
    }

    switch (toolCall.function.name) {
        case "get_weather":
            return getWeather();
        default:
            throw new Error(`Tool not supported: ${toolCall.function.name}`);
    }
}