import React, { useState } from 'react';
import { useAssets } from '../../context/AssetsContext';
import AssetItem from './AssetItem';
import { Search } from 'lucide-react';

const AssetsList: React.FC = () => {
  const { assets } = useAssets();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredAssets = searchTerm
    ? assets.filter(asset => 
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : assets;

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full p-2 pl-10 text-sm bg-gray-700 border border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500"
          placeholder="Search assets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-4 py-3">Asset</th>
              <th scope="col" className="px-4 py-3">Amount</th>
              <th scope="col" className="px-4 py-3">Value</th>
              <th scope="col" className="px-4 py-3">Risk Level</th>
              <th scope="col" className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.length > 0 ? (
              filteredAssets.map(asset => (
                <AssetItem key={asset.id} asset={asset} />
              ))
            ) : (
              <tr className="bg-gray-800 border-b border-gray-700">
                <td colSpan={5} className="px-4 py-4 text-center">
                  {searchTerm ? "No assets match your search" : "No assets found. Add some assets to get started."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetsList;