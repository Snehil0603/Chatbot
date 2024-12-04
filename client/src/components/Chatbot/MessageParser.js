class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message, resumeText = null) {
      if (resumeText) {
        this.actionProvider.handleResumeUpload(resumeText);
      } else {
        const defaultMessage = "I didn't understand that. Can you try again?";
        this.actionProvider.handleUserQuery
          ? this.actionProvider.handleUserQuery(message)
          : console.error(defaultMessage);
      }
    }
  }
  
  export default MessageParser;
  