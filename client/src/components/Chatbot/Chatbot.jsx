import React, { useEffect, useRef, useState } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./config";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import '../../styles/Chatbot.css'; // Import the new CSS file for styling

const ChatbotComponent = () => {
  const [resume, setResume] = useState(null);
  const actionProviderRef = useRef(null);

  useEffect(() => {
    if (actionProviderRef.current) {
      console.log("ActionProvider is ready!");
    }
  }, [actionProviderRef]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setResume(reader.result);
    };
    reader.readAsText(file);
  };

  const handleAnalyzeResume = () => {
    console.log(resume);
    if (actionProviderRef.current && resume) {
      actionProviderRef.current.handleResumeUpload(resume);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-wrapper">
        <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser} />
      </div>
      {/* <div className="upload-container">
        <label htmlFor="resume-upload" className="upload-label">Upload Resume:</label>
        <input 
          type="file" 
          id="resume-upload" 
          accept=".txt" 
          onChange={handleFileUpload} 
          className="upload-input"
        />
        {resume && (
          <button 
            onClick={handleAnalyzeResume} 
            className="analyze-button"
          >
            Analyze Resume
          </button>
        )}
      </div> */}
    </div>
  );
};

export default ChatbotComponent;
