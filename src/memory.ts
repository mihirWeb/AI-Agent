import { JSONFilePreset } from 'lowdb/node' // low database that stores data in JSON files in the local file system
import type { AIMessage } from '../types'
import { v4 as uuidv4 } from 'uuid' // a library to generate unique identifiers (UIDs) bcz we are not db like mongodb

export type MessageWithMetadata = AIMessage & { // & in typescript is used to combine types
  id: string
  createdAt: string
}

type Data = { // type of our database
    messages: MessageWithMetadata[]
}

export const addMetadata = (message: AIMessage) => { // add metadata while saving in db
    return {
        ...message, // spread operator to combine the properties of the message object to make it compatible with the MessageWithMetadata type
        id: uuidv4(),
        createdAt: new Date().toISOString()
    }
}

export const removeMetadata = (message: MessageWithMetadata) => { // remove metadata while retrieving from db to give AI 
    const { id, createdAt, ...rest } = message // object with only the content and role properties
    return rest
}

const defaultData: Data = {messages: []}; // defualt database schema

export const getDb = async() => {
    const db = await JSONFilePreset<Data>('db.json', defaultData); // JSONFilePrest: function by lowdb to create and get db; db.json is the file it will create with defaultData
    return db
}

export const addMessages = async (messages: AIMessage[]) => {
    const db = await getDb();
    db.data.messages.push(...messages.map(addMetadata));
    await db.write();
}

export const getMessages = async()=>{
    const db = await getDb();
    return db.data.messages.map(removeMetadata);
}

// to save response of tools-
export const saveToolResponse = async (
    toolCallId: string,
    toolResponse: string
) => {
    return addMessages([
        {
            role: 'tool',
            content: toolResponse,
            tool_call_id: toolCallId
        }
    ])

}
