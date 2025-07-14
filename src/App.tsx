import React, { useState } from 'react';
import { Search, Filter, Calendar, User, Building2, Package, TrendingUp, BarChart3, ArrowLeft, Save, FileText, Printer, Mail, Settings, RefreshCw, X, Plus, Minus, Edit, Check } from 'lucide-react';

// Fornecedores fake para teste
const mockSuppliers = [
  { id: 1, codigo: '001', nome: 'DISTRIBUIDORA DISTRIBUIDORA SA', cnpj: '12.345.678/0001-90', cidade: 'São Paulo' },
  { id: 2, codigo: '002', nome: 'ATACADÃO DISTRIBUIÇÃO LTDA', cnpj: '98.765.432/0001-10', cidade: 'Rio de Janeiro' },
  { id: 3, codigo: '003', nome: 'MEGA FORNECEDOR ALIMENTOS', cnpj: '11.222.333/0001-44', cidade: 'Belo Horizonte' },
  { id: 4, codigo: '004', nome: 'CENTRAL DE ABASTECIMENTO', cnpj: '55.666.777/0001-88', cidade: 'Salvador' },
  { id: 5, codigo: '005', nome: 'DISTRIBUIDORA NORDESTE', cnpj: '33.444.555/0001-22', cidade: 'Recife' },
  { id: 6, codigo: '006', nome: 'SUL DISTRIBUIÇÃO', cnpj: '77.888.999/0001-66', cidade: 'Porto Alegre' },
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
  quantidade: number;
  qtdBonificada: number;
  valorVenda: number;
  percentualVenda: number;
  embalagem: string;
  custoCompra: number;
  custoVenda: number;
  custoFinal: number;
  desconto: number;
  valorFinal: number;
  valorTotal: number;
  qtdAtendida: number;
  codExterno: string;
  margemLiquida: number;
  margemBruta: number;
  margemSobCusto: number;
  margemSobVenda: number;
  margemMinima: number;
  margemMaxima: number;
  margemPadrao: number;
  codigoBarras: string;
}

interface StoreInfo {
  estoque: number;
  qtdEntrada: number;
  custoMedio: number;
  estoqueMinimo: number;
  estoqueMaximo: number;
  ddvMaximo: number;
  troca: number;
  loja: string;
  precoVenda: number;
  entrada: number;
  margemLiquida: number;
  margemBruta: number;
  estoqueAtual: number;
  vendaSemana: number;
  vendaMensal: number;
}

const mockProducts: Product[] = [
  {
    id: '1',
    codigo: '018918',
    descricao: 'ABSORVENTE ALWAYS BASICO SUAVE C ABAS 16 UN',
    quantidade: 0,
    qtdBonificada: 0,
    valorVenda: 0.00,
    percentualVenda: 0.00,
    embalagem: 'UN/001',
    custoCompra: 5.43,
    custoVenda: 0.00,
    custoFinal: 0.00,
    desconto: 0.00,
    valorFinal: 0.00,
    valorTotal: 0.00,
    qtdAtendida: 0,
    codExterno: '0000000000001735',
    margemLiquida: 14.73,
    margemBruta: 32.73,
    margemSobCusto: 87.22,
    margemSobVenda: 46.59,
    margemMinima: 0.00,
    margemMaxima: 0.00,
    margemPadrao: 42.40,
    codigoBarras: '7500435127257'
  },
  {
    id: '2',
    codigo: '018919',
    descricao: 'ABSORVENTE ALWAYS BASICO COM ABAS SECA 8 UN',
    quantidade: 0,
    qtdBonificada: 0,
    valorVenda: 0.00,
    percentualVenda: 0.00,
    embalagem: 'UN/001',
    custoCompra: 2.89,
    custoVenda: 0.00,
    custoFinal: 0.00,
    desconto: 0.00,
    valorFinal: 0.00,
    valorTotal: 0.00,
    qtdAtendida: 0,
    codExterno: '0000000000001863',
    margemLiquida: 17.06,
    margemBruta: 35.06,
    margemSobCusto: 99.65,
    margemSobVenda: 49.91,
    margemMinima: 7.50,
    margemMaxima: 12.00,
    margemPadrao: 10.00,
    codigoBarras: '7500435127226'
  }
];

