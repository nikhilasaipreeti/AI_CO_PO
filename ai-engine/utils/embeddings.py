import os
import numpy as np

_model = None
_faiss = None

def _load_model():
    global _model
    if _model is not None:
        return _model
    try:
        if os.getenv("USE_EMBEDDINGS_MODEL", "0") != "1":
            _model = None
            return _model
        from sentence_transformers import SentenceTransformer
        _model = SentenceTransformer('all-MiniLM-L6-v2')
    except Exception:
        _model = None
    return _model

def _load_faiss():
    global _faiss
    if _faiss is not None:
        return _faiss
    try:
        import faiss
        _faiss = faiss
    except Exception:
        _faiss = None
    return _faiss

def _fallback_embedding(text: str, dims: int = 384) -> np.ndarray:
    # Deterministic hash-based embedding to avoid model downloads at startup
    seed = abs(hash(text)) % (2**32)
    rng = np.random.default_rng(seed)
    return rng.normal(0, 1, size=(dims,)).astype(np.float32)

def get_embedding(text: str) -> np.ndarray:
    model = _load_model()
    if model is None:
        return _fallback_embedding(text)
    return model.encode(text)

def semantic_search(query_emb, doc_embs, top_k=1):
    if doc_embs is None or len(doc_embs) == 0:
        return np.array([[0]])
    faiss = _load_faiss()
    if faiss is None:
        scores = np.dot(doc_embs, query_emb)
        indices = np.argsort(scores)[::-1][:top_k]
        return np.array([indices])
    index = faiss.IndexFlatIP(doc_embs.shape[1])
    index.add(doc_embs)
    _, indices = index.search(query_emb.reshape(1, -1), top_k)
    return indices

