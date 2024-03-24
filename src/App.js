import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Display image preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handlePrediction = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setPrediction(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Image Classifier</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {imagePreview && (
        <div>
          <h2>Image Preview</h2>
          <img src={imagePreview} alt="Preview" style={{ maxWidth: '300px' }} />
        </div>
      )}
      <button onClick={handlePrediction}>Predict</button>
      {prediction && (
        <div>
          <h2>Prediction</h2>
          <p>Class: {prediction.class}</p>
          <p>Confidence: {prediction.confidence}</p>
        </div>
      )}
    </div>
  );
}

export default App;
