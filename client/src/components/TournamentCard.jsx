const TournamentCard = ({ tournament }) => {
    return (
        <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden shadow-lg hover:border-orange-500 transition duration-300">
            <img 
                src={tournament.bannerImage} 
                alt={tournament.title} 
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-xl font-bold text-white uppercase italic tracking-wider mb-2">{tournament.title}</h3>
                <div className="flex justify-between items-center mb-4">
                    <span className="bg-orange-500/20 text-orange-500 px-3 py-1 rounded-full text-sm border border-orange-500/50">
                        Prize: ₹{tournament.prizePool}
                    </span>
                    <span className="text-slate-400 text-sm">
                        Entry: {tournament.entryFee === 0 ? 'FREE' : `₹${tournament.entryFee}`}
                    </span>
                </div>
                <div className="text-slate-300 text-sm mb-4">
                    <p><span className="text-slate-500">Mode:</span> {tournament.mode}</p>
                    <p><span className="text-slate-500">Slots:</span> {tournament.totalSlots}</p>
                    <p><span className="text-slate-500">Date:</span> {new Date(tournament.startDate).toLocaleDateString()}</p>
                </div>
                <button className="w-full bg-slate-800 hover:bg-orange-500 hover:text-slate-900 text-white font-bold py-2 rounded transition uppercase">
                    Register Squad
                </button>
            </div>
        </div>
    );
};
export default TournamentCard;
