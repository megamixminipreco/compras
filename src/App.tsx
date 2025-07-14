import React, { useState } from 'react';
import { Search, Filter, Calendar, User, Building2, Package, TrendingUp, BarChart3 } from 'lucide-react';

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
  codigoBarras: string;
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
    codigoBarras: '7500435127226'
  }
];

export default function App() {
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedBuyer, setSelectedBuyer] = useState('');
  const [selectedStore, setSelectedStore] = useState('');
  const [generateSuggestion, setGenerateSuggestion] = useState(false);
  const [useAverageSales, setUseAverageSales] = useState(false);
  const [ddvType, setDdvType] = useState('automatic');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="w-8 h-8 text-blue-600" />
            Sistema de Compras Multi-Fornecedor
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Formulário de Seleção */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="px-6 py-4 border-b bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Seleção de Fornecedor e Parâmetros
            </h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Fornecedor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building2 className="w-4 h-4 inline mr-1" />
                  Fornecedor
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={selectedSupplier}
                    onChange={(e) => setSelectedSupplier(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Selecione o fornecedor"
                  />
                  <button className="px-3 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">
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
                  <option value="">Selecione...</option>
                  <option value="1">Divisão 1</option>
                  <option value="2">Divisão 2</option>
                </select>
              </div>

              {/* Comprador */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Comprador
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={selectedBuyer}
                    onChange={(e) => setSelectedBuyer(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Selecione o comprador"
                  />
                  <button className="px-3 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">
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
                    <option value="">Selecione...</option>
                    <option value="1">Loja 1</option>
                    <option value="2">Loja 2</option>
                  </select>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-600">MINI PREÇO</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Opções e Período */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Opções */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Opções</h3>
                <div className="space-y-2">
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
              </div>

              {/* DDV e Período */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  DDV e Período
                </h3>
                <div className="space-y-3">
                  <div className="flex gap-4">
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
                  <div className="flex gap-2 items-center">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-500">a</span>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-3 mt-6">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
                <Search className="w-4 h-4" />
                Gerar Pedido
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                Sair
              </button>
            </div>
          </div>
        </div>

        {/* Tabela de Produtos */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Produtos para Compra
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-3 py-3 text-left font-medium text-gray-700">Produto</th>
                  <th className="px-3 py-3 text-left font-medium text-gray-700">Descrição</th>
                  <th className="px-3 py-3 text-right font-medium text-gray-700">Qtd</th>
                  <th className="px-3 py-3 text-right font-medium text-gray-700">Qtd Bonif.</th>
                  <th className="px-3 py-3 text-right font-medium text-gray-700">Valor Venda</th>
                  <th className="px-3 py-3 text-right font-medium text-gray-700">% Venda</th>
                  <th className="px-3 py-3 text-left font-medium text-gray-700">Embalagem</th>
                  <th className="px-3 py-3 text-right font-medium text-gray-700">Custo Compra</th>
                  <th className="px-3 py-3 text-right font-medium text-gray-700">Custo Final</th>
                  <th className="px-3 py-3 text-right font-medium text-gray-700">Valor Total</th>
                  <th className="px-3 py-3 text-right font-medium text-gray-700">Mrg. Líq.</th>
                  <th className="px-3 py-3 text-right font-medium text-gray-700">Mrg. Bruta</th>
                  <th className="px-3 py-3 text-left font-medium text-gray-700">Cód. Barras</th>
                </tr>
              </thead>
              <tbody>
                {mockProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-3 font-mono text-blue-600">{product.codigo}</td>
                    <td className="px-3 py-3 max-w-xs truncate">{product.descricao}</td>
                    <td className="px-3 py-3 text-right">{product.quantidade}</td>
                    <td className="px-3 py-3 text-right">{product.qtdBonificada}</td>
                    <td className="px-3 py-3 text-right">R$ {product.valorVenda.toFixed(2)}</td>
                    <td className="px-3 py-3 text-right">{product.percentualVenda.toFixed(2)}%</td>
                    <td className="px-3 py-3">{product.embalagem}</td>
                    <td className="px-3 py-3 text-right">R$ {product.custoCompra.toFixed(2)}</td>
                    <td className="px-3 py-3 text-right">R$ {product.custoFinal.toFixed(2)}</td>
                    <td className="px-3 py-3 text-right">R$ {product.valorTotal.toFixed(2)}</td>
                    <td className={`px-3 py-3 text-right font-medium ${product.margemLiquida > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.margemLiquida.toFixed(2)}%
                    </td>
                    <td className={`px-3 py-3 text-right font-medium ${product.margemBruta > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.margemBruta.toFixed(2)}%
                    </td>
                    <td className="px-3 py-3 font-mono text-gray-600">{product.codigoBarras}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Painéis de Informação */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Painel Estoque */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b bg-blue-50">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Informações de Estoque
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Estoque Atual:</span>
                  <span className="ml-2 font-medium">0</span>
                </div>
                <div>
                  <span className="text-gray-600">Estoque Mínimo:</span>
                  <span className="ml-2 font-medium">0</span>
                </div>
                <div>
                  <span className="text-gray-600">Estoque Máximo:</span>
                  <span className="ml-2 font-medium">0</span>
                </div>
                <div>
                  <span className="text-gray-600">DDV Máximo:</span>
                  <span className="ml-2 font-medium">0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Painel Vendas */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b bg-green-50">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Informações de Vendas
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Custo Médio:</span>
                  <span className="ml-2 font-medium">R$ 0,00</span>
                </div>
                <div>
                  <span className="text-gray-600">Total:</span>
                  <span className="ml-2 font-medium">R$ 0,00</span>
                </div>
                <div>
                  <span className="text-gray-600">Mrg. Líquida:</span>
                  <span className="ml-2 font-medium text-green-600">0,00%</span>
                </div>
                <div>
                  <span className="text-gray-600">Entrada:</span>
                  <span className="ml-2 font-medium">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}