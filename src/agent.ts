import { runLLM } from "./llm";
import { addMessages, getDb, getMessages } from "./memory";
import { logMessage, showLoader } from "./ui";

export const runAgent = async({
    userMessage,
    tools
} : {
    userMessage: string;
    tools: any[];

}) => {
    const loader = showLoader('🤔')
    await addMessages([{role: 'user', content: userMessage}]);

    const history = await getMessages();

    const response = await runLLM({messages: history, tools});

    if((response.tool_calls){
        console.log("whole response: ", response);
        console.log("tool calls: ", response.tool_calls)
    }

    await addMessages([response]) 

    loader.stop();
    logMessage(response);
    return getMessages;

}