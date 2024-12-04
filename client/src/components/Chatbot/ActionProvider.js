import axios from "axios";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  // Handle user query (resume and prompt) and get response from Cohere API
  async handleUserQuery(combinedQuery) {
    try {
      const response = await axios.post(
        "https://api.cohere.ai/generate",
        {
          model: "command-r-plus", // You can choose different models
          prompt: combinedQuery,
          max_tokens: 100,
        },
        {
          headers: {
            Authorization: `Bearer b5YnBHVNuBT3OKx9kZXoYAo2XOGIztEtdlj5sgJk`, // Use your actual API key
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.text);
      const answer = response.data.text.trim();
      const message = this.createChatBotMessage(answer);
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    } catch (error) {
      console.error("Error handling user query:", error);
      const message = this.createChatBotMessage("Sorry, I couldn't process your query right now.");
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    }
  }

  handleResumeUpload(resumeText) {
    // This method can be used to process the resume text for job suggestions or other tasks
    this.handleUserQuery(resumeText);  // Call `handleUserQuery` to process resume
  }
}

export default ActionProvider;
