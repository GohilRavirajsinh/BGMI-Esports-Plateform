import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/auth/login', { email, password });
            login(res.data.user, res.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid Credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-[80vh]">
            <div className="bg-slate-900 p-8 rounded-lg border border-orange-500 shadow-lg shadow-orange-500/20 w-96">
                <h2 className="text-3xl font-black italic text-white mb-6 text-center uppercase tracking-wider">
                    Squad <span className="text-orange-500">Login</span>
                </h2>
                
                {error && <div className="bg-red-500/20 border border-red-500 text-red-500 p-2 rounded mb-4 text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-slate-800 text-white p-3 rounded outline-none border border-slate-700 focus:border-orange-500 transition" required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-slate-800 text-white p-3 rounded outline-none border border-slate-700 focus:border-orange-500 transition" required />
                    <button type="submit" disabled={loading} className="bg-orange-500 hover:bg-orange-600 text-slate-900 font-bold py-3 rounded uppercase tracking-wider mt-2 transition">
                        {loading ? 'Logging in...' : 'Enter Battleground'}
                    </button>
                </form>
                
                <p className="text-slate-400 mt-4 text-center text-sm">
                    New to the arena? <Link to="/register" className="text-orange-500 hover:underline">Register Here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
