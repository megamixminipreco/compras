Documentação da Estrutura do Banco de Dados megmixvrmaster
Este documento descreve a arquitetura do banco de dados megmixvrmaster, detalhado no arquivo SQL fornecido. O banco de dados foi projetado para suportar um sistema de gestão integrada (ERP), com foco em operações de varejo e atacado. A nomenclatura das tabelas e colunas está em português, refletindo sua origem e aplicação no mercado brasileiro.

A estrutura é organizada nos seguintes módulos funcionais principais:

Cadastros Principais (Core Entities)

Vendas e Faturamento

Compras e Recebimento

Gestão de Estoque

Financeiro (Contas a Pagar e Receber)

Fiscal e Contábil

CRM (Gestão de Relacionamento com o Cliente)

Logística e Transporte

Sistema e Configurações

1. Módulo de Cadastros Principais
Este módulo contém as entidades centrais do sistema, que são referenciadas em quase todas as outras partes do banco de dados.

produto: Tabela central que armazena todos os produtos.

Propósito: Manter o cadastro detalhado dos itens comercializados.

Colunas Chave: id, descricaocompleta, qtdembalagem, pesoliquido, mercadologico1 a mercadologico5 (estrutura de categorias), id_comprador.

Relacionamentos: Conecta-se com estoque, venda, notaentradaitem, oferta, etc.

fornecedor: Cadastro dos fornecedores de produtos e serviços.

Propósito: Gerenciar informações de contato, fiscais e de negociação com fornecedores.

Colunas Chave: id, razaosocial, nomefantasia, cnpj, id_situacaocadastro.

Relacionamentos: Ligada a produto, notaentrada, pedido, pagarfornecedor.

cliente* (clientepreferencial, clienteeventual): Cadastros de clientes.

Propósito: A tabela clientepreferencial armazena clientes fidelizados, com histórico e limite de crédito, enquanto a clienteeventual é para clientes esporádicos.

Colunas Chave: id, nome, cnpj (CPF/CNPJ), limitecompra, bloqueado.

Relacionamentos: Associadas a notasaida, recebercreditorotativo, venda.

loja: Cadastro das filiais ou lojas da empresa.

Propósito: Diferenciar operações, estoques e vendas por localidade.

Colunas Chave: id, descricao, servidorcentral, atacado.

Relacionamentos: Uma das chaves mais importantes, presente em quase todas as tabelas transacionais como venda, estoque, notaentrada, pedido.

usuario: Cadastro dos usuários do sistema.

Propósito: Controlar o acesso e registrar as ações dos operadores.

Colunas Chave: id, login, nome, senha, id_loja.

Relacionamentos: Ligada a tabelas de log (logtransacao, logpreco) e permissões (permissao).

2. Módulo de Vendas e Faturamento
Gerencia todo o processo de venda, desde a cotação até a emissão da nota fiscal.

venda: Registra as vendas detalhadas por produto em um determinado dia.

notasaida: Representa a nota fiscal de saída (NF-e, NFC-e) emitida para o cliente.

Propósito: Formalizar a transação de venda perante o fisco.

Colunas Chave: id, numeronota, id_loja, id_clienteeventualdestinatario, datahoraemissao, valortotal, chavenfe.

Relacionamentos: notasaidaitem contém os produtos da nota.

oferta e promocao: Tabelas para gerenciar preços especiais, promoções do tipo "leve pague" e campanhas de pontuação.

cotacaocliente: Permite a criação de cotações de preços para clientes.

3. Módulo de Compras e Recebimento
Responsável pela aquisição de mercadorias junto aos fornecedores.

pedido: Ordem de compra enviada a um fornecedor.

Propósito: Formalizar a intenção de compra de produtos.

Colunas Chave: id, id_loja, id_fornecedor, datacompra, dataentrega, valortotal, id_situacaopedido.

Relacionamentos: pedidoitem detalha os produtos do pedido.

notaentrada: Documento fiscal de entrada de mercadorias.

