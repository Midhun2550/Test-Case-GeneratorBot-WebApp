import httpx
from groq import Groq
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["*"])

def process(data):
    client = Groq(api_key="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")
    client._client = httpx.Client(verify=False)
    completion = client.chat.completions.create(
        model="llama-3.1-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": data
            }
        ],
        temperature=1,
        max_tokens=1024,
        top_p=1,
        stream=True,
        stop=None,
    )
    result = ""
    for chunk in completion:
        result += (str(chunk.choices[0].delta.content))
    return result


@app.route('/data', methods=["POST"])
def receive_data():
    data = request.json
    return jsonify({'data_from_model': process(data)})

if __name__ == '__main__':
    app.run(debug=True)