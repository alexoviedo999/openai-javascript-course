import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { PlanAndExecuteAgentExecutor } from "langchain/experimental/plan_and_execute";
import { exec } from "child_process";

// export OPENAI_API_KEY=<>
// export SERPAPI_API_KEY=<>
// Replace with your API keys!

// to run, go to terminal and enter: cd playground
// then enter: node quickstart.mjs
console.log("Welcome to the LangChain Quickstart Module!");

// const template =
//   "Please give me some ideas for content I should write about regarding {topic}? The content is for {socialplatform}. Translate to {language}.";
// const prompt = new PromptTemplate({
//   template: template,
//   inputVariables: ["topic", "socialplatform", "language"],
// });

// This allows us to format the template into a string, which is finally passed to the LLM
// const formattedTemplate = await prompt.format({
//   topic: "artificial intelligence",
//   socialplatform: "twitter",
//   language: "spanish",
// });
// console.log(formattedTemplate);

// const model = new OpenAI({ temperature: 0.9 });
// const chain = new LLMChain({ llm: model, prompt: prompt });

// Now that we've defined the chain, we can call the LLMChain, which does two steps:
// First it properly formats the prompt according to the user input variables
// Then it makes the call to Open AI's API!
// const resChain = await chain.call({
//   topic: "artificial intelligence",
//   socialplatform: "twitter",
//   language: "english",
// });

// console.log({ resChain });



const agentModel = new OpenAI({
    temperature: 0,
    modelName: "gpt-3.5-turbo",
  });
  
  // serpTool.returnDirect = true;
  
  const tools = [
    new SerpAPI(process.env.SERPAPI_API_KEY, {
      location: "Austin,Texas,United States",
      hl: "en",
      gl: "us",
    }),
    new Calculator(),
  ];
  
//   const executor = await initializeAgentExecutorWithOptions(tools, agentModel, {
//     agentType: "zero-shot-react-description",
//     verbose: true,
//     maxIterations: 5,
//   });
//   console.log("Loaded agent.");
//   const input = "What is Langchain?";
  
//   console.log(`Executing with input "${input}"...`);

//   // Awesome, so we can see it figured out that it needed to use a search engine.
//   const result = await executor.call({ input });
  
//   console.log(`Got output ${result.output}`);

// const agentTools = [new Calculator(), new SerpAPI()];
// only works with Chat models
const chatModel = new ChatOpenAI({
  temperature: 0,
  modelName: "gpt-3.5-turbo",
  verbose: true,
});
const executor = PlanAndExecuteAgentExecutor.fromLLMAndTools({
  llm: chatModel,
  tools: tools,
});

// const result = await executor.call({
//   input: `Who is the current president of the United States? What is their current age raised to the second power?`,
// });

// console.log({ result });

const llm = new OpenAI({});
const memory = new BufferMemory();
const conversationChain = new ConversationChain({ llm: llm, memory: memory });
const res1 = await conversationChain.call({
  input: "Hey. My name is Alex.",
});
console.log(res1);

const res2 = await conversationChain.call({
  input: "What is my name?",
});
console.log(res2);