import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-xl font-bold text-indigo-600">
                                Yeditepe Chatbot
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center">
                        {user && (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to={user.role === 'admin' ? '/admin' : '/profile'}
                                    className="text-gray-700 hover:text-indigo-600"
                                >
                                    {user.name}
                                </Link>
                                <button
                                    onClick={logout}
                                    className="text-gray-700 hover:text-red-600"
                                >
                                    Çıkış Yap
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header; 