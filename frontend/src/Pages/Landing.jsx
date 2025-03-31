import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Shield, BarChart } from 'lucide-react';
import BG from '../assets/BgInferno.svg';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFireFlameCurved } from "@fortawesome/free-solid-svg-icons";
const Landing = () => {
  // Animation delay states for each element
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);

    // Create star elements in the background
    const container = document.querySelector('.stars-container');
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const starCount = 100;

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('stars');
        star.style.left = `${Math.random() * containerRect.width}px`;
        star.style.top = `${Math.random() * containerRect.height}px`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(star);
      }
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden stars-container"
      style={{ backgroundImage: `url(${BG})`, backgroundSize: "cover", backgroundPosition: "center" }}>


      <div className="max-w-7xl mx-auto pt-28 pb-16 px-6 md:px-10 flex flex-col items-center">
        {/* Announcement Banner */}
        <div
          className={`glass-panel px-6 py--1 mb-16 flex items-center justify-center transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          style={{ transitionDelay: '0.2s' }}
        >
       
        </div>

        {/* Main Headline */}
        <h1
          className={`text-4xl md:text-7xl  font-bold text-center mb-4 leading-snug md:leading-normal transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          style={{ transitionDelay: '0.4s' }}
        >
          <span className="text-white">Discover endless possibilities in  </span>
          <span className="text-gray-400">the world of </span>
          <span className="text-blue-500 glow-text">Trading</span>
          <span className="text-gray-400">.</span>
        </h1>

        {/* Subheadline */}
        <p
          className={`text-gray-300 text-center max-w-3xl mb-12 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          style={{ transitionDelay: '0.6s' }}
        >
          Step into trading excellence with expert guidance, strategic insights, and an advanced platform for financial success.
        </p>

        {/* Features */}
        <div
          className={`flex flex-wrap justify-center gap-8 mb-12 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          style={{ transitionDelay: '0.8s' }}
        >
          <div className="flex items-center">
            <ArrowRight className="text-blue-400 mr-2 h-5 w-5" />
            <span className="text-gray-400">Fast Trading</span>
          </div>
         
          <div className="flex items-center">
            <BarChart className="text-blue-400 mr-2 h-5 w-5" />
            <span className="text-gray-400">Continuous Market Updates</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-wrap justify-center gap-4 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          style={{ transitionDelay: '1s' }}
        >
          <Link
            to="/stocklist"
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-medium px-9 py-4 rounded-full button-hover-effect button-glow flex items-center"
          >
            <span className="mr-2">
              <FontAwesomeIcon icon={faFireFlameCurved} style={{ color: "#ffffff" }} />
            </span>
            Start Trading
          </Link>
  
        </div>
      </div>
    </div>
  );
};

export default Landing;