-- Table: public.pedido

-- DROP TABLE IF EXISTS public.pedido;

CREATE TABLE IF NOT EXISTS public.pedido
(
    id integer NOT NULL DEFAULT nextval('pedido_id_seq'::regclass),
    id_loja integer,
    id_fornecedor integer NOT NULL,
    id_tipofretepedido integer NOT NULL,
    datacompra date NOT NULL,
    dataentrega date,
    valortotal numeric(11,2) NOT NULL,
    id_situacaopedido integer NOT NULL,
    observacao character varying(1500) COLLATE pg_catalog."default",
    desconto numeric(11,2) NOT NULL,
    id_comprador integer,
    id_divisaofornecedor integer,
    id_precotacaofornecedor integer,
    valordesconto numeric(11,2) NOT NULL,
    email boolean NOT NULL DEFAULT false,
    id_tipoatendidopedido integer NOT NULL,
    enviado boolean NOT NULL DEFAULT false,
    liberadodivergenciacomprador boolean,
    liberadodivergenciafornecedor boolean,
    liberadodivergenciamercadologico boolean,
    gerousugestao boolean DEFAULT false,
    justificativapedidosemagenda character varying(50) COLLATE pg_catalog."default" DEFAULT ''::character varying,
    id_usuario integer,
    valorfrete numeric(11,4),
    CONSTRAINT pk_pedido PRIMARY KEY (id),
    CONSTRAINT fk_id_comprador FOREIGN KEY (id_comprador)
        REFERENCES public.comprador (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_divisaofornecedor FOREIGN KEY (id_divisaofornecedor)
        REFERENCES public.divisaofornecedor (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_fornecedor FOREIGN KEY (id_fornecedor)
        REFERENCES public.fornecedor (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_loja FOREIGN KEY (id_loja)
        REFERENCES public.loja (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_precotacaofornecedor FOREIGN KEY (id_precotacaofornecedor)
        REFERENCES public.precotacaofornecedor (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_situacaopedido FOREIGN KEY (id_situacaopedido)
        REFERENCES public.situacaopedido (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_tipoatendidopedido FOREIGN KEY (id_tipoatendidopedido)
        REFERENCES public.tipoatendidopedido (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_tipofretepedido FOREIGN KEY (id_tipofretepedido)
        REFERENCES public.tipofretepedido (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario)
        REFERENCES public.usuario (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.pedido
    OWNER to postgres;
-- Index: idx1_pedido

-- DROP INDEX IF EXISTS public.idx1_pedido;

CREATE INDEX IF NOT EXISTS idx1_pedido
    ON public.pedido USING btree
    (datacompra ASC NULLS LAST, id_fornecedor ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: idx2_pedido

-- DROP INDEX IF EXISTS public.idx2_pedido;

CREATE INDEX IF NOT EXISTS idx2_pedido
    ON public.pedido USING btree
    (dataentrega ASC NULLS LAST, id_fornecedor ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: idx_pedido_id_situacaopedido_id_tipoatendidopedido_id_loja

-- DROP INDEX IF EXISTS public.idx_pedido_id_situacaopedido_id_tipoatendidopedido_id_loja;

CREATE INDEX IF NOT EXISTS idx_pedido_id_situacaopedido_id_tipoatendidopedido_id_loja
    ON public.pedido USING btree
    (id_tipoatendidopedido ASC NULLS LAST, id_situacaopedido ASC NULLS LAST, id_loja ASC NULLS LAST)
    TABLESPACE pg_default;

 
 
 -- Table: public.loja

-- DROP TABLE IF EXISTS public.loja;

CREATE TABLE IF NOT EXISTS public.loja
(
    id integer NOT NULL,
    descricao character varying(25) COLLATE pg_catalog."default" NOT NULL,
    id_fornecedor integer NOT NULL,
    id_situacaocadastro integer NOT NULL,
    nomeservidor character varying(30) COLLATE pg_catalog."default" NOT NULL,
    id_regiao integer NOT NULL,
    servidorcentral boolean NOT NULL DEFAULT false,
    geraconcentrador boolean NOT NULL DEFAULT false,
    estoqueterceiro boolean DEFAULT false,
    lojavirtual boolean DEFAULT false,
    atacado boolean NOT NULL DEFAULT false,
    CONSTRAINT pk_loja PRIMARY KEY (id),
    CONSTRAINT fk_id_fornecedor FOREIGN KEY (id_fornecedor)
        REFERENCES public.fornecedor (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_regiao FOREIGN KEY (id_regiao)
        REFERENCES public.regiao (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_situacaocadastro FOREIGN KEY (id_situacaocadastro)
        REFERENCES public.situacaocadastro (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.loja
    OWNER to postgres;

REVOKE ALL ON TABLE public.loja FROM mercafacil;

GRANT SELECT ON TABLE public.loja TO mercafacil;

GRANT ALL ON TABLE public.loja TO postgres;   


-- Table: public.fornecedor

-- DROP TABLE IF EXISTS public.fornecedor;

CREATE TABLE IF NOT EXISTS public.fornecedor
(
    id integer NOT NULL,
    razaosocial character varying(40) COLLATE pg_catalog."default" NOT NULL,
    nomefantasia character varying(60) COLLATE pg_catalog."default" NOT NULL,
    endereco character varying(40) COLLATE pg_catalog."default" NOT NULL,
    bairro character varying(30) COLLATE pg_catalog."default" NOT NULL,
    id_municipio integer NOT NULL,
    cep numeric(8,0) NOT NULL,
    id_estado integer NOT NULL,
    telefone character varying(14) COLLATE pg_catalog."default" NOT NULL,
    id_tipoinscricao integer NOT NULL,
    inscricaoestadual character varying(20) COLLATE pg_catalog."default" NOT NULL,
    cnpj numeric(14,0) NOT NULL,
    revenda boolean NOT NULL,
    id_situacaocadastro integer NOT NULL,
    id_tipopagamento integer NOT NULL,
    numerodoc integer NOT NULL,
    pedidominimoqtd integer NOT NULL,
    pedidominimovalor numeric(11,2) NOT NULL,
    serienf character varying(4) COLLATE pg_catalog."default" NOT NULL,
    descontofunrural boolean NOT NULL,
    senha integer NOT NULL,
    id_tiporecebimento integer,
    agencia character varying(6) COLLATE pg_catalog."default" NOT NULL,
    digitoagencia character varying(2) COLLATE pg_catalog."default" NOT NULL,
    conta character varying(12) COLLATE pg_catalog."default" NOT NULL,
    digitoconta character varying(2) COLLATE pg_catalog."default" NOT NULL,
    id_banco integer,
    id_fornecedorfavorecido integer,
    enderecocobranca character varying(40) COLLATE pg_catalog."default" NOT NULL,
    bairrocobranca character varying(30) COLLATE pg_catalog."default" NOT NULL,
    cepcobranca numeric(18,0) NOT NULL,
    id_municipiocobranca integer,
    id_estadocobranca integer,
    bloqueado boolean NOT NULL,
    id_tipomotivofornecedor integer,
    datasintegra timestamp without time zone,
    id_tipoempresa integer NOT NULL,
    inscricaosuframa character varying(9) COLLATE pg_catalog."default" NOT NULL,
    utilizaiva boolean NOT NULL,
    id_familiafornecedor integer,
    id_tipoinspecao integer,
    numeroinspecao integer NOT NULL,
    id_tipotroca integer,
    id_tipofornecedor integer NOT NULL,
    id_contacontabilfinanceiro integer,
    utilizanfe boolean NOT NULL,
    datacadastro date NOT NULL,
    utilizaconferencia boolean NOT NULL,
    numero character varying(6) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    permitenfsempedido boolean NOT NULL DEFAULT false,
    modelonf character varying(2) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    emitenf boolean NOT NULL DEFAULT true,
    tiponegociacao integer NOT NULL DEFAULT 0,
    utilizacrossdocking boolean NOT NULL DEFAULT false,
    id_lojacrossdocking integer,
    observacao character varying(2500) COLLATE pg_catalog."default" NOT NULL DEFAULT '::character varying'::character varying,
    id_pais integer NOT NULL,
    inscricaomunicipal character varying(20) COLLATE pg_catalog."default" DEFAULT ''::character varying,
    id_contacontabilfiscalpassivo bigint,
    numerocobranca character varying(6) COLLATE pg_catalog."default" NOT NULL DEFAULT '0'::character varying,
    complemento character varying(30) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    complementocobranca character varying(30) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    id_contacontabilfiscalativo bigint,
    utilizaedi boolean NOT NULL DEFAULT false,
    tiporegravencimento integer NOT NULL DEFAULT '-1'::integer,
    nfemitidapostofiscal boolean DEFAULT false,
    id_tipoindicadorie integer,
    utilizaprodepe boolean DEFAULT false,
    id_tiponegociacaocompra integer NOT NULL DEFAULT 2,
    id_indicativocprb integer,
    id_tipocustodevolucaotroca integer,
    alteradopaf boolean,
    cpfprodutorrural numeric(11,0),
    id_indicativosenar integer,
    antecipacaopagamento boolean NOT NULL DEFAULT false,
    percentualcreditoicmssn numeric(11,2),
    valormaximoverbapedido numeric(11,2) DEFAULT 0,
    codigofornecedorbalanca integer,
    CONSTRAINT pk_fornecedor PRIMARY KEY (id),
    CONSTRAINT un_codigofornecedorbalanca UNIQUE (codigofornecedorbalanca),
    CONSTRAINT fk_familiafornecedor FOREIGN KEY (id_familiafornecedor)
        REFERENCES public.familiafornecedor (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_forn_id_indicador_ie FOREIGN KEY (id_tipoindicadorie)
        REFERENCES public.tipoindicadorie (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_banco FOREIGN KEY (id_banco)
        REFERENCES public.banco (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_contacontabilfinanceiro FOREIGN KEY (id_contacontabilfinanceiro)
        REFERENCES public.contacontabilfinanceiro (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_contacontabilfiscalativo FOREIGN KEY (id_contacontabilfiscalativo)
        REFERENCES public.contacontabilfiscal (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_contacontabilfiscalpassivo FOREIGN KEY (id_contacontabilfiscalpassivo)
        REFERENCES public.contacontabilfiscal (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_estado FOREIGN KEY (id_estado)
        REFERENCES public.estado (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_estadocobranca FOREIGN KEY (id_estadocobranca)
        REFERENCES public.estado (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_fornecedorfavorecido FOREIGN KEY (id_fornecedorfavorecido)
        REFERENCES public.fornecedor (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_indicativocprb FOREIGN KEY (id_indicativocprb)
        REFERENCES public.indicativocprb (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_indicativosenar FOREIGN KEY (id_indicativosenar)
        REFERENCES public.indicativosenar (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_lojacrossdocking FOREIGN KEY (id_lojacrossdocking)
        REFERENCES public.loja (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_municipio FOREIGN KEY (id_municipio)
        REFERENCES public.municipio (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_municipiocobranca FOREIGN KEY (id_municipiocobranca)
        REFERENCES public.municipio (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_pais FOREIGN KEY (id_pais)
        REFERENCES public.pais (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_situacaocadastro FOREIGN KEY (id_situacaocadastro)
        REFERENCES public.situacaocadastro (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_tipocustodevolucaotroca FOREIGN KEY (id_tipocustodevolucaotroca)
        REFERENCES public.tipocustodevolucaotroca (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_tipoempresa FOREIGN KEY (id_tipoempresa)
        REFERENCES public.tipoempresa (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_tipofornecedor FOREIGN KEY (id_tipofornecedor)
        REFERENCES public.tipofornecedor (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_tipoinscricao FOREIGN KEY (id_tipoinscricao)
        REFERENCES public.tipoinscricao (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_tipoinspecao FOREIGN KEY (id_tipoinspecao)
        REFERENCES public.tipoinspecao (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_tipomotivofornecedor FOREIGN KEY (id_tipomotivofornecedor)
        REFERENCES public.tipomotivofornecedor (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_tiponegociacaocompra FOREIGN KEY (id_tiponegociacaocompra)
        REFERENCES public.tiponegociacaocompra (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_tipopagamento FOREIGN KEY (id_tipopagamento)
        REFERENCES public.tipopagamento (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_tiporecebimento FOREIGN KEY (id_tiporecebimento)
        REFERENCES public.tiporecebimento (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_tipotroca FOREIGN KEY (id_tipotroca)
        REFERENCES public.tipotroca (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.fornecedor
    OWNER to postgres;

REVOKE ALL ON TABLE public.fornecedor FROM mercafacil;

GRANT SELECT ON TABLE public.fornecedor TO mercafacil;

GRANT ALL ON TABLE public.fornecedor TO postgres;

-- Table: public.comprador

-- DROP TABLE IF EXISTS public.comprador;

CREATE TABLE IF NOT EXISTS public.comprador
(
    id integer NOT NULL DEFAULT nextval('comprador_id_seq'::regclass),
    nome character varying(40) COLLATE pg_catalog."default" NOT NULL,
    id_situacaocadastro integer NOT NULL,
    CONSTRAINT pk_comprador PRIMARY KEY (id),
    CONSTRAINT fk_comprador_id_situacaocadastro FOREIGN KEY (id_situacaocadastro)
        REFERENCES public.situacaocadastro (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.comprador
    OWNER to postgres;

-- Table: public.situacaopedido

-- DROP TABLE IF EXISTS public.situacaopedido;

CREATE TABLE IF NOT EXISTS public.situacaopedido
(
    id integer NOT NULL,
    descricao character varying(15) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT pk_situacaopedido PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.situacaopedido
    OWNER to postgres;

-- Table: public.divisaofornecedor

-- DROP TABLE IF EXISTS public.divisaofornecedor;

CREATE TABLE IF NOT EXISTS public.divisaofornecedor
(
    id integer NOT NULL,
    descricao character varying(15) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT pk_divisaofornecedor PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.divisaofornecedor
    OWNER to postgres;

-- Table: public.precotacaofornecedor

-- DROP TABLE IF EXISTS public.precotacaofornecedor;

CREATE TABLE IF NOT EXISTS public.precotacaofornecedor
(
    id integer NOT NULL,
    data date NOT NULL,
    id_situacaoprecotacaofornecedor integer NOT NULL,
    observacao character varying(280) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    descricao character varying(30) COLLATE pg_catalog."default" DEFAULT ''::character varying,
    datahorainicio timestamp without time zone,
    datahoratermino timestamp without time zone,
    datahoraalteracao timestamp without time zone,
    enviaprodutozerado boolean DEFAULT true,
    CONSTRAINT pk_precotacaofornecedor PRIMARY KEY (id),
    CONSTRAINT fk_id_situacaoprecotacaofornecedor FOREIGN KEY (id_situacaoprecotacaofornecedor)
        REFERENCES public.situacaoprecotacaofornecedor (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

-- Table: public.tipoatendidopedido

-- DROP TABLE IF EXISTS public.tipoatendidopedido;

CREATE TABLE IF NOT EXISTS public.tipoatendidopedido
(
    id integer NOT NULL,
    descricao character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT pk_tipoatendidopedido PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tipoatendidopedido
    OWNER to postgres;


-- Table: public.usuario

-- DROP TABLE IF EXISTS public.usuario;

CREATE TABLE IF NOT EXISTS public.usuario
(
    id integer NOT NULL,
    login character varying(12) COLLATE pg_catalog."default" NOT NULL,
    nome character varying(30) COLLATE pg_catalog."default" NOT NULL,
    senha character varying(32) COLLATE pg_catalog."default" NOT NULL,
    id_tiposetor integer NOT NULL,
    id_situacaocadastro integer NOT NULL,
    id_loja integer NOT NULL,
    datahoraultimoacesso timestamp without time zone,
    verificaatualizacao boolean NOT NULL DEFAULT false,
    id_tema integer DEFAULT 1,
    exibepopupsnovidades boolean NOT NULL DEFAULT true,
    exibepopupestoquecongelado boolean NOT NULL DEFAULT false,
    tempoverificacaopopup integer DEFAULT 180,
    CONSTRAINT usuario_pkey PRIMARY KEY (id),
    CONSTRAINT fk_id_loja FOREIGN KEY (id_loja)
        REFERENCES public.loja (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_situacaocadastro FOREIGN KEY (id_situacaocadastro)
        REFERENCES public.situacaocadastro (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_tiposetor FOREIGN KEY (id_tiposetor)
        REFERENCES public.tiposetor (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.usuario
    OWNER to postgres;

REVOKE ALL ON TABLE public.usuario FROM mercafacil;

GRANT SELECT ON TABLE public.usuario TO mercafacil;

GRANT ALL ON TABLE public.usuario TO postgres;


tabela onde fica os items do pedido eu acho 

-- Table: public.pedidoitem

-- DROP TABLE IF EXISTS public.pedidoitem;

CREATE TABLE IF NOT EXISTS public.pedidoitem
(
    id integer NOT NULL DEFAULT nextval('pedidoitem_id_seq'::regclass),
    id_loja integer NOT NULL,
    id_pedido integer NOT NULL,
    id_produto integer NOT NULL,
    quantidade numeric(12,3) NOT NULL,
    qtdembalagem integer NOT NULL,
    custocompra numeric(13,4) NOT NULL,
    dataentrega date NOT NULL,
    desconto numeric(11,2) NOT NULL,
    valortotal numeric(11,2) NOT NULL,
    quantidadeatendida numeric(12,3) NOT NULL,
    id_tipopedido integer NOT NULL,
    custofinal numeric(13,4) NOT NULL DEFAULT 0,
    id_tipoatendidopedido integer NOT NULL,
    troca numeric(12,3),
    quantidadebonificadorebaixa numeric(12,3),
    valorfrete numeric(11,4),
    custoverba numeric(13,4) NOT NULL DEFAULT 0,
    valorrebaixa numeric(13,4) NOT NULL DEFAULT 0,
    verbavalor numeric(11,2) DEFAULT 0,
    CONSTRAINT pk_pedidoitem PRIMARY KEY (id),
    CONSTRAINT un_pedidoitem UNIQUE (id_loja, id_pedido, id_produto, id_tipopedido, dataentrega),
    CONSTRAINT fk_id_loja FOREIGN KEY (id_loja)
        REFERENCES public.loja (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_pedido FOREIGN KEY (id_pedido)
        REFERENCES public.pedido (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_produto FOREIGN KEY (id_produto)
        REFERENCES public.produto (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_tipoatendidopedido FOREIGN KEY (id_tipoatendidopedido)
        REFERENCES public.tipoatendidopedido (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_tipopedido FOREIGN KEY (id_tipopedido)
        REFERENCES public.tipopedido (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.pedidoitem
    OWNER to postgres;
-- Index: id1_pedidoitem

-- DROP INDEX IF EXISTS public.id1_pedidoitem;

CREATE INDEX IF NOT EXISTS id1_pedidoitem
    ON public.pedidoitem USING btree
    (id_produto ASC NULLS LAST, id_loja ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: idx2_pedidoitem

-- DROP INDEX IF EXISTS public.idx2_pedidoitem;

CREATE INDEX IF NOT EXISTS idx2_pedidoitem
    ON public.pedidoitem USING btree
    (id_pedido ASC NULLS LAST)
    TABLESPACE pg_default;


-- Table: public.produto

-- DROP TABLE IF EXISTS public.produto;

CREATE TABLE IF NOT EXISTS public.produto
(
    id integer NOT NULL,
    descricaocompleta character varying(60) COLLATE pg_catalog."default" NOT NULL,
    qtdembalagem integer NOT NULL,
    id_tipoembalagem integer NOT NULL,
    mercadologico1 integer NOT NULL,
    mercadologico2 integer NOT NULL,
    mercadologico3 integer NOT NULL,
    mercadologico4 integer NOT NULL,
    mercadologico5 integer NOT NULL,
    id_comprador integer NOT NULL,
    custofinal numeric(19,4) NOT NULL,
    id_familiaproduto integer,
    descricaoreduzida character varying(22) COLLATE pg_catalog."default" NOT NULL,
    pesoliquido numeric(12,3) NOT NULL,
    datacadastro timestamp without time zone NOT NULL,
    pesobruto numeric(12,3) NOT NULL,
    comprimentoembalagem integer NOT NULL,
    larguraembalagem integer NOT NULL,
    alturaembalagem integer NOT NULL,
    perda numeric(11,2) NOT NULL,
    verificacustotabela boolean NOT NULL,
    percentualipi numeric(11,2) NOT NULL,
    percentualfrete numeric(11,2) NOT NULL,
    percentualencargo numeric(11,2) NOT NULL,
    percentualperda numeric(11,2) NOT NULL,
    percentualsubstituicao numeric(11,2) NOT NULL,
    descricaogondola character varying(60) COLLATE pg_catalog."default" NOT NULL,
    dataalteracao timestamp without time zone,
    id_produtovasilhame integer,
    id_tipomercadoria integer,
    sugestaopedido boolean NOT NULL,
    aceitamultiplicacaopdv boolean NOT NULL,
    id_fornecedorfabricante integer NOT NULL,
    id_divisaofornecedor integer NOT NULL,
    id_tipopiscofins integer NOT NULL,
    sazonal boolean NOT NULL,
    consignado boolean NOT NULL,
    ncm1 integer,
    ncm2 integer,
    ncm3 integer,
    ddv integer NOT NULL,
    permitetroca boolean NOT NULL,
    temperatura integer,
    id_tipoorigemmercadoria integer NOT NULL,
    ipi numeric(11,2) NOT NULL,
    pesavel boolean NOT NULL,
    id_tipopiscofinscredito integer NOT NULL,
    vendacontrolada boolean NOT NULL DEFAULT false,
    tiponaturezareceita integer,
    vendapdv boolean NOT NULL DEFAULT false,
    conferido boolean NOT NULL DEFAULT false,
    permitequebra boolean NOT NULL DEFAULT false,
    permiteperda boolean NOT NULL DEFAULT false,
    codigoanp character varying(9) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    impostomedionacional numeric(11,2) NOT NULL DEFAULT 0,
    impostomedioimportado numeric(11,2) NOT NULL DEFAULT 0,
    sugestaocotacao boolean NOT NULL DEFAULT false,
    tara numeric(11,3) DEFAULT 0,
    utilizatabelasubstituicaotributaria boolean NOT NULL DEFAULT false,
    id_tipolocaltroca integer NOT NULL,
    qtddiasminimovalidade integer NOT NULL DEFAULT 0,
    utilizavalidadeentrada boolean NOT NULL DEFAULT false,
    impostomedioestadual numeric(11,2) NOT NULL DEFAULT 0,
    id_tipocompra integer NOT NULL,
    numeroparcela integer NOT NULL DEFAULT 0,
    id_tipoembalagemvolume integer NOT NULL DEFAULT 0,
    volume numeric(12,3) DEFAULT 1,
    id_normacompra integer NOT NULL DEFAULT 1,
    lastro integer,
    camadas integer,
    promocaoauditada boolean NOT NULL DEFAULT false,
    substituicaoestadual integer,
    substituicaoestadualoutros integer,
    substituicaoestadualexterior integer,
    id_cest integer,
    permitedescontopdv boolean DEFAULT true,
    verificapesopdv boolean DEFAULT false,
    id_servico integer,
    descontomaximo numeric(12,2),
    produtoecommerce boolean,
    id_codigoanp integer,
    id_tipoorigemmercadoriaentrada integer,
    percentualtoleranciaselfcheckout numeric(10,2),
    alteradopaf boolean,
    produtoassessorado boolean,
    excecaotipi integer,
    controlepoliciacivil boolean,
    operacaoprodutoperfumariape boolean,
    id_codigogia integer,
    produtoincentivado boolean,
    cestabasica boolean,
    isentoanvisa boolean,
    codigoanvisa numeric(13,0),
    precomaximoconsumidoranvisa numeric(13,2),
    motivoisencaoanvisa text COLLATE pg_catalog."default",
    desativarenviomasterfiscobrasil boolean NOT NULL DEFAULT false,
    CONSTRAINT pk_produto PRIMARY KEY (id),
    CONSTRAINT idx_mercadologico UNIQUE (id, mercadologico1, mercadologico2, mercadologico3, mercadologico4, mercadologico5),
    CONSTRAINT fk_id_cest FOREIGN KEY (id_cest)
        REFERENCES public.cest (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_codigoanp FOREIGN KEY (id_codigoanp)
        REFERENCES public.codigoanp (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_codigogia FOREIGN KEY (id_codigogia)
        REFERENCES public.ncmcodigogia (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_comprador FOREIGN KEY (id_comprador)
        REFERENCES public.comprador (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_divisaofornecedor FOREIGN KEY (id_divisaofornecedor)
        REFERENCES public.divisaofornecedor (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_familiaproduto FOREIGN KEY (id_familiaproduto)
        REFERENCES public.familiaproduto (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_fornecedorfabricante FOREIGN KEY (id_fornecedorfabricante)
        REFERENCES public.fornecedor (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_normacompra FOREIGN KEY (id_normacompra)
        REFERENCES public.normacompra (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_produtovasilhame FOREIGN KEY (id_produtovasilhame)
        REFERENCES public.produto (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_tipocompra FOREIGN KEY (id_tipocompra)
        REFERENCES public.tipocompra (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_tipoembalagem FOREIGN KEY (id_tipoembalagem)
        REFERENCES public.tipoembalagem (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_tipoembalagemvolume FOREIGN KEY (id_tipoembalagemvolume)
        REFERENCES public.tipoembalagem (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_tipolocaltroca FOREIGN KEY (id_tipolocaltroca)
        REFERENCES public.tipolocaltroca (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_tipomercadoria FOREIGN KEY (id_tipomercadoria)
        REFERENCES public.tipomercadoria (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_tipoorigemmercadoria FOREIGN KEY (id_tipoorigemmercadoria)
        REFERENCES public.tipoorigemmercadoria (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_tipoorigemmercadoriaentrada FOREIGN KEY (id_tipoorigemmercadoriaentrada)
        REFERENCES public.tipoorigemmercadoria (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_tipopiscofins FOREIGN KEY (id_tipopiscofins)
        REFERENCES public.tipopiscofins (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_tipopiscofinscredito FOREIGN KEY (id_tipopiscofinscredito)
        REFERENCES public.tipopiscofins (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_ncm FOREIGN KEY (ncm1, ncm2, ncm3)
        REFERENCES public.ncm (ncm1, ncm2, ncm3) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_produto_servico FOREIGN KEY (id_servico)
        REFERENCES public.servico (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_substituicaoestadual FOREIGN KEY (substituicaoestadual)
        REFERENCES public.tabelasubstituicaoestadual (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_substituicaoestadualexterior FOREIGN KEY (substituicaoestadualexterior)
        REFERENCES public.tabelasubstituicaoestadualexterior (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_substituicaoestadualoutros FOREIGN KEY (substituicaoestadualoutros)
        REFERENCES public.tabelasubstituicaoestadual (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT pk_mercadologico FOREIGN KEY (mercadologico1, mercadologico2, mercadologico3, mercadologico4, mercadologico5)
        REFERENCES public.mercadologico (mercadologico1, mercadologico2, mercadologico3, mercadologico4, mercadologico5) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT ck_id_zero CHECK (id <> 0)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.produto
    OWNER to postgres;

REVOKE ALL ON TABLE public.produto FROM mercafacil;

GRANT SELECT ON TABLE public.produto TO mercafacil;

GRANT ALL ON TABLE public.produto TO postgres;
-- Index: fki_substituicaoestadual

-- DROP INDEX IF EXISTS public.fki_substituicaoestadual;

CREATE INDEX IF NOT EXISTS fki_substituicaoestadual
    ON public.produto USING btree
    (substituicaoestadual ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_substituicaoestadualexterior

-- DROP INDEX IF EXISTS public.fki_substituicaoestadualexterior;

CREATE INDEX IF NOT EXISTS fki_substituicaoestadualexterior
    ON public.produto USING btree
    (substituicaoestadualexterior ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_substituicaoestadualoutros

-- DROP INDEX IF EXISTS public.fki_substituicaoestadualoutros;

CREATE INDEX IF NOT EXISTS fki_substituicaoestadualoutros
    ON public.produto USING btree
    (substituicaoestadualoutros ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: idx1_produto

-- DROP INDEX IF EXISTS public.idx1_produto;

CREATE INDEX IF NOT EXISTS idx1_produto
    ON public.produto USING btree
    (id_tipopiscofins ASC NULLS LAST, tiponaturezareceita ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: idx_produtodescricao

-- DROP INDEX IF EXISTS public.idx_produtodescricao;

CREATE INDEX IF NOT EXISTS idx_produtodescricao
    ON public.produto USING btree
    (descricaocompleta COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

-- Trigger: tg_log_exclusao_produto

-- DROP TRIGGER IF EXISTS tg_log_exclusao_produto ON public.produto;

CREATE OR REPLACE TRIGGER tg_log_exclusao_produto
    BEFORE DELETE
    ON public.produto
    FOR EACH ROW
    EXECUTE FUNCTION public.fc_log_exclusao_produto();

-- Trigger: tr_concentrador

-- DROP TRIGGER IF EXISTS tr_concentrador ON public.produto;

CREATE OR REPLACE TRIGGER tr_concentrador
    AFTER INSERT OR UPDATE 
    ON public.produto
    FOR EACH ROW
    EXECUTE FUNCTION public.fc_concentrador_2();

-- Trigger: tr_produto

-- DROP TRIGGER IF EXISTS tr_produto ON public.produto;

CREATE OR REPLACE TRIGGER tr_produto
    AFTER INSERT OR DELETE OR UPDATE 
    ON public.produto
    FOR EACH ROW
    EXECUTE FUNCTION public.fc_produtolojavirtual();

-- Table: public.produtofornecedor

-- DROP TABLE IF EXISTS public.produtofornecedor;

CREATE TABLE IF NOT EXISTS public.produtofornecedor
(
    id integer NOT NULL DEFAULT nextval('produtofornecedor_id_seq'::regclass),
    id_produto integer NOT NULL,
    id_fornecedor integer NOT NULL,
    id_estado integer NOT NULL,
    custotabela numeric(13,4) NOT NULL,
    codigoexterno character varying(60) COLLATE pg_catalog."default" NOT NULL,
    qtdembalagem integer NOT NULL,
    id_divisaofornecedor integer NOT NULL,
    dataalteracao date NOT NULL,
    desconto numeric(11,2) NOT NULL,
    tipoipi integer NOT NULL,
    ipi numeric(11,2) NOT NULL,
    tipobonificacao integer NOT NULL,
    bonificacao numeric(11,2) NOT NULL,
    tipoverba integer NOT NULL,
    verba numeric(12,3) NOT NULL,
    custoinicial numeric(13,4) NOT NULL,
    tipodesconto integer NOT NULL,
    pesoembalagem numeric(12,3) NOT NULL,
    id_tipopiscofins integer NOT NULL DEFAULT 0,
    csosn integer,
    fatorembalagem numeric(11,2) NOT NULL,
    id_aliquotacredito integer,
    excecao integer,
    substituicaoestadual integer,
    valorsubstituicaoestadual numeric(11,2),
    CONSTRAINT pk_produtofornecedor PRIMARY KEY (id),
    CONSTRAINT un_produtofornecedor UNIQUE (id_produto, id_fornecedor, id_estado),
    CONSTRAINT fk_id_aliquotacredito FOREIGN KEY (id_aliquotacredito)
        REFERENCES public.aliquota (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_divisaofornecedor FOREIGN KEY (id_divisaofornecedor)
        REFERENCES public.divisaofornecedor (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_estado FOREIGN KEY (id_estado)
        REFERENCES public.estado (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_fornecedor FOREIGN KEY (id_fornecedor)
        REFERENCES public.fornecedor (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_produto FOREIGN KEY (id_produto)
        REFERENCES public.produto (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_tipopiscofins FOREIGN KEY (id_tipopiscofins)
        REFERENCES public.tipopiscofins (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.produtofornecedor
    OWNER to postgres;
-- Index: idx_produtofornecedor

-- DROP INDEX IF EXISTS public.idx_produtofornecedor;

CREATE INDEX IF NOT EXISTS idx_produtofornecedor
    ON public.produtofornecedor USING btree
    (id_fornecedor ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: public.produtoautomacao

-- DROP TABLE IF EXISTS public.produtoautomacao;

CREATE TABLE IF NOT EXISTS public.produtoautomacao
(
    id integer NOT NULL DEFAULT nextval('produtoautomacao_id_seq'::regclass),
    id_produto integer NOT NULL,
    codigobarras numeric(14,0) NOT NULL,
    qtdembalagem integer NOT NULL,
    id_tipoembalagem integer NOT NULL,
    pesobruto numeric(12,3),
    dun14 boolean,
    alteradopaf boolean,
    lojavirtual boolean NOT NULL DEFAULT false,
    midia boolean NOT NULL DEFAULT false,
    CONSTRAINT fk_produtoautomacao PRIMARY KEY (id),
    CONSTRAINT un_produtoautomacao UNIQUE (codigobarras),
    CONSTRAINT fk_id_produto FOREIGN KEY (id_produto)
        REFERENCES public.produto (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_tipoembalagem FOREIGN KEY (id_tipoembalagem)
        REFERENCES public.tipoembalagem (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.produtoautomacao
    OWNER to postgres;

REVOKE ALL ON TABLE public.produtoautomacao FROM mercafacil;

GRANT SELECT ON TABLE public.produtoautomacao TO mercafacil;

GRANT ALL ON TABLE public.produtoautomacao TO postgres;
-- Index: idx_produtoautomacao

-- DROP INDEX IF EXISTS public.idx_produtoautomacao;

CREATE INDEX IF NOT EXISTS idx_produtoautomacao
    ON public.produtoautomacao USING btree
    (id_produto ASC NULLS LAST, codigobarras ASC NULLS LAST)
    TABLESPACE pg_default;

-- Trigger: tr_concentrador

-- DROP TRIGGER IF EXISTS tr_concentrador ON public.produtoautomacao;

CREATE OR REPLACE TRIGGER tr_concentrador
    AFTER INSERT OR UPDATE 
    ON public.produtoautomacao
    FOR EACH ROW
    EXECUTE FUNCTION public.fc_concentrador_2();    

-- Table: public.produtofornecedor

-- DROP TABLE IF EXISTS public.produtofornecedor;

CREATE TABLE IF NOT EXISTS public.produtofornecedor
(
    id integer NOT NULL DEFAULT nextval('produtofornecedor_id_seq'::regclass),
    id_produto integer NOT NULL,
    id_fornecedor integer NOT NULL,
    id_estado integer NOT NULL,
    custotabela numeric(13,4) NOT NULL,
    codigoexterno character varying(60) COLLATE pg_catalog."default" NOT NULL,
    qtdembalagem integer NOT NULL,
    id_divisaofornecedor integer NOT NULL,
    dataalteracao date NOT NULL,
    desconto numeric(11,2) NOT NULL,
    tipoipi integer NOT NULL,
    ipi numeric(11,2) NOT NULL,
    tipobonificacao integer NOT NULL,
    bonificacao numeric(11,2) NOT NULL,
    tipoverba integer NOT NULL,
    verba numeric(12,3) NOT NULL,
    custoinicial numeric(13,4) NOT NULL,
    tipodesconto integer NOT NULL,
    pesoembalagem numeric(12,3) NOT NULL,
    id_tipopiscofins integer NOT NULL DEFAULT 0,
    csosn integer,
    fatorembalagem numeric(11,2) NOT NULL,
    id_aliquotacredito integer,
    excecao integer,
    substituicaoestadual integer,
    valorsubstituicaoestadual numeric(11,2),
    CONSTRAINT pk_produtofornecedor PRIMARY KEY (id),
    CONSTRAINT un_produtofornecedor UNIQUE (id_produto, id_fornecedor, id_estado),
    CONSTRAINT fk_id_aliquotacredito FOREIGN KEY (id_aliquotacredito)
        REFERENCES public.aliquota (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_divisaofornecedor FOREIGN KEY (id_divisaofornecedor)
        REFERENCES public.divisaofornecedor (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_estado FOREIGN KEY (id_estado)
        REFERENCES public.estado (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_fornecedor FOREIGN KEY (id_fornecedor)
        REFERENCES public.fornecedor (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_produto FOREIGN KEY (id_produto)
        REFERENCES public.produto (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_tipopiscofins FOREIGN KEY (id_tipopiscofins)
        REFERENCES public.tipopiscofins (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.produtofornecedor
    OWNER to postgres;
-- Index: idx_produtofornecedor

-- DROP INDEX IF EXISTS public.idx_produtofornecedor;

CREATE INDEX IF NOT EXISTS idx_produtofornecedor
    ON public.produtofornecedor USING btree
    (id_fornecedor ASC NULLS LAST)
    TABLESPACE pg_default;


-- Table: public.promocao

-- DROP TABLE IF EXISTS public.promocao;

CREATE TABLE IF NOT EXISTS public.promocao
(
    id integer NOT NULL,
    id_loja integer NOT NULL,
    descricao character varying(30) COLLATE pg_catalog."default" NOT NULL,
    datainicio date NOT NULL,
    datatermino date NOT NULL,
    pontuacao integer NOT NULL,
    quantidade numeric(12,3) NOT NULL,
    qtdcupom integer NOT NULL,
    id_situacaocadastro integer NOT NULL,
    id_tipopromocao integer NOT NULL DEFAULT 1,
    valor numeric(11,2) DEFAULT 0,
    controle integer NOT NULL DEFAULT 0,
    id_tipopercentualvalor integer NOT NULL DEFAULT 0,
    id_tipoquantidade integer NOT NULL DEFAULT 1,
    aplicatodos boolean DEFAULT false,
    cupom character varying(2000) COLLATE pg_catalog."default" DEFAULT ''::character varying,
    valordesconto numeric(11,2) DEFAULT 0,
    valorreferenteitenslista boolean NOT NULL DEFAULT false,
    verificaprodutosauditados boolean NOT NULL DEFAULT false,
    datalimiteresgatecupom date,
    id_tipopercentualvalordesconto integer NOT NULL DEFAULT 1,
    valorpaga numeric(11,2) NOT NULL DEFAULT 0,
    desconsideraritem boolean DEFAULT false,
    qtdlimite integer,
    somenteclubevantagens boolean NOT NULL DEFAULT false,
    diasexpiracao integer,
    utilizaquantidadeproporcional boolean DEFAULT true,
    desconsideraprodutoemoferta boolean DEFAULT false,
    CONSTRAINT pk_promocao PRIMARY KEY (id),
    CONSTRAINT fk_id_loja FOREIGN KEY (id_loja)
        REFERENCES public.loja (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_situacaocadastro FOREIGN KEY (id_situacaocadastro)
        REFERENCES public.situacaocadastro (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_tipopercentualvalor FOREIGN KEY (id_tipopercentualvalor)
        REFERENCES public.tipopercentualvalor (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_tipopromocao FOREIGN KEY (id_tipopromocao)
        REFERENCES public.tipopromocao (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.promocao
    OWNER to postgres;

-- Trigger: tr_concentrador

-- DROP TRIGGER IF EXISTS tr_concentrador ON public.promocao;

CREATE OR REPLACE TRIGGER tr_concentrador
    AFTER INSERT OR UPDATE 
    ON public.promocao
    FOR EACH ROW
    EXECUTE FUNCTION public.fc_concentrador_2();


-- Table: public.promocaoitem

-- DROP TABLE IF EXISTS public.promocaoitem;

CREATE TABLE IF NOT EXISTS public.promocaoitem
(
    id integer NOT NULL DEFAULT nextval('promocaoitem_id_seq'::regclass),
    id_promocao bigint NOT NULL,
    id_produto integer NOT NULL,
    precovenda numeric(11,2) NOT NULL,
    CONSTRAINT pk_promocaoitem PRIMARY KEY (id),
    CONSTRAINT un_promocaoitem UNIQUE (id_promocao, id_produto),
    CONSTRAINT fk_id_produto FOREIGN KEY (id_produto)
        REFERENCES public.produto (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_id_promocao FOREIGN KEY (id_promocao)
        REFERENCES public.promocao (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.promocaoitem
    OWNER to postgres;

-- Table: public.familiafornecedor

-- DROP TABLE IF EXISTS public.familiafornecedor;

CREATE TABLE IF NOT EXISTS public.familiafornecedor
(
    id integer NOT NULL,
    descricao character varying(40) COLLATE pg_catalog."default" NOT NULL,
    id_situacaocadastro integer NOT NULL,
    CONSTRAINT pk_fornecedorfamilia_id PRIMARY KEY (id),
    CONSTRAINT fk_fornecedorfamilia_idsituacaocadastro FOREIGN KEY (id_situacaocadastro)
        REFERENCES public.situacaocadastro (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.familiafornecedor
    OWNER to postgres;


-- Table: public.familiaproduto

-- DROP TABLE IF EXISTS public.familiaproduto;

CREATE TABLE IF NOT EXISTS public.familiaproduto
(
    id integer NOT NULL,
    descricao character varying(40) COLLATE pg_catalog."default" NOT NULL,
    id_situacaocadastro integer NOT NULL,
    codigoant integer DEFAULT 0,
    CONSTRAINT pk_produtofamilia PRIMARY KEY (id),
    CONSTRAINT fk_produtofamilia_id_situacaocadastro FOREIGN KEY (id_situacaocadastro)
        REFERENCES public.situacaocadastro (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.familiaproduto
    OWNER to postgres;