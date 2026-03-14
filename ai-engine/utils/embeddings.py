from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

model = SentenceTransformer('all-MiniLM-L6-v2')

def get_embedding(text: str) -> np.ndarray:
    return model.encode(text)

def semantic_search(query_emb, doc_embs, top_k=1):
    index = faiss.IndexFlatIP(doc_embs.shape[1])
    index.add(doc_embs)
    scores, indices = index.search(query_emb.reshape(1, -1), top_k)
    return indices

