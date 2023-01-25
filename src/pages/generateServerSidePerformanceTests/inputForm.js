import React, { useState } from "react";

function InputForm({ handleClick }) {
  const [endpoint, setEndpoint] = useState("");
  const [method, setMethod] = useState("GET");
  const [payload, setPayload] = useState("");
  const [responseSample, setResponseSample] = useState("");
  const [tool, setTool] = useState("K6");
  const [type, setType] = useState("Load");

  const onSubmit = (event) => {
    event.preventDefault();
    handleClick({
      endpoint,
      method,
      payload,
      responseSample,
      tool,
      type,
    });
  };

  return (
    <div className='w-2/3 bg-black-transparent p-5 relative'>
      <div className='flex justify-between w-full border-b border-white pb-4 mb-4 relative'>
        <h2 className='font-inter'>Fill the Form</h2>
      </div>
      <form
        onSubmit={onSubmit}
        className='overflow-auto h-[65vh] flex flex-col items-center'
      >
        <div className='w-full flex flex-wrap'>
          <div className='w-full lg:w-3/4 p-3'>
            <label className='block uppercase tracking-wide  text-xs font-bold mb-2'>
              Endpoint:
            </label>
            <input
              className='w-full bg-black-transparent rounded py-3 px-4 leading-normal focus:outline-none focus:outline focus:outline-flamingo-pink'
              type='text'
              required
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
            />
          </div>
          <div className='w-full lg:w-1/4 p-3'>
            <label className='block uppercase tracking-wide  text-xs font-bold mb-2'>
              Method:
            </label>
            <select
              value={method}
              required
              onChange={(e) => setMethod(e.target.value)}
              className='w-full bg-black-transparent rounded py-3 px-4 leading-normal focus:outline-none focus:outline focus:outline-flamingo-pink'
            >
              <option value='GET'>GET</option>
              <option value='POST'>POST</option>
              <option value='PUT'>PUT</option>
              <option value='DELETE'>DELETE</option>
            </select>
          </div>
        </div>
        {(method === "POST" || method === "PUT") && (
          <div className='w-full p-3'>
            <label className='block uppercase tracking-wide  text-xs font-bold mb-2'>
              Payload:
            </label>
            <textarea
              value={payload}
              required
              onChange={(e) => setPayload(e.target.value)}
              rows='3'
              class='block p-2 w-full text-sm bg-black-transparent rounded-lg focus:outline-none focus:outline focus:outline-flamingo-pink'
              placeholder='Place your payload here...'
            />
          </div>
        )}
        <div className='w-full p-3'>
          <label className='block uppercase tracking-wide  text-xs font-bold mb-2'>
            Sample Response:
          </label>
          <textarea
            value={responseSample}
            required
            onChange={(e) => setResponseSample(e.target.value)}
            rows='4'
            class='block p-2 w-full text-sm bg-black-transparent rounded-lg focus:outline-none focus:outline focus:outline-flamingo-pink'
            placeholder='Place your response here...'
          />
        </div>
        <div className='w-full flex'>
          <div className='w-full p-3'>
            <label className='block uppercase tracking-wide  text-xs font-bold mb-2'>
              Test Tool:
            </label>
            <select
              value={tool}
              onChange={(e) => setTool(e.target.value)}
              required
              className='w-full bg-black-transparent rounded py-3 px-4 leading-normal focus:outline-none focus:outline focus:outline-flamingo-pink'
            >
              <option value='K6'>K6</option>
              <option value='Locust'>Locust</option>
            </select>
          </div>
          <div className='w-full p-3'>
            <label className='block uppercase tracking-wide  text-xs font-bold mb-2'>
              Testing Type:
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className='w-full bg-black-transparent rounded py-3 px-4 leading-normal focus:outline-none focus:outline focus:outline-flamingo-pink'
            >
              <option value='Load'>Load</option>
              <option value='Stress'>Stress</option>
              <option value='Volume'>Volume</option>
            </select>
          </div>
        </div>
        <input
          type='submit'
          className='rounded-full bg-flamingo-pink cursor-pointer px-5 py-2 mt-4'
          value='Generate'
        ></input>
      </form>
    </div>
  );
}
export default InputForm;
