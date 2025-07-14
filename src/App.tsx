import React, { useState } from 'react';
import { Search, Filter, Calendar, User, Building2, Package, TrendingUp, BarChart3, Info, X, Plus, Minus, Eye, ShoppingCart, Trash2 } from 'lucide-react';

// Dados fake para fornecedores
const mockSuppliers = [
  { id: 1, code: '001', name: 'DISTRIBUIDORA DISTRIBUIDORA SA', cnpj: '12.345.678/0001-90', city: 'São Paulo' },
  { id: 2, code: '002', name: 'ATACADÃO DISTRIBUIÇÃO LTDA', cnpj: '98.765.432/0001-10', city: 'Rio de Janeiro' },
  { id: 3, code: '003', name: 'MEGA FORNECEDOR ALIMENTOS', cnpj: '11.222.333/0001-44', city: 'Belo Horizonte' },
  { id: 4, code: '004', name: 'CENTRAL DE ABASTECIMENTO', cnpj: '55.666.777/0001-88', city: 'Salvador' },
  { id: 5, code: '005', name: 'DISTRIBUIDORA NORDESTE', cnpj: '33.444.555/0001-22', city: 'Recife' },
  { id: 6, code: '006', name: 'SUL DISTRIBUIÇÃO', cnpj: '77.888.999/0001-66', city: 'Porto Alegre' }
];

// Dados fake para compradores
const mockBuyers = [
  { id: 1, name: 'JOÃO SILVA' },
  { id: 2, name: 'MARIA SANTOS' },
  { id: 3, name: 'PEDRO OLIVEIRA' },
  { id: 4, name: 'ANA COSTA' }
];

// Dados fake para lojas
const mockStores = [
  { id: 1, name: 'MECAMIX - MATRIZ' },
  { id: 2, name: 'MINI PREÇO - FILIAL 01' },
  { id: 3, name: 'SUPER CENTER - FILIAL 02' }
];

// Dados fake para produtos
const mockProducts = [
  {
    id: 1,
    code: '7891000100103',
    description: 'LEITE CONDENSADO NESTLÉ 395G',
    category: 'LATICÍNIOS',
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    avgSales: 15,
    lastSalePrice: 4.99,
    costPrice: 3.20,
    margin: 35.9,
    aiRecommendation: 'COMPRAR',
    aiConfidence: 85,
    aiReason: 'Produto com alta rotatividade e margem adequada',
    supplierPrices: {
      1: { price: 3.15, delivery: 2, quality: 9 },
      2: { price: 3.25, delivery: 1, quality: 8 },
      3: { price: 3.10, delivery: 3, quality: 9 }
    }
  },
  {
    id: 2,
    code: '7891000053508',
    description: 'ACHOCOLATADO NESCAU 400G',
    category: 'BEBIDAS',
    currentStock: 32,
    minStock: 15,
    maxStock: 80,
    avgSales: 12,
    lastSalePrice: 8.99,
    costPrice: 6.50,
    margin: 27.7,
    aiRecommendation: 'AGUARDAR',
    aiConfidence: 70,
    aiReason: 'Estoque ainda adequado, aguardar promoção',
    supplierPrices: {
      1: { price: 6.45, delivery: 2, quality: 9 },
      2: { price: 6.60, delivery: 1, quality: 8 },
      4: { price: 6.40, delivery: 4, quality: 7 }
    }
  },
  {
    id: 3,
    code: '7891000244203',
    description: 'BISCOITO PASSATEMPO 150G',
    category: 'BISCOITOS',
    currentStock: 18,
    minStock: 25,
    maxStock: 120,
    avgSales: 20,
    lastSalePrice: 2.49,
    costPrice: 1.80,
    margin: 27.7,
    aiRecommendation: 'URGENTE',
    aiConfidence: 95,
    aiReason: 'Estoque abaixo do mínimo, alta demanda',
    supplierPrices: {
      1: { price: 1.75, delivery: 1, quality: 9 },
      2: { price: 1.85, delivery: 2, quality: 8 },
      3: { price: 1.70, delivery: 3, quality: 9 }
    }
  },
  {
    id: 4,
    code: '7891000315507',
    description: 'CAFÉ NESCAFÉ SOLÚVEL 100G',
    category: 'BEBIDAS',
    currentStock: 28,
    minStock: 20,
    maxStock: 60,
    avgSales: 8,
    lastSalePrice: 12.99,
    costPrice: 9.20,
    margin: 29.2,
    aiRecommendation: 'COMPRAR',
    aiConfidence: 80,
    aiReason: 'Produto premium com boa margem',
    supplierPrices: {
      2: { price: 9.10, delivery: 1, quality: 9 },
      3: { price: 9.30, delivery: 2, quality: 8 },
      4: { price: 9.05, delivery: 3, quality: 9 }
    }
  },
  {
    id: 5,
    code: '7891000244210',
    description: 'MACARRÃO NISSIN MIOJO 85G',
    category: 'MASSAS',
    currentStock: 150,
    minStock: 100,
    maxStock: 300,
    avgSales: 45,
    lastSalePrice: 1.99,
    costPrice: 1.20,
    margin: 39.7,
    aiRecommendation: 'AGUARDAR',
    aiConfidence: 75,
    aiReason: 'Estoque adequado, aguardar melhor preço',
    supplierPrices: {
      1: { price: 1.18, delivery: 2, quality: 8 },
      2: { price: 1.22, delivery: 1, quality: 9 },
      5: { price: 1.15, delivery: 4, quality: 7 }
    }
  }
];

