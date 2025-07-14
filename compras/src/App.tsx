import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, PlusCircle, BarChart3, Info, History, ShoppingCart, SlidersHorizontal, 
  MessageSquare, X, ChevronDown, CheckCircle2, Package, Building, Users, ArrowLeft, 
  ArrowRight, FileSpreadsheet, GitMerge, Zap, FileText, AlertTriangle, TrendingUp, 
  Check, ShieldCheck, Truck, Cpu, Sparkles, BrainCircuit, PiggyBank, Target, Link2,
  DollarSign
} from 'lucide-react';
import { BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, ComposedChart } from 'recharts';

// --- Dados Mock Expandidos com Mais Fornecedores ---
const mockSuppliers = [
  { id: 1, name: 'ANTÔNIO CARLOS BOMFIM VASCONCELOS', score: 9.2, deliveryEta: '1-2 dias', category: 'Bebidas' },
  { id: 2, name: 'Distribuidora de Bebidas Bahia', score: 8.5, deliveryEta: '3 dias', category: 'Bebidas' },
  { id: 3, name: 'Atacado dos Doces Jequié', score: 9.5, deliveryEta: '1 dia', category: 'Doces/Licores' },
  { id: 4, name: 'Distribuidora Central de Alimentos', score: 8.8, deliveryEta: '2 dias', category: 'Alimentos' },
  { id: 5, name: 'Cooperativa Agrícola do Vale', score: 9.1, deliveryEta: '1-3 dias', category: 'Grãos/Cereais' },
  { id: 6, name: 'Importadora Premium Foods', score: 8.7, deliveryEta: '5-7 dias', category: 'Importados' },
  { id: 7, name: 'Atacadão Regional Nordeste', score: 8.3, deliveryEta: '2-3 dias', category: 'Geral' },
  { id: 8, name: 'Fornecedor Local de Hortifruti', score: 9.0, deliveryEta: '1 dia', category: 'Hortifruti' },
  { id: 9, name: 'Distribuidora de Produtos Lácteos', score: 8.9, deliveryEta: '1-2 dias', category: 'Laticínios' },
  { id: 10, name: 'Atacado de Produtos de Limpeza', score: 8.6, deliveryEta: '2 dias', category: 'Limpeza' },
  { id: 11, name: 'Fornecedor de Carnes e Frios', score: 9.3, deliveryEta: '1 dia', category: 'Carnes/Frios' },
  { id: 12, name: 'Distribuidora de Produtos Congelados', score: 8.4, deliveryEta: '2-4 dias', category: 'Congelados' },
];

