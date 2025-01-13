import { runLLM } from "./llm";
import { addMessages, getDb, getMessages, saveToolResponse } from "./memory";
import { runTool } from "./toolRunner";
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

    while(true) {
    const history = await getMessages();

    const response = await runLLM({messages: history, tools});
    // this response will decide whether to run the tool or not
    // response.tool_calls = true; if tool is required
    // response.content = true; if tool is not required then we can throw the op directly

    await addMessages([response]);

    if(response.content){
        loader.stop();
        logMessage(response);
        return getMessages()
    }

    if(response.tool_calls){
        const toolCall = response.tool_calls[0];
        logMessage(response);
        loader.update(`executing ${toolCall.function.name}`);
        const toolResponse = await runTool(toolCall, userMessage);

        await saveToolResponse(toolCall.id, toolResponse);
    } 
}

}