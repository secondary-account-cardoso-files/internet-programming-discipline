# Guia Completo dos Hooks do React (Estudos do Básico ao Avançado)

## Sumário

1. [Introdução aos Hooks](#introducao-aos-hooks)
2. [Lista de Hooks Oficiais do React](#hooks-oficiais)
   - [useState](#usestate)
   - [useEffect](#useeffect)
   - [useContext](#usecontext)
   - [useReducer](#usereducer)
   - [useCallback](#usecallback)
   - [useMemo](#usememo)
   - [useRef](#useref)
   - [useImperativeHandle](#useimperativehandle)
   - [useLayoutEffect](#uselayouteffect)
   - [useDebugValue](#usedebugvalue)
3. [Hooks Personalizados (Custom Hooks)](#custom-hooks)
4. [Exemplo Combinado: Projeto Fictício](#exemplo-combinado)
5. [Boas Práticas com Hooks](#boas-praticas)
6. [Exercícios Práticos com Soluções](#exercicios)
7. [Tabela Resumida dos Hooks](#tabela-resumida)

---

## 1. <a name="introducao-aos-hooks"></a>Introdução aos Hooks

### O que são Hooks?

Hooks são funções especiais do React que permitem "ligar" recursos do React em componentes funcionais (state, ciclo de vida, contexto, etc).

**Antes dos hooks:** Apenas componentes de classe podiam controlar estado e ciclo de vida.

**Com hooks:** Qualquer componente funcional pode gerenciar estado, efeitos colaterais, contexto, etc.

### Por que foram criados?

- **Mais simples e reutilizável:** Elimina complexidade de classes (`this`, binds, etc).
- **Reutilização de lógica:** Facilita compartilhar lógica de estado entre componentes via custom hooks.
- **Organização:** Permite separar lógica por funcionalidade, não por tipo de componente.

#### Exemplo: Classe vs. Hook

```tsx
// Componente de classe
class ContadorClasse extends React.Component<{}, { count: number }> {
  state = { count: 0 };
  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        Cliquei {this.state.count} vezes
      </button>
    );
  }
}

// Componente funcional com hook
import { useState } from "react";
function ContadorFuncional() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>Cliquei {count} vezes</button>
  );
}
```

### Regras de uso dos hooks

1. **Chame hooks apenas no topo do componente** (não dentro de loops, condições ou funções aninhadas).
2. **Chame hooks apenas em componentes funcionais ou hooks customizados** (não em funções normais ou classes).

---

## 2. <a name="hooks-oficiais"></a>Lista de Hooks Oficiais do React

---

### <a name="usestate"></a>useState

#### Explicação

Permite criar e controlar variáveis de estado em componentes funcionais.

#### Quando usar?

Sempre que precisar armazenar e atualizar valores que mudam ao longo do tempo (inputs, toggles, contadores, etc).

#### Exemplo Prático (TypeScript)

```tsx
import { useState } from "react";

function Contador() {
  // Tipagem explícita do estado
  const [contador, setContador] = useState<number>(0);

  return (
    <div>
      <p>Valor: {contador}</p>
      <button onClick={() => setContador(contador + 1)}>Incrementar</button>
    </div>
  );
}
```

---

### <a name="useeffect"></a>useEffect

#### Explicação

Permite executar efeitos colaterais (side effects) em componentes funcionais: requisições, manipulação do DOM, timers, etc.

#### Dependências

- **Sem dependências (`[]`)**: roda uma vez após montagem (componentDidMount).
- **Com dependências**: roda quando valores mudam.
- **Sem array**: roda toda vez que renderiza.
- **Cleanup**: retorna função para "limpar" efeito ao desmontar/atualizar.

#### Exemplo Prático

```tsx
import { useState, useEffect } from "react";

function Temporizador() {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSegundos((s) => s + 1), 1000);
    // Cleanup: limpa o timer ao desmontar
    return () => clearInterval(timer);
  }, []); // Array vazio: executa só ao montar

  return <p>Tempo: {segundos}s</p>;
}
```

---

### <a name="usecontext"></a>useContext

#### Explicação

Permite acessar valores do contexto global de forma fácil, sem prop drilling.

#### Como criar e consumir contextos

```tsx
import { createContext, useContext, useState, ReactNode } from "react";

// Criando contexto
type Tema = "light" | "dark";
const TemaContext = createContext<{ tema: Tema; alternar: () => void }>({
  tema: "light",
  alternar: () => {},
});

export function TemaProvider({ children }: { children: ReactNode }) {
  const [tema, setTema] = useState<Tema>("light");
  const alternar = () => setTema((t) => (t === "light" ? "dark" : "light"));

  return (
    <TemaContext.Provider value={{ tema, alternar }}>
      {children}
    </TemaContext.Provider>
  );
}

// Consumindo contexto
function BotaoTema() {
  const { tema, alternar } = useContext(TemaContext);
  return <button onClick={alternar}>Tema atual: {tema}</button>;
}
```

---

### <a name="usereducer"></a>useReducer

#### Explicação

Gerencia estados mais complexos ou lógicos, parecido com Redux.

#### Quando usar?

Quando o estado depende de múltiplos sub-valores ou possui lógica de atualização complexa.

#### Exemplo Prático: Carrinho de compras

```tsx
import { useReducer } from "react";

type Item = { id: number; nome: string };
type Estado = { itens: Item[] };
type Acao = { type: "adicionar"; item: Item } | { type: "remover"; id: number };

function reducer(estado: Estado, acao: Acao): Estado {
  switch (acao.type) {
    case "adicionar":
      return { itens: [...estado.itens, acao.item] };
    case "remover":
      return { itens: estado.itens.filter((i) => i.id !== acao.id) };
    default:
      return estado;
  }
}

function Carrinho() {
  const [estado, dispatch] = useReducer(reducer, { itens: [] });

  // Exemplo de adicionar/remover itens...
}
```

---

### <a name="usecallback"></a>useCallback

#### Explicação

Memoiza funções para evitar recriação em cada render (útil ao passar funções para filhos otimizados).

#### Exemplo Prático

```tsx
import { useState, useCallback } from "react";

function Pai() {
  const [contador, setContador] = useState(0);

  // useCallback garante que a função só muda se contador mudar
  const incrementar = useCallback(() => setContador((c) => c + 1), []);

  return <Filho onClick={incrementar} />;
}

function Filho({ onClick }: { onClick: () => void }) {
  return <button onClick={onClick}>Clique</button>;
}
```

---

### <a name="usememo"></a>useMemo

#### Explicação

Memoiza valores calculados para evitar recálculos caros em cada renderização.

#### Exemplo de cálculo pesado

```tsx
import { useMemo, useState } from "react";

function Calculadora() {
  const [numero, setNumero] = useState(0);

  // Só recalcula quando numero mudar
  const fatorial = useMemo(() => {
    function calcFat(n: number): number {
      return n <= 1 ? 1 : n * calcFat(n - 1);
    }
    return calcFat(numero);
  }, [numero]);

  return (
    <div>
      <input
        type="number"
        value={numero}
        onChange={(e) => setNumero(Number(e.target.value))}
      />
      <p>Fatorial: {fatorial}</p>
    </div>
  );
}
```

---

### <a name="useref"></a>useRef

#### Explicação

Armazena valores mutáveis que não causam re-renderização; referenciar elementos DOM.

#### Exemplo Prático

```tsx
import { useRef } from "react";

function InputFocus() {
  const inputRef = useRef<HTMLInputElement>(null);

  function focar() {
    inputRef.current?.focus();
  }

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focar}>Focar input</button>
    </div>
  );
}
```

---

### <a name="useimperativehandle"></a>useImperativeHandle

#### Explicação

Permite expor métodos do componente filho para o pai (via ref).

#### Exemplo

```tsx
import { forwardRef, useImperativeHandle, useRef } from "react";

type InputHandle = { foco: () => void };

const MeuInput = forwardRef<InputHandle, {}>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => ({
    foco: () => inputRef.current?.focus(),
  }));
  return <input ref={inputRef} />;
});

function Pai() {
  const ref = useRef<InputHandle>(null);
  return (
    <>
      <MeuInput ref={ref} />
      <button onClick={() => ref.current?.foco()}>Focar pelo pai</button>
    </>
  );
}
```

---

### <a name="uselayouteffect"></a>useLayoutEffect

#### Explicação

Igual ao useEffect, mas roda **sincronamente** após renderização e antes de pintar na tela. Use para ler/dimensões/layout DOM.

#### Diferença com useEffect

- **useEffect:** roda após o navegador pintar a tela.
- **useLayoutEffect:** roda antes de pintar, pode causar travamentos se mal usado.

---

### <a name="usedebugvalue"></a>useDebugValue

#### Explicação

Exibe um valor customizado no React DevTools para custom hooks.

#### Exemplo

```tsx
import { useDebugValue, useState, useEffect } from "react";

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  useDebugValue(isOnline ? "Online" : "Offline");
  // ... lógica para detectar status online ...
  return isOnline;
}
```

---

## 3. <a name="custom-hooks"></a>Hooks Personalizados (Custom Hooks)

### O que são?

Funções que usam hooks internos para compartilhar lógica reutilizável entre componentes.

### Quando criar?

- Sempre que detectar repetição de lógica com hooks em vários componentes.

### Boas práticas

- Sempre prefixar com `use`.
- Não manipular DOM diretamente (exceto com useRef).
- Não chamar hooks condicionalmente.

#### Exemplo: useForm

```tsx
import { useState } from "react";

function useForm<T>(valoresIniciais: T) {
  const [valores, setValores] = useState<T>(valoresIniciais);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValores({ ...valores, [e.target.name]: e.target.value });
  }
  return { valores, handleChange, setValores };
}
```

#### Exemplo: useFetch

```tsx
import { useState, useEffect } from "react";

function useFetch<T = unknown>(url: string) {
  const [dados, setDados] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setDados(json))
      .finally(() => setLoading(false));
  }, [url]);

  return { dados, loading };
}
```

#### Exemplo: useLocalStorage

```tsx
import { useState } from "react";

function useLocalStorage<T>(key: string, inicial: T) {
  const [valor, setValor] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : inicial;
  });

  function setValorLS(val: T) {
    setValor(val);
    localStorage.setItem(key, JSON.stringify(val));
  }

  return [valor, setValorLS] as const;
}
```

---

## 4. <a name="exemplo-combinado"></a>Exemplo Combinado: Projeto Fictício

### Projeto: Lista de Tarefas com Contexto de Usuário

**Hooks usados:** useState, useEffect, useContext, useReducer, custom hook

#### Estrutura simplificada

```tsx
// Contexto de Usuário
const UsuarioContext = createContext<{ nome: string }>({ nome: "Convidado" });

// Estado global das tarefas
type Tarefa = { id: number; texto: string; concluida: boolean };
type EstadoTarefas = { tarefas: Tarefa[] };
type AcaoTarefas =
  | { type: "adicionar"; texto: string }
  | { type: "toggle"; id: number };

function reducerTarefas(
  estado: EstadoTarefas,
  acao: AcaoTarefas
): EstadoTarefas {
  switch (acao.type) {
    case "adicionar":
      return {
        tarefas: [
          ...estado.tarefas,
          { id: Date.now(), texto: acao.texto, concluida: false },
        ],
      };
    case "toggle":
      return {
        tarefas: estado.tarefas.map((t) =>
          t.id === acao.id ? { ...t, concluida: !t.concluida } : t
        ),
      };
    default:
      return estado;
  }
}

function App() {
  // useContext
  const usuario = { nome: "Maria" };

  // useReducer
  const [estado, dispatch] = useReducer(reducerTarefas, { tarefas: [] });

  // useEffect para persistir no localStorage
  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(estado.tarefas));
  }, [estado.tarefas]);

  // useState para input
  const [novaTarefa, setNovaTarefa] = useState("");

  return (
    <UsuarioContext.Provider value={usuario}>
      <h1>Olá, {usuario.nome}</h1>
      <input
        value={novaTarefa}
        onChange={(e) => setNovaTarefa(e.target.value)}
        placeholder="Nova tarefa"
      />
      <button
        onClick={() => {
          dispatch({ type: "adicionar", texto: novaTarefa });
          setNovaTarefa("");
        }}
      >
        Adicionar
      </button>

      <ul>
        {estado.tarefas.map((tarefa) => (
          <li
            key={tarefa.id}
            style={{
              textDecoration: tarefa.concluida ? "line-through" : "none",
            }}
          >
            {tarefa.texto}
            <button onClick={() => dispatch({ type: "toggle", id: tarefa.id })}>
              Concluir
            </button>
          </li>
        ))}
      </ul>
    </UsuarioContext.Provider>
  );
}
```

---

## 5. <a name="boas-praticas"></a>Boas Práticas com Hooks

- **Estrutura de código:** Separe lógica de hooks em arquivos próprios (ex: `useForm.ts`).
- **Nomeação:** Sempre começar custom hooks por `use` (ex: `useAuth`).
- **Evite re-renderizações desnecessárias:** Use `useMemo` e `useCallback` para funções/valores passados para filhos.
- **Não use hooks dentro de condições, loops ou funções internas.**
- **Prefira componentes funcionais.**
- **Tipagem forte:** Utilize TypeScript para tipar estados, ações de reducers, etc.

---

## 6. <a name="exercicios"></a>Exercícios Práticos com Soluções

### 1. useState - Contador Simples

**Desafio:** Crie um componente contador com botão de incrementar e zerar.

<details>
<summary>Solução</summary>

```tsx
function Contador() {
  const [valor, setValor] = useState(0);
  return (
    <div>
      <p>{valor}</p>
      <button onClick={() => setValor(valor + 1)}>+1</button>
      <button onClick={() => setValor(0)}>Zerar</button>
    </div>
  );
}
```

</details>

---

### 2. useEffect - Buscar dados de API

**Desafio:** Crie um componente que busca e mostra nome de usuário do GitHub.

<details>
<summary>Solução</summary>

```tsx
function UsuarioGithub({ usuario }: { usuario: string }) {
  const [dados, setDados] = useState<any>(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${usuario}`)
      .then((resp) => resp.json())
      .then((json) => setDados(json));
  }, [usuario]);

  return <div>{dados?.name}</div>;
}
```

</details>

---

### 3. useContext - Tema

**Desafio:** Implemente um botão que troca o tema da aplicação usando contexto.

<details>
<summary>Solução</summary>

// Veja o exemplo completo em [useContext](#usecontext)

</details>

---

### 4. useReducer - Lista dinâmica

**Desafio:** Faça uma lista onde é possível adicionar e remover itens com useReducer.

<details>
<summary>Solução</summary>

```tsx
type Item = { id: number; texto: string };
type Estado = Item[];
type Acao = { type: "add"; texto: string } | { type: "remove"; id: number };

function reducer(estado: Estado, acao: Acao): Estado {
  switch (acao.type) {
    case "add":
      return [...estado, { id: Date.now(), texto: acao.texto }];
    case "remove":
      return estado.filter((i) => i.id !== acao.id);
    default:
      return estado;
  }
}
```

</details>

---

## 7. <a name="tabela-resumida"></a>Tabela Resumida dos Hooks

| Hook                  | Uso Principal           | Retorno            | Exemplo Rápido                              |
| --------------------- | ----------------------- | ------------------ | ------------------------------------------- |
| `useState`            | Estado local            | [valor, setValor]  | `const [c, setC] = useState(0)`             |
| `useEffect`           | Efeitos colaterais      | void               | `useEffect(() => { ... }, [deps])`          |
| `useContext`          | Consome contexto        | valor do contexto  | `const ctx = useContext(Contexto)`          |
| `useReducer`          | Estado complexo         | [estado, dispatch] | `useReducer(reducer, inicial)`              |
| `useCallback`         | Memoizar função         | função memoizada   | `useCallback(fn, [deps])`                   |
| `useMemo`             | Memoizar valor          | valor memoizado    | `useMemo(() => calc(), [deps])`             |
| `useRef`              | Ref. mutável/DOM        | ref                | `const ref = useRef<HTMLInput>()`           |
| `useImperativeHandle` | Expõe métodos pelo ref  | void               | `useImperativeHandle(ref, () => ({ ... }))` |
| `useLayoutEffect`     | Efeito sync após render | void               | `useLayoutEffect(() => { ... }, [])`        |
| `useDebugValue`       | Debug custom hook       | void               | `useDebugValue(valor)`                      |

---

## Dicas Finais

- Consulte sempre a [documentação oficial do React](https://react.dev/reference/react).
- Pratique criando seus próprios hooks customizados!
- Use TypeScript para melhor produtividade e segurança com hooks.
- Use o React DevTools para inspecionar hooks e estados dos componentes.

---

**Material pronto para ser utilizado como guia de estudos ou apostila.**
