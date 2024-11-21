import { useLocation } from 'react-router-dom';

const MyselfCourse = () => {
  const location = useLocation();
  const selectedCategory = location.state?.category;

  const courseMapping = {
    Communication: ["Effective Communication Skills", "Public Speaking and Presentation Skills"],
    Leadership: ["Emotional Intelligence in Leadership"],
    Productivity: ["Time Management"],
    Safety: ["First Aid and CPR Certification"],
    "IT Skills": ["Microsoft Word (Basic to Advanced)", "Microsoft Excel (Basic to Advanced)", "Microsoft PowerPoint (Basic to Advanced)"],
    "Digital Skills": ["Digital Marketing Fundamentals", "Cybersecurity and Data Privacy"]
  };

  const courses = courseMapping[selectedCategory] || [];

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">{selectedCategory} Courses</h2>
        <ul className="list-disc pl-6">
          {courses.map((course, index) => (
            <li key={index} className="text-lg mb-2">{course}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyselfCourse;
