from flask import Flask, request, jsonify
import azure.cognitiveservices.speech as speechsdk
import tempfile
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 🔑 PASTE YOUR AZURE DETAILS HERE
SPEECH_KEY = "FPhS3SdORaByXkCPvMktMECROlAcSF5drI7oB4xZ81VpgQLfaOyBJQQJ99BLACGhslBXJ3w3AAAYACOGEtl2"
REGION = "centralindia"

@app.route("/transcribe", methods=["POST"])
def transcribe():
    audio_file = request.files["audio"]

    with tempfile.NamedTemporaryFile(delete=False, suffix=".ogg") as f:
        audio_file.save(f.name)
        audio_path = f.name

    speech_config = speechsdk.SpeechConfig(
        subscription=SPEECH_KEY,
        region=REGION
    )

    audio_input = speechsdk.AudioConfig(filename=audio_path)
    recognizer = speechsdk.SpeechRecognizer(
        speech_config=speech_config,
        audio_config=audio_input
    )

    result = recognizer.recognize_once()

    return jsonify({"text": result.text})

if __name__ == "__main__":
    app.run(debug=True)
