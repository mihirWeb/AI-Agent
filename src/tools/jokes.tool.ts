import {z} from "zod";
import type { ToolFn } from "../../types";
import fetch from "node-fetch";

// defination of tool, it generally includes name, parameters and description of the tool
export const jokeToolDefination = {
    name: 'get_joke',
    parameters : z.object({}),
    description: "use this tool to get a random joke",
}

type Args = z.infer<typeof jokeToolDefination.parameters>

// actual tool function logic
export const jokes: ToolFn<Args, String> = async({ toolArgs }) => {
    const response = await fetch('https://icanhazdadjoke.com/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    })
    return (await response.json()).joke;
}

