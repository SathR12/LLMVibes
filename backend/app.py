import requests
import re

def get_raw_output(text):
    prompt = f"""Below is a statement. Analyze its sentiment and output a strict decimal score between 0.0 and 1.0.

    ### Statement:
    {text}

    ### Score:
    """

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "vibecheck",
            "prompt": prompt,
            "stream": False
        }
    )
    return response.json()["response"]

def extract_score(text):
    # find first valid float between 0 and 1
    matches = re.findall(r"0\.\d+|1\.0|0\.0", text)

    if not matches:
        return 0.5

    score = float(matches[0])

    # clamp just in case
    return max(0.0, min(1.0, score))

def sentiment_score(text):
    raw = get_raw_output(text)
    score = extract_score(raw)
    return score

print(sentiment_score("I love this app, it's amazing"))
print(sentiment_score("This is the worst thing ever"))
print(sentiment_score("It's okay I guess"))

