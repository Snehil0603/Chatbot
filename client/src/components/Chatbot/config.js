import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  botName: "Academic Advisor",
  initialMessages: [
    createChatBotMessage("Hi there! I’m here to assist you with academic queries or help analyze your resume for job suggestions."),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#5A9FDC",
    },
    chatButton: {
      backgroundColor: "#5A9FDC",
    },
  },
};

export default config;
