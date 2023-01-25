import { Configuration, OpenAIApi } from "openai";
import React, { useState } from "react";
import TextBox from "../../components/textBox";
import InputForm from "./inputForm";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

function GenerateServerSidePerformanceTests() {
  const [generatedTests, setOutputTests] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState(null);

  const removeEmptyLinesAtStart = (text) => {
    if (text.startsWith("\n")) {
      return removeEmptyLinesAtStart(text.slice(2));
    }
    return text;
  };

  const generate = async (fromData) => {
    setIsLoading(true);
    try {
      const prompt = `Here are some APIs for which I have to write automated performance tests: \n
             - Endpoint: ${fromData.endpoint} \n
             - Method: ${fromData.method} \n
             - Payload: ${fromData.payload} \n
             - Sample Response: ${fromData.responseSample} \n
             Can you write a automated performance testing of type ${fromData.type} testing and 
             scripts to test these using ${fromData.tool},
             in the format: \n
             \n Tool name : 
            \n **************** \n
            \n setup and installation process: \n
            \n Folder structure: \n (Suggest a root folder name)
            \n File name: \n
            \n Code: \n
            *************************************
            Do not include Sample response. 
            Make sure to write the whole response in Markdown format
            `;
      const openai = new OpenAIApi(configuration);
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        max_tokens: 1024,
      });
      const response = removeEmptyLinesAtStart(
        completion.data.choices[0].text
      );
      setOutputTests(response);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isLoading && (
        <div className='absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-10'>
          <div class='w-24 h-24 border-l-2 border-white border-opacity-75 rounded-full animate-spin'></div>
        </div>
      )}
      <div className='flex justify-between items-center py-6 font-inter'>
        <div className='flex items-center'>
          <h2 className='font-semibold text-lg mr-6'>
            Generate Server-Side Performance Tests
          </h2>
        </div>
      </div>
      <div className='flex justify-between items-center pt-1 gap-4'>
        <InputForm handleClick={(data) => generate(data)} />
        <TextBox
          text={generatedTests}
          onTextChange={() => {}}
          title='Generated Server Side Performance Tests'
          readOnly={true}
          language={language}
          onLanguageChange={(language) => setLanguage(language)}
        />
      </div>
    </div>
  );
}

export default GenerateServerSidePerformanceTests;
