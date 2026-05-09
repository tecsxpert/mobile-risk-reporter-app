import requests

records = [
    "Water leakage near electrical panel",
    "Chemical spill in storage room",
    "Blocked emergency exit",
    "Wet floor near staircase",
    "Broken fire extinguisher",
    "Gas leakage in kitchen",
    "Overheated server room",
    "Oil spill near machinery",
    "Loose electrical wiring",
    "Damaged safety helmet",
    "Fire alarm malfunction",
    "Poor ventilation in warehouse",
    "Emergency lights not working",
    "Chemical container leakage",
    "Exposed electrical cables",
    "Unsafe scaffolding setup",
    "Slippery restroom floor",
    "Smoke detected in basement",
    "Generator overheating",
    "Cracked laboratory glassware",
    "Water seepage near sockets",
    "Unsecured heavy equipment",
    "Blocked fire exit",
    "Toxic fumes in workshop",
    "Lift malfunction",
    "Improper chemical storage",
    "Electrical sparks from panel",
    "Broken stair railing",
    "Machine overheating",
    "Collapsed storage shelf"
]

for i, record in enumerate(records, start=1):
    response = requests.post(
        "http://localhost:5000/generate-report",
        json={"text": record}
    )

    print(f"\nRecord {i}")
    print(response.json())