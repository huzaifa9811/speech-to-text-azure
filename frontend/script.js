// Load Azure Speech SDK
const sdkScript = document.createElement("script");
sdkScript.src = "https://aka.ms/csspeech/jsbrowserpackageraw";
document.head.appendChild(sdkScript);

let recognizer;
let finalText = "";   // 🔴 STORED TEXT

sdkScript.onload = () => {
  const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
    "FPhS3SdORaByXkCPvMktMECROlAcSF5drI7oB4xZ81VpgQLfaOyBJQQJ99BLACGhslBXJ3w3AAAYACOGEtl2",
    "centralindia"
  );

speechConfig.speechRecognitionLanguage = "en-IN";
  speechConfig.setProperty(
    SpeechSDK.PropertyId.Speech_SegmentationSilenceTimeoutMs,
    "1500"
  );

  const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
  recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

  const phraseList = SpeechSDK.PhraseListGrammar.fromRecognizer(recognizer);
  phraseList.addPhrase("speech to text");
  phraseList.addPhrase("Azure Cognitive Services");
  phraseList.addPhrase("Ready IO");
  phraseList.addPhrase("job interview");
  phraseList.addPhrase("web application");

  recognizer.recognizing = (s, e) => {
    document.getElementById("output").value = finalText + e.result.text;
  };

  recognizer.recognized = (s, e) => {
    if (e.result.text) {
      finalText += e.result.text + " ";
      document.getElementById("output").value = finalText;
    }
  };
};

// Start recording
document.getElementById("start").onclick = () => {
  document.getElementById("output").value = finalText || "Listening...";
  recognizer.startContinuousRecognitionAsync();
};

// Stop recording
document.getElementById("stop").onclick = () => {
  recognizer.stopContinuousRecognitionAsync();
};