interface OrderItem {
  productId: number;
  supplierId: number;
  quantity: number;
  price: number;
  total: number;
}

interface OrdersBySupplierId {
  [supplierId: number]: OrderItem[];
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<'selection' | 'purchase'>('selection');
  const [selectedSuppliers, setSelectedSuppliers] = useState<number[]>([]);
  const [selectedBuyer, setSelectedBuyer] = useState<number | null>(null);
  const [selectedStore, setSelectedStore] = useState<number | null>(null);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [quantities, setQuantities] = useState<{[key: number]: number}>({});
  const [selectedSupplierForProduct, setSelectedSupplierForProduct] = useState<{[key: number]: number}>({});
  const [orders, setOrders] = useState<OrdersBySupplierId>({});

  const filteredProducts = mockProducts.filter(product =>
    product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSupplierSelection = (supplierId: number) => {
    setSelectedSuppliers(prev => 
      prev.includes(supplierId) 
        ? prev.filter(id => id !== supplierId)
        : [...prev, supplierId]
    );
  };

  const handleGeneratePurchase = () => {
    if (selectedSuppliers.length > 0 && selectedBuyer && selectedStore) {
      setCurrentScreen('purchase');
    }
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: quantity
    }));
  };

  const handleSupplierForProductChange = (productId: number, supplierId: number) => {
    setSelectedSupplierForProduct(prev => ({
      ...prev,
      [productId]: supplierId
    }));
  };

  const handleAddToOrder = (productId: number) => {
    const quantity = quantities[productId];
    const supplierId = selectedSupplierForProduct[productId];
    const product = mockProducts.find(p => p.id === productId);
    
    if (quantity && supplierId && product) {
      const price = product.supplierPrices[supplierId]?.price || 0;
      const total = quantity * price;
      
      const orderItem: OrderItem = {
        productId,
        supplierId,
        quantity,
        price,
        total
      };

      setOrders(prev => ({
        ...prev,
        [supplierId]: [...(prev[supplierId] || []), orderItem]
      }));

      // Limpar campos após adicionar
      setQuantities(prev => ({ ...prev, [productId]: 0 }));
      setSelectedSupplierForProduct(prev => ({ ...prev, [productId]: 0 }));
    }
  };

  const handleRemoveFromOrder = (supplierId: number, productId: number) => {
    setOrders(prev => ({
      ...prev,
      [supplierId]: prev[supplierId]?.filter(item => item.productId !== productId) || []
    }));
  };

  const getSupplierTotal = (supplierId: number) => {
    return orders[supplierId]?.reduce((sum, item) => sum + item.total, 0) || 0;
  };

  const getGrandTotal = () => {
    return Object.values(orders).flat().reduce((sum, item) => sum + item.total, 0);
  };

  const getAIRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'URGENTE': return 'text-red-400';
      case 'COMPRAR': return 'text-green-400';
      case 'AGUARDAR': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getAIRecommendationBg = (recommendation: string) => {
    switch (recommendation) {
      case 'URGENTE': return 'bg-red-900/20 border-red-500/30';
      case 'COMPRAR': return 'bg-green-900/20 border-green-500/30';
      case 'AGUARDAR': return 'bg-yellow-900/20 border-yellow-500/30';
      default: return 'bg-gray-900/20 border-gray-500/30';
    }
  };

  if (currentScreen === 'selection') {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto p-6">
          <div className="bg-gray-800 rounded-lg shadow-xl p-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-blue-400">
              Inclusão de Pedido Compra
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fornecedor */}
              <div>
                <label className="block text-sm font-medium mb-2">Fornecedor *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={selectedSuppliers.length > 0 ? `${selectedSuppliers.length} fornecedor(es) selecionado(s)` : ''}
                    placeholder="Clique em Buscar para selecionar fornecedores"
                    className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400"
                    readOnly
                  />
                  <button
                    onClick={() => setShowSupplierModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium"
                  >
                    Buscar
                  </button>
                </div>
              </div>

              {/* Comprador */}
              <div>
                <label className="block text-sm font-medium mb-2">Comprador *</label>
                <select
                  value={selectedBuyer || ''}
                  onChange={(e) => setSelectedBuyer(Number(e.target.value))}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                >
                  <option value="">Selecione um comprador</option>
                  {mockBuyers.map(buyer => (
                    <option key={buyer.id} value={buyer.id}>{buyer.name}</option>
                  ))}
                </select>
              </div>

              {/* Loja */}
              <div>
                <label className="block text-sm font-medium mb-2">Loja *</label>
                <select
                  value={selectedStore || ''}
                  onChange={(e) => setSelectedStore(Number(e.target.value))}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                >
                  <option value="">Selecione uma loja</option>
                  {mockStores.map(store => (
                    <option key={store.id} value={store.id}>{store.name}</option>
                  ))}
                </select>
              </div>

              {/* Data de Entrega */}
              <div>
                <label className="block text-sm font-medium mb-2">Data de Entrega</label>
                <input
                  type="date"
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                />
              </div>

              {/* Observações */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Observações</label>
                <textarea
                  rows={3}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400"
                  placeholder="Digite observações sobre o pedido..."
                />
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={handleGeneratePurchase}
                disabled={selectedSuppliers.length === 0 || !selectedBuyer || !selectedStore}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-8 py-3 rounded-lg text-white font-bold text-lg"
              >
                Gerar Pedido de Compra
              </button>
            </div>
          </div>
        </div>

        {/* Modal de Seleção de Fornecedores */}
        {showSupplierModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Selecionar Fornecedores</h2>
                <button
                  onClick={() => setShowSupplierModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Buscar fornecedor..."
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                {mockSuppliers.map(supplier => (
                  <div
                    key={supplier.id}
                    className="flex items-center p-3 bg-gray-700 rounded hover:bg-gray-600"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSuppliers.includes(supplier.id)}
                      onChange={() => handleSupplierSelection(supplier.id)}
                      className="mr-3"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{supplier.code} - {supplier.name}</div>
                      <div className="text-sm text-gray-400">{supplier.cnpj} - {supplier.city}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowSupplierModal(false)}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white font-medium"
                >
                  Confirmar Seleção ({selectedSuppliers.length})
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-400">Pedido de Compra</h1>
          <button
            onClick={() => setCurrentScreen('selection')}
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white"
          >
            Voltar
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Área Principal */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Busca */}
          <div className="mb-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar por código ou descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400"
                />
              </div>
              <button className="bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg">
                <Filter size={20} />
              </button>
            </div>
          </div>

          {/* Tabela de Produtos */}
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left">Código</th>
                    <th className="px-4 py-3 text-left">Descrição</th>
                    <th className="px-4 py-3 text-center">Estoque</th>
                    <th className="px-4 py-3 text-center">IA</th>
                    <th className="px-4 py-3 text-center">Qtd</th>
                    <th className="px-4 py-3 text-center">Fornecedor</th>
                    <th className="px-4 py-3 text-center">Preço</th>
                    <th className="px-4 py-3 text-center">Total</th>
                    <th className="px-4 py-3 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => {
                    const quantity = quantities[product.id] || 0;
                    const selectedSupplierId = selectedSupplierForProduct[product.id];
                    const price = selectedSupplierId ? product.supplierPrices[selectedSupplierId]?.price || 0 : 0;
                    const total = quantity * price;
                    
                    return (
                      <tr key={product.id} className="border-b border-gray-700 hover:bg-gray-750">
                        <td className="px-4 py-3 font-mono text-sm">{product.code}</td>
                        <td className="px-4 py-3">
                          <div className="font-medium">{product.description}</div>
                          <div className="text-sm text-gray-400">{product.category}</div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className={`font-bold ${product.currentStock < product.minStock ? 'text-red-400' : 'text-green-400'}`}>
                            {product.currentStock}
                          </div>
                          <div className="text-xs text-gray-400">Min: {product.minStock}</div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className={`px-2 py-1 rounded text-xs font-bold ${getAIRecommendationBg(product.aiRecommendation)} ${getAIRecommendationColor(product.aiRecommendation)}`}>
                            {product.aiRecommendation}
                          </div>
                          <div className="text-xs text-gray-400">{product.aiConfidence}%</div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="number"
                            min="0"
                            value={quantity}
                            onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
                            className="w-20 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-center"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <select
                            value={selectedSupplierId || ''}
                            onChange={(e) => handleSupplierForProductChange(product.id, Number(e.target.value))}
                            className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
                          >
                            <option value="">Selecionar</option>
                            {selectedSuppliers
                              .filter(supplierId => product.supplierPrices[supplierId])
                              .map(supplierId => {
                                const supplier = mockSuppliers.find(s => s.id === supplierId);
                                return (
                                  <option key={supplierId} value={supplierId}>
                                    {supplier?.name.substring(0, 20)}...
                                  </option>
                                );
                              })}
                          </select>
                        </td>
                        <td className="px-4 py-3 text-center font-bold text-green-400">
                          {price > 0 ? `R$ ${price.toFixed(2)}` : '-'}
                        </td>
                        <td className="px-4 py-3 text-center font-bold text-blue-400">
                          {total > 0 ? `R$ ${total.toFixed(2)}` : '-'}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedProduct(product);
                                setShowProductModal(true);
                              }}
                              className="bg-blue-600 hover:bg-blue-700 p-1 rounded"
                              title="Ver informações"
                            >
                              <Info size={16} />
                            </button>
                            <button
                              onClick={() => handleAddToOrder(product.id)}
                              disabled={!quantity || !selectedSupplierId}
                              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed p-1 rounded"
                              title="Adicionar ao pedido"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Painel Lateral - Pedidos */}
        <div className="w-96 bg-gray-800 border-l border-gray-700 p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <ShoppingCart className="mr-2" size={20} />
            Pedidos por Fornecedor
          </h2>

          {Object.keys(orders).length === 0 ? (
            <div className="text-center text-gray-400 mt-8">
              <Package size={48} className="mx-auto mb-4 opacity-50" />
              <p>Nenhum produto adicionado</p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(orders).map(([supplierId, items]) => {
                const supplier = mockSuppliers.find(s => s.id === Number(supplierId));
                const supplierTotal = getSupplierTotal(Number(supplierId));
                
                if (items.length === 0) return null;
                
                return (
                  <div key={supplierId} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-bold text-blue-400">{supplier?.name}</h3>
                      <span className="text-green-400 font-bold">R$ {supplierTotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="space-y-2">
                      {items.map(item => {
                        const product = mockProducts.find(p => p.id === item.productId);
                        return (
                          <div key={`${item.productId}-${item.supplierId}`} className="flex justify-between items-center bg-gray-600 p-2 rounded">
                            <div className="flex-1">
                              <div className="text-sm font-medium">{product?.description}</div>
                              <div className="text-xs text-gray-400">
                                {item.quantity}x R$ {item.price.toFixed(2)}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-green-400 font-bold">R$ {item.total.toFixed(2)}</span>
                              <button
                                onClick={() => handleRemoveFromOrder(Number(supplierId), item.productId)}
                                className="text-red-400 hover:text-red-300"
                                title="Remover item"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              
              {/* Total Geral */}
              <div className="bg-gray-700 rounded-lg p-4 border-2 border-green-500">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Total Geral:</span>
                  <span className="text-2xl font-bold text-green-400">R$ {getGrandTotal().toFixed(2)}</span>
                </div>
              </div>
              
              {/* Botões de Ação */}
              <div className="space-y-2">
                <button className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-bold">
                  Finalizar Pedidos
                </button>
                <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg">
                  Salvar Rascunho
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Informações do Produto */}
      {showProductModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-blue-400">Informações do Produto</h2>
              <button
                onClick={() => setShowProductModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Informações Básicas */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-bold mb-4 text-green-400">Informações Básicas</h3>
                <div className="space-y-2">
                  <div><strong>Código:</strong> {selectedProduct.code}</div>
                  <div><strong>Descrição:</strong> {selectedProduct.description}</div>
                  <div><strong>Categoria:</strong> {selectedProduct.category}</div>
                  <div><strong>Preço de Venda:</strong> R$ {selectedProduct.lastSalePrice.toFixed(2)}</div>
                  <div><strong>Custo:</strong> R$ {selectedProduct.costPrice.toFixed(2)}</div>
                  <div><strong>Margem:</strong> {selectedProduct.margin.toFixed(1)}%</div>
                </div>
              </div>

              {/* Estoque */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-bold mb-4 text-yellow-400">Controle de Estoque</h3>
                <div className="space-y-2">
                  <div><strong>Estoque Atual:</strong> <span className={selectedProduct.currentStock < selectedProduct.minStock ? 'text-red-400' : 'text-green-400'}>{selectedProduct.currentStock}</span></div>
                  <div><strong>Estoque Mínimo:</strong> {selectedProduct.minStock}</div>
                  <div><strong>Estoque Máximo:</strong> {selectedProduct.maxStock}</div>
                  <div><strong>Vendas Médias:</strong> {selectedProduct.avgSales}/dia</div>
                </div>
              </div>

              {/* Análise IA */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-bold mb-4 text-purple-400">Análise Inteligente</h3>
                <div className="space-y-2">
                  <div><strong>Recomendação:</strong> <span className={getAIRecommendationColor(selectedProduct.aiRecommendation)}>{selectedProduct.aiRecommendation}</span></div>
                  <div><strong>Confiança:</strong> {selectedProduct.aiConfidence}%</div>
                  <div><strong>Motivo:</strong> {selectedProduct.aiReason}</div>
                </div>
              </div>

              {/* Fornecedores */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-bold mb-4 text-blue-400">Fornecedores Disponíveis</h3>
                <div className="space-y-3">
                  {Object.entries(selectedProduct.supplierPrices).map(([supplierId, data]: [string, any]) => {
                    const supplier = mockSuppliers.find(s => s.id === Number(supplierId));
                    return (
                      <div key={supplierId} className="bg-gray-600 p-3 rounded">
                        <div className="font-medium">{supplier?.name}</div>
                        <div className="text-sm text-gray-300">
                          Preço: R$ {data.price.toFixed(2)} | 
                          Prazo: {data.delivery} dias | 
                          Qualidade: {data.quality}/10
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;