import os
from dotenv import load_dotenv

load_dotenv()

class SimpleResponse:
    def __init__(self, content: str):
        self.content = content

class GeminiLLM:
    def __init__(self, api_key: str, model: str = "gemini-1.5-flash"):
        from google.generativeai import GenerativeModel, configure
        configure(api_key=api_key)
        self._model = GenerativeModel(model)

    def invoke(self, prompt: str):
        result = self._model.generate_content(prompt)
        return SimpleResponse(result.text)

def _build_llm():
    gemini_key = os.getenv("GEMINI_API_KEY")
    if gemini_key:
        return GeminiLLM(gemini_key)

    # Optional fallback to OpenAI if configured
    openai_key = os.getenv("OPENAI_API_KEY")
    if openai_key:
        from langchain_openai import ChatOpenAI
        return ChatOpenAI(model="gpt-4o-mini", temperature=0.2, api_key=openai_key)

    raise RuntimeError("No LLM configured. Set GEMINI_API_KEY or OPENAI_API_KEY.")

llm = _build_llm()

def get_llm():
    return llm

