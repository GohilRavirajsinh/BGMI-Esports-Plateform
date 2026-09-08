import { useState, useEffect } from 'react';
import api from '../api';
import TournamentCard from '../components/TournamentCard';

const Home = () => {
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const res = await api.get('/tournaments');
                setTournaments(res.data);
            } catch (err) {
                setError('Failed to load tournaments. Is backend running?');
            } finally {
                setLoading(false);
            }
        };
        fetchTournaments();
    }, []);

    if (loading) return <div className="text-center text-white mt-20 text-xl animate-pulse">Loading Arena...</div>;
    if (error) return <div className="text-center text-red-500 mt-20 border border-red-500 p-4 bg-red-500/10 rounded">{error}</div>;

    return (
        <div className="py-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black italic text-white uppercase tracking-widest border-l-4 border-orange-500 pl-4">
                    Active Tournaments
                </h2>
            </div>
            
            {tournaments.length === 0 ? (
                <div className="text-center text-slate-500 italic">No tournaments scheduled yet. Check back soon!</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tournaments.map(t => (
                        <TournamentCard key={t._id} tournament={t} />
                    ))}
                </div>
            )}
        </div>
    );
};
export default Home;
