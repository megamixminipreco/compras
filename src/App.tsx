import React, { useState } from 'react';
import { Search, Filter, Calendar, User, Building2, Package, TrendingUp, BarChart3, ArrowLeft, Save, FileText, Printer, Mail, Settings, RefreshCw, X, Plus, Minus, Edit, Check, ShoppingCart, Eye, AlertTriangle, CheckCircle, Clock, DollarSign, Truck, Star } from 'lucide-react';

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [pedidoItems, setPedidoItems] = useState<PedidoItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const addToPedido = (produtoId: string, fornecedorId: number, quantidade: number) => {
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

  // Modal de Seleção de Fornecedores
  const SupplierModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
        <div className="px-6 py-4 border-b bg-blue-50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Selecionar Fornecedores</h2>
          <button 
            onClick={() => setShowSupplierModal(false)}
            className="text-gray-500 hover:text-gray-700"
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
              <label key={supplier.id} className="flex items-center p-3 hover:bg-gray-50 rounded-md cursor-pointer">
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
        <div className="px-6 py-4 border-b bg-blue-50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Selecionar Comprador</h2>
          <button 
            onClick={() => setShowBuyerModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="space-y-2">
            {mockBuyers.map(buyer => (
              <label key={buyer.id} className="flex items-center p-3 hover:bg-gray-50 rounded-md cursor-pointer">
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

  // Painel de Detalhes do Produto
  const ProductDetailPanel = ({ product }: { product: Product }) => (
    <div className="w-96 bg-white border-l border-gray-200 p-6 overflow-y-auto">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-gray-900">Detalhes do Produto</h3>
        <button 
          onClick={() => setSelectedProduct(null)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Informações Básicas */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-2">Informações Básicas</h4>
        <div className="space-y-2 text-sm">
          <div><strong>Código:</strong> {product.codigo}</div>
          <div><strong>Descrição:</strong> {product.descricao}</div>
          <div><strong>Categoria:</strong> {product.categoria}</div>
          <div><strong>Código Barras:</strong> {product.codigoBarras}</div>
          <div><strong>Embalagem:</strong> {product.embalagem}</div>
        </div>
      </div>

      {/* Análise IA */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
          <Star className="w-4 h-4" />
          Análise IA
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            {getRecommendationIcon(product.analiseIA.recomendacao)}
            <span className="font-medium">
              {product.analiseIA.recomendacao === 'comprar' ? 'Recomendado Comprar' :
               product.analiseIA.recomendacao === 'urgente' ? 'Compra Urgente' : 'Aguardar'}
            </span>
          </div>
          <div><strong>Quantidade Sugerida:</strong> {product.analiseIA.quantidade}</div>
          <div><strong>Fornecedor Recomendado:</strong> {mockSuppliers.find(s => s.id === product.analiseIA.fornecedorRecomendado)?.nome}</div>
          <div><strong>Confiança:</strong> {product.analiseIA.confianca}%</div>
          <div className="mt-2 p-2 bg-white rounded text-xs">
            <strong>Motivo:</strong> {product.analiseIA.motivo}
          </div>
        </div>
      </div>

      {/* Estoque */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-2">Estoque</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="p-2 bg-gray-50 rounded">
            <div className="text-gray-600">Atual</div>
            <div className="font-bold text-lg">{product.estoque.atual}</div>
          </div>
          <div className="p-2 bg-gray-50 rounded">
            <div className="text-gray-600">Mínimo</div>
            <div className="font-bold text-lg text-red-600">{product.estoque.minimo}</div>
          </div>
          <div className="p-2 bg-gray-50 rounded">
            <div className="text-gray-600">Máximo</div>
            <div className="font-bold text-lg text-green-600">{product.estoque.maximo}</div>
          </div>
          <div className="p-2 bg-gray-50 rounded">
            <div className="text-gray-600">DDV</div>
            <div className="font-bold text-lg">{product.estoque.ddv}</div>
          </div>
        </div>
      </div>

      {/* Vendas */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-2">Histórico de Vendas</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Última Semana:</span>
            <span className="font-medium">{product.vendas.ultimaSemana} un</span>
          </div>
          <div className="flex justify-between">
            <span>Último Mês:</span>
            <span className="font-medium">{product.vendas.ultimoMes} un</span>
          </div>
          <div className="flex justify-between">
            <span>Média Diária:</span>
            <span className="font-medium">{product.vendas.media} un</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Tendência:</span>
            <div className="flex items-center gap-1">
              {getTendenciaIcon(product.vendas.tendencia)}
              <span className="font-medium capitalize">{product.vendas.tendencia}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Preços e Margem */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-2">Preços e Margem</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Preço Venda:</span>
            <span className="font-medium text-green-600">R$ {product.precos.venda.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Custo Médio:</span>
            <span className="font-medium">R$ {product.precos.custo.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Margem:</span>
            <span className={`font-medium ${product.precos.margem > 15 ? 'text-green-600' : 'text-red-600'}`}>
              {product.precos.margem.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Fornecedores */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-2">Fornecedores</h4>
        <div className="space-y-3">
          {Object.entries(product.fornecedores).map(([fornecedorId, dados]) => {
            const fornecedor = mockSuppliers.find(s => s.id === parseInt(fornecedorId));
            if (!fornecedor) return null;
            
            return (
              <div key={fornecedorId} className="p-3 border rounded-lg">
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
                
                {dados.disponivel && selectedSuppliers.includes(parseInt(fornecedorId)) && (
                  <div className="mt-2 flex gap-2">
                    <input
                      type="number"
                      placeholder="Qtd"
                      className="flex-1 px-2 py-1 border rounded text-xs"
                      onChange={(e) => {
                        const quantidade = parseInt(e.target.value) || 0;
                        if (quantidade > 0) {
                          addToPedido(product.id, parseInt(fornecedorId), quantidade);
                        }
                      }}
                    />
                    <button className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">
                      Adicionar
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Tela de Seleção de Parâmetros
  if (currentScreen === 'selection') {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-2xl mx-auto py-8">
          <div className="bg-white rounded-lg shadow-lg border">
            {/* Header */}
            <div className="px-6 py-4 border-b bg-blue-50">
              <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Filter className="w-6 h-6 text-blue-600" />
                Inclusão de Pedido Compra
              </h1>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Fornecedor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fornecedor {selectedSuppliers.length > 0 && (
                    <span className="text-blue-600">({selectedSuppliers.length} selecionado{selectedSuppliers.length > 1 ? 's' : ''})</span>
                  )}
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={getSelectedSuppliersText()}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Divisão</label>
                <select
                  value={selectedDivision}
                  onChange={(e) => setSelectedDivision(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Comprador</label>
                <div className="flex">
                  <input
                    type="text"
                    value={selectedBuyer}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Loja</label>
                <div className="space-y-2">
                  <select
                    value={selectedStore}
                    onChange={(e) => setSelectedStore(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <span className="text-sm text-gray-600">MINI PREÇO</span>
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
                  <span className="text-sm text-gray-600">Gera Sugestão</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={useAverageSales}
                    onChange={(e) => setUseAverageSales(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-600">Utiliza Venda Média do Período</span>
                </label>
              </div>

              {/* DDV */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">DDV</label>
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
                    <span className="text-sm text-gray-600">Automático</span>
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
                    <span className="text-sm text-gray-600">Manual</span>
                  </label>
                </div>
                {ddvType === 'manual' && (
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Dias"
                  />
                )}
              </div>

              {/* Período */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Período</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-500">a</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Botões */}
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setCurrentScreen('purchase')}
                  disabled={selectedSuppliers.length === 0}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
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

  // Tela Principal de Pedido de Compra (MODERNA)
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Área Principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setCurrentScreen('selection')}
                  className="p-2 hover:bg-gray-100 rounded-md"
                  title="Voltar"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Central de Compras</h1>
                  <p className="text-sm text-gray-600">
                    {selectedSuppliers.length} fornecedor{selectedSuppliers.length > 1 ? 'es' : ''} • {selectedStore} • {selectedBuyer}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Salvar Pedidos
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-md" title="Imprimir">
                  <Printer className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-md" title="Email">
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="bg-white border-b px-6 py-3">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar produtos por código ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Todas as Categorias</option>
              <option>HIGIENE FEMININA</option>
              <option>LIMPEZA</option>
              <option>MERCEARIA</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Todas as Recomendações</option>
              <option>Comprar</option>
              <option>Urgente</option>
              <option>Aguardar</option>
            </select>
          </div>
        </div>

        {/* Lista de Produtos */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="grid gap-4">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{product.codigo}</span>
                          <h3 className="font-medium text-gray-900">{product.descricao}</h3>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{product.categoria}</span>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-gray-600">Estoque Atual</div>
                            <div className={`font-bold ${product.estoque.atual <= product.estoque.minimo ? 'text-red-600' : 'text-green-600'}`}>
                              {product.estoque.atual} un
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-600">Venda/Semana</div>
                            <div className="font-bold flex items-center gap-1">
                              {product.vendas.ultimaSemana} un
                              {getTendenciaIcon(product.vendas.tendencia)}
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-600">Preço Venda</div>
                            <div className="font-bold text-green-600">R$ {product.precos.venda.toFixed(2)}</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Margem</div>
                            <div className={`font-bold ${product.precos.margem > 15 ? 'text-green-600' : 'text-red-600'}`}>
                              {product.precos.margem.toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-1">
                            {getRecommendationIcon(product.analiseIA.recomendacao)}
                            <span className="text-sm font-medium">
                              {product.analiseIA.recomendacao === 'comprar' ? 'Comprar' :
                               product.analiseIA.recomendacao === 'urgente' ? 'Urgente' : 'Aguardar'}
                            </span>
                          </div>
                          <div className="text-xs text-gray-600">
                            IA: {product.analiseIA.confianca}% confiança
                          </div>
                        </div>
                        <button 
                          onClick={() => setSelectedProduct(product)}
                          className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          title="Ver detalhes"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Fornecedores Disponíveis */}
                    <div className="mt-4 pt-4 border-t">
                      <div className="text-sm font-medium text-gray-700 mb-2">Fornecedores Disponíveis:</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {Object.entries(product.fornecedores)
                          .filter(([fornecedorId]) => selectedSuppliers.includes(parseInt(fornecedorId)))
                          .map(([fornecedorId, dados]) => {
                            const fornecedor = mockSuppliers.find(s => s.id === parseInt(fornecedorId));
                            if (!fornecedor || !dados.disponivel) return null;
                            
                            return (
                              <div key={fornecedorId} className="p-3 border rounded-lg bg-gray-50">
                                <div className="flex justify-between items-start mb-2">
                                  <div className="text-sm font-medium">{fornecedor.nome}</div>
                                  <div className="text-sm font-bold text-green-600">R$ {dados.preco.toFixed(2)}</div>
                                </div>
                                <div className="text-xs text-gray-600 mb-2">
                                  Entrega: {dados.prazoEntrega} dias • Qualidade: {dados.qualidade}%
                                </div>
                                <div className="flex gap-2">
                                  <input
                                    type="number"
                                    placeholder="Qtd"
                                    className="flex-1 px-2 py-1 border rounded text-sm"
                                    min="0"
                                    onChange={(e) => {
                                      const quantidade = parseInt(e.target.value) || 0;
                                      if (quantidade > 0) {
                                        addToPedido(product.id, parseInt(fornecedorId), quantidade);
                                      }
                                    }}
                                  />
                                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resumo dos Pedidos */}
        {pedidoItems.length > 0 && (
          <div className="bg-white border-t p-4">
            <h3 className="font-bold text-gray-900 mb-2">Resumo dos Pedidos ({pedidoItems.length} itens)</h3>
            <div className="text-sm text-gray-600">
              Total: R$ {pedidoItems.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
            </div>
          </div>
        )}
      </div>

      {/* Painel Lateral de Detalhes */}
      {selectedProduct && <ProductDetailPanel product={selectedProduct} />}
    </div>
  );
}