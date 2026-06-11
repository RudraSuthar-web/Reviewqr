from langchain_core.prompts import ChatPromptTemplate, PromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
# from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint
from langchain_google_genai import ChatGoogleGenerativeAI
from pydantic import BaseModel
from db_schema import Cafe_Review_Pydantic
from database import get_db
from db_model import Cafe_Review
from datetime import datetime
# initialize the llm

# llm = HuggingFaceEndpoint(
#     model = "google/gemma-4-31B-it",
#     task = "text-generation")

# model = ChatHuggingFace(llm=llm)
from dotenv import load_dotenv
load_dotenv()

model = ChatGoogleGenerativeAI(model="gemini-3.1-flash-lite")

output_parser = PydanticOutputParser(pydantic_object=Cafe_Review_Pydantic)


# prompt template

prompt = PromptTemplate.from_template(
    """You are a real customer who just visited a local cafe called {cafe_name}. 
Write a natural, authentic Google Maps review for this business.


return 5 reviews in the following format: {format_instructions}

Context for this specific review:
- Primary SEO Keyword to naturally include: {seo_keyword}
- Customer Persona: {persona}
- Length: {length_instruction}

STRICT RULES:
1. DO NOT use typical AI vocabulary. BANNED WORDS: "hidden gem", "bustling", "delightful", "a testament to", "top-notch", "oasis", "palate", "highly recommend", "game-changer".
2. Keep the tone casual and slightly conversational, like someone typing quickly on their phone. 
3. It is okay to use lowercase letters at the start of sentences occasionally, or use minimal punctuation. Do not use exclamation marks excessively.
4. Seamlessly weave the Primary SEO Keyword into the text so it does not look forced.
5. Do not include titles, quotation marks, or any introductory text. Output ONLY the raw review text.

Review text:

""",
 
)


# function to generate review

chain = prompt | model | output_parser
response =chain.invoke({
    "cafe_name": "Cafe Mocha",
    "seo_keyword": "best coffee in town",
    "persona": "a college student who frequents coffee shops to study and socialize",
    "length_instruction": "between 100-150 words",
    "format_instructions": output_parser.get_format_instructions()
})



def save_review_to_db(review: Cafe_Review_Pydantic):
    db = next(get_db())
    review = Cafe_Review(
        prompt = prompt.template,
        review1=review.review1,
        review2=review.review2,
        review3=review.review3,
        review4=review.review4,
        review5=review.review5,
        created_at=datetime.now()
    )
    db.add(review)
    db.commit()
    db.refresh(review)

    print("review id:", review.id)


save_review_to_db(response)