const mockProducts = [
  {
    id: '001914', 
    description: 'LICOR ARTESANAL ABIÓPSE 1L', 
    stock: 15, 
    realtimeStock: 14, 
    dailyAvgSale: 5.2,
    suggestion: 40,
    lastPurchasePrice: 4.20,
    aiInsight: 'Sugestão para cobrir 12 dias de venda, considerando o prazo de entrega e estoque de segurança.',
    alerts: [{ type: 'warning', message: 'Risco de Ruptura: Estoque atual abaixo do ponto de reposição.' }],
    suppliers: [ 
      { id: 1, cost: 4.30 }, 
      { id: 3, cost: 4.25 }, 
      { id: 2, cost: 4.35 },
      { id: 7, cost: 4.40 },
      { id: 4, cost: 4.28 },
      { id: 6, cost: 4.50 }
    ],
    forecast: [ { name: 'D+1', forecast: 6 }, { name: 'D+2', forecast: 5 }, { name: 'D+3', forecast: 7 } ],
    marketInsight: 'Nenhuma canibalização detectada. Produto com perfil de venda único.',
    blockchainTrace: 'Lote #A4B2-20250610 | Origem: Fazenda Sol Nascente, BA',
    priority: 'A',
    relations: [
      { productId: '008765', type: 'complementary', impact: +0.15 },
      { productId: '003344', type: 'cannibalization', impact: -0.22 }
    ]
  },
  {
    id: '002530', 
    description: 'AZEITE DE OLIVA EXTRA VIRGEM 500ML', 
    stock: 50, 
    realtimeStock: 50, 
    dailyAvgSale: 12.0,
    suggestion: 130,
    lastPurchasePrice: 25.20,
    aiInsight: 'Previsão de aumento de 15% na demanda para a próxima semana.',
    alerts: [],
    suppliers: [ 
      { id: 6, cost: 25.50 }, 
      { id: 4, cost: 25.90 }, 
      { id: 7, cost: 26.10 },
      { id: 1, cost: 25.75 },
      { id: 8, cost: 25.60 },
      { id: 10, cost: 26.00 }
    ],
    forecast: [ { name: 'D+1', forecast: 12 }, { name: 'D+2', forecast: 14 }, { name: 'D+3', forecast: 13 } ],
    marketInsight: 'Canibalização leve (-5% vendas) esperada devido a promoção do "Azeite Marca B".',
    blockchainTrace: 'Lote #C8D9-20250528 | Origem: Importado, Andaluzia, ESP',
    priority: 'B',
    relations: []
  },
  {
    id: '008765', 
    description: 'ARROZ TIPO 1 PACOTE 5KG', 
    stock: 120, 
    realtimeStock: 115, 
    dailyAvgSale: 35.5,
    suggestion: 400,
    lastPurchasePrice: 18.50,
    aiInsight: 'Produto de alta demanda. Sugestão baseada na média de vendas e ciclo de reposição.',
    alerts: [],
    suppliers: [ 
      { id: 5, cost: 18.90 }, 
      { id: 4, cost: 19.10 }, 
      { id: 7, cost: 18.95 },
      { id: 12, cost: 19.20 },
      { id: 1, cost: 19.00 },
      { id: 9, cost: 18.85 }
    ],
    forecast: [ { name: 'D+1', forecast: 36 }, { name: 'D+2', forecast: 35 }, { name: 'D+3', forecast: 40 } ],
    marketInsight: 'N/A',
    blockchainTrace: 'Lote #F5G1-20250601 | Origem: Cooperativa Gaúcha de Arrozeiros, RS',
    priority: 'A',
    relations: [
      { productId: '003344', type: 'complementary', impact: +0.18 }
    ]
  },
  {
    id: '003344', 
    description: 'REFRIGERANTE COLA 2L', 
    stock: 300, 
    realtimeStock: 250, 
    dailyAvgSale: 80,
    suggestion: 900,
    lastPurchasePrice: 5.30,
    aiInsight: 'Demanda crescente devido à previsão de final de semana com clima quente.',
    alerts: [],
    suppliers: [ 
      { id: 2, cost: 5.50 }, 
      { id: 1, cost: 5.45 }, 
      { id: 7, cost: 5.60 },
      { id: 4, cost: 5.55 },
      { id: 11, cost: 5.40 },
      { id: 12, cost: 5.65 }
    ],
    forecast: [ { name: 'D+1', forecast: 85 }, { name: 'D+2', forecast: 90 }, { name: 'D+3', forecast: 110 } ],
    marketInsight: 'Vendas podem ser impulsionadas pela promoção de salgadinhos (efeito halo).',
    blockchainTrace: 'Lote #R9T4-20250608 | Origem: Fábrica de Bebidas de Simões Filho, BA',
    priority: 'B',
    relations: []
  },
  {
    id: '004455', 
    description: 'LEITE INTEGRAL 1L', 
    stock: 80, 
    realtimeStock: 75, 
    dailyAvgSale: 25.0,
    suggestion: 200,
    lastPurchasePrice: 4.80,
    aiInsight: 'Produto essencial com demanda estável. Reposição recomendada.',
    alerts: [],
    suppliers: [ 
      { id: 9, cost: 4.90 }, 
      { id: 4, cost: 4.95 }, 
      { id: 7, cost: 5.00 },
      { id: 5, cost: 4.85 },
      { id: 1, cost: 4.92 },
      { id: 3, cost: 4.88 }
    ],
    forecast: [ { name: 'D+1', forecast: 25 }, { name: 'D+2', forecast: 24 }, { name: 'D+3', forecast: 26 } ],
    marketInsight: 'Produto básico sem impacto de sazonalidade.',
    blockchainTrace: 'Lote #L3M8-20250605 | Origem: Laticínio Regional, BA',
    priority: 'A',
    relations: []
  },
  {
    id: '005566', 
    description: 'DETERGENTE LÍQUIDO 500ML', 
    stock: 45, 
    realtimeStock: 42, 
    dailyAvgSale: 8.5,
    suggestion: 85,
    lastPurchasePrice: 2.30,
    aiInsight: 'Produto de limpeza com demanda regular. Estoque adequado.',
    alerts: [],
    suppliers: [ 
      { id: 10, cost: 2.40 }, 
      { id: 7, cost: 2.45 }, 
      { id: 4, cost: 2.50 },
      { id: 12, cost: 2.35 },
      { id: 8, cost: 2.42 },
      { id: 11, cost: 2.38 }
    ],
    forecast: [ { name: 'D+1', forecast: 8 }, { name: 'D+2', forecast: 9 }, { name: 'D+3', forecast: 8 } ],
    marketInsight: 'Sem variações significativas esperadas.',
    blockchainTrace: 'Lote #D7E2-20250607 | Origem: Fábrica de Produtos de Limpeza, SP',
    priority: 'C',
    relations: []
  }
];

