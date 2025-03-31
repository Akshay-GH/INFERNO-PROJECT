import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10 ${scrolled ? 'bg-background/80 backdrop-blur-lg shadow-md' : 'bg-transparent'
                }`}
        >
            <div className="max-w-9xl mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-3 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    <Link to="/landing" className="flex items-center space-x-3 animate-fade-in cursor-pointer px-3 py-2 rounded-md hover:bg-gray-700 transition-all duration-300" style={{ animationDelay: '0.1s' }}>
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center glow-text button-glow">
                            <span className="text-white font-bold text-xl">I</span>
                        </div>
                        <span className="text-gray-400 font-semibold text-xl">Inferno</span>
                    </Link>
                </div>

        

                <div className="flex items-center space-x-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    {/* <Link 
            to="/login" 
            className="text-white hover:text-blue-400 transition-colors"
          >
            Login
          </Link> */}
                    {/* <Link
                        to="/dashboard"
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium px-4 py-2 rounded-full button-hover-effect flex items-center justify-center"
                    >
                        Dashboard
                    </Link> */}
                    <Link
                        to="/orderhistory"
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium px-4 py-2 rounded-full button-hover-effect flex items-center justify-center"
                    >
                        Order History
                    </Link>
                    <Link
                        to="/stocklist"
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium px-4 py-2 rounded-full button-hover-effect flex items-center justify-center"
                    >
                        Stocks
                    </Link>
                    <Link
                        to="/leaderboard"
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium px-4 py-2 rounded-full button-hover-effect flex items-center justify-center"
                    >
                        Leaderboard
                    </Link>
                    <Link
                        to="/portfolio"
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium px-4 py-2 rounded-full button-hover-effect flex items-center justify-center"
                    >
                        My Portfolio
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;