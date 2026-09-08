import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-slate-900 border-b border-orange-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-black text-orange-500 italic uppercase">
                    BGMI ESPORTS
                </Link>

                <div className="flex gap-4 items-center">
                    <Link to="/" className="hover:text-orange-400 transition">Tournaments</Link>

                    {user ? (
                        <>
                            {user.role === 'admin' && (
                                <Link to="/admin" className="text-blue-400 hover:text-blue-300">Dashboard</Link>
                            )}
                            <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded text-white font-bold">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-orange-400">Login</Link>
                            <Link to="/register" className="bg-orange-500 hover:bg-orange-600 px-4 py-1 rounded text-slate-900 font-bold">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