const mockProductForAnalysis = {
  salesHistory: [ 
    { week: 'Sem-8', sales: 30 }, { week: 'Sem-7', sales: 35 }, 
    { week: 'Sem-6', sales: 40 }, { week: 'Sem-5', sales: 38 },
    { week: 'Sem-4', sales: 45 }, { week: 'Sem-3', sales: 50 }, 
    { week: 'Sem-2', sales: 48 }, { week: 'Sem-1', sales: 55 } 
  ],
  generalInfo: { ean: '7890123456789', packaging: '12 UN' },
  purchaseHistory: [ 
    { date: '10/05/2025', qty: 24, cost: 4.25 }, 
    { date: '12/04/2025', qty: 36, cost: 4.20 }, 
    { date: '15/03/2025', qty: 24, cost: 4.22 } 
  ]
};

// --- Componentes Aprimorados ---

// Componente de Cartão de Métrica (KPIs)
const MetricCard = ({ title, value, icon, trend }) => {
  const trendColor = trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-indigo-400';
  
  return (
    <div className="bg-gray-800 rounded-lg p-4 flex items-center">
      <div className={`p-3 rounded-lg ${
        trend === 'up' ? 'bg-green-900/50' : trend === 'down' ? 'bg-red-900/50' : 'bg-indigo-900/50'
      }`}>
        {icon}
      </div>
      <div className="ml-4">
        <div className="text-sm text-gray-400">{title}</div>
        <div className={`text-xl font-bold text-white ${trendColor}`}>{value}</div>
      </div>
    </div>
  );
};

