import { Configuration, OpenAIApi } from "openai";
import React, { useState } from "react";
import TextBox from "../../components/textBox";

const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});



function GenerateServerSidePerformanceTests() {
    const [endpoint, setEndpoint] = useState("");
    const [method, setMethod] = useState("GET");
    const [payload, setPayload] = useState("");
    const [responseSample, setResponseSample] = useState("");
    const [tool, setTool] = useState("");
    const [generatedTests, setOutputTests] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [language, setLanguage] = useState(null);

    const removeEmptyLinesAtStart = (text) => {
        if (text.startsWith("\n")) {
            return removeEmptyLinesAtStart(text.slice(2));
        }

        return text;
    };

    const generate = async () => {
        setIsLoading(true);
        try {
            const prompt = `Here are some APIs for which I have to write automated performance tests: \n
             - Endpoint: ${endpoint} \n
             - Method: ${method} \n
             - Payload: ${payload} \n
             - Sample Response: ${responseSample} \n
             Can you write a automated performance testing scripts to test these using ${tool},
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
            console.log(tool);
            const openai = new OpenAIApi(configuration);
            const completion = await openai.createCompletion({
                model: "text-davinci-003",
                prompt,
                max_tokens: 1024,
            });
            const response = removeEmptyLinesAtStart(completion.data.choices[0].text);
            setOutputTests(response);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {isLoading && (
                <div className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-10">
                    <div class="w-24 h-24 border-l-2 border-white border-opacity-75 rounded-full animate-spin"></div>
                </div>
            )}
            <div className="flex justify-between items-center py-6 font-inter">
                <div className="flex items-center">
                    <h2 className="font-semibold text-lg mr-6">
                        Generate Server-Side Performance Tests
                    </h2>
                </div>
                <button
                    type="button"
                    className="rounded-full bg-flamingo-pink px-5 py-2"
                    onClick={generate}
                >
                    Generate
                </button>
            </div>
            <div className="flex justify-between items-center pt-1 gap-4">
                <div>
                    <div className="mb-4">
                        <label>Endpoint:</label>
                        <input
                            type="text"
                            value={endpoint}
                            onChange={e => setEndpoint(e.target.value)}
                            style={{ backgroundColor: "#161b22" }}
                        />
                    </div>
                    <div className="mb-4">
                        <label>Method:</label>
                        <select value={method} onChange={e => setMethod(e.target.value)} style={{ backgroundColor: "#161b22" }}>
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                        </select>
                    </div>
                    {method === "POST" && (
                        <div className="mb-4">
                            <label>Payload:</label>
                            <textarea
                                value={payload}
                                onChange={e => setPayload(e.target.value)}
                                style={{ backgroundColor: "#161b22" }}
                            />
                        </div>
                    )}
                    <div className="mb-4">
                        <label>Sample Response:</label>
                        <textarea
                            value={responseSample}
                            onChange={e => setResponseSample(e.target.value)}
                            style={{ backgroundColor: "#161b22" }}
                        />
                    </div>
                    <div className="mb-4">
                        <label>Test Tool:</label>
                        <select value={tool} onChange={e => setTool(e.target.value)} style={{ backgroundColor: "#161b22" }}>
                            <option value="K6">K6</option>
                            <option value="Locust">Locust</option>
                        </select>
                    </div>
                </div>
                <TextBox
                    text={generatedTests}
                    onTextChange={() => { }}
                    title="Generated Server Side Performance Tests"
                    readOnly={true}
                    language={language}
                    onLanguageChange={(language) => setLanguage(language)}
                />
            </div>
        </div>
    );
}

export default GenerateServerSidePerformanceTests;