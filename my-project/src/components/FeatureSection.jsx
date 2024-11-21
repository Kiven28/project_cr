import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const FeatureSection = () => {
  const [formType, setFormType] = useState(null); // 'myself' or 'corporate'
  const [currentPhase, setCurrentPhase] = useState(0); // Start at Phase 0 for Full Name & Email
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [fullName, setFullName] = useState(""); // Full name field
  const [email, setEmail] = useState(""); // Email field
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Load saved name and email from localStorage if they exist
    const savedFullName = localStorage.getItem("fullName");
    const savedEmail = localStorage.getItem("email");

    if (savedFullName) setFullName(savedFullName);
    if (savedEmail) setEmail(savedEmail);
  }, []);


  const resetMessages = (resetPhase = false) => {
    setError("");
    setSuccessMessage("");
    if (resetPhase && currentPhase > 1) {
      setSelectedKeywords([]); // Reset selected keywords
    }
  };

  // Proceed to Phase 1 after entering name and email
  const handleGetStart = () => {
    if (!fullName || !email) {
      setError("Please enter both your full name and email.");
      return;
    }

    // Save name and email to localStorage for future autofill
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("email", email);

    setCurrentPhase(1);
    resetMessages();
  };
  const courseMapping = {
    Communication: ["Effective Communication Skills", "Public Speaking and Presentation Skills"],
    Leadership: ["Emotional Intelligence in Leadership"],
    Productivity: ["Time Management"],
    Safety: ["First Aid and CPR Certification"],
    IT: ["Microsoft Word (Basic to Advanced)", "Microsoft Excel (Basic to Advanced)", "Microsoft PowerPoint (Basic to Advanced)"],
    Digital: ["Digital Marketing Fundamentals", "Cybersecurity and Data Privacy"]
  };




  const handleFormSelection = (type) => {
    setFormType(type);
    setCurrentPhase(2);
    resetMessages();
  };

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    setCurrentPhase(3);
  };

  const handleKeywordSelection = (keyword) => {
    if (selectedKeywords.includes(keyword)) {
      // Remove keyword if already selected
      setSelectedKeywords((prev) => prev.filter((kw) => kw !== keyword));
    } else if (selectedKeywords.length < 2) {
      // Add keyword if less than 2 selected
      setSelectedKeywords((prev) => [...prev, keyword]);
    } else {
      setError("You can select only up to 2 keywords.");
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (selectedKeywords.length === 0) {
      setError("Please select at least 1 keyword.");
      return;
    }
    setLoading(true);
    try {
      // Send user choice to the backend with selectedCategory
      await axios.post(`http://localhost:5000/api/saveUserChoice`, {
        fullName,
        email,
        formType,
        selectedCategory,
        selectedKeywords,
      });
  
      // Fetch course recommendations based on keywords
      const response = await axios.post(
        `http://localhost:5000/api/recommend-course`,
        { keywords: selectedKeywords }
      );
  
      if (response.data.success && response.data.recommendations.length > 0) {
        const courseTitles = response.data.recommendations.map((rec) => rec.title);
        navigate('/recommendations', { state: { recommendations: courseTitles, selectedCategory } });
      } else {
        navigate('/recommendations', { state: { recommendations: [], selectedCategory } });
      }
  
      resetMessages();
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
 


  return (
    <div className="landing-background flex justify-center items-center min-h-screen mt-6">
      <div className="relative w-full md:w-[1000px] h-auto md:h-[700px] bg-white p-6 md:p-8 rounded-lg shadow-lg flex flex-col">
        {/* Phase Indicator */}
        <div className="absolute top-16 md:top-[29%] left-[10px] md:left-[20px] flex flex-col items-center space-y-2 md:space-y-4">
        {[1, 2, 3].map((num) => (
  <span
    key={num}
    className={`w-6 md:w-8 h-6 md:h-8 flex items-center justify-center rounded-full border-2 md:border-4 font-semibold ${
      currentPhase > num
        ? "bg-purple-600 text-white border-purple-600"
        : currentPhase === num
        ? "bg-blue-600 text-white border-blue-600"
        : "bg-blue-600 text-white border-blue-600"
    }`}
  >
    {currentPhase > num ? "✓" : num}
  </span>
))}

        </div>

        {/* Header */}
        <div className="text-center mt-4 md:mt-8 mb-2 md:mb-4">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">Find what's right for you.</h1>
          <p className="text-md md:text-lg text-gray-500 mb-2 md:mb-4">
            Answer 3 quick questions to get recommendations that match your interests.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex-grow flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="w-full md:w-1/2 pr-0 md:pr-10 flex flex-col justify-start items-center ml-0 md:ml-[70px] mt-4 md:mt-6">
            <div className="w-full text-center mb-4 md:mb-6">
              {currentPhase === 0 && (
                <div className="flex flex-col space-y-4">
                  <label className="text-md md:text-lg font-semibold">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg" autoComplete="name"
                  />
                  <label className="text-md md:text-lg font-semibold">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg" autoComplete="email"
                  />
                  <button
                    onClick={handleGetStart}
                    className="mt-4 w-full py-2 px-6 text-white bg-gradient-to-r from-purple-500 to-blue-800 rounded-lg hover:from-purple-600 hover:to-blue-900 transition-colors"
                  >
                    Get Start
                  </button>
                  {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
              )}
              {currentPhase > 0 && (
                <ContentTitle currentPhase={currentPhase} />
              )}
            </div>
            {currentPhase === 1 && (
              <Phase1Content onSelect={handleFormSelection} />
            )}
            {currentPhase === 2 && (
              <UserForm
                formType={formType}
                onCategorySelect={handleCategorySelection}
              />
            )}
            {currentPhase === 3 && (
              <Phase3Content
                formType={formType}
                selectedCategory={selectedCategory}
                selectedKeywords={selectedKeywords}
                onKeywordSelect={handleKeywordSelection}
              />
            )}
          </div>

          {/* Right Section: Image */}
          <div className="w-full md:w-1/2 flex justify-center items-center mt-6 md:mt-0">
            <img
              src={currentPhase === 2 ? "/quote.jpg" : "/academic.jpg"}
              alt={currentPhase === 2 ? "Quote" : "Academic"}
              className="w-[200px] md:w-[300px] h-auto object-contain"
            />
          </div>
        </div>

        {/* Buttons Container */}
        <div className="flex flex-col md:flex-row justify-between mt-4 md:mt-6">
          {currentPhase > 1 && (
            <button
              className="text-blue-500 px-4 py-2 text-sm border border-blue-500 rounded hover:bg-blue-500 hover:text-white transition"
              onClick={() => setCurrentPhase(currentPhase - 1)}
            >
              &larr; Back
            </button>
          )}
          {currentPhase === 3 && (
            <button
              onClick={handleSubmit}
              className="w-full md:w-auto py-2 px-6 text-white bg-gradient-to-r from-purple-500 to-blue-800 rounded-lg hover:from-purple-600 hover:to-blue-900 transition-colors"
            >
              Submit
            </button>
          )}
        </div>
{/* Error and Success Messages */}
{error && <p className="mt-4 text-center text-red-500">{error}</p>}
      {successMessage.length > 0 && (
        <div className="mt-4 text-center">
          <p className="text-green-500">Course Recommendations:</p>
          <ul className="text-lg font-bold">
            {successMessage.map((course, index) => (
              <li key={index}>{course}</li>
            ))}
          </ul>
        </div>

          )}
      
      </div>
    </div>
  );
};

// ContentTitle Component for Phase 1, 2, and 3 Titles
const ContentTitle = ({ currentPhase }) => {
  const titles = {
    1: "Who will be taking the course?",
    2: "What category of course are you looking for?",
    3: "Please choose two keywords",
  };

  return <h2 className="text-xl font-semibold mb-2">{titles[currentPhase]}</h2>;
};

// Phase 1 Content Component
const Phase1Content = ({ onSelect }) => (
  <div className="flex flex-col space-y-4">
    <FormTypeButton type="Myself" description="Finding course for personal" onSelect={() => onSelect("myself")} />
    <FormTypeButton type="Company" description="Searching course for corporates" onSelect={() => onSelect("corporate")} />
  </div>
);

// FormTypeButton Component
const FormTypeButton = ({ type, description, onSelect }) => (
  <button
    className="w-[300px] h-[80px] px-6 py-2 bg-gradient-to-r from-indigo-400 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:from-indigo-500 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
    onClick={onSelect}
  >
    <span className="text-lg">{type}</span>
    <span className="text-sm text-indigo-200 font-normal block">{description}</span>
  </button>
);

// UserForm Component for Phase 2
const UserForm = ({ formType, onCategorySelect }) => {
  const personalCategories = [
    "Learn a skill for my job",
    "Build a project",
    "Learn for schooly",
    "Learn for fun",
    "Not sure",
    
  ];

  const corporateCategories = {
    "Leadership and Management": [
      "Leadership",
      "Strategy",
      "Emotional",
      "Coaching",
      "Change",
      "Problem",
      "Negotiation",
      "Time"
    ],
    "Communication and Interpersonal Skills": [
      "Communication",
      "Cross-Cultural",
      "Public",
      "Persuasive",
      "Interpersonal",
      "Negotiation",
      "Diversity",
      "Inclusion"
    ],
    "Human Resources Essentials": [
      "Performance",
      "Appraisal",
      "Analytics",
      "Engagement",
      "Training"
    ],
    "Customer Service Excellence": [
      "Customer",
      "Service",
      "Communication",
      "Relationship",
      "Sales",
      "Strategies"
    ],
    "Safety Management": [
      "Safety",
      "First Aid",
      "PPE",
      "Compliance",
      "ISO",
      "Risk"
    ],
    "IT Skills Development": [
      "Microsoft",
      "Data",
      "Digital",
      "Cybersecurity"
    ],
    "Project Management": [
      "Project",
      "Management",
      "Financial"
    ],
    "Workplace Skills": [
      "Professional",
      "Collaboration",
      "Diversity"
    ]
  };

  const categories = formType === "myself" ? personalCategories : Object.keys(corporateCategories);

  return (
    <div className="grid grid-cols-2 gap-4">
      {categories.map((category) => (
        <button
          key={category}
          className="bg-gray-200 hover:bg-purple-500 hover:text-white px-4 py-2 rounded-lg transition-colors duration-300 ease-in-out"
          type="button"
          onClick={() => onCategorySelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

// Phase3Content Component for Keyword Selection in Phase 3
const Phase3Content = ({
  formType,
  selectedCategory,
  selectedKeywords,
  onKeywordSelect,
}) => {
  // Define the keywords based on selected category
  const keywords = formType === "myself"
    ? [ "Communication","Leadership","Productivity","Safety","IT Skills","Digital Skills",]
    : {
        "Leadership and Management": [
          "Leadership", "Strategy", "Emotional Intelligence", "Coaching", "Change Management", "Problem Solving", "Negotiation",
        ],
        "Communication and Interpersonal Skills": [
          "Communication", "Cross-Cultural", "Public Speaking", "Persuasive Communication", "Interpersonal", "Negotiation", "Diversity", "Inclusion"
        ],
        "Human Resources Essentials": [
          "Performance Management", "Appraisal", "HR Analytics", "Employee Engagement", "Training and Development"
        ],
        "Customer Service Excellence": [
          "Customer Relationship", "Service Excellence", "Communication Strategies", "Sales", "Customer Satisfaction"
        ],
        "Safety Management": [
          "Safety Compliance", "First Aid", "PPE", "ISO Standards", "Risk Management"
        ],
        "IT Skills Development": [
          "Microsoft Office", "Data Analysis", "Digital Literacy",
        ],
        "Project Management": [
          "Project Planning", "Budget Management", "Risk Analysis", "Agile Methodology"
        ],
        "Workplace Skills": [
          "Professionalism", "Collaboration", "Diversity", "Time Management"
        ],
      }[selectedCategory] || [];

  return (
<div className="grid grid-cols-2 gap-4"> {/* Match the Phase 2 layout */}
      {keywords.map((keyword) => (
        <button
          key={keyword}
          className={`px-4 py-2 rounded-lg border-2 transition-colors duration-300 ease-in-out ${
            selectedKeywords.includes(keyword)
              ? "bg-purple-600 text-white border-purple-600"
              : "bg-gray-200 hover:bg-purple-500 hover:text-white border-gray-300"
          }`}
          type="button"
          onClick={() => onKeywordSelect(keyword)}
        >
          {keyword}
        </button>
      ))}
      
    </div>



  );
};

export default FeatureSection;