// Modal de Análise com todas as abas
const AnalysisModal = ({ product, onClose, onAction, actionLabel }) => {
  const [activeTab, setActiveTab] = useState('insights');
  const [quantity, setQuantity] = useState(product.orderQty || product.suggestion);

  const tabs = [
    { id: 'insights', label: 'Insights de IA', icon: <Zap size={16} /> },
    { id: 'predictive', label: 'Previsão', icon: <TrendingUp size={16} /> },
    { id: 'history', label: 'Histórico', icon: <History size={16} /> },
    { id: 'relations', label: 'Relações', icon: <GitMerge size={16} /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'insights':
        return (
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold text-gray-300 mb-2">Informações Gerais</h4>
              <p><strong>EAN:</strong> {mockProductForAnalysis.generalInfo.ean}</p>
              <p><strong>Embalagem de Compra:</strong> {mockProductForAnalysis.generalInfo.packaging}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-300 mb-2 flex items-center">
                <ShieldCheck size={16} className="mr-2 text-green-400" /> 
                Rastreabilidade (Blockchain)
              </h4>
              <p className="text-gray-400">{product.blockchainTrace}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-300 mb-2 flex items-center">
                <MessageSquare size={16} className="mr-2 text-cyan-400" /> 
                Análise de Mercado (IA)
              </h4>
              <p className="text-gray-400">{product.marketInsight}</p>
            </div>
          </div>
        );
      
      case 'predictive':
        const chartData = mockProductForAnalysis.salesHistory.slice(-4).map((d, i) => ({
          ...d, 
          forecast: product.forecast[i]?.forecast || 0 
        }));
        
        return (
          <div className="h-64">
            <h4 className="font-semibold text-white mb-2">Histórico de Vendas vs. Previsão da IA</h4>
            <ResponsiveContainer width="100%" height="90%">
              <ComposedChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                <XAxis dataKey="week" tick={{ fill: '#A0AEC0' }} />
                <YAxis tick={{ fill: '#A0AEC0' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1A202C', border: '1px solid #4A5568' }} />
                <Legend />
                <Bar dataKey="sales" name="Vendas Históricas" fill="#818CF8" />
                <Line type="monotone" dataKey="forecast" name="Previsão de Vendas" 
                      stroke="#34D399" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'history':
        return (
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-2">Data Compra</th>
                <th className="p-2">Qtd.</th>
                <th className="p-2">Custo Unit.</th>
              </tr>
            </thead>
            <tbody>
              {mockProductForAnalysis.purchaseHistory.map((item, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="p-2">{item.date}</td>
                  <td className="p-2">{item.qty} UN</td>
                  <td className="p-2">R$ {item.cost.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      
      case 'relations':
        return (
          <div>
            <h4 className="font-bold mb-2">Produtos Relacionados:</h4>
            <ul className="space-y-1">
              {product.relations?.map((rel, index) => {
                const relatedProduct = mockProducts.find(p => p.id === rel.productId);
                return (
                  <li key={index} className={rel.type === 'complementary' ? 'text-green-400' : 'text-red-400'}>
                    {rel.type === 'complementary' ? '+' : '-'} {relatedProduct?.description} 
                    ({rel.type === 'complementary' ? 'Efeito Halo' : 'Canibalização'}: 
                    {rel.impact > 0 ? '+' : ''}{rel.impact * 100}%)
                  </li>
                );
              })}
            </ul>
          </div>
        );
      
      default: 
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col animate-fade-in-up">
        <header className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">
            <FileText className="inline-block mr-2 text-indigo-400" />
            Assistente de Análise de Compra
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </header>
        
        <main className="p-6 overflow-y-auto flex-grow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-gray-900 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-white mb-2">
                  {product.id} - {product.description}
                </h3>
                {product.alerts.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {product.alerts.map((alert, i) => (
                      <div key={i} className={`p-3 rounded-md text-sm flex items-center ${
                        alert.type === 'warning' 
                          ? 'bg-yellow-500/10 text-yellow-300' 
                          : 'bg-red-500/10 text-red-300'
                      }`}>
                        <AlertTriangle size={20} className="mr-3" />
                        <span>
                          <strong>{alert.message.split(':')[0]}:</strong>
                          {alert.message.split(':')[1]}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-5 rounded-lg text-white shadow-lg space-y-3">
                <h3 className="text-lg font-semibold flex items-center mb-1">
                  <CheckCircle2 className="mr-2" /> Sugestão de Compra (IA)
                </h3>
                <p className="text-5xl font-bold">{product.suggestion} 
                  <span className="text-2xl font-normal"> Unidades</span>
                </p>
                <p className="text-indigo-200 text-sm">{product.aiInsight}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-gray-900 p-3 rounded-lg">
                  <div className="text-gray-400 text-sm">Estoque Sistema</div>
                  <div className="text-white text-2xl font-bold">{product.stock}</div>
                </div>
                <div className="bg-gray-900 p-3 rounded-lg">
                  <div className="text-gray-400 text-sm">Estoque Real (IoT)</div>
                  <div className="text-white text-2xl font-bold text-cyan-400">{product.realtimeStock}</div>
                </div>
                <div className="bg-gray-900 p-3 rounded-lg col-span-2">
                  <div className="text-gray-400 text-sm">Venda Média Diária (VMD)</div>
                  <div className="text-white text-2xl font-bold">{product.dailyAvgSale.toFixed(1)}</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {onAction && (
                <div className="bg-gray-900 p-4 rounded-lg">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-300 mb-2">
                    Definir Quantidade para o Pedido
                  </label>
                  <input 
                    id="quantity" 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Number(e.target.value))} 
                    className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-2 text-center text-2xl font-bold focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}
              
              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="border-b border-gray-700 mb-4">
                  <nav className="-mb-px flex space-x-4 overflow-x-auto">
                    {tabs.map(tab => (
                      <button 
                        key={tab.id} 
                        onClick={() => setActiveTab(tab.id)}
                        className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex items-center ${
                          activeTab === tab.id 
                            ? 'border-indigo-500 text-indigo-400' 
                            : 'border-transparent text-gray-400 hover:text-white hover:border-gray-300'
                        }`}
                      >
                        {tab.icon} 
                        <span className="ml-2">{tab.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
                <div className="min-h-[150px]">{renderTabContent()}</div>
              </div>
            </div>
          </div>
        </main>
        
        <footer className="p-4 bg-gray-900 border-t border-gray-700 flex justify-end items-center">
          {onAction ? (
            <>
              <button 
                onClick={onClose} 
                className="px-4 py-2 rounded-md text-white bg-gray-600 hover:bg-gray-500 mr-3"
              >
                Cancelar
              </button>
              <button 
                onClick={() => { 
                  onAction({ ...product, quantity }); 
                  onClose(); 
                }} 
                className="px-6 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 font-semibold flex items-center"
              >
                {actionLabel} <ArrowRight className="ml-2" size={16}/>
              </button>
            </>
          ) : (
            <button 
              onClick={onClose} 
              className="px-6 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 font-semibold"
            >
              Fechar
            </button>
          )}
        </footer>
      </div>
    </div>
  );
};

// Assistente de IA Flutuante
const AIAssistant = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button className="bg-indigo-600 p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all">
        <BrainCircuit size={24} />
      </button>
    </div>
  );
};

// Tela de Seleção de Fornecedores Melhorada
const NewOrderStartScreen = ({ onStart }) => {
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['all', ...new Set(mockSuppliers.map(s => s.category))];

  const filteredSuppliers = mockSuppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || supplier.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleSupplier = (supplier) => {
    setSelectedSuppliers(prev => 
      prev.find(s => s.id === supplier.id)
        ? prev.filter(s => s.id !== supplier.id)
        : [...prev, supplier]
    );
  };

  const selectAllVisible = () => {
    const visibleSuppliers = filteredSuppliers.filter(s => !selectedSuppliers.find(sel => sel.id === s.id));
    setSelectedSuppliers(prev => [...prev, ...visibleSuppliers]);
  };

  const clearSelection = () => {
    setSelectedSuppliers([]);
  };

  return (
    <div className="animate-fade-in">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Sistema de Compras Inteligente</h1>
        <p className="text-gray-400 text-lg">Selecione os fornecedores para análise de compra</p>
        <div className="mt-4 text-indigo-400">
          {selectedSuppliers.length} fornecedores selecionados
        </div>
      </header>

      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar fornecedores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Todas as Categorias</option>
            {categories.slice(1).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="mb-4 flex gap-2">
          <button
            onClick={selectAllVisible}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            Selecionar Todos Visíveis
          </button>
          <button
            onClick={clearSelection}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
          >
            Limpar Seleção
          </button>
        </div>

        <div className="grid gap-4 mb-8 max-h-96 overflow-y-auto">
          {filteredSuppliers.map(supplier => (
            <div
              key={supplier.id}
              onClick={() => toggleSupplier(supplier)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedSuppliers.find(s => s.id === supplier.id)
                  ? 'border-indigo-500 bg-indigo-500/10'
                  : 'border-gray-700 bg-gray-800 hover:border-gray-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">{supplier.name}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                    <span className="bg-gray-700 px-2 py-1 rounded text-xs">{supplier.category}</span>
                    <span>Score: {supplier.score}/10</span>
                    <span>Entrega: {supplier.deliveryEta}</span>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedSuppliers.find(s => s.id === supplier.id)
                    ? 'border-indigo-500 bg-indigo-500'
                    : 'border-gray-400'
                }`}>
                  {selectedSuppliers.find(s => s.id === supplier.id) && (
                    <Check size={16} className="text-white" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => onStart(selectedSuppliers)}
            disabled={selectedSuppliers.length === 0}
            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
          >
            Iniciar Análise de Compra ({selectedSuppliers.length} fornecedores)
          </button>
        </div>
      </div>
    </div>
  );
};

// Tela de Pedidos Múltiplos Melhorada
const MultiOrderScreen = ({ suppliers, onBack, onFinalize }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [gridData, setGridData] = useState([]);

  // Inicializa os dados da grade - CORRIGIDO PARA MOSTRAR TODOS OS FORNECEDORES SELECIONADOS
  useEffect(() => {
    const supplierIds = suppliers.map(s => s.id);
    
    // Pega TODOS os produtos (não filtra por fornecedor)
    const productsForGrid = mockProducts.map(p => {
      // Para cada produto, filtra apenas os fornecedores que foram selecionados
      const availableSuppliers = p.suppliers.filter(s => supplierIds.includes(s.id));
      
      // Se não tem fornecedores selecionados para este produto, adiciona todos os selecionados com preço padrão
      if (availableSuppliers.length === 0) {
        // Adiciona todos os fornecedores selecionados com um preço base
        const defaultSuppliers = suppliers.map(supplier => ({
          id: supplier.id,
          cost: 0 // Preço será definido pelo usuário
        }));
        
        return {
          ...p,
          orderQty: '',
          supplierPrice: '',
          winnerSupplierId: '',
          availableSuppliers: defaultSuppliers
        };
      }
      
      // Se tem fornecedores, usa os disponíveis + adiciona os selecionados que não estão na lista
      const missingSuppliers = suppliers.filter(supplier => 
        !availableSuppliers.find(as => as.id === supplier.id)
      ).map(supplier => ({
        id: supplier.id,
        cost: 0 // Preço será definido pelo usuário
      }));
      
      const allAvailableSuppliers = [...availableSuppliers, ...missingSuppliers];
      const bestSupplier = availableSuppliers.length > 0 
        ? availableSuppliers.sort((a, b) => a.cost - b.cost)[0]
        : allAvailableSuppliers[0];
      
      return { 
        ...p, 
        orderQty: '', 
        supplierPrice: '',
        winnerSupplierId: bestSupplier ? String(bestSupplier.id) : '',
        availableSuppliers: allAvailableSuppliers
      };
    });
    
    setGridData(productsForGrid);
  }, [suppliers]);

  // Manipula mudanças na grade
  const handleGridChange = (productId, field, value) => {
    setGridData(prevData => 
      prevData.map(row => row.id === productId ? { ...row, [field]: value } : row)
    );
  };
  
  // Atualiza a grade a partir do modal
  const handleUpdateFromModal = (productToUpdate) => {
    handleGridChange(productToUpdate.id, 'orderQty', productToUpdate.quantity);
  }

  // Abre o modal de análise
  const openAnalysis = (productData) => {
    const gridItem = gridData.find(item => item.id === productData.id);
    setSelectedProduct({ 
      ...mockProductForAnalysis, 
      ...productData, 
      orderQty: gridItem?.orderQty || productData.suggestion 
    });
    setIsModalOpen(true);
  };

  // Preenchimento automático com sugestões de IA
  const autoFillSuggestions = () => {
    setGridData(prev => prev.map(item => ({
      ...item,
      orderQty: item.suggestion,
      winnerSupplierId: item.availableSuppliers[0]?.id ? String(item.availableSuppliers[0].id) : ''
    })));
  };

  // Registro em blockchain (simulado)
  const registerOnBlockchain = (items) => {
    alert(`Pedido registrado na blockchain!\nHash: 0x${Math.random().toString(36).substr(2, 16)}`);
  };

  // Calcula o valor total do pedido (última entrada + pedido atual)
  const calculateTotalValue = (product, quantity, supplierPrice) => {
    if (!quantity || !supplierPrice) return 0;
    const lastPurchaseValue = (product.lastPurchasePrice || 0) * Number(quantity);
    const currentOrderValue = Number(supplierPrice) * Number(quantity);
    return lastPurchaseValue + currentOrderValue;
  };

  // Consolidar pedidos por fornecedor
  const stagedOrders = useMemo(() => {
    const orders = {};
    gridData
      .filter(item => item.winnerSupplierId && Number(item.orderQty) > 0)
      .forEach(item => {
        const supplierId = parseInt(item.winnerSupplierId, 10);
        if (!orders[supplierId]) {
          orders[supplierId] = { 
            supplier: mockSuppliers.find(s => s.id === supplierId), 
            items: [], 
            total: 0 
          };
        }
        
        // Usa o preço do fornecedor se informado, senão usa o custo padrão
        const unitPrice = item.supplierPrice && Number(item.supplierPrice) > 0 
          ? Number(item.supplierPrice) 
          : item.availableSuppliers.find(s => s.id === supplierId)?.cost || 0;
        
        const totalItemCost = Number(item.orderQty) * unitPrice;
        
        orders[supplierId].items.push({ 
          ...item, 
          unitPrice,
          totalCost: totalItemCost
        });
        orders[supplierId].total += totalItemCost;
      });
    return orders;
  }, [gridData]);
  
  return (
    <div className="animate-fade-in">
      {isModalOpen && selectedProduct && (
        <AnalysisModal 
          product={selectedProduct} 
          onClose={() => setIsModalOpen(false)} 
          onAction={handleUpdateFromModal} 
          actionLabel="Atualizar Quantidade na Grade"
        />
      )}
      
      <header className="mb-6 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Painel de Compra Inteligente</h1>
          <p className="text-gray-400">{suppliers.length} fornecedores selecionados para análise</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {suppliers.slice(0, 3).map(supplier => (
              <span key={supplier.id} className="bg-indigo-600 text-white px-2 py-1 rounded text-xs">
                {supplier.name.split(' ')[0]}
              </span>
            ))}
            {suppliers.length > 3 && (
              <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">
                +{suppliers.length - 3} mais
              </span>
            )}
          </div>
        </div>
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 bg-gray-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
        >
          <ArrowLeft size={16}/><span>Voltar</span>
        </button>
      </header>

      {/* Painel de KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <MetricCard 
          title="Ruptura Evitada" 
          value="92%" 
          icon={<ShieldCheck size={20} />}
          trend="up"
        />
        <MetricCard 
          title="Redução de Excesso" 
          value="35%" 
          icon={<TrendingUp size={20} />}
          trend="down"
        />
        <MetricCard 
          title="Economia Mensal" 
          value="R$ 24.760" 
          icon={<PiggyBank size={20} />}
        />
        <MetricCard 
          title="Precisão IA" 
          value="96.7%" 
          icon={<Target size={20} />}
        />
      </div>

      {/* Alertas de Risco */}
      <div className="mb-4 p-3 bg-gray-800 rounded-lg">
        <h3 className="text-red-400 font-bold flex items-center">
          <AlertTriangle className="mr-2" /> Alertas de Risco
        </h3>
        <ul className="mt-2 space-y-1">
          {gridData.filter(p => p.stock < p.dailyAvgSale * 2).map(prod => (
            <li key={prod.id} className="text-sm">
              {prod.description} - <span className="text-red-300">Estoque crítico ({prod.stock} uni)</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Botão de Preenchimento Automático */}
      <button 
        onClick={autoFillSuggestions}
        className="mb-4 flex items-center gap-2 bg-blue-600 py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        <Sparkles className="mr-1" /> Preencher com Sugestões de IA
      </button>

      {/* Grade de Análise e Compra */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
          <FileSpreadsheet className="mr-3 text-indigo-400"/>Grade de Análise e Compra
        </h2>
        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-700 text-xs uppercase text-gray-400">
                <tr>
                  <th className="px-4 py-3 min-w-[300px]">Produto</th>
                  <th className="px-4 py-3 text-center">Prioridade</th>
                  <th className="px-4 py-3 text-center">Estoque</th>
                  <th className="px-4 py-3 text-center">Última Compra</th>
                  <th className="px-4 py-3 text-center">Sugestão IA</th>
                  <th className="px-4 py-3 min-w-[250px]">Fornecedor</th>
                  <th className="px-4 py-3 text-center min-w-[120px]">Preço Fornecedor</th>
                  <th className="px-4 py-3 text-center min-w-[120px]">Qtd. a Comprar</th>
                  <th className="px-4 py-3 text-center min-w-[150px]">Valor Total</th>
                </tr>
              </thead>
              <tbody>
                {gridData.map(prod => {
                  const gridItem = gridData.find(item => item.id === prod.id);
                  const totalValue = calculateTotalValue(prod, gridItem?.orderQty, gridItem?.supplierPrice);
                  
                  return (
                    <tr key={prod.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                      <td className="px-4 py-2 font-medium">
                        <div className="text-white flex items-center">
                          {prod.description}
                          {prod.alerts.length > 0 && (
                            <AlertTriangle 
                              size={16} 
                              className="ml-2 text-yellow-400" 
                              title={prod.alerts[0].message}
                            />
                          )}
                        </div>
                        <div className="text-gray-400 text-xs flex items-center gap-2 mt-1">
                          <button 
                            onClick={() => openAnalysis(prod)} 
                            className="text-indigo-400 hover:text-indigo-300 text-xs flex items-center"
                          >
                            <Zap size={12} className="mr-1"/> Analisar com IA 
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <span className={`font-bold ${
                          prod.priority === 'A' ? 'text-red-400' : 
                          prod.priority === 'B' ? 'text-yellow-400' : 'text-green-400'
                        }`}>
                          {prod.priority}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-center">{prod.stock}</td>
                      <td className="px-4 py-2 text-center text-gray-300">
                        R$ {prod.lastPurchasePrice?.toFixed(2) || '0.00'}
                      </td>
                      <td className="px-4 py-2 text-center font-bold text-indigo-300">{prod.suggestion}</td>
                      <td className="px-4 py-2">
                        <select 
                          value={prod.winnerSupplierId} 
                          onChange={(e) => handleGridChange(prod.id, 'winnerSupplierId', e.target.value)} 
                          className="w-full bg-gray-700 text-white rounded-md p-2 text-sm appearance-none border-gray-600 focus:ring-1 focus:ring-indigo-500"
                        >
                          <option value="">Selecione...</option>
                          {prod.availableSuppliers.map(s => (
                            <option key={s.id} value={s.id}>
                              {mockSuppliers.find(sup => sup.id === s.id)?.name} 
                              {s.cost > 0 ? ` - R$ ${s.cost.toFixed(2)}` : ' - Definir preço'}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <div className="flex items-center">
                          <DollarSign size={16} className="text-green-400 mr-1" />
                          <input 
                            type="number" 
                            step="0.01"
                            placeholder="0.00" 
                            value={prod.supplierPrice} 
                            onChange={e => handleGridChange(prod.id, 'supplierPrice', e.target.value)} 
                            className="w-20 bg-gray-700 rounded-md p-2 text-center focus:ring-1 focus:ring-green-500 text-green-300" 
                          />
                        </div>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <input 
                          type="number" 
                          placeholder={prod.suggestion} 
                          value={prod.orderQty} 
                          onChange={e => handleGridChange(prod.id, 'orderQty', e.target.value)} 
                          className="w-24 bg-gray-700 rounded-md p-2 text-center focus:ring-1 focus:ring-indigo-500" 
                        />
                      </td>
                      <td className="px-4 py-2 text-center">
                        <div className="text-white font-bold">
                          R$ {totalValue.toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-400">
                          Última: R$ {((prod.lastPurchasePrice || 0) * Number(prod.orderQty || 0)).toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-400">
                          Atual: R$ {(Number(prod.supplierPrice || 0) * Number(prod.orderQty || 0)).toFixed(2)}
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

      {/* Pedidos em Consolidação */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
          <ShoppingCart className="mr-3 text-green-400"/>Pedidos em Consolidação
        </h2>
        <div className="space-y-4">
          {Object.keys(stagedOrders).length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              Defina a quantidade, preço do fornecedor e o fornecedor de cada produto na grade acima para consolidar os pedidos.
            </p>
          ) : (
            Object.keys(stagedOrders).map(supplierId => {
              const order = stagedOrders[supplierId];
              return (
                <div key={supplierId} className="bg-gray-800 rounded-lg p-4 border-l-4 border-indigo-500">
                  <h3 className="font-semibold text-lg text-indigo-300">{order.supplier.name}</h3>
                  <p className="text-sm text-gray-400">
                    {order.items.length} Itens | Valor Total: 
                    <span className="font-bold text-white"> R$ {order.total.toFixed(2)}</span>
                  </p>
                  <div className="mt-2 space-y-1">
                    {order.items.map(item => (
                      <div key={item.id} className="text-xs text-gray-300 flex justify-between">
                        <span>{item.description}</span>
                        <span>{item.orderQty} x R$ {item.unitPrice.toFixed(2)} = R$ {item.totalCost.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="mt-6 text-right">
          <button 
            onClick={() => {
              registerOnBlockchain(stagedOrders);
              onFinalize(stagedOrders);
            }} 
            className="bg-green-600 text-white font-bold py-3 px-8 rounded-md hover:bg-green-700 transition-colors shadow-lg flex items-center gap-2 ml-auto disabled:bg-green-800 disabled:cursor-not-allowed" 
            disabled={Object.keys(stagedOrders).length === 0}
          >
            <Cpu size={18}/> Enviar para Agente de Compra
          </button>
        </div>
      </div>
    </div>
  );
};

// Tela do Agente de Compra
const OrderAgentScreen = ({ orders, onBackToStart }) => {
  const [processingStatus, setProcessingStatus] = useState('analyzing');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setProcessingStatus('completed');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const totalValue = Object.values(orders).reduce((sum, order) => sum + order.total, 0);
  const totalItems = Object.values(orders).reduce((sum, order) => sum + order.items.length, 0);

  return (
    <div className="animate-fade-in text-center">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Agente de Compra Autônomo</h1>
        <p className="text-gray-400">Processando pedidos com inteligência artificial</p>
      </header>

      <div className="max-w-2xl mx-auto">
        {processingStatus === 'analyzing' ? (
          <div className="space-y-6">
            <div className="animate-pulse-soft">
              <BrainCircuit size={64} className="mx-auto text-indigo-400 mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">Analisando Pedidos...</h2>
              <p className="text-gray-400">O agente está processando {totalItems} itens de {Object.keys(orders).length} fornecedores</p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Resumo do Processamento</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-indigo-400">{totalItems}</div>
                  <div className="text-sm text-gray-400">Itens</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">R$ {totalValue.toFixed(2)}</div>
                  <div className="text-sm text-gray-400">Valor Total</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-green-400">
              <CheckCircle2 size={64} className="mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">Pedidos Processados com Sucesso!</h2>
              <p className="text-gray-400">Todos os pedidos foram enviados aos fornecedores</p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Resultado Final</h3>
              <div className="space-y-2">
                {Object.values(orders).map((order, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
                    <span className="text-white">{order.supplier.name}</span>
                    <span className="text-green-400 font-semibold">R$ {order.total.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={onBackToStart}
              className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Novo Pedido
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [mode, setMode] = useState('start');
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [finalizedOrders, setFinalizedOrders] = useState({});

  const handleStart = (suppliers) => {
    setSelectedSuppliers(suppliers);
    setMode('multi_details');
  };
  
  const handleBackToStart = () => {
    setSelectedSuppliers([]);
    setFinalizedOrders({});
    setMode('start');
  };
  
  const handleFinalizeOrders = (orders) => {
    setFinalizedOrders(orders);
    setMode('agent_processing');
  }

  const renderContent = () => {
    switch(mode) {
      case 'start':
        return <NewOrderStartScreen onStart={handleStart} />;
      case 'multi_details':
        return <MultiOrderScreen 
          suppliers={selectedSuppliers} 
          onBack={handleBackToStart} 
          onFinalize={handleFinalizeOrders} 
        />;
      case 'agent_processing':
        return <OrderAgentScreen 
          orders={finalizedOrders} 
          onBackToStart={handleBackToStart} 
        />;
      default:
        return <NewOrderStartScreen onStart={handleStart} />;
    }
  }

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen font-sans">
      <div className="max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8">
        {renderContent()}
      </div>
      <AIAssistant />
    </div>
  );
}