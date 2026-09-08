import { useState } from 'react';
import api from '../api';

const AdminDashboard = () => {
    const [formData, setFormData] = useState({
        title: '', prizePool: '', entryFee: '', totalSlots: '', startDate: '', mode: 'Squad'
    });
    const [bannerFile, setBannerFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleFileChange = (e) => setBannerFile(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (bannerFile) data.append('bannerImage', bannerFile);

        try {
            await api.post('/tournaments', data, { headers: { 'Content-Type': 'multipart/form-data' } });
            setMessage('Tournament Created Successfully!');
            setFormData({ title: '', prizePool: '', entryFee: '', totalSlots: '', startDate: '', mode: 'Squad' });
            setBannerFile(null);
            document.getElementById('fileInput').value = '';
        } catch (err) {
            setError(err.response?.data?.error || err.response?.data?.message || 'Error creating tournament');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-8">
            <h2 className="text-3xl font-black italic text-white uppercase tracking-widest border-l-4 border-orange-500 pl-4 mb-8">
                Admin <span className="text-orange-500">Control Panel</span>
            </h2>

            <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                <h3 className="text-xl text-white mb-4">Create New Tournament</h3>
                
                {message && <div className="bg-green-500/20 text-green-500 p-3 rounded mb-4 border border-green-500">{message}</div>}
                {error && <div className="bg-red-500/20 text-red-500 p-3 rounded mb-4 border border-red-500">{error}</div>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input type="text" name="title" placeholder="Tournament Title" value={formData.title} onChange={handleChange} className="bg-slate-800 text-white p-3 rounded outline-none border border-slate-700 focus:border-orange-500" required />
                    
                    <div className="grid grid-cols-2 gap-4">
                        <input type="number" name="prizePool" placeholder="Prize Pool (₹)" value={formData.prizePool} onChange={handleChange} className="bg-slate-800 text-white p-3 rounded outline-none border border-slate-700 focus:border-orange-500" required />
                        <input type="number" name="entryFee" placeholder="Entry Fee (₹)" value={formData.entryFee} onChange={handleChange} className="bg-slate-800 text-white p-3 rounded outline-none border border-slate-700 focus:border-orange-500" required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <input type="number" name="totalSlots" placeholder="Total Slots (e.g. 100)" value={formData.totalSlots} onChange={handleChange} className="bg-slate-800 text-white p-3 rounded outline-none border border-slate-700 focus:border-orange-500" required />
                        <select name="mode" value={formData.mode} onChange={handleChange} className="bg-slate-800 text-white p-3 rounded outline-none border border-slate-700 focus:border-orange-500" required>
                            <option value="Solo">Solo</option>
                            <option value="Duo">Duo</option>
                            <option value="Squad">Squad</option>
                        </select>
                    </div>

                    <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="bg-slate-800 text-white p-3 rounded outline-none border border-slate-700 focus:border-orange-500" required />
                    
                    <div className="border border-dashed border-slate-600 p-4 rounded bg-slate-800/50">
                        <label className="block text-slate-400 mb-2 text-sm">Banner Image</label>
                        <input id="fileInput" type="file" onChange={handleFileChange} className="text-white" accept="image/*" required />
                    </div>

                    <button type="submit" disabled={loading} className="bg-orange-500 hover:bg-orange-600 text-slate-900 font-bold py-3 rounded uppercase mt-4 transition">
                        {loading ? 'Uploading & Creating...' : 'Create Tournament'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminDashboard;
