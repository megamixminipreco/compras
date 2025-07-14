@@ .. @@
 import React from 'react';
-import { Box } from 'lucide-react';
+import { Search, Filter, Calendar, User, Building2, Package, TrendingUp, BarChart3 } from 'lucide-react';
 
 function App() {
   return (
   )
 }
-    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
-      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
-        <div className="flex items-center justify-center mb-6">
-          <Box className="w-12 h-12 text-indigo-600" />
+    <div className="min-h-screen bg-gray-50">
+      {/* Header */}
+      <div className="bg-white shadow-sm border-b">
+        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
+          <div className="flex justify-between items-center py-4">
+            <h1 className="text-2xl font-bold text-gray-900">Sistema de Gestão de Compras</h1>
+            <div className="flex items-center space-x-4">
+              <span className="text-sm text-gray-600">Usuário: MARCOS OLIVEIRA</span>
+              <span className="text-sm text-gray-600">12/07/2025</span>
+            </div>
+          </div>
         </div>
-        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
-          Perfectly Centered Content
-        </h1>
-        <p className="text-gray-600 mb-4 text-center">
-          This content is centered both horizontally and vertically using Tailwind's
-          powerful flexbox utilities.
-        </p>
-        <div className="space-y-2 text-sm text-gray-500">
-          <p className="flex items-center">
-            <span className="w-4 h-4 mr-2 inline-block bg-indigo-100 rounded-full" />
-            <code className="font-mono">flex</code>: Enables flexbox layout
-          </p>
-          <p className="flex items-center">
-            <span className="w-4 h-4 mr-2 inline-block bg-indigo-100 rounded-full" />
-            <code className="font-mono">items-center</code>: Centers vertically
-          </p>
-          <p className="flex items-center">
-            <span className="w-4 h-4 mr-2 inline-block bg-indigo-100 rounded-full" />
-            <code className="font-mono">justify-center</code>: Centers horizontally
-          </p>
+      </div>
+
+      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
+        {/* Filtros de Seleção - Baseado na tela "Inclusão de Pedido Compra" */}
+        <div className="bg-white rounded-lg shadow-sm border mb-6">
+          <div className="px-6 py-4 border-b border-gray-200">
+            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
+              <Filter className="w-5 h-5 mr-2 text-blue-600" />
+              Seleção de Fornecedor e Filtros
+            </h2>
+          </div>
+          
+          <div className="p-6">
+            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
+              {/* Fornecedor */}
+              <div>
+                <label className="block text-sm font-medium text-gray-700 mb-2">
+                  <Building2 className="w-4 h-4 inline mr-1" />
+                  Fornecedor
+                </label>
+                <div className="flex">
+                  <input
+                    type="text"
+                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
+                    placeholder="Selecione o fornecedor..."
+                  />
+                  <button className="px-3 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
+                    <Search className="w-4 h-4" />
+                  </button>
+                </div>
+              </div>
+
+              {/* Divisão */}
+              <div>
+                <label className="block text-sm font-medium text-gray-700 mb-2">Divisão</label>
+                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
+                  <option value="">Selecione...</option>
+                  <option value="1">GERAL</option>
+                  <option value="2">ALIMENTAR</option>
+                  <option value="3">LIMPEZA</option>
+                </select>
+              </div>
+
+              {/* Comprador */}
+              <div>
+                <label className="block text-sm font-medium text-gray-700 mb-2">
+                  <User className="w-4 h-4 inline mr-1" />
+                  Comprador
+                </label>
+                <div className="flex">
+                  <input
+                    type="text"
+                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
+                    placeholder="Nome do comprador..."
+                  />
+                  <button className="px-3 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
+                    <Search className="w-4 h-4" />
+                  </button>
+                </div>
+              </div>
+
+              {/* Loja */}
+              <div>
+                <label className="block text-sm font-medium text-gray-700 mb-2">Loja</label>
+                <div className="flex items-center">
+                  <input
+                    type="checkbox"
+                    id="miniPreco"
+                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
+                  />
+                  <label htmlFor="miniPreco" className="text-sm text-gray-700 mr-4">MINI PREÇO</label>
+                  <select className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
+                    <option value="">Todas as lojas</option>
+                    <option value="1">Loja 01 - Centro</option>
+                    <option value="2">Loja 02 - Bairro</option>
+                  </select>
+                </div>
+              </div>
+            </div>
+
+            {/* Opções adicionais */}
+            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
+              <div className="flex items-center space-x-4">
+                <label className="flex items-center">
+                  <input type="checkbox" className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
+                  <span className="text-sm text-gray-700">Gera Sugestão</span>
+                </label>
+                <label className="flex items-center">
+                  <input type="checkbox" className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
+                  <span className="text-sm text-gray-700">Utiliza Venda Média do Período</span>
+                </label>
+              </div>
+
+              {/* DDV (Data de Venda) */}
+              <div>
+                <label className="block text-sm font-medium text-gray-700 mb-2">DDV</label>
+                <div className="flex items-center space-x-2">
+                  <label className="flex items-center">
+                    <input type="radio" name="ddv" value="automatico" className="mr-1" />
+                    <span className="text-sm">Automático</span>
+                  </label>
+                  <label className="flex items-center">
+                    <input type="radio" name="ddv" value="manual" className="mr-1" />
+                    <span className="text-sm">Manual</span>
+                  </label>
+                  <input
+                    type="date"
+                    className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
+                  />
+                </div>
+              </div>
+
+              {/* Período */}
+              <div>
+                <label className="block text-sm font-medium text-gray-700 mb-2">
+                  <Calendar className="w-4 h-4 inline mr-1" />
+                  Período
+                </label>
+                <div className="flex items-center space-x-2">
+                  <input
+                    type="date"
+                    className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
+                  />
+                  <span className="text-sm text-gray-500">a</span>
+                  <input
+                    type="date"
+                    className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
+                  />
+                </div>
+              </div>
+            </div>
+
+            {/* Botões de Ação */}
+            <div className="flex justify-end space-x-3">
+              <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
+                Gerar
+              </button>
+              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
+                Sair
+              </button>
+            </div>
+          </div>
+        </div>
+
+        {/* Tabela de Produtos - Baseada na interface principal do sistema antigo */}
+        <div className="bg-white rounded-lg shadow-sm border">
+          <div className="px-6 py-4 border-b border-gray-200">
+            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
+              <Package className="w-5 h-5 mr-2 text-green-600" />
+              Lista de Produtos para Compra
+            </h2>
+          </div>
+
+          <div className="overflow-x-auto">
+            <table className="min-w-full divide-y divide-gray-200">
+              <thead className="bg-gray-50">
+                <tr>
+                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
+                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
+                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
+                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qtd Bonificada</th>
+                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Venda</th>
+                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Venda</th>
+                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Embalagem</th>
+                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Custo Compra</th>
+                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Custo Venda</th>
+                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Custo Final</th>
+                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Desconto</th>
+                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Final</th>
+                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Total</th>
+                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qtd Atendida</th>
+                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cód Externo</th>
+                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mrg. Líq.</th>
+                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mrg. Bruta</th>
+                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código Barras</th>
+                </tr>
+              </thead>
+              <tbody className="bg-white divide-y divide-gray-200">
+                {/* Exemplo de linha de produto */}
+                <tr className="hover:bg-gray-50">
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">016918</td>
+                  <td className="px-3 py-4 text-sm text-gray-900">ABACATE #</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">0</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">0</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">0,00</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">0,00 %</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">UN/KG/01</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">4,12</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">0,00</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">0,00</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">0,00 %</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">0,00</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">0,00</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">0</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">000000000000016355</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-red-600">-24,52 %</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-red-600">-9,52 %</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">1034</td>
+                </tr>
+                <tr className="hover:bg-gray-50">
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">016919</td>
+                  <td className="px-3 py-4 text-sm text-gray-900">ABACAXI HAVAI BRANCO SUAVE CAIXA 16 UN</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">0</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">0</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">0,00</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">0,00 %</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">UN/KG/01</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">5,30</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">0,00</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">0,00</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">0,00 %</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">0,00</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">0,00</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">0</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">000000000018641001</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-green-600">19,47 %</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-green-600">32,73 %</td>
+                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">7500435127233</td>
+                </tr>
+              </tbody>
+            </table>
+          </div>
+        </div>
+
+        {/* Painel de Informações Adicionais - Baseado na parte inferior do sistema antigo */}
+        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
+          {/* Informações de Estoque */}
+          <div className="bg-white rounded-lg shadow-sm border">
+            <div className="px-6 py-4 border-b border-gray-200">
+              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
+                <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
+                Informações de Estoque
+              </h3>
+            </div>
+            <div className="p-6">
+              <div className="grid grid-cols-2 gap-4 text-sm">
+                <div>
+                  <span className="font-medium text-gray-700">Estoque Atual:</span>
+                  <span className="ml-2 text-blue-600">10,79</span>
+                </div>
+                <div>
+                  <span className="font-medium text-gray-700">Estoque Mínimo:</span>
+                  <span className="ml-2 text-orange-600">0,03</span>
+                </div>
+                <div>
+                  <span className="font-medium text-gray-700">Estoque Máximo:</span>
+                  <span className="ml-2 text-green-600">0</span>
+                </div>
+                <div>
+                  <span className="font-medium text-gray-700">DDV Máximo:</span>
+                  <span className="ml-2 text-gray-600">0</span>
+                </div>
+              </div>
+            </div>
+          </div>
+
+          {/* Informações de Vendas */}
+          <div className="bg-white rounded-lg shadow-sm border">
+            <div className="px-6 py-4 border-b border-gray-200">
+              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
+                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
+                Informações de Vendas
+              </h3>
+            </div>
+            <div className="p-6">
+              <div className="grid grid-cols-2 gap-4 text-sm">
+                <div>
+                  <span className="font-medium text-gray-700">Custo Médio:</span>
+                  <span className="ml-2 text-blue-600">0,000</span>
+                </div>
+                <div>
+                  <span className="font-medium text-gray-700">Total:</span>
+                  <span className="ml-2 text-green-600">7,69 %</span>
+                </div>
+                <div>
+                  <span className="font-medium text-gray-700">Mrg. Líquida:</span>
+                  <span className="ml-2 text-purple-600">76,60 %</span>
+                </div>
+                <div>
+                  <span className="font-medium text-gray-700">Entrada:</span>
+                  <span className="ml-2 text-gray-600">12,000</span>
+                </div>
+              </div>
+            </div>
+          </div>
         </div>
       </div>
     </div>