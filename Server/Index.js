// Load environment variables
require('dotenv').config();


const express = require('express');
const brain = require('brain.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db/connection');
const UserChoice = require('./models/UserChoice');
const app = express();

const PORT = 5000;

// Connect to MongoDB
connectDB();







app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Courses data with keyword mappings
const courses = [
{ course: 'Leadership Development Program', keywords: ['Leadership', 'Strategy'] },
  { course: 'Strategic Leadership and Decision Making', keywords: ['Leadership', 'Strategy'] },
  { course: 'Strategic Planning and Implementation', keywords: ['Strategy', 'Leadership'] },
  { course: 'Emotional Intelligence in Leadership', keywords: ['Emotional Intelligence', 'Leadership'] },
  { course: 'Coaching and Mentoring for Leaders', keywords: ['Coaching', 'Leadership'] },
  { course: 'Effective People Management Skills', keywords: ['Leadership', 'Problem Solving'] },
  { course: 'Team Building and Collaboration', keywords: ['Leadership', 'Problem Solving'] },
  { course: 'Change Management Leadership', keywords: ['Leadership', 'Change Management'] },
  { course: 'Change Management and Organizational Development', keywords: ['Change Management', 'Leadership'] },
  { course: 'Lean Management Principles', keywords: ['Leadership', 'Problem Solving'] },
  { course: 'Effective Problem Solving and Decision Making', keywords: ['Problem Solving'] },
  { course: 'Conflict Resolution and Management', keywords: ['Problem Solving', 'Leadership'] },
  { course: 'Negotiation Skills for Managers', keywords: ['Negotiation', 'Leadership'] },  
  { course: 'Effective Communication Skills', keywords: ['Communication', 'Interpersonal'] },
{ course: 'Cross-Cultural Communication', keywords: ['Cross-Cultural', 'Communication'] },
{ course: 'Public Speaking and Presentation Skills', keywords: ['Public Speaking', 'Communication'] },
{ course: 'Persuasive Communication', keywords: ['Persuasive Communication', 'Communication'] },
{ course: 'Effective Negotiation Skills', keywords: ['Negotiation', 'Interpersonal'] },
{ course: 'Workplace Diversity and Inclusion', keywords: ['Diversity', 'Inclusion'] },
{ course: 'Performance Management and Appraisal', keywords: ['Performance Management', 'Appraisal'] },
{ course: '360 Degree Feedback Performance Appraisal', keywords: ['Appraisal', 'Performance Management'] },
{ course: 'HR Analytics and Data-driven Decision Making', keywords: ['HR Analytics', 'Performance Management'] },
{ course: 'Motivating and Engaging Employees', keywords: ['Employee Engagement', 'Performance Management'] },
{ course: 'Training Needs Analysis (TNA)', keywords: ['Training and Development', 'Employee Engagement'] },
{ course: 'HR Fundamentals and Essentials', keywords: ['Training and Development', 'Performance Management'] },
{ course: 'Handling Difficult Customer Situations', keywords: ['Customer Satisfaction', 'Service Excellence'] },
{ course: 'Customer Service and Service Delivery', keywords: ['Customer Satisfaction', 'Service Excellence'] },
{ course: 'Effective Communication with Customers', keywords: ['Customer Satisfaction', 'Communication Strategies'] },
{ course: 'Phone and Email Etiquette for Customer Service', keywords: ['Service Excellence', 'Communication Strategies'] },
{ course: 'Customer Experience Management', keywords: ['Customer Relationship', 'Customer Satisfaction'] },
{ course: 'Customer Relationship Management (CRM) Basics', keywords: ['Customer Relationship', 'Service Excellence'] },
{ course: 'Focusing on Customer Journey for Success', keywords: ['Customer Relationship', 'Customer Satisfaction'] },
{ course: 'Sales Strategies for Business Growth', keywords: ['Sales', 'Customer Satisfaction'] },
{ course: 'Forklift Safety at Workplace', keywords: ['Safety Compliance', 'Risk Management'] },
{ course: 'First Aid and CPR Certification', keywords: ['First Aid', 'Safety Compliance'] },
{ course: 'Emergency Response and Evacuation Procedures', keywords: ['Safety Compliance', 'Risk Management'] },
{ course: 'Workplace Hazard Identification and Risk Assessment', keywords: ['Risk Management', 'Safety Compliance'] },
{ course: 'Personal Protective Equipment (PPE)', keywords: ['PPE', 'Safety Compliance'] },
{ course: 'Chemical Safety and PPE Effectiveness', keywords: ['PPE', 'Safety Compliance'] },
{ course: 'Ergonomics and Manual Handling', keywords: ['Safety Compliance', 'Risk Management'] },
{ course: 'Hazard Identification, Risk Assessment, and Risk Control (HIRARC)', keywords: ['Risk Management', 'Safety Compliance'] },
{ course: 'Disaster Management for Industry', keywords: ['Risk Management', 'Safety Compliance'] },
{ course: 'Confined Space', keywords: ['Safety Compliance', 'Risk Management'] },
  { course: 'ISO 14001:2015 Internal Auditor', keywords: ['ISO Standards', 'Safety Compliance'] },
  { course: 'SEDEX (SMETA) Awareness Programme', keywords: ['Safety Compliance', 'ISO Standards'] },
  { course: 'ISO 9001:2015 Quality Management System (QMS)', keywords: ['ISO Standards', 'Safety Compliance'] },
  { course: 'ISO 14001:2015 Environmental Management System (EMS)', keywords: ['ISO Standards', 'Safety Compliance'] },
  { course: 'ISO 45001:2018 Occupational Health and Safety Management System (OH&S MS)', keywords: ['ISO Standards', 'Safety Compliance'] },
  { course: 'Sertu for Halal Industry Compliance', keywords: ['Safety Compliance'] },
  { course: 'Halal, GMP and HACCP for Industry', keywords: ['Safety Compliance'] },
  { course: 'Effective CHRA Implementation at Industry', keywords: ['Risk Management', 'Safety Compliance'] },
  { course: 'Microsoft Power BI Data Analysis', keywords: ['Microsoft Office', 'Data Analysis'] },
  { course: 'Microsoft Excel Dashboarding', keywords: ['Microsoft Office', 'Data Analysis'] },
  { course: 'Microsoft Word (Basic to Advance)', keywords: ['Microsoft Office', 'Digital Literacy'] },
  { course: 'Microsoft Excel (Basic to Advance)', keywords: ['Microsoft Office', 'Digital Literacy'] },
  { course: 'Microsoft PowerPoint (Basic to Advance)', keywords: ['Microsoft Office', 'Digital Literacy'] },
  { course: 'Digital Transformation Strategy', keywords: ['Digital Literacy', 'Data Analysis'] },
  { course: 'Data Analytics and Visualization', keywords: ['Data Analysis', 'Digital Literacy'] },
  { course: 'Digital Marketing Fundamentals', keywords: ['Digital Literacy'] },
  { course: 'Cybersecurity and Data Privacy', keywords: [ 'Data Analysis'] },
  { course: 'E-Commerce and Online Business', keywords: ['Digital Literacy'] },
  { course: 'Project Management Fundamentals', keywords: ['Project Planning', 'Risk Analysis', 'Agile Methodology'] },
  { course: 'Financial Management Basics', keywords: ['Budget Management', 'Project Planning'] },
  { course: 'Coaching Resolution and Team Collaboration', keywords: ['Diversity', 'Collaboration', 'Time Management'] },
  { course: 'Workplace Diversity and Inclusion', keywords: ['Diversity', 'Professionalism'] }    

];

