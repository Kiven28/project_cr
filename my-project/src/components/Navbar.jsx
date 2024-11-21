import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import logo from '../assets/logo.png';

const Navbar = ({ onNavigate, refs }) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <style>
        {`
          .gradient-text {
            color: black;
            font-weight: bold;
            transition: background 0.5s ease, color 0.5s ease;
          }

          .gradient-text:hover {
            background: linear-gradient(to right, #7F00FF, #0000FF);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        `}
      </style>
      <div className="container px-4 mx-auto flex justify-between items-center lg:text-sm">
        {/* Left Akademi Suria Section */}
        <div className="flex items-center">
          <span className="text-xl tracking-tight">Akademi Suria</span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden lg:flex flex-1 justify-center space-x-12">
          <li>
            <button
              onClick={() => onNavigate(refs.heroSectionRef)}
              className="gradient-text"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => onNavigate(refs.featureSectionRef)}
              className="gradient-text"
            >
              User Details
            </button>
          </li>
          <li>
            <button
              onClick={() => onNavigate(refs.workflowRef)}
              className="gradient-text"
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() => onNavigate(refs.testimonialsRef)}
              className="gradient-text"
            >
              Testimonial
            </button>
          </li>
          <li>
            <button
              onClick={() => onNavigate(refs.contactRef)}
              className="gradient-text"
            >
              Contact
            </button>
          </li>
        </ul>

        {/* Right Logo Section */}
        <div className="flex items-center">
          <img className="h-12 w-12" src={logo} alt="Logo" />
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={toggleNavbar}>
            {mobileDrawerOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed top-0 left-0 z-20 bg-white w-full h-screen flex flex-col justify-center items-center lg:hidden">
          <ul className="space-y-4 text-center">
            <li>
              <button
                onClick={() => {
                  onNavigate(refs.heroSectionRef);
                  toggleNavbar();
                }}
                className="gradient-text text-xl"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate(refs.featureSectionRef);
                  toggleNavbar();
                }}
                className="gradient-text text-xl"
              >
                User Details
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate(refs.workflowRef);
                  toggleNavbar();
                }}
                className="gradient-text text-xl"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate(refs.testimonialsRef);
                  toggleNavbar();
                }}
                className="gradient-text text-xl"
              >
                Testimonial
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onNavigate(refs.contactRef);
                  toggleNavbar();
                }}
                className="gradient-text text-xl"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
