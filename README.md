# JornadaDev — RPG Learning Platform

Uma plataforma de cursos gamificada com tema de RPG, inspirada em [Jornada Dev Herói](https://jornadadevheroi.com/).
O aprendiz escolhe um personagem (uma trilha de aprendizado) e percorre uma lista sequencial de módulos, desbloqueando o
próximo conforme conclui o anterior, ganhando XP, subindo de nível e forjando certificações ao completar a trilha.

Interface em **Português (BR)**. Construído com **React 18 + TypeScript + Vite 6 + Tailwind CSS**.

**17 trilhas** de carreira + **3 caminhos especiais**, cada um com arquétipo de fantasia/sci-fi e cor de destaque própria.

---

## Rodando o projeto

```bash
# 1. Clonar o projeto
git clone https://github.com/A4thu4/jornada-dev

# 2. Entrar no diretório
cd jornada-dev

# 3. Instalar dependências
npm i

# 4. rodar o projeto
npm run dev    # servidor de desenvolvimento (Vite)
npm run build  # build de produção em dist/
```

O build respeita a variável `BASE_PATH` (padrão `/`), usada pelo deploy no GitHub Pages.

---

## Project Structure

```cmd
src/
  main.tsx                       ← entrypoint React
  app/
    App.tsx                      ← raiz: estado de página ('select' | 'path') + personagem selecionado
    components/
      CharacterCard.tsx          ← card do personagem no carrossel (nome, arquétipo, ícone, accent)
      CharacterSelectPage.tsx    ← tela de seleção: carrossel de trilhas + caminhos especiais
      LearningPathPage.tsx       ← trilha selecionada: módulos, StatsBar, certificações, progresso
      ModuleCard.tsx             ← módulo individual (ícone, título, status, rating, link, concluir/desfazer)
      SpecialPathCard.tsx        ← cards dos caminhos especiais (Essenciais, Avançado, Matemática)
      StatsBar.tsx               ← barra de stats sob o header (Nível, Missões, Progresso, XP)
      shared/
        ImageWithFallback.tsx    ← <img> com fallback de erro
    data/
      tracks.ts                  ← todas as 17 trilhas + 3 caminhos especiais, módulos e certificações
  styles/
    fonts.css                    ← import das fontes Cinzel + Inter (Google Fonts)
    index.css / tailwind.css / theme.css
assets/                          ← artes de referência das trilhas (.png)
.github/workflows/deploy.yml     ← deploy automático no GitHub Pages (com Git LFS)
```

Estado e navegação vivem em `App.tsx` (sem router — troca de view por `useState`). O progresso de cada trilha é
persistido em `localStorage` na chave `jornada-dev:progress:{trackId}`.

---

## Learning Tracks

Cada trilha tem um personagem com arquétipo e cor de destaque (`accentColor` + `accentGlow`) únicos.
Cada uma traz de 6 a 11 módulos — do fundamento ao **Desafio Final** — mais uma lista de **certificações** reais
sugeridas, desbloqueadas ao concluir a trilha inteira.

As 17 trilhas de carreira são **sequenciais**: o próximo módulo só abre ao concluir o anterior. Os caminhos especiais
(Essenciais, Avançado e Matemática) são **livres**: dá para estudar na ordem que quiser, e cada módulo só trava
pelos seus `requires`, quando o conteúdo é de fato sequencial (ex.: Pré-Cálculo antes de Cálculo).

**Requisitos (`requires`):** lista de IDs de módulos, da mesma trilha ou de outra, que precisam estar concluídos.
Cada requisito aparece como chip no card; ao clicar, o site abre a trilha dona do módulo e rola até ele.

| Track            | Character Name           | Archetype             | Accent Color          |
|------------------|--------------------------|-----------------------|:----------------------|
| Back End         | Guardião do Servidor     | Cavaleiro Sombrio     | `#2196f3` Blue        |
| Front End        | Arquiteto Visual         | Mago da Luz           | `#18833c` Green       |
| Full Stack       | Lenda Completa           | Herói Lendário        | `#FDC333` Gold        |
| Cloud & DevOps   | Viajante das Nuvens      | Druida do Caos        | `#22D3EE` Cyan        |
| Data Science     | Oráculo dos Dados        | Vidente Arcano        | `#EE82EE` Violet      |
| IA               | Louco Artificial         | Golem Arcano          | `#4ADE80` Lime        |
| Mobile           | Viking dos Apps          | Andarilho Portátil    | `#813B10` Brown       |
| GameDev          | Criador de Mundos        | Demiurgo Digital      | `#F87171` Red         |
| 3D Modeling      | Escultor de Realidades   | Artífice Dimensional  | `#500101` Dark Red    |
| Hacking          | Sombra Digital           | Assassino Cibernético | `#8B5CF6` Purple      |
| CyberSec         | Guardião da Fortaleza    | Sentinela Vigilante   | `#c542f6` Lilac       |
| UI/UX            | Escultor de Experiências | Artesão Élfico        | `#E91E63` Pink        |
| QA               | Caçador de Bugs          | Detetive Implacável   | `#FACC15` Yellow      |
| Data Engineering | Construtor de Pipelines  | Ferreiro de Dados     | `#B45309` Bronze      |
| Embedded Systems | Espírito do Hardware     | Mecânico Arcano       | `#94A3B8` Steel       |
| Automações       | Maestro das Máquinas     | Conjurador de Scripts | `#2DD4BF` Teal        |
| Blockchain       | Guardião do Ledger       | Monge Criptográfico   | `#F97316` Amber       |

### Caminhos Especiais

Exibidos abaixo do carrossel — trilhas transversais que não pertencem a uma stack específica:

| Path       | Character Name       | Accent Color         | Foco                                          |
|------------|----------------------|:---------------------|-----------------------------------------------|
| Essenciais | Arcanjo dos Códigos  | `#00FF98` Neon Green | A base que todo dev precisa dominar           |
| Avançado   | Demônio dos Códigos  | `#D92639` Crimson    | Arquitetura, performance e engenharia sênior  |
| Matemática | Sábio dos Números    | `#1497b1` Teal-Cyan  | A matemática e os algoritmos do programador   |

---

## Design

- **Fundo:** gradiente `#060B1A → #0A1428 → #060B1A` (deep navy-black)
- **Cards / painéis:** `rgba(13,21,38,0.9)` com borda `rgba(255,255,255,0.08–0.1)`
- **Accent por trilha:** cada personagem define `accentColor` + `accentGlow`, aplicados em botões, barras e no
  glow (`box-shadow`) do módulo em destaque
- **Título:** gradiente `linear-gradient(135deg, #60A5FA, #A78BFA, #60A5FA)`
- **Tipografia:** `Cinzel` para títulos e `Inter` para corpo — ambas via Google Fonts em `src/styles/fonts.css`
- **Ícones:** `lucide-react` em todo o app
- **Status dos módulos:** badge no card — `Bloqueado`, `Disponível`, `Em Andamento` ou `✓ Concluído`,
  com o nó da timeline preenchido ao concluir
- **StatsBar:** Nível, Missões e Progresso como conjuntos de 5 dots que preenchem conforme a trilha avança; XP numérico

### Tipos de dados (`src/app/data/tracks.ts`)

```ts
type Character = {
  id: string
  name: string          // "Back End"
  title: string         // "Guardião do Servidor"
  archetype: string     // "Cavaleiro Sombrio"
  accentColor: string   // hex, ex. "#2196f3"
  accentGlow: string    // rgba usada no box-shadow
  icon: string          // nome do ícone lucide-react
  stats: { nivel: number; progresso: number; missoes: number; xp: number }
  modules: Module[]
  certificates?: Certificate[]
  sequential?: boolean  // false = módulos livres, travados só por `requires` (padrão: true)
}

type Module = {
  id: string
  title: string
  description: string
  icon: string
  rating: number        // 1–5
  lessonCount: number
  status: 'bloqueado' | 'disponível' | 'em-progresso' | 'concluído'
  link?: string         // material externo do módulo
  book?: string         // livro (PDF local ou URL)
  requires?: string[]   // IDs de módulos que precisam estar concluídos antes
}

type Certificate = { title: string; issuer: string; link: string }

type SpecialPath = Character & { description: string; buttonLabel: string }
```

---

## Future Enhancements

- Autenticação de usuário e sincronização de progresso na nuvem
  *(hoje o progresso é salvo apenas localmente, via `localStorage`)*
- Backend para armazenar progresso, conclusão de módulos e histórico entre dispositivos
- Adicionar `Boss Tracks` — trilhas de graduação universitária (ex.: "Ciência da Computação", "ADS")
  - Referências ([GitHub Stars](https://github.com/A4thu4?tab=stars)):
    - [Computer Science](https://github.com/ossu/computer-science)
    - [ADS](https://github.com/Universidade-Livre/ciencia-da-computacao)
    - [Math](https://github.com/Universidade-Livre/matematica)
- Trazer a pasta de favoritos `Estudos` para dentro da plataforma
