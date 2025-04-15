# Tripleten web_project_around_auth

## Nome do Projeto:

Around the U.S.

## Link para o GitHub Pages:

O site está disponível no GitHub Pages: [Clique aqui para acessar](https://jlcambraia.github.io/web_project_around_auth/)

## Descrição do Projeto:

O website "Around the U.S." é uma plataforma interativa que visa explorar e celebrar as diversas culturas, paisagens e histórias dos Estados Unidos. O projeto proporciona aos visitantes uma experiência imersiva, permitindo que compartilhem suas experiências, fotos e histórias relacionadas a diferentes regiões do país. O site apresenta uma interface amigável que incentiva a interação e a colaboração entre os usuários, transformando cada visita em uma jornada de descoberta cultural.

## Tecnologias e Técnicas utilizadas:

1. **React e JSX:** Criação de interfaces dinâmicas e intuitivas com componentes reutilizáveis.

2. **React Router:** Implementação de rotas protegidas e redirecionamento de usuários não autorizados.

3. **Autenticação de Usuário:** Registro, login e controle de acesso com armazenamento de token via `localStorage`.

4. **Componentes Personalizados:** Criação dos componentes `Login`, `Register`, `ProtectedRoute` e `InfoTooltip` para melhorar a usabilidade e segurança.

5. **Integração com API:** Comunicação com servidor para autenticação e manipulação de dados em tempo real.

6. **Gerenciamento de Estado com Hooks:** Uso de `useState` e `useEffect` para reatividade e controle de fluxo da aplicação.

7. **CSS Modularizado:** Estilos encapsulados para evitar conflitos entre classes.

8. **Responsividade:** Layout adaptado para diferentes dispositivos, incluindo versão mobile.

9. **SEO:** Boas práticas de otimização para motores de busca.

## Planos de Melhoria:

1. **Melhoria na Identidade Visual**

   - Adicionar elementos gráficos que representem visualmente as culturas e regiões dos EUA, como ícones temáticos, bandeiras estaduais, e mapas interativos.
   - Incluir tipografia personalizada e aprimorar o layout para fortalecer a identidade da marca.

2. **Facilitar o Compartilhamento em Redes Sociais**

   - Integrar botões de compartilhamento direto para redes sociais como Facebook, X (Twitter), Instagram e WhatsApp.
   - Gerar links únicos e imagens de pré-visualização ao compartilhar histórias ou postagens.
   - Adicionar um recurso de "Copiar link" para facilitar o envio manual.

3. **Adicionar Suporte a Múltiplos Idiomas**

   - Implementar internacionalização com suporte inicial para português e inglês.
   - Adicionar um seletor de idioma acessível no cabeçalho.
   - Armazenar a preferência de idioma do usuário no localStorage.

4. **Performance e Otimização**
   - Otimizar carregamento de imagens e uso de lazy loading.
   - Minificar arquivos CSS/JS e reduzir requisições HTTP.
   - Aplicar cache local para conteúdos estáticos e uso de CDN quando possível.