// Initialize and train the neural network
const net = new brain.NeuralNetwork({
  hiddenLayers: [16, 16],
  activation: 'leaky-relu',
  learningRate: 0.05,
  decayRate: 0.001,
  momentum: 0.6,
  errorThresh: 0.001,
});

// Function to normalize keywords
const normalizeKeywords = (keywords) => {
  const keywordMap = {
    leadership: 'leadership',
    strategy: 'strategy',
    coaching: 'coaching',
    'problem solving': 'problem-solving',
    communication: 'communication',
    // Add more mappings as needed
  };
  return keywords.map((keyword) => keywordMap[keyword.toLowerCase()] || keyword.toLowerCase());
};

// Prepare training data
const trainingData = courses.map(({ course, keywords }) => ({
  input: normalizeKeywords(keywords).reduce((acc, keyword) => ({ ...acc, [keyword]: 1 }), {}),
  output: { [course]: 1 },
}));

// Train the neural network
net.train(trainingData, {
  iterations: 15000,
  errorThresh: 0.001,
  log: true,
  logPeriod: 1000,
});

// Endpoint to recommend courses
app.post('/api/recommend-course', (req, res) => {
  try {
    const { keywords } = req.body;

    // Validate input
    if (!keywords || !Array.isArray(keywords) || keywords.length < 1) {
      return res.status(400).json({
        success: false,
        error: 'Please provide at least one keyword',
      });
    }

    // Normalize input keywords
    const normalizedKeywords = normalizeKeywords(keywords);

    // Prepare input for neural network
    const input = normalizedKeywords.reduce((acc, keyword) => ({ ...acc, [keyword]: 1 }), {});

    // Run prediction
    const result = net.run(input);

    // Sort and filter results with confidence threshold
    const sortedResults = Object.entries(result)
      .sort(([, a], [, b]) => b - a)
      .filter(([, confidence]) => confidence > 0.02)
      .slice(0, 5);

    // Map sorted results to courses data
    const recommendedCourses = sortedResults.map(([course, confidence]) => {
      const courseData = courses.find((c) => c.course === course);
      return courseData
        ? {
            title: courseData.course,
            keywords: courseData.keywords,
            confidence: (confidence * 100).toFixed(2) + '%',
          }
        : null;
    }).filter(Boolean);

    // If no high-confidence matches, provide general recommendations
    if (recommendedCourses.length === 0) {
      return res.json({
        success: true,
        message: 'No high-confidence matches found. Here are some general recommendations:',
        recommendations: courses.slice(0, 4).map(c => ({ title: c.course, keywords: c.keywords })),
      });
    }

    // Send recommended courses
    res.json({
      success: true,
      recommendations: recommendedCourses,
    });
  } catch (error) {
    console.error('Error in course recommendation:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process course recommendations',
    });
  }
});

app.post('/api/saveUserChoice', async (req, res) => {
  const { fullName, email, formType, selectedCategory, selectedKeywords } = req.body;

  try {
    const newUserChoice = new UserChoice({
      fullName,
      email,
      formType,
      selectedCategory,
      selectedKeywords
    });
    await newUserChoice.save();
    
   

    // Include selectedCategory in the response
    res.status(201).json({ 
      success: true, 
      message: "User choice saved and emails sent successfully", 
      selectedCategory 
    });
  } catch (error) {
    console.error("Error saving user choice or sending emails:", error);
    res.status(500).json({ success: false, message: "Failed to save user choice or send emails" });
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Neural network trained and ready for predictions');
});