Propósito: Registrar o recebimento de produtos, atualizar o estoque e o custo.

Colunas Chave: id, numeronota, id_fornecedor, dataentrada, valortotal, chavenfe.

Relacionamentos: Vinculada a pedido e detalhada em notaentradaitem.

4. Módulo de Gestão de Estoque
Controla a movimentação e a posição dos produtos.

estoque: Posição de estoque de um produto em uma loja em uma data específica.

logestoque: Histórico detalhado de todas as movimentações de estoque.

balanco: Processo de contagem e ajuste de inventário físico.

perda e quebra: Registros de baixas de estoque por motivos de perda ou quebra.

consumo: Registro de consumo interno de produtos.

transferenciaentrada e transferenciasaida: Gerenciam a transferência de produtos entre lojas.

5. Módulo Financeiro (Contas a Pagar e Receber)
Administra o fluxo de caixa da empresa.

Contas a Pagar:

pagarfornecedor: Título a pagar gerado a partir de uma notaentrada ou notadespesa.

pagarfornecedorparcela: Detalha as parcelas de um título a pagar.

cheque: Gestão de cheques emitidos.

Contas a Receber:

recebervendaprazo: Títulos a receber de vendas a prazo.

recebercreditorotativo: Gestão de recebíveis de clientes com crédito na loja.

recebercheque: Gestão de cheques recebidos.

boleto: Controle de boletos emitidos para cobrança.

Tesouraria:

caixa: Movimentação diária do caixa da loja (vendas, recebimentos, sangrias).

banco e bancoconta: Cadastro das contas bancárias da empresa.

conciliacaobancaria: Processo de conciliação de extratos bancários com os lançamentos do sistema.

6. Módulo Fiscal e Contábil
Responsável por atender às obrigações fiscais e gerar informações para a contabilidade.

escrita e escritaitem: Registros fiscais detalhados de todas as notas de entrada e saída, base para a geração de arquivos como SPED Fiscal.

aliquota: Tabela de alíquotas de impostos (ICMS, IPI, etc.).

cfop: Códigos Fiscais de Operações e Prestações.

ncm e cest: Nomenclatura Comum do Mercosul e Código Especificador da Substituição Tributária.

contabilidade e contabilidadelancamento: Lançamentos contábeis (débito/crédito) para a geração do balanço contábil.

apuracao*: Tabelas auxiliares para apuração de impostos.

7. Módulo de CRM (Gestão de Relacionamento com o Cliente)
Focado em ações de marketing e relacionamento com o cliente.

acaocrm: Cadastro de ações de CRM (ex: enviar push, WhatsApp).

acaocrmfiltro: Regras e filtros para selecionar os clientes que participarão da ação.

acaocrmcliente: Tabela que vincula os clientes a uma ação de CRM específica.

clientepreferencialhistorico: Registra interações importantes com o cliente.

8. Módulo de Logística e Transporte
Gerencia os recursos de transporte e a movimentação de cargas.

veiculo: Cadastro da frota de veículos.

motorista: Cadastro de motoristas.

abastecimento: Controle de abastecimento dos veículos.

carga: Agrupamento de reposições ou vendas para formar uma carga de transporte.

reposicao: Processo de solicitação e envio de mercadorias entre a central e as lojas ou entre lojas.

9. Módulo de Sistema e Configurações
Contém tabelas para o funcionamento, segurança e auditoria do sistema.

usuario, permissao, formulario: Estrutura de controle de acesso, definindo o que cada usuário pode ver e fazer no sistema.

parametro e configuracao: Armazenam parâmetros globais e configurações específicas para o funcionamento do sistema.

log* (logtransacao, logpreco, logcusto, logestoque): Tabelas de auditoria que registram alterações importantes nos dados, garantindo rastreabilidade.

workflow*: Tabelas que gerenciam fluxos de aprovação para processos críticos, como divergências em pedidos de compra ou alterações de preço.