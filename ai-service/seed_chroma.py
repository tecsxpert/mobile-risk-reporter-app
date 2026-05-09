import chromadb
from sentence_transformers import SentenceTransformer

client = chromadb.PersistentClient(path="./db")

collection = client.get_or_create_collection("risk_knowledge")

model = SentenceTransformer("all-MiniLM-L6-v2")

documents = [
    "Water leakage near electrical systems can cause fire hazards.",
    "Chemical spills require immediate isolation and PPE usage.",
    "Blocked emergency exits increase evacuation risk.",
    "Wet floors can cause workplace injuries.",
    "Improper wiring may lead to electrical shock.",
    "Overloaded sockets can trigger short circuits.",
    "Missing fire extinguishers reduce emergency preparedness.",
    "Oil leakage near machinery creates slip hazards.",
    "Damaged safety equipment increases operational risk.",
    "Poor ventilation may expose workers to toxic fumes."
]

for i, doc in enumerate(documents):
    embedding = model.encode(doc).tolist()

    collection.add(
        ids=[str(i)],
        documents=[doc],
        embeddings=[embedding]
    )

print("ChromaDB seeded successfully.")