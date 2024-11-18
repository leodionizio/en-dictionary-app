# en-dictionary-app

Uma aplicação de dicionário em inglês construída com Next.js, React e diversas tecnologias modernas para proporcionar uma experiência interativa e responsiva.

## 🌐 Link para Produção

A aplicação está disponível em produção no seguinte link: [en-dictionary-app](https://en-dictionary-app.netlify.app/signin)

## 🚀 Tecnologias Utilizadas

- **Next.js** (15.0.3): Framework React para desenvolvimento web.
- **React** (19.0.0): Biblioteca JavaScript para criação de interfaces de usuário.
- **Axios** (1.7.7): Cliente HTTP para chamadas de API.
- **React Icons** (5.3.0): Biblioteca de ícones para React.
- **React Toastify** (10.0.6): Exibição de notificações amigáveis.
- **@NextUI** (2.4.8): Biblioteca de componentes UI estilizados.
- **Tailwind CSS** (3.4.1): Framework CSS para estilização rápida e responsiva.

## 📦 Como Rodar o Projeto

Certifique-se de ter o Node.js instalado na versão compatível com o projeto, você pode checar no [.nvmrc](./.nvmrc).

### Passos

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/en-dictionary-app.git
   cd en-dictionary-app
   ```

2. **Instale as dependências:**

   ```bash
   yarn install
   ```

3. **Execute o projeto em modo de desenvolvimento:**

   ```bash
   yarn dev
   ```

   A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

4. **Crie o build de produção:**

   ```bash
   yarn build
   ```

5. **Inicie o servidor de produção:**
   ```bash
   yarn start
   ```

## 🧪 Testes

### Execute os testes unitários e integração

Para rodar os testes uma vez, execute o seguinte comando:

```bash
yarn test
```

### Execute os testes em modo de observação:

Para rodar os testes e observar mudanças em tempo real, execute:

```bash
yarn test:watch
```

> Isso permitirá que você veja os resultados dos testes sempre que houver alterações nos arquivos.

## 📂 Estrutura do Projeto

- **`api/`**: Chamadas para serviços externos utilizando Axios.
- **`components/`**: Componentes reutilizáveis da interface do usuário.
- **`contexts/`**: Contexts compartilhados para armazenados estados que podem ser acessados de mais de um local na aplicação.
- **`guard/`**: Guard para verificar as rotas que só podem ser acessadas via autenticação.
- **`hooks/`**: React hooks customizados para serem compartilhados na aplicação.
- **`interfaces/`**: Interfaces copmpartilhadas.
- **`types/`**: Tipos de objetos compartilhados.
- **`utils/`**: Utilitários.

- **`pages.tsx`**: As demais pastas são os modulos da aplicação, incluindo as páginas.

## 🔧 Pendências

Ainda restam algumas pendências de desenvolvimento para este projeto, que estão listadas abaix.

- [x] Implementar testes unitários com Jest e React Testing Library.
- [x] Adicionar paginação na tela de listagem de palavras.
- [ ] Adicionar uma documentação técnica ADR.
- [ ] Implmentar validaçÕes nos campos de formulário nas telas de `signin` e `signup`.
- [x] Implementar loading nas reuiqisçÕes
- [x] Implementar mensagem de feedback ao usuário nas açÕes da aplicação.
- [ ] Docker para execução/deploy da aplicação.
