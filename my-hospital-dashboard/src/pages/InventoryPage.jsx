import React from 'react';
import Card from '@/components/ui/Card'; // Corrected Path
import { MOCK_API_DATA } from '@/api/mockData';

const InventoryPage = () => {
    const data = MOCK_API_DATA.inventoryDashboard;

    const getStatus = (stock, need) => {
        const ratio = stock / need;
        if (ratio < 0.25) return { text: 'CRITICAL', className: 'bg-danger-100 text-danger-500' };
        if (ratio < 0.75) return { text: 'DEFICIT', className: 'bg-warning-100 text-warning-500' };
        if (ratio < 1.1) return { text: 'SUFFICIENT', className: 'bg-success-100 text-success-500' };
        return { text: 'SURPLUS', className: 'bg-primary-100 text-primary-700' };
    };

    return (
        <div>
            <header>
                <h1 className="text-3xl font-bold text-grey-900 mb-2">Inventory Management</h1>
                <p className="text-grey-600 mb-6">Readiness for: <strong className="text-primary-700">{data.surgeEvent}</strong></p>
            </header>

            <main>
                <Card>
                    <h2 className="text-xl font-semibold text-grey-800 mb-4">Surge Readiness Checklist</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead className="bg-grey-100">
                                <tr>
                                    <th className="text-left py-3 px-4 font-semibold text-sm text-grey-600 uppercase">Item</th>
                                    <th className="text-center py-3 px-4 font-semibold text-sm text-grey-600 uppercase">Current Stock</th>
                                    <th className="text-center py-3 px-4 font-semibold text-sm text-grey-600 uppercase">AI Predicted Need</th>
                                    <th className="text-center py-3 px-4 font-semibold text-sm text-grey-600 uppercase">Status</th>
                                    <th className="text-center py-3 px-4 font-semibold text-sm text-grey-600 uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-grey-700">
                                {data.checklist.map(item => {
                                    const status = getStatus(item.stock, item.need);
                                    const deficit = item.need - item.stock;
                                    return (
                                        <tr key={item.item} className="border-b border-grey-200 hover:bg-grey-50">
                                            <td className="text-left py-4 px-4 font-medium">{item.item}</td>
                                            <td className="text-center py-4 px-4">{item.stock} units</td>
                                            <td className="text-center py-4 px-4">{item.need} units</td>
                                            <td className="text-center py-4 px-4">
                                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${status.className}`}>
                                                    {status.text} {deficit > 0 ? `(-${deficit})` : ''}
                                                </span>
                                            </td>
                                            <td className="text-center py-4 px-4">
                                                {deficit > 0 ? (
                                                    <button className={`text-white font-bold py-1 px-3 rounded-lg text-sm ${status.text === 'CRITICAL' ? 'bg-danger-500 hover:bg-danger-600' : 'bg-warning-500 hover:bg-warning-600'}`}>
                                                    Generate PO
                                                </button>
                                                ) : (
                                                    <span className="text-grey-400">-</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </main>
        </div>
    );
};

export default InventoryPage;

