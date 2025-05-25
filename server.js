require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Mock hospital database
const hospitals = [
  { id: 1, name: "Apollo Hospital", location: "Delhi", specialties: ["Cardiology", "Neurology", "General"], rating: 4.5 },
  { id: 2, name: "Fortis Hospital", location: "Mumbai", specialties: ["Orthopedics", "Pediatrics"], rating: 4.2 },
  { id: 3, name: "AIIMS", location: "Delhi", specialties: ["All Specialties"], rating: 4.8 },
  { id: 4, name: "Manipal Hospital", location: "Bangalore", specialties: ["Cardiology", "Oncology"], rating: 4.3 }
];

// Analyze symptoms and suggest possible conditions
app.post('/analyze-symptoms', async (req, res) => {
  try {
    const { symptoms } = req.body;
    
    const prompt = `
    Analyze these symptoms: ${symptoms}
    
    Provide:
    1. Possible conditions (most likely first)
    2. Recommended specialist
    3. Urgency level (1-5, 5 being emergency)
    4. General advice until medical help
    
    Format as JSON with these keys:
    conditions, specialist, urgency, advice
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const analysis = JSON.parse(completion.choices[0].message.content);
    res.json(analysis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error analyzing symptoms" });
  }
});

// Find hospitals based on specialty and location
app.post('/find-hospitals', (req, res) => {
  const { specialty, location } = req.body;
  
  let results = hospitals;
  
  if (specialty) {
    results = results.filter(hospital => 
      hospital.specialties.includes(specialty) || 
      hospital.specialties.includes("All Specialties")
    );
  }
  
  if (location) {
    results = results.filter(hospital => 
      hospital.location.toLowerCase().includes(location.toLowerCase())
    );
  }
  
  res.json(results);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});