const mockStoreInfo: StoreInfo[] = [
  {
    estoque: 10.79,
    qtdEntrada: 0,
    custoMedio: 0.03,
    estoqueMinimo: 0,
    estoqueMaximo: 0,
    ddvMaximo: 0,
    troca: 0,
    loja: 'MECAMIX',
    precoVenda: 6.150,
    entrada: 0,
    margemLiquida: 7.69,
    margemBruta: 76.60,
    estoqueAtual: 12.000,
    vendaSemana: 25.69,
    vendaMensal: 8
  },
  {
    estoque: 10.79,
    qtdEntrada: 0,
    custoMedio: 0.06,
    estoqueMinimo: 0,
    estoqueMaximo: 0,
    ddvMaximo: 0,
    troca: 0,
    loja: 'MINI PREÇO',
    precoVenda: 6.060,
    entrada: 0,
    margemLiquida: 7.69,
    margemBruta: 76.60,
    estoqueAtual: 12.000,
    vendaSemana: 25.69,
    vendaMensal: 2
  }
];

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
                    CNPJ: {supplier.cnpj} | {supplier.cidade}
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

  // Tela Principal de Pedido de Compra
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toolbar Superior */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-full mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentScreen('selection')}
                className="p-2 hover:bg-gray-100 rounded-md"
                title="Voltar"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-bold text-gray-900">Pedido de Compra</h1>
            </div>
            
            {/* Toolbar Buttons */}
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-md" title="Novo">
                <Plus className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-md" title="Salvar">
                <Save className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-md" title="Imprimir">
                <Printer className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-md" title="Email">
                <Mail className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-md" title="Atualizar">
                <RefreshCw className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-md" title="Filtro">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Informações do Pedido */}
      <div className="bg-white border-b px-4 py-3">
        <div className="grid grid-cols-6 gap-4 text-sm">
          <div><strong>Loja Padrão:</strong> {selectedStore || 'MECAMIX'}</div>
          <div><strong>Nº Pedido:</strong> </div>
          <div><strong>Fornecedores:</strong> {selectedSuppliers.length} selecionado{selectedSuppliers.length > 1 ? 's' : ''}</div>
          <div><strong>Estado:</strong> </div>
          <div><strong>Comprador:</strong> {selectedBuyer}</div>
          <div><strong>Divisão:</strong> {selectedDivision}</div>
        </div>
        <div className="grid grid-cols-6 gap-4 text-sm mt-2">
          <div><strong>Tipo Frete:</strong> CIF (PAGO)</div>
          <div><strong>Valor Frete:</strong> </div>
          <div><strong>Usa Destino:</strong> </div>
          <div><strong>Pedido Min. Valor:</strong> Vr Desconto</div>
          <div><strong>Data Compra:</strong> 12/07/2025</div>
          <div><strong>Situação:</strong> DIGITANDO</div>
        </div>
      </div>

      <div className="max-w-full mx-auto px-4 py-4">
        {/* Tabela Principal de Produtos */}
        <div className="bg-white rounded-lg shadow-sm border mb-4">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-2 py-2 text-left font-medium text-gray-700">Produtos</th>
                  <th className="px-2 py-2 text-left font-medium text-gray-700">Descrição</th>
                  <th className="px-2 py-2 text-right font-medium text-gray-700">Quantidade</th>
                  <th className="px-2 py-2 text-right font-medium text-gray-700">Qtd Bonificada</th>
                  <th className="px-2 py-2 text-right font-medium text-gray-700">Valor Venda</th>
                  <th className="px-2 py-2 text-right font-medium text-gray-700">% Venda</th>
                  <th className="px-2 py-2 text-left font-medium text-gray-700">Embalagem</th>
                  <th className="px-2 py-2 text-right font-medium text-gray-700">Custo Compra</th>
                  <th className="px-2 py-2 text-right font-medium text-gray-700">Custo Venda</th>
                  <th className="px-2 py-2 text-right font-medium text-gray-700">Custo Final</th>
                  <th className="px-2 py-2 text-right font-medium text-gray-700">Desconto</th>
                  <th className="px-2 py-2 text-right font-medium text-gray-700">Valor Final</th>
                  <th className="px-2 py-2 text-right font-medium text-gray-700">Valor Total</th>
                  <th className="px-2 py-2 text-right font-medium text-gray-700">Qtd Atendida</th>
                  <th className="px-2 py-2 text-left font-medium text-gray-700">Cód Externo</th>
                  <th className="px-2 py-2 text-right font-medium text-gray-700">Mrg. Líq.</th>
                  <th className="px-2 py-2 text-right font-medium text-gray-700">Mrg. Bruta</th>
                  <th className="px-2 py-2 text-right font-medium text-gray-700">Mrg. Sb. Custo</th>
                  <th className="px-2 py-2 text-right font-medium text-gray-700">Mrg. Sb. Venda</th>
                  <th className="px-2 py-2 text-right font-medium text-gray-700">Mrg. Mínima</th>
                  <th className="px-2 py-2 text-right font-medium text-gray-700">Mrg. Máxima</th>
                  <th className="px-2 py-2 text-right font-medium text-gray-700">Mrg. Padrão</th>
                  <th className="px-2 py-2 text-left font-medium text-gray-700">Código Barras</th>
                </tr>
              </thead>
              <tbody>
                {mockProducts.map((product, index) => (
                  <tr key={product.id} className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-2 py-2 font-mono text-blue-600">{product.codigo}</td>
                    <td className="px-2 py-2 max-w-xs truncate">{product.descricao}</td>
                    <td className="px-2 py-2 text-right">{product.quantidade}</td>
                    <td className="px-2 py-2 text-right">{product.qtdBonificada}</td>
                    <td className="px-2 py-2 text-right">R$ {product.valorVenda.toFixed(2)}</td>
                    <td className="px-2 py-2 text-right">{product.percentualVenda.toFixed(2)}%</td>
                    <td className="px-2 py-2">{product.embalagem}</td>
                    <td className="px-2 py-2 text-right">R$ {product.custoCompra.toFixed(2)}</td>
                    <td className="px-2 py-2 text-right">R$ {product.custoVenda.toFixed(2)}</td>
                    <td className="px-2 py-2 text-right">R$ {product.custoFinal.toFixed(2)}</td>
                    <td className="px-2 py-2 text-right">{product.desconto.toFixed(2)}%</td>
                    <td className="px-2 py-2 text-right">R$ {product.valorFinal.toFixed(2)}</td>
                    <td className="px-2 py-2 text-right">R$ {product.valorTotal.toFixed(2)}</td>
                    <td className="px-2 py-2 text-right">{product.qtdAtendida}</td>
                    <td className="px-2 py-2 font-mono text-gray-600">{product.codExterno}</td>
                    <td className={`px-2 py-2 text-right font-medium ${product.margemLiquida > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.margemLiquida.toFixed(2)}%
                    </td>
                    <td className={`px-2 py-2 text-right font-medium ${product.margemBruta > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.margemBruta.toFixed(2)}%
                    </td>
                    <td className={`px-2 py-2 text-right font-medium ${product.margemSobCusto > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.margemSobCusto.toFixed(2)}%
                    </td>
                    <td className={`px-2 py-2 text-right font-medium ${product.margemSobVenda > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.margemSobVenda.toFixed(2)}%
                    </td>
                    <td className={`px-2 py-2 text-right font-medium ${product.margemMinima > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.margemMinima.toFixed(2)}%
                    </td>
                    <td className={`px-2 py-2 text-right font-medium ${product.margemMaxima > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.margemMaxima.toFixed(2)}%
                    </td>
                    <td className={`px-2 py-2 text-right font-medium ${product.margemPadrao > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.margemPadrao.toFixed(2)}%
                    </td>
                    <td className="px-2 py-2 font-mono text-gray-600">{product.codigoBarras}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Painel Inferior com Abas */}
        <div className="bg-white rounded-lg shadow-sm border">
          {/* Abas */}
          <div className="border-b">
            <div className="flex">
              <button className="px-4 py-2 border-b-2 border-blue-500 text-blue-600 font-medium">
                Estoque
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                Informações
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                Totais
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                Histórico Compra
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                Venda/Mês
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                Venda/Semana
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                Venda Associada
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                Entrada
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                Bonificação
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                Transferência
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                Oferta
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                Vendas
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                Similares
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                Observação
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                Histórico Oferta
              </button>
            </div>
          </div>

          {/* Conteúdo da Aba Estoque */}
          <div className="p-4">
            <div className="grid grid-cols-12 gap-2 text-xs">
              {/* Headers */}
              <div className="font-medium text-gray-700">ADMINISTRATIVO</div>
              <div className="font-medium text-gray-700">ESTOQUE</div>
              <div className="font-medium text-gray-700">ENTRADA</div>
              <div className="font-medium text-gray-700">VENDA/SEMANA</div>
              <div className="font-medium text-gray-700">ESTOQUE/ADMINISTRATIVO</div>
              <div className="font-medium text-gray-700">VENDA/SEMANA</div>
              <div className="font-medium text-gray-700">ESTOQUE</div>
              <div className="font-medium text-gray-700">COMPRA</div>
              <div className="font-medium text-gray-700">ESTOQUE</div>
              <div className="font-medium text-gray-700">ADMINISTRATIVO</div>
              <div className="font-medium text-gray-700">ESTOQUE</div>
              <div className="font-medium text-gray-700">ADMINISTRATIVO</div>

              {/* Subheaders */}
              <div className="text-gray-600">Preço Venda</div>
              <div className="text-gray-600">Entrada</div>
              <div className="text-gray-600">Qtd. Reposição</div>
              <div className="text-gray-600">Média Venda</div>
              <div className="text-gray-600">Estoque Mínimo</div>
              <div className="text-gray-600">DDV Máximo</div>
              <div className="text-gray-600">Troca</div>
              <div className="text-gray-600">Loja</div>
              <div className="text-gray-600">Custo Médio</div>
              <div className="text-gray-600">% Imposto</div>
              <div className="text-gray-600">28/06 A 04/07</div>
              <div className="text-gray-600">Total</div>

              {/* Dados das lojas */}
              {mockStoreInfo.map((store, index) => (
                <React.Fragment key={index}>
                  <div className="py-1">{store.precoVenda.toFixed(3)}</div>
                  <div className="py-1">{store.entrada}</div>
                  <div className="py-1">{store.qtdEntrada.toFixed(2)}</div>
                  <div className="py-1">{store.estoqueMinimo}</div>
                  <div className="py-1">{store.estoqueMaximo}</div>
                  <div className="py-1">{store.ddvMaximo.toFixed(3)} {store.loja}</div>
                  <div className="py-1">{store.troca.toFixed(3)}</div>
                  <div className="py-1">{store.entrada}</div>
                  <div className="py-1">{store.margemLiquida.toFixed(2)}%</div>
                  <div className="py-1">{store.margemBruta.toFixed(2)}%</div>
                  <div className="py-1">{store.estoqueAtual.toFixed(3)}</div>
                  <div className="py-1">{store.vendaSemana.toFixed(2)}%</div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-200 border-t px-4 py-2 text-xs text-gray-600">
        <div className="flex justify-between">
          <span>MARCOS OLIVEIRA</span>
          <span>SUPERMERCADO MINI PREÇO</span>
          <span>VR MASTER 4.2.40-11</span>
          <span>12/07/2025</span>
        </div>
      </div>
    </div>
  );
}