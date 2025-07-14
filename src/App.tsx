import React, { useState } from 'react';
import { Search, Filter, Calendar, User, Building2, Package, TrendingUp, BarChart3, ArrowLeft, Save, FileText, Printer, Mail, Settings, RefreshCw, X, Plus, Minus, Edit, Check, ShoppingCart, Eye, AlertTriangle, CheckCircle, Clock, DollarSign, Truck, Star, Info } from 'lucide-react';

// Fornecedores fake para teste
const mockSuppliers = [
  { id: 1, codigo: '001', nome: 'DISTRIBUIDORA DISTRIBUIDORA SA', cnpj: '12.345.678/0001-90', cidade: 'São Paulo', prazoEntrega: 3, confiabilidade: 95 },
  { id: 2, codigo: '002', nome: 'ATACADÃO DISTRIBUIÇÃO LTDA', cnpj: '98.765.432/0001-10', cidade: 'Rio de Janeiro', prazoEntrega: 5, confiabilidade: 88 },
  { id: 3, codigo: '003', nome: 'MEGA FORNECEDOR ALIMENTOS', cnpj: '11.222.333/0001-44', cidade: 'Belo Horizonte', prazoEntrega: 2, confiabilidade: 92 },
  { id: 4, codigo: '004', nome: 'CENTRAL DE ABASTECIMENTO', cnpj: '55.666.777/0001-88', cidade: 'Salvador', prazoEntrega: 4, confiabilidade: 90 },
  { id: 5, codigo: '005', nome: 'DISTRIBUIDORA NORDESTE', cnpj: '33.444.555/0001-22', cidade: 'Recife', prazoEntrega: 6, confiabilidade: 85 },
  { id: 6, codigo: '006', nome: 'SUL DISTRIBUIÇÃO', cnpj: '77.888.999/0001-66', cidade: 'Porto Alegre', prazoEntrega: 3, confiabilidade: 93 },
];

const mockBuyers = [
  { id: 1, nome: 'JOÃO SILVA' },
  { id: 2, nome: 'MARIA SANTOS' },
  { id: 3, nome: 'PEDRO OLIVEIRA' },
  { id: 4, nome: 'ANA COSTA' },
];

const mockStores = [
  { id: 1, nome: 'MECAMIX - MATRIZ' },
  { id: 2, nome: 'MINI PREÇO - FILIAL 01' },
  { id: 3, nome: 'SUPER CENTER - FILIAL 02' },
];

interface Product {
  id: string;
  codigo: string;
  descricao: string;
  categoria: string;
  codigoBarras: string;
  embalagem: string;
  estoque: {
    atual: number;
    minimo: number;
    maximo: number;
    ddv: number;
  };
  vendas: {
    ultimaSemana: number;
    ultimoMes: number;
    media: number;
    tendencia: 'alta' | 'baixa' | 'estavel';
  };
  precos: {
    venda: number;
    custo: number;
    margem: number;
  };
  fornecedores: {
    [key: number]: {
      preco: number;
      prazoEntrega: number;
      ultimaCompra: string;
      qualidade: number;
      disponivel: boolean;
    };
  };
  analiseIA: {
    recomendacao: 'comprar' | 'aguardar' | 'urgente';
    quantidade: number;
    fornecedorRecomendado: number;
    motivo: string;
    confianca: number;
  };
}

