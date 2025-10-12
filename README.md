# 🌐 Programação para a Internet

<div align="center">

![Programação para a Internet](https://img.shields.io/badge/Programação%20para%20a%20Internet-Unitri-0078D4?style=for-the-badge&logo=azuredevops)
![Disciplina](https://img.shields.io/badge/Disciplina-ADS-4B8BBE?style=for-the-badge&logo=github)
![Professora](https://img.shields.io/badge/Prof-Luciene%20Chagas%20de%20Oliveira-FFCA28?style=for-the-badge&logo=linkedin)

**Instituição:** [Unitri](https://unitri.edu.br)  
**Curso:** Análise e Desenvolvimento de Sistemas  
**Disciplina:** Programação para a Internet  
**Professora:** [Luciene Chagas de Oliveira, Ph.D](https://www.linkedin.com/in/luciene-chagas-de-oliveira-ph-d-b21b3b31/)

Este repositório contém meus estudos, anotações e exercícios realizados durante a disciplina de Programação para a Internet. O objetivo é registrar o progresso ao longo do semestre, facilitando a inclusão de novos conteúdos conforme as aulas avançam.

</div>

---

### Ementa

Histórico e tecnologias da rede Internet. Conceitos e arquitetura da World Wide Web. Protocolos e Servidores para Web. Programação do lado Cliente. Programação do lado Servidor. Desenvolvimento de aplicações para Web.

---

### Objetivo Geral

Acompanhar a evolução e as novas tendências e tecnologias da Internet; compreender e desenvolver aplicações empresariais para a Internet; apreender tópicos avançados de programação para Internet.

---

### Conteúdo Programático

- Histórico e Tecnologias da Rede Internet
- Conceitos e Arquitetura da World Wide Web
- Protocolos e Servidores para Web
- Programação do Lado Cliente
- Programação do Lado Cliente – Aplicação
- Programação do Lado Servidor
- Programação do Lado Servidor – Aplicação
- Desenvolvimento de Aplicações para Web - Parte 1
- Desenvolvimento de Aplicações para Web - Parte 2
- Desenvolvimento de Aplicações para Web - Parte 3
- Padrões de Projeto Aplicados a Sistemas para a Web
- Invocação Assíncrona ao Servidor (Ajax)
- Web-Services WS e XML
- Web-Services WS e XML – Aplicação
- Web-Services Rest
- Web-Services Rest – Aplicação
- Desenvolvimento de Aplicações para Web com base em Webservices - Parte 1
- Desenvolvimento de Aplicações para Web com base em Webservices - Parte 2
- Desenvolvimento de Aplicações para Web com base em Webservices - Parte 3
- Arquitetura orientada a serviços (SOA)

---

## Introdução ao HTML - HyperText Markup Language

Este material é um resumo completo e estruturado baseado no conteúdo da aula "3Aula-HTML.pdf", ministrada pela **Profa. Drª. Luciene Chagas de Oliveira**. O material aborda os fundamentos do HTML, uma linguagem de marcação essencial para a criação de páginas web.

> _"Feliz aquele que transfere o que sabe e aprende o que ensina"_
>
> — **CORA CORALINA**

**Autora:** Profa. Drª. Luciene Chagas de Oliveira  
**Contato:** lchagasoliveira@gmail.com

**Redes Sociais:**

- **Twitter/X:** @professoralucienechagas
- **Facebook:** https://www.facebook.com/lucienechagasoliveira/
- **YouTube:** https://www.youtube.com/@professoralucienechagas
- **LinkedIn:** https://www.linkedin.com/in/luciene-chagas-de-oliveira-b21b3b31/
- **Lattes:** http://lattes.cnpq.br/1790662929908503

---

## Sumário

1. [O que é HTML?](#o-que-é-html)
2. [Editores HTML](#editores-html)
3. [O que HTML NÃO é?](#o-que-html-não-é)
4. [Marcações (Tags)](#marcações-tags)
5. [Estrutura de um Documento HTML](#estrutura-de-um-documento-html)
6. [Exercícios Práticos](#exercícios-práticos)
7. [Limitações do HTML](#limitações-do-html)
8. [Tecnologias do Lado do Servidor](#tecnologias-do-lado-do-servidor)
9. [Cores no HTML](#cores-no-html)
10. [Propriedades da Tag body](#propriedades-da-tag-body)
11. [Formatação de Texto](#formatação-de-texto)
12. [Acentuação e Caracteres Especiais](#acentuação-e-caracteres-especiais)
13. [Documentando o Código (Comentários)](#documentando-o-código-comentários)
14. [Disposição do Texto na Página](#disposição-do-texto-na-página)
15. [Listas com Marcadores](#listas-com-marcadores)
16. [Listas Numeradas](#listas-numeradas)
17. [Links para Outra Página](#links-para-outra-página)
18. [Links para a Própria Página (Âncoras)](#links-para-a-própria-página-âncoras)
19. [Imagens](#imagens)
20. [Link em uma Imagem](#link-em-uma-imagem)
21. [Tabelas](#tabelas)
22. [Formulários](#formulários)
23. [Sons no HTML](#sons-no-html)
24. [Frames no HTML](#frames-no-html)
25. [Exemplos de Frames](#exemplos-de-frames)
26. [Referências e Ferramentas](#referências-e-ferramentas)

---

## O que é HTML?

**HTML (HyperText Markup Language)** é uma linguagem de marcação para produzir páginas web interpretadas por browsers. Com tags de marcação, é possível criar páginas com textos, tabelas, imagens e hyperlinks.

- Páginas HTML são documentos de texto que contêm código HTML, com extensão `.html` ou `.htm`
- Pode ser usado para páginas estáticas ou em conjunto com linguagens como ASP.NET, ASP, JSP, PHP para páginas dinâmicas
- É uma linguagem interpretada: após salvar o arquivo, ele pode ser aberto diretamente no navegador, que valida os padrões da linguagem

---

## Editores HTML

### Não Gratuitos

- Macromedia DreamWeaver
- Adobe DreamWeaver
- Microsoft FrontPage
- Microsoft Visual Studio .NET (HTML e ASP.NET)

### Gratuitos

- Koala Edit Editor 7.5
- HTMLEdit
- NVU (Linux e Windows)
- Quanta (Linux)
- Eclipse (HTML e Java)
- Notepad++

<div align="right">

[⬆️ Voltar ao topo](#menu-de-navegação)

</div>

---

## O que HTML NÃO é?

- **Linguagem de Programação:** Não acessa banco de dados
- **Não é Case Sensitive:** Não diferencia maiúsculas e minúsculas
- **Não permite conteúdo dinâmico:** O dinamismo é fornecido por outras linguagens como JavaScript, PHP, ASP, Java, .NET, etc.

<div align="right">

[⬆️ Voltar ao topo](#menu-de-navegação)

</div>

---

## Marcações (Tags)

As marcações são **TAGS**, consistindo no sinal de menor que (`<`) seguido pelo nome da tag e fechado pelo sinal de maior que (`>`). Em geral, as tags devem ser fechadas.

**Exemplos:**

- `<title>Título</title>`: Especifica um título do documento
- `<br>`: Salta uma linha (não precisa ser fechada)

<div align="right">

[⬆️ Voltar ao topo](#menu-de-navegação)

</div>

---

## Estrutura de um Documento HTML

Todo documento HTML inicia e finaliza com `<html></html>`, possui uma área de cabeçalho `<head></head>` e uma área de corpo `<body></body>`.

```html
<html>
  <head>
    <title>Título</title>
    <meta charset="UTF-8" />
  </head>
  <body>
    Este é o corpo do documento
  </body>
</html>
```

<div align="right">

[⬆️ Voltar ao topo](#menu-de-navegação)

</div>

---

## Exercícios Práticos

### Exercício 1

1. Crie um arquivo `primeiraPagina.html` com a estrutura básica acima
2. Teste a página no browser

### Exercício 2

Crie o arquivo `exemploHTML.html` com o exemplo de tabela de notas e teste no browser:

```html
<html>
  <head>
    <title>Exemplo Página HTML</title>
  </head>
  <body>
    <font color="blue">
      <b>Notas dos Alunos</b>
    </font>
    <br /><br />
    <table border="1">
      <tr>
        <td align="center"><b>Aluno</b></td>
        <td align="center"><b>Nota</b></td>
      </tr>
      <tr>
        <td>Amanda de Oliveira</td>
        <td>10,00</td>
      </tr>
      <tr>
        <td>João Paulo Ferreira da Silva</td>
        <td>8,50</td>
      </tr>
    </table>
    <br /><br />
  </body>
</html>
```

<div align="right">

[⬆️ Voltar ao topo](#menu-de-navegação)

</div>

---

## Limitações do HTML

- Linguagem declarativa, interpretada pelo browser, que define apenas como a informação será apresentada e organizada
- Não oferece recursos de programação
- Os formulários não fazem nada sozinhos; precisam ser vinculados a uma aplicação
- Não é possível desenvolver aplicações interativas e dinâmicas usando apenas HTML

---

## Tecnologias do Lado do Servidor

Estendem as funções básicas do servidor HTTP:

- Não dependem de suporte dos browsers
- Interceptam requisições HTTP (GET e POST) e devolvem respostas HTTP

**Exemplos:** ASP.NET, PHP, etc.

---

## Cores no HTML

O browser interpreta cores via código hexadecimal RGB (precedido por `#`).

**Exemplos:**

- Vermelho: `#FF0000` ou `red`
- Azul: `#0000FF` ou `blue`
- Verde: `#00FF00` ou `green`
- Branco: `#FFFFFF` ou `white`
- Preto: `#000000` ou `black`

Atalhos para cores comuns; para outras, use código hexadecimal. Editores HTML geram códigos automaticamente.

---

## Propriedades da Tag `<body>`

- `alink`: Cor para links ativados
- `link`: Cor dos links disponíveis
- `vlink`: Cor dos links visitados
- `bgcolor`: Cor de fundo da página
- `background`: Imagem de fundo
- `text`: Cor do texto

```html
<html>
  <head>
    <title>Este é o título da página</title>
  </head>
  <body bgcolor="#FF0000" link="green" alink="white">
    <a href="http://www.google.com.br">Página de Busca</a>
  </body>
</html>
```

<div align="right">

[⬆️ Voltar ao topo](#menu-de-navegação)

</div>

---

## Formatação de Texto

### Tag `<font>`

- `color`: Cor da fonte. Ex: `<font color="blue">Texto</font>`
- `size`: Tamanho (1-7, padrão 3). Ex: `<font size="2">Texto</font>`
- `face`: Tipo da fonte. Ex: `<font face="Arial">Texto</font>`

**Exemplo:** `<font color="blue" face="Arial" size="2">Texto</font>`

### Cabeçalhos

```html
<h1>Tamanho H1</h1>
<h2>Tamanho H2</h2>
<!-- ... até <h6> -->
```

### Outros Estilos

- `<b>Texto em Negrito</b>`
- `<i>Texto em Itálico</i>`
- `<u>Texto Sublinhado</u>`
- `<sup>Texto sobrescrito</sup>`
- `<sub>Texto subscrito</sub>`
- `<blink>Texto piscando</blink>` (Não funciona no IE)
- `<tt>Texto com espaçamento fixo</tt>`
- `<big>Texto grande</big>`
- `<small>Texto pequeno</small>`
- `<cite>Texto em itálico para citações</cite>`
- `<code>Texto para programas</code>`
- `<dfn>Texto para definições</dfn>`
- `<strong>Texto enfatizado</strong>`
- `<var>Texto para variáveis</var>`
- `<marquee>Texto deslizante</marquee>`

---

## Acentuação e Caracteres Especiais

Acentos são tratados via entidades HTML para compatibilidade. Browsers modernos reconhecem UTF-8 via `<meta charset="UTF-8">`.

```html
Com a utiliza&ccedil;&atilde;o de c&oacute;digo<br />
Sem a utiliza&ccedil;&atilde;o de c&oacute;digo
```

**Outros caracteres:** Consulte http://www.ic.unicamp.br/~hans/lite/html.html#acentuacao

---

## Documentando o Código (Comentários)

Use `<!-- Comentário -->`.

```html
<html>
  <head>
    <title>Este é o título da página</title>
  </head>
  <body>
    Texto
    <!-- Comentário em HTML -->
  </body>
</html>
```

---

## Disposição do Texto na Página

- `<center>Texto centralizado</center>`
- `<br>`: Quebra de linha
- `<p>Parágrafo</p>`: Fim de parágrafo
- `<hr>`: Linha horizontal. Ex: `<hr width="50%" size="6">`
- `<pre>Texto pré-formatado</pre>`: Respeita formatação original

---

## Listas com Marcadores

- `<ul>`: Início/fim da lista
- `<li>Item</li>`: Item (não precisa fechar)

```html
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <ul>
    <li>Sub Item 1</li>
    <li>Sub Item 2</li>
  </ul>
</ul>
```

---

## Listas Numeradas

- `<ol>`: Início/fim da lista
- `type` em `<ol>`: 1 (números), A (maiúsculas), a (minúsculas), I (romanas maiúsculas), i (romanas minúsculas)

```html
<ol type="1">
  <li>Item 1</li>
  <li>Item 2</li>
  <ol type="a">
    <li>Sub Item 1</li>
    <li>Sub Item 2</li>
  </ol>
</ol>
```

<div align="right">

[⬆️ Voltar ao topo](#menu-de-navegação)

</div>

---

## Links para Outra Página

`<a href="url">Texto</a>`

```html
<a href="primeiro.html">Primeira Página</a>
<br />
<a href="http://www.google.com.br">Google</a>
```

---

## Links para a Própria Página (Âncoras)

- `<a href="#ancora">Link</a>`: Link para âncora
- `<a name="ancora">Ponto</a>`: Ponto de destino

```html
<a href="#fim">Fim do documento</a>
<!-- ... conteúdo ... -->
<a name="fim">Aqui é o ponto de chegada</a>
```

---

## Imagens

**Tag:** `<img>`
**Formatos recomendados:** .GIF, .JPG (evite .BMP por tamanho; .JPEG nem sempre suportado)

**Atributos:**

- `src`: Caminho da imagem
- `border`: Borda (0 para remover)
- `width/height`: Tamanho em pixels ou %
- `alt`: Texto alternativo

```html
<img
  src="nome_imagem.jpg"
  alt="Descrição"
  width="100"
  height="100"
  border="0"
/>
```

---

## Link em uma Imagem

```html
<a href="http://www.google.com.br">
  <img src="paisagem.jpg" alt="Paisagem" />
</a>
```

---

## Tabelas

- `<table>`: Tabela
- **Atributos:** border, bordercolor, align, width, height, bgcolor, background, cellspacing, cellpadding, colspan (mesclar células)
- `<tr>`: Linha
- `<td>`: Coluna

```html
<table
  border="3"
  bordercolor="blue"
  bgcolor="red"
  cellpadding="0"
  cellspacing="0"
>
  <tr>
    <td>Coluna 1</td>
    <td>Coluna 2</td>
    <td>Coluna 3</td>
  </tr>
</table>
```

---

## Formulários

- `<form>`: Formulário. **Atributos:** action (destino), name, method (GET/POST - recomendo POST)
- `<input>`: Campos. **Tipos:** text, password, radio, checkbox, submit, reset, hidden, file
- **Atributos:** name, size, maxlength, value, checked
- `<select>`: Dropdown. Com `<option value="1">Item</option>`
- `<textarea>`: Texto multi-linha. **Atributos:** name, rows, cols

```html
<form name="nomeFormulario" action="primeiro.html" method="post">
  Nome: <input type="text" name="txtNome" /><br />
  Senha: <input type="password" name="txtSenha" /><br />
  Sexo: <input type="radio" name="rdSexo" value="M" />Masculino
  <input type="radio" name="rdSexo" value="F" />Feminino<br />
  Escolaridade:
  <select name="cmdEscolaridade">
    <option value="1">Ensino Fundamental</option>
    <option value="2">Ensino Médio</option>
    <option value="3">Ensino Superior</option></select
  ><br />
  Línguas: <input type="checkbox" name="chkLingua" value="I" />Inglês<br />
  <input type="checkbox" name="chkLingua" value="E" />Espanhol<br />
  <input type="checkbox" name="chkLingua" value="O" />Outras<br />
  Comentário:<br />
  <textarea name="txtComentario" rows="5" cols="80"></textarea><br />
  <input type="submit" value="OK" />
  <input type="reset" value="Limpar" />
</form>
```

<div align="right">

[⬆️ Voltar ao topo](#menu-de-navegação)

</div>

---

## Sons no HTML

### Internet Explorer

`<bgsound src="arquivo.wav" loop="infinite">`

- **Formatos:** .wav, .au, .mid
- `loop`: Número de repetições (INFINITE para infinito)

```html
<bgsound src="tada.wav" loop="infinite" />
```

### Mozilla Firefox

`<embed src="arquivo.wav" width="140" height="25" autostart="true" volume="100" loop="true">`

```html
<embed src="tada.wav" width="140" height="25" autostart="true" volume="100" loop="true"></embed>
```

**Nota:** Use arquivos de som do Windows (ex: C:\Windows\Media) para testes. Avalie tamanhos para download.

---

## Frames no HTML

Frames dividem a tela em quadros independentes, cada um como uma página HTML separada.

- `<frameset>`: Substitui `<body>`. **Atributos:** cols (colunas), rows (linhas), frameborder (borda: 0/1), framespacing (espaço)
- `<frame>`: Conteúdo. **Atributos:** src (URL), name (nome), scrolling (yes/no/auto), noresize

**Exemplo de link entre frames:** `<a href="URL" target="nome">Link</a>`
**Targets:** \_self, \_parent, \_top, \_blank

---

## Exemplos de Frames

### Exemplo 1: index.html

```html
<html>
<head>
  <title>Página Utilizando Frames</title>
</head>
<frameset rows="20%,80%">
   <frame src="cabecalho.html" name="cabecalho">
   <frameset cols="30%,70%">
      <frame src="menu.html" name="menu" />
      <frame src="inicio.html" name="tela" />
   </frameset>
</frameset>
</html>
```

- **cabecalho.html:** `<body bgcolor="Blue"><h1>Cabeçalho do Site</h1></body>`
- **menu.html:** Links como `<a href="exercicio001.html" target="tela">Exercício 01</a>`
- **inicio.html:** `<body bgcolor="Green"><h1>Página Inicial</h1></body>`
- **exercicio001.html:** Conteúdo com link para próximo exercício
- **exercicio002.html:** Similar

### Exemplo 2: index2.html

Similar, mas com `cols="20%,80%"` e frames aninhados diferentemente.

<div align="right">

[⬆️ Voltar ao topo](#menu-de-navegação)

</div>

---

## Referências e Ferramentas

- **Sites para testar cores:**
  - https://colourco.de/
  - Google Colour Picker
  - https://coolors.co/
  - https://color.adobe.com/pt/create/color-wheel
- **Site para testar HTML online:** https://jsfiddle.net/
- **Caracteres especiais:** http://www.ic.unicamp.br/~hans/lite/html.html#acentuacao

---

## 📫 Contato

<div align="center">

<a href="mailto:cardosofiles@outlook.com">
  <img src="https://img.shields.io/badge/Email-0078D4?style=for-the-badge&logo=microsoftoutlook&logoColor=white" alt="Email"/>
</a>
<a href="https://www.linkedin.com/in/joaobatista-dev/" target="_blank">
  <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
</a>
<a href="https://github.com/Cardosofiles" target="_blank">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
</a>
<a href="https://cardosofiles.dev/" target="_blank">
  <img src="https://img.shields.io/badge/Portfólio-222222?style=for-the-badge&logo=about.me&logoColor=white" alt="Portfólio"/>
</a>

</div>

---

<div align="center">
  <i>⭐ Marque meus repositórios com uma estrela se você os achar interessantes!</i>
</div>
