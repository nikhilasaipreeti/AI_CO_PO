import os
from dotenv import load_dotenv
from openai import OpenAI
from langchain_openai import ChatOpenAI

load_dotenv()

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

llm = ChatOpenAI(
    model='gpt-4o-mini',
    temperature=0.2,
    api_key=os.getenv('OPENAI_API_KEY')
)

def get_llm():
    return llm

def get_openai_client():
    return client