const mockProducts: Product[] = [
  {
    id: '1',
    codigo: '018918',
    descricao: 'ABSORVENTE ALWAYS BASICO SUAVE C ABAS 16 UN',
    categoria: 'HIGIENE FEMININA',
    codigoBarras: '7500435127257',
    embalagem: 'UN/001',
    estoque: {
      atual: 12,
      minimo: 5,
      maximo: 50,
      ddv: 15
    },
    vendas: {
      ultimaSemana: 8,
      ultimoMes: 32,
      media: 2.3,
      tendencia: 'alta'
    },
    precos: {
      venda: 6.15,
      custo: 5.43,
      margem: 11.7
    },
    fornecedores: {
      1: { preco: 5.43, prazoEntrega: 3, ultimaCompra: '2025-01-05', qualidade: 95, disponivel: true },
      2: { preco: 5.38, prazoEntrega: 5, ultimaCompra: '2024-12-20', qualidade: 88, disponivel: true },
      3: { preco: 5.50, prazoEntrega: 2, ultimaCompra: '2025-01-10', qualidade: 92, disponivel: false }
    },
    analiseIA: {
      recomendacao: 'comprar',
      quantidade: 24,
      fornecedorRecomendado: 2,
      motivo: 'Estoque baixo, tendência de alta nas vendas. Fornecedor 2 oferece melhor preço.',
      confianca: 87
    }
  },
  {
    id: '2',
    codigo: '018919',
    descricao: 'ABSORVENTE ALWAYS BASICO COM ABAS SECA 8 UN',
    categoria: 'HIGIENE FEMININA',
    codigoBarras: '7500435127226',
    embalagem: 'UN/001',
    estoque: {
      atual: 25,
      minimo: 10,
      maximo: 60,
      ddv: 20
    },
    vendas: {
      ultimaSemana: 5,
      ultimoMes: 18,
      media: 1.8,
      tendencia: 'estavel'
    },
    precos: {
      venda: 3.49,
      custo: 2.89,
      margem: 17.2
    },
    fornecedores: {
      1: { preco: 2.89, prazoEntrega: 3, ultimaCompra: '2025-01-08', qualidade: 95, disponivel: true },
      2: { preco: 2.85, prazoEntrega: 5, ultimaCompra: '2024-12-25', qualidade: 88, disponivel: true },
      4: { preco: 2.92, prazoEntrega: 4, ultimaCompra: '2025-01-03', qualidade: 90, disponivel: true }
    },
    analiseIA: {
      recomendacao: 'aguardar',
      quantidade: 0,
      fornecedorRecomendado: 2,
      motivo: 'Estoque adequado, vendas estáveis. Aguardar próximo ciclo.',
      confianca: 92
    }
  },
  {
    id: '3',
    codigo: '018920',
    descricao: 'SHAMPOO PANTENE HIDRATACAO 400ML',
    categoria: 'HIGIENE CAPILAR',
    codigoBarras: '7500435127300',
    embalagem: 'UN/001',
    estoque: {
      atual: 3,
      minimo: 8,
      maximo: 40,
      ddv: 12
    },
    vendas: {
      ultimaSemana: 12,
      ultimoMes: 45,
      media: 3.2,
      tendencia: 'alta'
    },
    precos: {
      venda: 12.90,
      custo: 9.80,
      margem: 24.0
    },
    fornecedores: {
      1: { preco: 9.80, prazoEntrega: 3, ultimaCompra: '2025-01-02', qualidade: 95, disponivel: true },
      3: { preco: 9.75, prazoEntrega: 2, ultimaCompra: '2025-01-08', qualidade: 92, disponivel: true },
      4: { preco: 9.90, prazoEntrega: 4, ultimaCompra: '2024-12-28', qualidade: 90, disponivel: true }
    },
    analiseIA: {
      recomendacao: 'urgente',
      quantidade: 30,
      fornecedorRecomendado: 3,
      motivo: 'Estoque crítico! Vendas em alta. Compra urgente necessária.',
      confianca: 95
    }
  }
];

interface PedidoItem {
  produtoId: string;
  fornecedorId: number;
  quantidade: number;
  preco: number;
  total: number;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'selection' | 'purchase'>('selection');
  const [selectedSuppliers, setSelectedSuppliers] = useState<number[]>([]);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedBuyer, setSelectedBuyer] = useState('');
  const [selectedStore, setSelectedStore] = useState('');
  const [generateSuggestion, setGenerateSuggestion] = useState(false);
  const [useAverageSales, setUseAverageSales] = useState(false);
  const [ddvType, setDdvType] = useState('automatic');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [miniPreco, setMiniPreco] = useState(false);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [showBuyerModal, setShowBuyerModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [pedidoItems, setPedidoItems] = useState<PedidoItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [productQuantities, setProductQuantities] = useState<{[key: string]: number}>({});
  const [productSuppliers, setProductSuppliers] = useState<{[key: string]: number}>({});

  const handleSupplierToggle = (supplierId: number) => {
    setSelectedSuppliers(prev => 
      prev.includes(supplierId) 
        ? prev.filter(id => id !== supplierId)
        : [...prev, supplierId]
    );
  };

  const getSelectedSuppliersText = () => {
    if (selectedSuppliers.length === 0) return '';
    if (selectedSuppliers.length === 1) {
      const supplier = mockSuppliers.find(s => s.id === selectedSuppliers[0]);
      return supplier ? `${supplier.codigo} - ${supplier.nome}` : '';
    }
    return `${selectedSuppliers.length} fornecedores selecionados`;
  };

  const addToPedido = (produtoId: string) => {
    const quantidade = productQuantities[produtoId];
    const fornecedorId = productSuppliers[produtoId];
    
    if (!quantidade || !fornecedorId) return;
    
    const produto = mockProducts.find(p => p.id === produtoId);
    if (!produto || !produto.fornecedores[fornecedorId]) return;

    const preco = produto.fornecedores[fornecedorId].preco;
    const total = quantidade * preco;

    setPedidoItems(prev => {
      const existing = prev.find(item => item.produtoId === produtoId && item.fornecedorId === fornecedorId);
      if (existing) {
        return prev.map(item => 
          item.produtoId === produtoId && item.fornecedorId === fornecedorId
            ? { ...item, quantidade, total: quantidade * item.preco }
            : item
        );
      }
      return [...prev, { produtoId, fornecedorId, quantidade, preco, total }];
    });
  };

  const getRecommendationIcon = (recomendacao: string) => {
    switch (recomendacao) {
      case 'comprar': return <ShoppingCart className="w-4 h-4 text-green-600" />;
      case 'urgente': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'aguardar': return <Clock className="w-4 h-4 text-yellow-600" />;
      default: return null;
    }
  };

  const getTendenciaIcon = (tendencia: string) => {
    switch (tendencia) {
      case 'alta': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'baixa': return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      case 'estavel': return <Minus className="w-4 h-4 text-gray-600" />;
      default: return null;
    }
  };

  const filteredProducts = mockProducts.filter(product =>
    product.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.codigo.includes(searchTerm)
  );

  const getAvailableSuppliers = (product: Product) => {
    return selectedSuppliers
      .map(id => mockSuppliers.find(s => s.id === id))
      .filter(supplier => supplier && product.fornecedores[supplier.id]?.disponivel);
  };

  // Modal de Seleção de Fornecedores
  const SupplierModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-800 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">Selecionar Fornecedores</h2>
          <button 
            onClick={() => setShowSupplierModal(false)}
            className="text-gray-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-96">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar fornecedor..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="space-y-2">
            {mockSuppliers.map(supplier => (
              <label key={supplier.id} className="flex items-center p-3 hover:bg-gray-50 rounded-md cursor-pointer border">
                <input
                  type="checkbox"
                  checked={selectedSuppliers.includes(supplier.id)}
                  onChange={() => handleSupplierToggle(supplier.id)}
                  className="mr-3"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {supplier.codigo} - {supplier.nome}
                  </div>
                  <div className="text-sm text-gray-600">
                    CNPJ: {supplier.cnpj} | {supplier.cidade} | Entrega: {supplier.prazoEntrega} dias | Confiabilidade: {supplier.confiabilidade}%
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
        
        <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3">
          <button 
            onClick={() => setShowSupplierModal(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancelar
          </button>
          <button 
            onClick={() => setShowSupplierModal(false)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Confirmar ({selectedSuppliers.length})
          </button>
        </div>
      </div>
    </div>
  );

  // Modal de Seleção de Compradores
  const BuyerModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <div className="px-6 py-4 border-b bg-gray-800 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">Selecionar Comprador</h2>
          <button 
            onClick={() => setShowBuyerModal(false)}
            className="text-gray-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="space-y-2">
            {mockBuyers.map(buyer => (
              <label key={buyer.id} className="flex items-center p-3 hover:bg-gray-50 rounded-md cursor-pointer border">
                <input
                  type="radio"
                  name="buyer"
                  value={buyer.id}
                  checked={selectedBuyer === buyer.nome}
                  onChange={() => setSelectedBuyer(buyer.nome)}
                  className="mr-3"
                />
                <div className="font-medium text-gray-900">{buyer.nome}</div>
              </label>
            ))}
          </div>
        </div>
        
        <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3">
          <button 
            onClick={() => setShowBuyerModal(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancelar
          </button>
          <button 
            onClick={() => setShowBuyerModal(false)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );

  // Modal de Informações do Produto
  const ProductModal = () => {
    if (!selectedProduct) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
          <div className="px-6 py-4 border-b bg-gray-800 flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Informações do Produto</h2>
            <button 
              onClick={() => setShowProductModal(false)}
              className="text-gray-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto max-h-[70vh]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Informações Básicas */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Informações Básicas
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Código:</span>
                    <span className="font-medium">{selectedProduct.codigo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Descrição:</span>
                    <span className="font-medium">{selectedProduct.descricao}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Categoria:</span>
                    <span className="font-medium">{selectedProduct.categoria}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Código Barras:</span>
                    <span className="font-medium">{selectedProduct.codigoBarras}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Embalagem:</span>
                    <span className="font-medium">{selectedProduct.embalagem}</span>
                  </div>
                </div>
              </div>

              {/* Análise IA */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Análise IA
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    {getRecommendationIcon(selectedProduct.analiseIA.recomendacao)}
                    <span className="font-medium">
                      {selectedProduct.analiseIA.recomendacao === 'comprar' ? 'Recomendado Comprar' :
                       selectedProduct.analiseIA.recomendacao === 'urgente' ? 'Compra Urgente' : 'Aguardar'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantidade Sugerida:</span>
                    <span className="font-medium">{selectedProduct.analiseIA.quantidade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fornecedor Recomendado:</span>
                    <span className="font-medium">{mockSuppliers.find(s => s.id === selectedProduct.analiseIA.fornecedorRecomendado)?.nome}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Confiança:</span>
                    <span className="font-medium">{selectedProduct.analiseIA.confianca}%</span>
                  </div>
                  <div className="mt-2 p-2 bg-white rounded text-xs">
                    <strong>Motivo:</strong> {selectedProduct.analiseIA.motivo}
                  </div>
                </div>
              </div>

              {/* Estoque */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Estoque
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded text-center">
                    <div className="text-gray-600 text-xs">Atual</div>
                    <div className={`font-bold text-lg ${selectedProduct.estoque.atual <= selectedProduct.estoque.minimo ? 'text-red-600' : 'text-green-600'}`}>
                      {selectedProduct.estoque.atual}
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded text-center">
                    <div className="text-gray-600 text-xs">Mínimo</div>
                    <div className="font-bold text-lg text-red-600">{selectedProduct.estoque.minimo}</div>
                  </div>
                  <div className="bg-white p-3 rounded text-center">
                    <div className="text-gray-600 text-xs">Máximo</div>
                    <div className="font-bold text-lg text-green-600">{selectedProduct.estoque.maximo}</div>
                  </div>
                  <div className="bg-white p-3 rounded text-center">
                    <div className="text-gray-600 text-xs">DDV</div>
                    <div className="font-bold text-lg">{selectedProduct.estoque.ddv}</div>
                  </div>
                </div>
              </div>

              {/* Vendas */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Histórico de Vendas
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Última Semana:</span>
                    <span className="font-medium">{selectedProduct.vendas.ultimaSemana} un</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Último Mês:</span>
                    <span className="font-medium">{selectedProduct.vendas.ultimoMes} un</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Média Diária:</span>
                    <span className="font-medium">{selectedProduct.vendas.media} un</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tendência:</span>
                    <div className="flex items-center gap-1">
                      {getTendenciaIcon(selectedProduct.vendas.tendencia)}
                      <span className="font-medium capitalize">{selectedProduct.vendas.tendencia}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preços e Margem */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Preços e Margem
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Preço Venda:</span>
                    <span className="font-medium text-green-600">R$ {selectedProduct.precos.venda.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Custo Médio:</span>
                    <span className="font-medium">R$ {selectedProduct.precos.custo.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Margem:</span>
                    <span className={`font-medium ${selectedProduct.precos.margem > 15 ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedProduct.precos.margem.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Fornecedores */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Fornecedores
                </h3>
                <div className="space-y-3">
                  {Object.entries(selectedProduct.fornecedores).map(([fornecedorId, dados]) => {
                    const fornecedor = mockSuppliers.find(s => s.id === parseInt(fornecedorId));
                    if (!fornecedor) return null;
                    
                    return (
                      <div key={fornecedorId} className="bg-white p-3 rounded border">
                        <div className="font-medium text-sm mb-1">{fornecedor.nome}</div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                          <div>Preço: R$ {dados.preco.toFixed(2)}</div>
                          <div>Entrega: {dados.prazoEntrega} dias</div>
                          <div>Qualidade: {dados.qualidade}%</div>
                          <div className={dados.disponivel ? 'text-green-600' : 'text-red-600'}>
                            {dados.disponivel ? 'Disponível' : 'Indisponível'}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Última compra: {dados.ultimaCompra}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
            <button 
              onClick={() => setShowProductModal(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Tela de Seleção de Parâmetros
  if (currentScreen === 'selection') {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-2xl mx-auto py-8">
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-700 bg-gray-700">
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <Filter className="w-6 h-6 text-blue-400" />
                Inclusão de Pedido Compra
              </h1>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Fornecedor */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Fornecedor {selectedSuppliers.length > 0 && (
                    <span className="text-blue-400">({selectedSuppliers.length} selecionado{selectedSuppliers.length > 1 ? 's' : ''})</span>
                  )}
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={getSelectedSuppliersText()}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                    placeholder="Clique em buscar para selecionar fornecedores..."
                  />
                  <button 
                    onClick={() => setShowSupplierModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Divisão */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Divisão</label>
                <select
                  value={selectedDivision}
                  onChange={(e) => setSelectedDivision(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                >
                  <option value=""></option>
                  <option value="1">MERCEARIA</option>
                  <option value="2">PERECÍVEIS</option>
                  <option value="3">LIMPEZA</option>
                  <option value="4">HIGIENE</option>
                </select>
              </div>

              {/* Comprador */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Comprador</label>
                <div className="flex">
                  <input
                    type="text"
                    value={selectedBuyer}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                    placeholder="Clique em buscar para selecionar comprador..."
                  />
                  <button 
                    onClick={() => setShowBuyerModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Loja */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Loja</label>
                <div className="space-y-2">
                  <select
                    value={selectedStore}
                    onChange={(e) => setSelectedStore(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                  >
                    <option value=""></option>
                    {mockStores.map(store => (
                      <option key={store.id} value={store.nome}>{store.nome}</option>
                    ))}
                  </select>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={miniPreco}
                      onChange={(e) => setMiniPreco(e.target.checked)}
                      className="mr-2" 
                    />
                    <span className="text-sm text-gray-300">MINI PREÇO</span>
                  </label>
                </div>
              </div>

              {/* Opções */}
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={generateSuggestion}
                    onChange={(e) => setGenerateSuggestion(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-300">Gera Sugestão</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={useAverageSales}
                    onChange={(e) => setUseAverageSales(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-300">Utiliza Venda Média do Período</span>
                </label>
              </div>

              {/* DDV */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">DDV</label>
                <div className="flex gap-4 mb-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="ddv"
                      value="automatic"
                      checked={ddvType === 'automatic'}
                      onChange={(e) => setDdvType(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-300">Automático</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="ddv"
                      value="manual"
                      checked={ddvType === 'manual'}
                      onChange={(e) => setDdvType(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-300">Manual</span>
                  </label>
                </div>
                {ddvType === 'manual' && (
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                    placeholder="Dias"
                  />
                )}
              </div>

              {/* Período */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Período</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                  />
                  <span className="text-gray-400">a</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                  />
                </div>
              </div>

              {/* Botões */}
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setCurrentScreen('purchase')}
                  disabled={selectedSuppliers.length === 0}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2 disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                  <Settings className="w-4 h-4" />
                  Gerar
                </button>
                <button className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2">
                  <X className="w-4 h-4" />
                  Sair
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modais */}
        {showSupplierModal && <SupplierModal />}
        {showBuyerModal && <BuyerModal />}
      </div>
    );
  }

  // Tela Principal de Pedido de Compra
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentScreen('selection')}
                className="p-2 hover:bg-gray-700 rounded-md text-gray-300"
                title="Voltar"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-white">Central de Compras</h1>
                <p className="text-sm text-gray-400">
                  {selectedSuppliers.length} fornecedor{selectedSuppliers.length > 1 ? 'es' : ''} • {selectedStore} • {selectedBuyer}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2">
                <Save className="w-4 h-4" />
                Salvar Pedidos
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-md text-gray-300" title="Imprimir">
                <Printer className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-md text-gray-300" title="Email">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-3">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar produtos por código ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
            />
          </div>
          <select className="px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white">
            <option>Todas as Categorias</option>
            <option>HIGIENE FEMININA</option>
            <option>HIGIENE CAPILAR</option>
            <option>LIMPEZA</option>
            <option>MERCEARIA</option>
          </select>
          <select className="px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white">
            <option>Todas as Recomendações</option>
            <option>Comprar</option>
            <option>Urgente</option>
            <option>Aguardar</option>
          </select>
        </div>
      </div>

      {/* Lista de Produtos */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-4">
          {filteredProducts.map(product => {
            const availableSuppliers = getAvailableSuppliers(product);
            
            return (
              <div key={product.id} className="bg-gray-800 rounded-lg border border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-sm bg-gray-700 text-gray-300 px-2 py-1 rounded">{product.codigo}</span>
                        <h3 className="font-medium text-white">{product.descricao}</h3>
                        <span className="text-xs bg-blue-600 text-blue-100 px-2 py-1 rounded">{product.categoria}</span>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-gray-400">Estoque Atual</div>
                          <div className={`font-bold ${product.estoque.atual <= product.estoque.minimo ? 'text-red-400' : 'text-green-400'}`}>
                            {product.estoque.atual} un
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-400">Venda/Semana</div>
                          <div className="font-bold flex items-center gap-1 text-white">
                            {product.vendas.ultimaSemana} un
                            {getTendenciaIcon(product.vendas.tendencia)}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-400">Preço Venda</div>
                          <div className="font-bold text-green-400">R$ {product.precos.venda.toFixed(2)}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Margem</div>
                          <div className={`font-bold ${product.precos.margem > 15 ? 'text-green-400' : 'text-red-400'}`}>
                            {product.precos.margem.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          {getRecommendationIcon(product.analiseIA.recomendacao)}
                          <span className="text-sm font-medium text-white">
                            {product.analiseIA.recomendacao === 'comprar' ? 'Comprar' :
                             product.analiseIA.recomendacao === 'urgente' ? 'Urgente' : 'Aguardar'}
                          </span>
                        </div>
                        <div className="text-xs text-gray-400">
                          IA: {product.analiseIA.confianca}% confiança
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowProductModal(true);
                        }}
                        className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        title="Ver informações completas"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Área de Compra */}
                  <div className="pt-4 border-t border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Quantidade</label>
                        <input
                          type="number"
                          min="0"
                          placeholder="0"
                          className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                          onChange={(e) => setProductQuantities({
                            ...productQuantities,
                            [product.id]: parseInt(e.target.value) || 0
                          })}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Fornecedor</label>
                        <select
                          className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                          onChange={(e) => setProductSuppliers({
                            ...productSuppliers,
                            [product.id]: parseInt(e.target.value) || 0
                          })}
                        >
                          <option value="">Selecione...</option>
                          {availableSuppliers.map(supplier => {
                            if (!supplier) return null;
                            const supplierData = product.fornecedores[supplier.id];
                            return (
                              <option key={supplier.id} value={supplier.id}>
                                {supplier.nome} - R$ {supplierData.preco.toFixed(2)}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Total</label>
                        <div className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white">
                          R$ {(() => {
                            const qty = productQuantities[product.id] || 0;
                            const supplierId = productSuppliers[product.id];
                            if (qty && supplierId && product.fornecedores[supplierId]) {
                              return (qty * product.fornecedores[supplierId].preco).toFixed(2);
                            }
                            return '0,00';
                          })()}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => addToPedido(product.id)}
                        disabled={!productQuantities[product.id] || !productSuppliers[product.id]}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Adicionar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Resumo dos Pedidos */}
      {pedidoItems.length > 0 && (
        <div className="bg-gray-800 border-t border-gray-700 p-4">
          <h3 className="font-bold text-white mb-2">Resumo dos Pedidos ({pedidoItems.length} itens)</h3>
          <div className="text-sm text-gray-300">
            Total: R$ {pedidoItems.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
          </div>
        </div>
      )}

      {/* Modais */}
      {showProductModal && <ProductModal />}
    </div>
  );
}