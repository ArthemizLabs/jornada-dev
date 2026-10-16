export type ModuleStatus = 'bloqueado' | 'disponível' | 'em-progresso' | 'concluído';

export interface Module {
	id: string;
	title: string;
	description: string;
	icon: string;
	rating: number;
	lessonCount: number;
	status: ModuleStatus;
	link?: string;
	book?: string;
	/** IDs de módulos de outras trilhas que precisam estar concluídos antes deste. */
	requires?: string[];
}

export interface Certificate {
	title: string;
	issuer: string;
	link?: string;
}

export interface Character {
	id: string;
	name: string;
	title: string;
	archetype: string;
	accentColor: string;
	accentGlow: string;
	icon: string;
	stats: { nivel: number; progresso: number; missoes: number; xp: number };
	modules: Module[];
	certificates?: Certificate[];
}

export interface SpecialPath extends Character {
	description: string;
	buttonLabel: string;
}

const makeModules = (prefix: string, titles: {
	title: string;
	description: string;
	icon: string;
	link?: string;
	book?: string;
	rating: number;
	lessonCount?: number;
	requires?: string[];
}[]): Module[] =>
	titles.map((m, i) => ({
		id: `${prefix}-${i + 1}`,
		title: m.title,
		description: m.description,
		icon: m.icon,
		link: m.link,
		book: m.book,
		requires: m.requires,
		rating: m.rating ? m.rating : Math.floor(Math.random() * 2) + 2,
		lessonCount: m.lessonCount ? m.lessonCount : Math.floor(Math.random() * 8) + 6,
		status: i === 0 ? 'disponível' : 'bloqueado',
	}));

export const tracks: Character[] = [
	{
		id: 'backend',
		name: 'Back End',
		title: 'Guardião do Servidor',
		archetype: 'Cavaleiro Sombrio',
		accentColor: '#2196f3',
		accentGlow: 'rgba(0,191,255,0.25)',
		icon: 'Code',
		stats: { nivel: 1, missoes: 2, progresso: 4, xp: 1200 },
		certificates: [
			{ title: 'Oracle Certified Professional: Java SE 17 ou 21 Developer (1Z0-829)', issuer: 'Oracle', link: 'https://mylearn.oracle.com/ou/learning-path/become-a-java-se-17-developer/99487' },
			{ title: 'Spring Certified Professional', issuer: 'Broadcom (VMware)', link: 'https://spring.academy/paths/spring-certified-professional-2023' },
			{ title: 'Oracle Database SQL (1Z0-071)', issuer: 'Oracle', link: 'https://mylearn.oracle.com/ou/learning-path/earn-the-oracle-database-sql-associate-credential/80636' },
		],
		modules: makeModules('be', [
			{ requires: ['es-1', 'es-2', 'es-3'], title: 'Java Firme & JVM', description: 'POO, coleções, generics e tratamento de exceções em Java', icon: 'Code', link: 'https://www.youtube.com/playlist?list=PL62G310vn6nFIsOCC0H-C2infYgwm8SWW', book: '/docs/backend/effective_java.pdf', rating: 2, lessonCount: 0  },
			{ title: 'Arquitetura & Clean Code', description: 'Padrões de projeto GoF e MVC, Clean Architecture e princípios SOLID na prática', icon: 'Layers', link: 'https://www.youtube.com/playlist?list=PLNCSWIsR6ADL_qsxAayXkSzzCCf2xlIy9', book: '/docs/backend/clean_architecture.pdf', rating: 2, lessonCount: 0 },
			{ title: 'Banco de Dados', description: 'SQL, NoSQL, modelagem relacional e otimização de queries', icon: 'Database', link: 'https://www.youtube.com/playlist?list=PLbIBj8vQhvm2WT-pjGS5x7zUzmh4VgvRk', book: '/docs/backend/database_system_concepts.pdf', rating: 3, lessonCount: 1 },
			{ requires: ['es-7'], title: 'APIs REST', description: 'Design, construção e documentação de APIs HTTP modernas', icon: 'Globe', link: 'https://www.youtube.com/playlist?list=PLf8x7B3nFTl17WeEVj405tHlstiq1kNBX', book: '/docs/backend/rest_in_practice.pdf', rating: 3, lessonCount: 1 },
			{ title: 'Testes Automatizados', description: 'TDD, testes unitários, mocks e testes de integração usando JUnit e Mockito.', icon: 'CheckCircle', link: 'https://www.youtube.com/watch?v=Geq60OVyBPg',  book: '/docs/backend/td_development.pdf', rating: 4, lessonCount: 1 },
			{ title: 'Ecossistema Spring Boot', description: 'Framework Java para APIs robustas, escaláveis e prontas para produção', icon: 'FileCode', link: 'https://www.youtube.com/playlist?list=PL62G310vn6nFBIxp6ZwGnm8xMcGE3VA5H', book: '/docs/backend/spring_action.pdf', rating: 4, lessonCount: 1 },
			{ title: 'Autenticação & Segurança', description: 'JWT, OAuth2, HTTPS e boas práticas de segurança em APIs', icon: 'Lock', link: 'https://docs.spring.io/spring-security/reference/index.html', book: '/docs/backend/oauth_2_action.pdf',rating: 4, lessonCount: 1 },
			{ title: 'Microsserviços e Mensageria', description: 'Arquitetura distribuída, mensageria com RabbitMQ/Kafka e orquestração', icon: 'Network', link: 'https://www.youtube.com/playlist?list=PL5aY_NrL1rjt_AZxj11kQjiTNLGg4ZaZA', book: '/docs/backend/building_microservices.pdf', rating: 4, lessonCount: 1},
			{ title: 'Desafio Final: Sistema API Completa', description: 'Construa uma API conteinerizada do zero ao deploy com autenticação, testes e CI/CD.', icon: 'Trophy', book: '/docs/backend/release_it.pdf', rating: 5, lessonCount: 1 },
		]),
	},
	{
		id: 'frontend',
		name: 'Front End',
		title: 'Arquiteto Visual',
		archetype: 'Mago da Luz',
		accentColor: '#18833c',
		accentGlow: 'rgb(24 131 60 / 0.25)',
		icon: 'Monitor',
		stats: { nivel: 1, missoes: 2, progresso: 4, xp: 1200 },
		certificates: [
			{ title: 'Meta Front-End Developer', issuer: 'Meta / Coursera', link: 'https://www.coursera.org/professional-certificates/meta-front-end-developer' },
			{ title: 'JavaScript Algorithms and Data Structures', issuer: 'freeCodeCamp', link: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/' },
		],
		modules: makeModules('fe', [
			{ title: 'HTML5', description: 'Estrutura semântica e estilização de páginas web do zero, DOM, acessibilidade (A11y), SEO técnico', icon: 'Layout', link: 'https://www.cursoemvideo.com/curso/html5-css3-modulo1/', book: '/docs/frontend/html_definitive.pdf', rating: 1 },
			{ title: 'CSS3', description: 'Flexbox, Grid, Variáveis CSS, Box Model e arquitetura CSS', icon: 'Palette', link: 'https://www.cursoemvideo.com/curso/html5-css3-modulo1/', book: '/docs/frontend/css_definitive.pdf', rating: 1 },
			{ requires: ['es-1'], title: 'JavaScript', description: 'ES6+, assincronismo, closures e manipulação do DOM', icon: 'Zap', link: 'https://www.youtube.com/playlist?list=PLnDvRpP8BneysKU8KivhnrVaKpILD3gZ6', book: '/docs/frontend/js_definitive.pdf', rating: 2 },
			{ title: 'TypeScript', description: 'Tipagem estática, interfaces, generics e integração com projetos reais', icon: 'Type', link: 'https://www.youtube.com/playlist?list=PL9tY_tDo_Q0DOAzTaPnWYsryfNLsz1K6U', book: '/docs/essentials/programming_typescript.pdf', rating: 3 },
			{ title: 'React & Componentes', description: 'Criação de interfaces reativas com hooks, context e estado', icon: 'AtomIcon', link: 'https://www.youtube.com/playlist?list=PLnDvRpP8BneyVA0SZ2okm-QBojomniQVO', book: '/docs/frontend/learning_react.pdf', rating: 3 },
			{ title: 'Performance & Otimização', description: 'Web Vitals, lazy loading, code splitting e bundle size', icon: 'Gauge', link: 'https://web.dev/learn/performance/', book: '/docs/frontend/high_performance_browser_networking.pdf', rating: 4 },
			{ title: 'Testes de Interface (E2E)', description: 'Jest, Testing Library, Cypress e estratégias de cobertura', icon: 'CheckCircle', link: 'https://www.youtube.com/playlist?list=PLRVYQGMz5x2Y4NhqFI48usszCOtfPELM2', book: '/docs/frontend/testing_js.pdf', rating: 4 },
			{ title: 'Desafio Final: Dashboard Complexo', description: 'Consumir uma API real, gerenciar estado global, aplicar testes E2E e deploy vercel/netlifly.', icon: 'Trophy', rating: 5 },
		]),
	},
	{
		id: 'fullstack',
		name: 'Full Stack',
		title: 'Lenda Completa',
		archetype: 'Herói Lendário',
		accentColor: '#FDC333',
		accentGlow: 'rgba(245,158,11,0.25)',
		icon: 'Layers',
		stats: { nivel: 1, missoes: 2, progresso: 4, xp: 1200 },
		certificates: [
			{ title: 'IBM Full Stack Software Developer', issuer: 'IBM / Coursera', link: 'https://www.coursera.org/professional-certificates/ibm-full-stack-cloud-developer' },
			{ title: 'AWS Certified Developer – Associate', issuer: 'AWS', link: 'https://aws.amazon.com/certification/certified-developer-associate/' },
		],
		modules: makeModules('fs', [
			{ requires: ['be-4', 'fe-5'], title: 'Persistência & Modelagem com ORMs', description: 'Modelagem relacional e não-relacional integrada ao Node.js usando Prisma ORM ou Mongoose. Migrations na prática.', icon: 'Database', link: 'https://www.youtube.com/playlist?list=PLfvOpw8k80WpKTtloa7fMbfPWL7D6X5cC', book: '/docs/fullstack/node_databases.pdf', rating: 1 },
			{ title: 'Back End com Node.js', description: 'APIs com Express, banco de dados, validação de dados (Zod) e autenticação JWT', icon: 'Code', link: 'https://www.youtube.com/playlist?list=PLJ_KhUnlXUPtbtLwaxxUxHqvcNQndmI4B', book: '/docs/fullstack/production_ready_node.pdf', rating: 2 },
			{ title: 'Front End com React', description: 'Criação da SPA (Single Page Application), interfaces modernas, reativas e responsivas com React', icon: 'Monitor', link: 'https://www.youtube.com/playlist?list=PL45Hr6NzteIJQyvk6v0T78Ye8IsGm0mYS', book: '/docs/frontend/learning_react.pdf', rating: 2 },
			{ title: 'Autenticação & Sessões', description: 'JWT, refresh tokens, cookies e segurança end-to-end', icon: 'Lock', link: 'https://www.youtube.com/watch?v=QOGnkj3T_q0', book: '/docs/fullstack/web_security_testing.pdf', rating: 3 },
			{ title: 'Arquitetura Full Stack', description: 'Monólitos modernos vs Decoupled Applications. SSR (Server-Side Rendering) e introdução a frameworks como Next.js.', icon: 'Layers', link: 'https://www.youtube.com/watch?v=Nzeya0Utfrg', book: '/docs/fullstack/architecture_patterns.pdf', rating: 3 },
			{ title: 'DevOps & Cloud & Deploy Estratégico', description: 'CI/CD com GitHub Actions, Docker e deploy de banco de dados gerenciado, hospedagem de APIs (Render/Railway), storage de arquivos (S3) e CDN.', icon: 'Cloud', link: 'https://www.youtube.com/watch?v=n_yZB0ZrsxU', book: '/docs/fullstack/architecting_for_scale.pdf', rating: 4 },
			{ title: 'Desafio Final: SaaS Mínimo Viável (MVP)', description: 'Construa, teste, conteinerize e publique um produto digital funcional com sistema de login, banco de dados e persistência real.', icon: 'Trophy', rating: 5 },
		]),
	},
	{
		id: 'cloudops',
		name: 'Cloud & DevOps',
		title: 'Viajante das Nuvens',
		archetype: 'Druida do Caos',
		accentColor: '#22D3EE',
		accentGlow: 'rgba(34,211,238,0.25)',
		icon: 'Cloud',
		stats: { nivel: 1, missoes: 2, progresso: 4, xp: 1200 },
		certificates: [
			{ title: 'AWS Certified Cloud Practitioner (CLF-C02)', issuer: 'AWS', link: 'https://aws.amazon.com/certification/certified-cloud-practitioner/' },
			{ title: 'AWS Certified Solutions Architect – Associate (SAA-C03)', issuer: 'AWS', link: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/' },
			{ title: 'AWS Certified Solutions Architect – Professional', issuer: 'AWS', link: 'https://aws.amazon.com/certification/certified-solutions-architect-professional/' },
			{ title: 'HashiCorp Certified: Terraform Associate', issuer: 'HashiCorp', link: 'https://www.hashicorp.com/certification/terraform-associate' },
			{ title: 'CKA – Certified Kubernetes Administrator', issuer: 'CNCF', link: 'https://www.cncf.io/training/certification/cka/' },
		],
		modules: makeModules('cd', [
			{ requires: ['es-4', 'es-8'], title: 'Fundamentos de Cloud', description: 'IaaS, PaaS, SaaS, IAM, VPC e modelos de responsabilidade e precificação', icon: 'Shield', link: 'https://skillbuilder.aws/learning-plan/8UUCEZGNX4/exam-prep-plan-aws-certified-cloud-practitioner-clfc02--portugus/1FKNHGZFR3', book: '/docs/cloud/aws_certified_cloud.pdf', rating: 1 },
			{ title: 'GO', description: 'A linguagem Go para serviços cloud-native, alta performance e concorrência', icon: 'Code', link: 'https://www.youtube.com/playlist?list=PLCKpcjBB_VlBsxJ9IseNxFllf-UFEXOdg', book: '/docs/cloud/learning_go.pdf', rating: 2 },
			{ title: 'AWS Essentials', description: 'EC2, S3, RDS, Lambda e os serviços core da AWS na prática', icon: 'Cloud', link: 'https://www.youtube.com/playlist?list=PL62G310vn6nHwfC31Q2hqh-3nO-6Rceyd', book: '/docs/cloud/aws_architecture.pdf', rating: 3 },
			{ title: 'Infraestrutura como Código', description: 'Terraform e CloudFormation para provisionamento automatizado', icon: 'FileCode', link: 'https://www.youtube.com/playlist?list=PLWQmZVQayUUIgSmOj3GPH2BJcn0hOzIaP', book: '/docs/cloud/terraform_up_running.pdf', rating: 4 },
			{ title: 'Orquestração & Kubernetes', description: 'Docker, orquestração com Kubernetes, K8s, Pods, Deployments, Services, Helm e Service Mesh.', icon: 'Box', link: 'https://www.youtube.com/playlist?list=PLnOICPAPShyTwuLit7vP6In9kETQ0BSnQ', book: '/docs/cloud/kubernetes_up_running.pdf', rating: 3 },
			{ title: 'Observabilidade & Engenharia de Confiabilidade', description: 'Monitoramento preditivo e coleta de métricas com Prometheus, Grafana e logs estruturados.', icon: 'Activity', link: 'https://grafana.com/docs/grafana/latest/fundamentals/getting-started/', book: '/docs/cloud/observability_engineering.pdf', rating: 4 },
			{ title: 'Desafio Final: Arquitetura Cloud', description: 'Provisione uma infraestrutura AWS via Terraform através de uma esteira Git, deploy de uma API em Go num cluster K8s e exponha as métricas no Grafana.', icon: 'Trophy', rating: 5 },
		]),
	},
	{
		id: 'datascience',
		name: 'Data Science',
		title: 'Oráculo dos Dados',
		archetype: 'Vidente Arcano',
		accentColor: '#EE82EE',
		accentGlow: 'rgb(238 130 238 / 0.25)',
		icon: 'BarChart2',
		stats: { nivel: 1, missoes: 2, progresso: 4, xp: 1200 },
		certificates: [
			{ title: 'CS50\'s Introduction to Databases with SQL', issuer: 'Harvard', link: 'https://learning.edx.org/course/course-v1:HarvardX+CS50SQL+SQL/home' },
			{ title: 'Microsoft Azure Data Fundamentals (DP-900)', issuer: 'Microsoft', link: 'https://learn.microsoft.com/credentials/certifications/azure-data-fundamentals/' },
			{ title: 'Google Data Analytics', issuer: 'Google / Coursera', link: 'https://www.coursera.org/professional-certificates/google-data-analytics' },
		],
		modules: makeModules('ds', [
			{ requires: ['es-1'], title: 'Python para Data Science', description: 'NumPy, Pandas e análise exploratória de dados na prática', icon: 'Code', link: 'https://www.youtube.com/playlist?list=PLvE-ZAFRgX8hnECDn1v9HNTI71veL3oW0', book: '/docs/datascience/python_data_analysis.pdf', rating: 2 },
			{ title: 'Visualização de Dados', description: 'Construção de gráficos estáticos e interativos usando Matplotlib, Seaborn, Plotly e storytelling com dados', icon: 'BarChart2', link: 'https://plotly.com/python/', book: '/docs/datascience/storytelling_with_data.pdf', rating: 2 },
			{ title: 'Estatística & Probabilidade', description: 'Cálculo de distribuições, probabilidade condicional, testes de hipótese, intervalos de confiança e inferência estatística.', icon: 'Calculator', link: 'https://www.youtube.com/playlist?list=PLjdDBZW3EmXe6hO2Rt5Q9I5wzRZ7j7K8P', book: '/docs/datascience/practical_statistics.pdf', rating: 2 },
			{ title: 'Bancos de Dados & SQL para Analistas', description: 'Modelagem e manipulação de grandes volumes de dados. Queries avançadas, joins complexos, subconsultas e agregações para extração de insights.', icon: 'Database', link: 'https://www.postgresql.org/docs/', book: '/docs/datascience/sql_for_data_analysis.pdf', rating: 2 },
			{ title: 'Power BI & Dashboards', description: 'Business intelligence, DAX e relatórios executivos interativos', icon: 'Table', link: 'https://www.youtube.com/playlist?list=PLFKhhNd35zq90tdc3PYpx4IA-SoxSNlmN', book: '/docs/datascience/definitive_guide_dax.pdf', rating: 3 },
			{ requires: ['mt-7'], title: 'Machine Learning com Scikit-Learn', description: 'Regressão, classificação, clustering e avaliação de modelos', icon: 'Brain', link: 'https://www.youtube.com/playlist?list=PL8PS-tykU-MiZtXZAYjfSW5-2WN4FwCGA', book: '/docs/datascience/hands_on_machine_learning.pdf', rating: 3 },
			{ title: 'Deep Learning Intro', description: 'Redes neurais, backpropagation e primeiros modelos com Keras', icon: 'Network', link: 'https://www.youtube.com/playlist?list=PLHz_AreHm4dm24MhlWJYiR_Rm7TFtvs6S',  book: '/docs/datascience/deep_learning_python.pdf', rating: 4 },
			{ title: 'NLP & Dados Não-Estruturados', description: 'Processamento de texto, embeddings e análise de sentimentos', icon: 'MessageSquare', link: 'https://www.youtube.com/playlist?list=PLQVvvaa0QuDf2JswnfiGkliBInZnIC4HL', book: '/docs/datascience/speech_and_language_processing.pdf', rating: 4 },
			{ requires: ['es-8', 'es-9'], title: 'MLOps & Modelos em Produção', description: 'Ciclo de vida de modelos: versionamento de dados e modelos com DVC, rastreio de experimentos e model registry com MLflow, serving com FastAPI, CI/CD de ML e monitoramento de drift.', icon: 'Activity', link: 'https://www.youtube.com/watch?v=w71RHxAWxaM', book: 'https://services.google.com/fh/files/misc/practitioners_guide_to_mlops_whitepaper.pdf', rating: 4 },
			{ title: 'Desafio Final: Modelo em Produção', description: 'Treine um modelo preditivo robusto, exponha por API , empacote em Docker e publique um dashboard interativo para consumo final.', icon: 'Trophy', rating: 5 },
		]),
	},
	{
		id: 'ia',
		name: 'IA',
		title: 'Louco Artificial',
		archetype: 'Golem Arcano',
		accentColor: '#4ADE80',
		accentGlow: 'rgba(74,222,128,0.25)',
		icon: 'Brain',
		stats: { nivel: 1, missoes: 2, progresso: 4, xp: 1200 },
		certificates: [
			{ title: 'CS50\'s Introduction to Artificial Intelligence with Python', issuer: 'Harvard', link: 'https://learning.edx.org/course/course-v1:HarvardX+CS50AI+1T2020/home' },
			{ title: 'AWS Certified AI Practitioner', issuer: 'AWS', link: 'https://aws.amazon.com/certification/certified-ai-practitioner/' },
			{ title: 'DeepLearning.AI TensorFlow Developer', issuer: 'DeepLearning.AI / Coursera', link: 'https://www.coursera.org/professional-certificates/tensorflow-in-practice' },
		],
		modules: makeModules('ia', [
			{ requires: ['es-1'], title: 'Fundamentos de IA', description: 'História, conceitos, limites computacionais, arquiteturas baseadas em agentes e ética no desenvolvimento de modelos.', icon: 'Brain', link: 'https://www.youtube.com/playlist?list=PLHz_AreHm4dm24MhlWJYiR_Rm7TFtvs6S', book: '/docs/ia/artificial_intelligence_modern_approach.pdf', rating: 1 },
			{ requires: ['ds-6', 'mt-6'], title: 'Machine Learning', description: 'Matrizes conceituais de aprendizado supervisionado e não supervisionado. Otimização por gradiente descendente, funções de custo e (overfitting) e validação cruzada', icon: 'GitBranch', link: 'https://www.youtube.com/playlist?list=PL-t7zzWJWPtzhZtI-bWWHFtCfxtjmBdIW', book: '/docs/ia/mathematics_for_machine_learning.pdf', rating: 3 },
			{ title: 'Arquiteturas de Deep Learning', description: 'Redes Neurais Convolucionais (CNNs) para imagens e Redes Recorrentes (RNNs/LSTMs) para sequências. Engenharia de tensores e treinamento com PyTorch.', icon: 'Network', link: 'https://www.youtube.com/watch?v=V_xro1bcAuA', book: '/docs/ia/deep_learning_book.pdf', rating: 3 },
			{ title: 'A Revolução dos Transformers & LLMs', description: 'Entendimento profundo do mecanismo de Atenção (Self-Attention), codificadores, decodificadores e a arquitetura que originou os modelos GPT, Claude e Llama.', icon: 'Cpu', link: 'https://huggingface.co/docs/transformers/index', book: '/docs/ia/transformers_natural_language_processing.pdf', rating: 3 },
			{ title: 'Engenharia de Prompts Avançada', description: 'Técnicas de direcionamento de contexto para LLMs corporativos: Few-Shot prompting, Chain-of-Thought (CoT), ReAct e estruturação de saídas em formatos rígidos (JSON Schema).', icon: 'MessageSquare', link: 'https://www.promptingguide.ai/pt', book: '/docs/ia/prompt_engineering_for_developers.pdf', rating: 3 },
			{ title: 'Sistemas RAG & Bancos de Dados Vetoriais', description: 'Geração Aumentada de Recuperação (RAG). Geração de embeddings textuais, chunking estratégico de documentos e indexação em bancos vetoriais como Pinecone, ChromaDB ou Milvus.', icon: 'Database', link: 'https://python.langchain.com/v0.2/docs/concepts/#retrieval', book: '/docs/ia/rag_in_action.pdf', rating: 4 },
			{ title: 'Orquestração de Agentes Autônomos', description: 'Desenvolvimento de ecossistemas multi-agentes com memória, ferramentas de execução e tomada de decisão utilizando os frameworks LangChain e CrewAI.', icon: 'Bot', link: 'https://docs.crewai.com/', book: '/docs/ia/building_ai_agents.pdf', rating: 4 },
			{ title: 'Técnicas de Fine-Tuning & Customização', description: 'Ajuste fino de modelos abertos. Aplicação de técnicas de eficiência de memória como LoRA e QLoRA para adaptar LLMs a domínios de dados altamente específicos.', icon: 'Sliders', link: 'https://huggingface.co/docs/peft/index', book: '/docs/ia/fine_tuning_llms.pdf', rating: 4 },
			{ title: 'Visão Computacional', description: 'Processamento de imagens e vídeo com OpenCV, detecção de objetos em tempo real com YOLO, segmentação e avaliação de modelos (IoU, mAP).', icon: 'Eye', link: 'https://docs.ultralytics.com/', book: '/docs/ia/computer_vision_models.pdf', rating: 4 },
			{ title: 'Sistemas Multimodais Generativos', description: 'Processamento integrado de múltiplos tipos de dados. Geração de imagens com Diffusion Models e transcrição Speech-to-Text com Whisper.', icon: 'Layers', link: 'https://huggingface.co/docs/diffusers/index', rating: 4 },
			{ title: 'Desafio Final: Sistema Multi-Agente em Produção', description: 'Projete e publique uma aplicação fim-a-fim. O sistema deve utilizar uma arquitetura multi-agente orquestrada com CrewAI/LangChain, consumir documentos privados via pipeline RAG com banco vetorial e disponibilizar uma interface limpa e reativa para o usuário.', icon: 'Trophy', rating: 5 },
		]),
	},
	{
		id: 'mobile',
		name: 'Mobile',
		title: 'Viking dos Apps',
		archetype: 'Andarilho Portátil',
		accentColor: '#813B10',
		accentGlow: 'rgb(129 59 16 / 0.25)',
		icon: 'Monitor',
		stats: { nivel: 1, missoes: 2, progresso: 4, xp: 1200 },
		certificates: [
			{ title: 'Meta Android Developer', issuer: 'Meta / Coursera', link: 'https://www.coursera.org/professional-certificates/meta-android-developer' },
		],
		modules: makeModules('mb', [
			{ requires: ['es-1'], title: 'Fundamentos de Desenvolvimento Mobile', description: 'Ciclo de vida da aplicação, gerenciamento de estados, princípios de navegação estável e padrões fundamentais de UI/UX para dispositivos portáteis.', icon: 'Smartphone', link: 'https://www.youtube.com/playlist?list=PL50rZONmv8ZRsWj0L3rvSicPSEJl6sQ40', book: '/docs/mobile/android_programming_guide.pdf', rating: 1 },
			{ title: 'Kotlin Essencial & Programação Funcional', description: 'Sintaxe moderna do Kotlin, tipos de dados, null safety estrito, lambdas, escopos de funções e os pilares da linguagem para o desenvolvimento Android.', icon: 'Code', link: 'https://www.youtube.com/playlist?list=PLRHt7FXZbVCSExTvJ6_qTrt_K8NsL0l6N', book: '/docs/mobile/kotlin_in_action.pdf', rating: 2 },
			{ title: 'Arquitetura de UI Moderna com Jetpack Compose', description: 'Construção de interfaces declarativas baseadas em funções compostas, gerenciamento de temas dinâmicos, modificadores de layout e animações nativas.', icon: 'Layout', link: 'https://www.youtube.com/playlist?list=PLizN3WA8HR1yvdN7FcfYYc2zAvdAAgel6', book: '/docs/mobile/jetpack_compose_by_tutorials.pdf', rating: 3 },
			{ title: 'Gerenciamento de Estado Avançado', description: 'Implementação do padrão de arquitetura MVVM, uso prático de StateFlow, SharedFlow e delegação de estados para garantir telas reativas e desacopladas.', icon: 'Sliders', link: 'https://developer.android.com/topic/architecture/ui-state/state-holder', book: '/docs/mobile/clean_architecture_android.pdf', rating: 3 },
			{ title: 'Concorrência e Assincronismo com Coroutines', description: 'Manipulação de threads em background com Kotlin Coroutines, gerenciamento de contextos computacionais (Dispatchers) e manipulação de fluxos reativos com Flows.', icon: 'Cpu', link: 'https://kotlinlang.org/docs/coroutines-overview.html', book: '/docs/mobile/kotlin_coroutines_by_tutorials.pdf', rating: 3 },
			{ title: 'Persistência de Dados Local com Room', description: 'Criação de bancos de dados locais usando SQLite mascarado pelo framework Room. Mapeamento de entidades, escrita de DAOs estruturados e migrações de esquemas.', icon: 'Database', link: 'https://developer.android.com/training/data-storage/room', book: '/docs/mobile/android_database_persistence.pdf', rating: 3 },
			{ title: 'Consumo de APIs HTTP com Retrofit & Serialization', description: 'Integração com serviços externos e microsserviços. Configuração do cliente HTTP OkHttp, parsing de payloads JSON estruturados e tratamento robusto de erros de rede.', icon: 'Globe', link: 'https://square.github.io/retrofit/', book: '/docs/mobile/android_networking_solutions.pdf', rating: 4 },
			{ title: 'Injeção de Dependências com Hilt', description: 'Desacoplamento completo de componentes de software. Configuração do ecossistema Hilt/Dagger para provimento automático de instâncias de repositórios, storages e ViewModels.', icon: 'Link', link: 'https://developer.android.com/training/dependency-injection/hilt-android', book: '/docs/mobile/dependency_injection_in_android.pdf', rating: 4 },
			{ title: 'Push Notifications, Serviços & Firebase', description: 'Implementação de notificações em tempo real com Firebase Cloud Messaging (FCM), execução de tarefas assíncronas em segundo plano com WorkManager e autenticação segura.', icon: 'Zap', link: 'https://www.youtube.com/playlist?list=PLizN3WA8HR1zcb5bX3Xq_eQ3h0ENJyQJ9', book: '/docs/mobile/firebase_android_apps.pdf', rating: 4 },
			{ title: 'Desafio Final: Publicação do Aplicativo Nativo', description: 'Assinatura digital do pacote de release (AAB), otimização de performance usando o R8/ProGuard, configuração de metadados e publicação na Google Play.', icon: 'Trophy', rating: 5 },
		]),
	},
	{
		id: 'gamedev',
		name: 'GameDev',
		title: 'Criador de Mundos',
		archetype: 'Demiurgo Digital',
		accentColor: '#F87171',
		accentGlow: 'rgb(248 113 113 / 0.25)',
		icon: 'Gamepad2',
		stats: { nivel: 1, missoes: 2, progresso: 4, xp: 1200 },
		certificates: [
			{ title: 'Unity Certified Associate: Game Developer', issuer: 'Unity', link: 'https://unity.com/products/unity-certifications/associate-game-developer' },
		],
		modules: makeModules('gd', [
			{ title: 'Fundamentos de Game Design', description: 'Mecânicas centrais, loops de gameplay, curvas de interesse, balanceamento matemático de regras e estruturação do Game Design Document (GDD).', icon: 'Gamepad2', link: 'https://gamedev.net/', book: '/docs/gamedev/art_of_game_design.pdf', rating: 1 },
			{ requires: ['es-1'], title: 'C# Essencial & Lógica para Jogos', description: 'Sintaxe do C# voltada para a Unity, tipos primitivos, estruturas condicionais, coleções genéricas e introdução à Orientação a Objetos aplicada.', icon: 'Code', link: 'https://www.youtube.com/playlist?list=PLEI5qdfLBErZuMSareAo-TLTFYU9hGDsR', book: '/docs/gamedev/learning_csharp_unity.pdf', rating: 1 },
			{ title: 'Unity & Manipulação do GameLoop', description: 'Ciclo de vida dos scripts (Awake, Start, Update, FixedUpdate), física básica (Rigidbodies, Colliders), gerenciamento de cenas e manipulação do transform.', icon: 'Box', link: 'https://www.youtube.com/playlist?list=PLARDsRa4d7UyZF3cf9tbp_6vN3M737DY2l', book: '/docs/gamedev/unity_in_action.pdf', rating: 2 },
			{ title: 'Desenvolvimento e Lógica de Jogos 2D', description: 'Manipulação de Spritesheets, sistemas de coordenadas bidimensionais, renderização via Tilemaps, criação de camadas de colisão e gerenciamento de inputs.', icon: 'Layout', link: 'https://www.youtube.com/playlist?list=PLciEA-M4VWn284pBB2e29Vo-MxlokLRx9', book: '/docs/gamedev/unity_2d_game_development.pdf', rating: 2 },
			{ title: 'Animação & Sistemas de Estado 2D', description: 'Criação de máquinas de estado usando o Mecanim, transições de animação baseadas em parâmetros lógicos e controle dinâmico de estados de personagens via código.', icon: 'Activity', link: 'https://docs.unity3d.com/Manual/AnimationSection.html', book: '/docs/gamedev/unity_animation_essentials.pdf', rating: 2 },
			{ title: 'Arquitetura de Código & Padrões de Projeto', description: 'Implementação de padrões arquiteturais essenciais para jogos: ScriptableObjects para dados, Singletons controlados, gerenciadores globais (GameManagers) e eventos.', icon: 'GitBranch', link: 'https://gameprogrammingpatterns.com/', book: '/docs/gamedev/game_programming_patterns.pdf', rating: 3 },
			{ title: 'Física 3D, Vetores & Programação Espacial', description: 'Matemática vetorial (Produto Escalar, Vetorial, Quaternions), transição para o espaço tridimensional, Raycasting avançado, iluminação e navegação com NavMesh.', icon: 'Layers', link: 'https://docs.unity3d.com/Manual/PhysicsSection.html', book: '/docs/gamedev/introduction_3d_game_programming.pdf', rating: 3 },
			{ title: 'Áudio Espacial & Engenharia de Shaders', description: 'Configuração de AudioMixers, efeitos sonoros dinâmicos (SFX), criação de efeitos visuais via Particle Systems e introdução a materiais customizados com Shader Graph.', icon: 'Music', link: 'https://docs.unity3d.com/Manual/ShaderGraph.html', book: '/docs/gamedev/unity_shading_effects.pdf', rating: 4 },
			{ title: 'Otimização, Build & Modelos de Negócio', description: 'Perfis de performance (Profiler), compressão de texturas, compilação cross-platform (PC/Mobile), integração com APIs de lojas e estratégias de monetização.', icon: 'Globe', link: 'https://unity.com/pt/solutions/game-monetization', book: '/docs/gamedev/monetizing_apps.pdf', rating: 4 },
			{ title: 'Desafio Final: Publicação do Jogo Autoral', description: 'Desenvolva um jogo completo aplicando os padrões arquiteturais estudados, exporte a build otimizada e publique o produto final na plataforma itch.io ou Steam.', icon: 'Trophy', rating: 5 },
		]),
	},
	{
		id: '3dmod',
		name: '3D Modeling',
		title: 'Escultor de Realidades',
		archetype: 'Artífice Dimensional',
		accentColor: '#500101',
		accentGlow: 'rgb(80 1 1 / 0.25)',
		icon: 'Box',
		stats: { nivel: 1, missoes: 2, progresso: 4, xp: 1200 },
		certificates: [
			{ title: 'Unity Certified Associate: 3D Artist', issuer: 'Unity', link: 'https://unity.com/products/unity-certifications/user-programmer' },
		],
		modules: makeModules('3d', [
			{ requires: ['mt-5'], title: 'Fundamentos de Espaço Vetorial & Geometria', description: 'Visão espacial, anatomia das malhas (vértices, arestas, faces), topologia de polígonos, projeções e navegação em viewports tridimensionais.', icon: 'Box', link: 'https://docs.blender.org/manual/en/latest/modeling/introduction.html', book: '/docs/3dmod/3d_modeling_fundamentals.pdf', rating: 1 },
			{ title: 'PixelArt & Sprites 2D para Jogos', description: 'Teoria das cores aplicada, design de paletas restritas, técnicas de dithering, criação de tilesets modulares e animação frame-a-frame de sprites.', icon: 'Layout', link: 'https://www.youtube.com/playlist?list=PLYOZqxNe79xIUDs_xpzpcvFIt0lR5bQ5C', book: '/docs/3dmod/pixel_art_handbook.pdf', rating: 2 },
			{ title: 'Blender Essencial & Fluxo Poligonal', description: 'Domínio da interface do Blender, ferramentas de manipulação direta (extrude, bevel, loop cut) e aplicação de modificadores não-destrutivos.', icon: 'Monitor', link: 'https://docs.blender.org/manual/en/latest/', book: '/docs/3dmod/blender_3d_basics.pdf', rating: 2 },
			{ title: 'Modelagem Hard Surface & Escultura', description: 'Técnicas de modelagem de superfícies rígidas (maquinários, cenários) e introdução aos pincéis de escultura digital para formas orgânicas complexas.', icon: 'Component', link: 'https://docs.blender.org/manual/en/latest/sculpt_paint/index.html', book: '/docs/3dmod/blender_secrets.pdf', rating: 3 },
			{ title: 'Mapeamento UV & Shaders PBR', description: 'Abertura de malhas tridimensionais (UV Unwrapping), costuras lógicas, minimização de distorções e criação de materiais baseados em física real (PBR).', icon: 'Layers', link: 'https://docs.blender.org/manual/en/latest/render/shader_nodes/index.html', book: '/docs/3dmod/shading_and_texturing.pdf', rating: 3 },
			{ title: 'Texturização Avançada com Substance Painter', description: 'Importação de malhas para o ecossistema Substance, pintura de canais base color, roughness, metallic e normal maps usando camadas e máscaras.', icon: 'Palette', link: 'https://substance3d.adobe.com/documentation/sp', book: 'https://experienceleague.adobe.com/en/docs/substance-3d-painter/using/home', rating: 3 },
			{ title: 'Iluminação Estética & Motores de Render', description: 'Configuração de luzes de três pontos, uso de mapas HDRI, comportamento físico da luz e diferenças arquiteturais entre os motores EEVEE e Cycles.', icon: 'Eye', link: 'https://docs.blender.org/manual/en/latest/render/index.html', book: '/docs/3dmod/blender_lighting_art.pdf', rating: 4 },
			{ title: 'Rigging & Deformação de Malhas (Skinning)', description: 'Construção de esqueletos digitais (Armatures), hierarquias de ossos, aplicação de restrições cinemáticas (IK/FK) e pintura de pesos de vértices.', icon: 'Activity', link: 'https://docs.blender.org/manual/en/latest/animation/index.html', book: '/docs/3dmod/rigging_character_animation.pdf', rating: 4 },
			{ title: 'Otimização de Game Assets & Baking', description: 'Redução de densidade poligonal (Retopologia/Low-poly), gerenciamento de draw calls e transferência de detalhes de alta resolução para mapas de normais.', icon: 'Gamepad2', link: 'https://docs.unity3d.com/Manual/CreatingArtifacts.html', book: '/docs/3dmod/game_asset_pipeline.pdf', rating: 4 },
			{ title: 'Desafio Final: Entrega do Personagem para o Motor', description: 'Desenvolva um personagem completo do zero, execute o mapeamento, a pintura PBR, monte o rig de movimentação e exporte o pacote otimizado pronto para game engines.', icon: 'Trophy', rating: 5 },
		]),
	},
	{
		id: 'hacking',
		name: 'Hacking',
		title: 'Sombra Digital',
		archetype: 'Assassino Cibernético',
		accentColor: '#8B5CF6',
		accentGlow: 'rgb(139 92 246 / 0.25)',
		icon: 'ShieldAlert',
		stats: { nivel: 1, missoes: 2, progresso: 4, xp: 1200 },
		certificates: [
			{ title: 'eJPT – Junior Penetration Tester', issuer: 'INE Security', link: 'https://security.ine.com/certifications/ejpt-certification/' },
			{ title: 'OSCP – Offensive Security Certified Professional', issuer: 'OffSec', link: 'https://www.offsec.com/courses/pen-200/' },
		],
		modules: makeModules('hk', [
			{ requires: ['es-4', 'es-5'], title: 'Linux para Hackers', description: 'Kali Linux, terminal avançado e ferramentas de segurança ofensiva', icon: 'Terminal', link: 'https://www.kali.org/docs/', book: '/docs/hacking/linux_basics_hackers.pdf', rating: 2 },
			{ title: 'Segurança & Vulnerabilidades Web', description: 'OWASP top 10, SQL Injection, XSS, CSRF, broken authentication e manipulação de requisições HTTP.', icon: 'Bug', link: 'https://portswigger.net/web-security', book: '/docs/hacking/web_application_hacker_handbook.pdf', rating: 3 },
			{ title: 'Pentest & Reconhecimento', description: 'OSINT, Nmap, Shodan e as fases de um pentest profissional', icon: 'Search', link: 'https://www.tryhackme.com/', book: '/docs/hacking/the_pentester_blueprint.pdf', rating: 3 },
			{ title: 'Varredura & Análise de Vulnerabilidades', description: 'Uso profissional de scanners automatizados como Nessus e OpenVAS. Análise, priorização e validação de relatórios de falhas técnicas.', icon: 'Eye', link: 'https://www.tenable.com/products/nessus/nessus-essentials', book: '/docs/hacking/vulnerability_assessment.pdf', rating: 3 },
			{ title: 'Exploração de Sistemas & Redes', description: 'Ganho de acesso inicial usando o framework Metasploit. Exploração de falhas de rede, quebra de senhas locais e engenharia de payloads.', icon: 'Zap', link: 'https://www.metasploit.com/', book: '/docs/hacking/metasploit_guide.pdf', rating: 4 },
			{ title: 'Engenharia Reversa', description: 'Análise estática e dinâmica de binários compilados, Assembly x86/x64, manipulação de memória com ferramentas de depuração e uso do Ghidra.', icon: 'Cpu', link: 'https://www.youtube.com/playlist?list=PLIfZMtpPYFP6zLKlnyAeWY1I85VpyshAA', book: '/docs/hacking/practical_malware_analysis.pdf', rating: 3 },
			{ title: 'Pivoting & Pós-Exploração', description: 'O que fazer após o *compromise*. Técnicas de persistência silenciosa, escalada de privilégios (Linux/Windows) e pivoting para redes internas.', icon: 'GitCommit', link: 'https://www.hackthebox.com/', book: '/docs/hacking/rtfm_red_team.pdf', rating: 5 },
			{ title: 'Desafio Final: CTF Challenge', description: 'Infiltre-se em uma infraestrutura vulnerável controlada, explore falhas sequenciais, faça escalada de privilégios e capture as flags.', icon: 'Trophy', rating: 5 },
		]),
	},
	{
		id: 'cybersec',
		name: 'CyberSec',
		title: 'Guardião da Fortaleza',
		archetype: 'Sentinela Vigilante',
		accentColor: '#c542f6',
		accentGlow: 'rgb(197 66 246 / 0.25)',
		icon: 'ShieldBan',
		stats: { nivel: 1, missoes: 2, progresso: 4, xp: 1200 },
		certificates: [
			{ title: 'CS50\'s Introduction to Cybersecurity', issuer: 'Harvard', link: 'https://learning.edx.org/course/course-v1:HarvardX+CS50CS+Cybersecurity/home' },
			{ title: 'CompTIA Security+', issuer: 'CompTIA', link: 'https://www.comptia.org/certifications/security' },
			{ title: 'ISC2 Certified in Cybersecurity (CC)', issuer: 'ISC2', link: 'https://www.isc2.org/certifications/cc' },
		],
		modules: makeModules('cs', [
			{ requires: ['es-4'], title: 'Intro a CyberSec', description: 'Fundamentos de segurança da informação, Confidencialidade, Integridade e Disponibilidade, vetores de ataque e engenharia social.', icon: 'Shield', link: 'https://www.edx.org/learn/cybersecurity/harvard-university-cs50-s-introduction-to-cybersecurity', book: '/docs/cybersec/introduction_to_cybersecurity.pdf', rating: 3 },
			{ title: 'LGPD', description: 'Conceitos da Lei Geral de Proteção de Dados aplicados à engenharia de software: anonimização, mascaramento de dados sensíveis e governança.', icon: 'ShieldBan', link: 'https://www.escolavirtual.gov.br/curso/603', book: '/docs/cybersec/lgpd.pdf', rating: 4 },
			{ title: 'Criptografia 1 & 2', description: 'Algoritmos de cifragem (AES e RSA), hashing, ataques a geradores de números pseudoaleatórios e quebra de hashes.', icon: 'Lock', link: 'https://www.youtube.com/playlist?list=PLB8Qk_jff08g', book: '/docs/cybersec/serious_cryptography.pdf', rating: 4 },
			{ title: 'Segurança em Aplicações (DevSecOps)', description: 'Alinhamento de segurança no ciclo de desenvolvimento (SDLC). Análise estática de código (SAST), análise dinâmica (DAST) e proteção de dependências',icon: 'Code',link: 'https://owasp.org/www-project-top-ten/', book: '/docs/cybersec/alice_and_bob_security.pdf', rating: 3 },
			{ title: 'Segurança Defensiva', description: 'SOC, SIEM, resposta a incidentes e hardening de sistemas', icon: 'Shield', link: 'https://www.youtube.com/playlist?list=PLucm8g_ezqNred_fII4GzZxMi91PKbney', book: '/docs/cybersec/blue_team_handbook.pdf', rating: 4 },
			{ title: 'Operações de SOC & Monitoramento', description: 'Análise de telemetria e gerenciamento de logs centrais usando ferramentas de SIEM (Elasticsearch/Wazuh). Criação de regras de detecção de anomalias.', icon: 'Activity', link: 'https://www.elastic.co/guide/index.html', book: '/docs/cybersec/security_operations_center.pdf', rating: 4 },
			{ title: 'Resposta a Incidentes & Forense Básica', description: 'Mitigação rápida de ameaças ativas, contenção de malware em execução, isolamento de rede e preservação de artefatos de memória para análise.', icon: 'AlertCircle', link: 'https://www.sans.org/blog/the-six-phases-of-incident-response', book: '/docs/cybersec/incident_response_field_guide.pdf', rating: 5},
			{ title: 'Python para Pentesters', description: 'Desenvolvimento de ferramentas de segurança ofensiva customizadas: scanners de portas, scripts de força bruta, banners grabbing e manipulação de pacotes com Scapy.', icon: 'Code', link: 'https://www.youtube.com/playlist?list=PLSVwmQp6yjLR6JlSFIQ7XyWVeO_IjLmM1', book: '/docs/cybersec/black_hat_python.pdf', rating: 3 },
			{ title: 'Desafio Final: Auditoria & Hardening', description: 'Receba uma infraestrutura vulnerável e mal configurada. Seu objetivo é fechar as portas de segurança, aplicar patches e mitigar riscos.', icon: 'Trophy', rating: 5 },
		]),
	},
	{
		id: 'ux',
		name: 'UI/UX',
		title: 'Escultor de Experiências',
		archetype: 'Artesão Élfico',
		accentColor: '#E91E63',
		accentGlow: 'rgb(233 30 99 / 0.25)',
		icon: 'Palette',
		stats: { nivel: 1, missoes: 2, progresso: 4, xp: 1200 },
		certificates: [
			{ title: 'Google UX Design', issuer: 'Google / Coursera', link: 'https://www.coursera.org/professional-certificates/google-ux-design' },
		],
		modules: makeModules('ux', [
			{ title: 'Fundamentos de Design & Heurísticas', description: 'Lei de Hick, Princípios da Gestalt, heurísticas de Nielsen e princípios visuais, tipografia, hierarquia e teoria das cores', icon: 'Palette', link: 'https://www.youtube.com/playlist?list=PLwgL9IEA0PxUl0eXSqqI_78rvlog15lHl', book: '/docs/ux/design_of_everyday_things.pdf', rating: 1 },
			{ title: 'UX Research & Discovery', description: 'Entrevistas, personas, mapas de empatia, Customer Journey Maps e validação de problemas.', icon: 'Users', link: 'https://www.youtube.com/playlist?list=PLwgL9IEA0PxVxs3z5_q0Sl4zV7YkM8AAH', book: '/docs/ux/lean_ux.pdf', rating: 2 },
			{ title: 'Figma Completo', description: 'Do wireframe ao protótipo interativo com componentes, auto-layout, estados, protótipos de alta fidelidade e design de interação', icon: 'FigmaIcon', link: 'https://www.youtube.com/playlist?list=PLwgL9IEA0PxXzmOu0crRl9l6PT46nqtI9',  book: '/docs/ux/thinking_with_type.pdf', rating: 3 },
			{ title: 'Design Systems & Tokens', description: 'Atomic Design, Tokens, componentes reutilizáveis e sistemas de design escaláveis', icon: 'Layers', link: 'https://www.youtube.com/playlist?list=PLIJwVnx284qpM1YJj1Chw0sc2i48p6h6K', book: '/docs/ux/design_systems_handbook.pdf', rating: 3 },
			{ title: 'Acessibilidade Digital (A11y) & Inclusão', description: 'WCAG, contraste, navegação por teclado e design para todos', icon: 'Eye', link: 'https://www.w3.org/WAI/fundamentals/', book: '/docs/ux/web_for_everyone.pdf', rating: 3 },
			{ title: 'Testes de Usabilidade & Métricas', description: 'Validação com usuários reais, métricas e iteração baseada em dados', icon: 'CheckCircle', link: 'https://www.youtube.com/watch?v=9dXiSBFZlv0&list=PLx_6W4OtI_rlAhqtupdWR3oKIe8fTyRaG&index=6', book: '/docs/ux/measuring_user_experience.pdf', rating: 4 },
			{ title: 'Arquitetura de Informação', description: 'User flows, sitemaps, taxonomia e lógica de navegação.', icon: 'Database', link: 'https://www.youtube.com/watch?v=1Cblxlfv1Os', book: '/docs/ux/information_architecture.pdf', rating: 5 },
			{ title: 'Desafio Final: App do Zero', description: 'Projete um app completo com pesquisa, wireframes e protótipo final', icon: 'Trophy', rating: 5 },
		]),
	},
	{
		id: 'qa',
		name: 'QA',
		title: 'Caçador de Bugs',
		archetype: 'Detetive Implacável',
		accentColor: '#FACC15',
		accentGlow: 'rgba(250,204,21,0.25)',
		icon: 'Bug',
		stats: { nivel: 1, missoes: 2, progresso: 4, xp: 1200 },
		certificates: [
			{ title: 'ISTQB Certified Tester Foundation Level (CTFL)', issuer: 'ISTQB', link: 'https://www.istqb.org/certifications/certified-tester-foundation-level' },
		],
		modules: makeModules('qa', [
			{ requires: ['es-1'], title: 'Fundamentos de Engenharia de Qualidade', description: 'Ciclo de vida de bugs (STLC), níveis e tipos de testes, mentalidade analítica de QA e os pilares de garantia de qualidade no ciclo de desenvolvimento de software.', icon: 'CheckCircle', link: 'https://www.youtube.com/playlist?list=PL0nYAInGtru1q0laP62tgjTWohsij782i', book: '/docs/qa/foundations_software_testing.pdf', rating: 1 },
			{ title: 'Testes Manuais & Engenharia de Casos', description: 'Design de cenários de teste, técnicas de caixa-preta, particionamento de equivalência, análise de valor limite e abertura de reports de falhas estruturados em ferramentas como Jira.', icon: 'ClipboardList', link: 'https://www.youtube.com/playlist?list=PL7NDvV6PnYODio6jp-dYLXPL8SQHzTJxy', book: '/docs/qa/software_testing_craft.pdf', rating: 2 },
			{ title: 'Testes Unitários & Estratégias de TDD', description: 'Criação de asserções, isolamento de escopo com Mocks/Stubs, conceitos de code coverage e aplicação prática do desenvolvimento orientado a testes (TDD).', icon: 'Code', link: 'https://www.youtube.com/watch?v=Azv3jxXkKeY', book: '/docs/qa/test_driven_development.pdf', rating: 2 },
			{ title: 'Testes de Integração & Arquitetura', description: 'Validação da comunicação entre componentes internos do sistema, persistência de dados em ambientes isolados e simulação de dependências externas via WireMock.', icon: 'GitBranch', link: 'https://www.wiremock.org/docs/', book: '/docs/qa/testing_software_architectures.pdf', rating: 3 },
			{ title: 'Automação de APIs & Testes de Contrato', description: 'Validação de payloads JSON/XML, códigos de status HTTP, testes de regressão de endpoints e validação de contratos de microsserviços usando Postman e frameworks de asserção.', icon: 'Globe', link: 'https://www.youtube.com/playlist?list=PLEqTHftpM91OzKYUkpaEuByhSpJYc90Hs', book: '/docs/qa/testing_web_apis.pdf', rating: 3 },
			{ title: 'Automação Front-End E2E com Cypress', description: 'Configuração do ecossistema Cypress, manipulação de elementos do DOM, comandos customizados, gravação de fixtures e estratégias de espera assíncrona estável.', icon: 'Zap', link: 'https://docs.cypress.io/guides/overview/why-cypress', book: '/docs/qa/web_testing_cypress.pdf', rating: 3 },
			{ title: 'Engenharia de Testes de Carga & Performance', description: 'Criação de scripts de estresse, simulação de picos de concorrência de usuários, medição de taxa de transferência e análise de gargalos computacionais usando o k6.', icon: 'Gauge', link: 'https://grafana.com/docs/k6/latest/', book: '/docs/qa/performance_testing_guidelines.pdf', rating: 4 },
			{ title: 'Segurança e Testes de Vulnerabilidade Automatizados', description: 'Introdução a testes de segurança funcionais, varreduras automatizadas na esteira e inserção de conceitos básicos de auditoria estática de código (SAST).', icon: 'Shield', link: 'https://owasp.org/www-project-zap/', book: '/docs/qa/security_testing_handbook.pdf', rating: 4 },
			{ title: 'Garantia de Qualidade Contínua (DevSecOps/QA)', description: 'Integração de baterias de testes automatizados em pipelines de CI/CD (GitHub Actions), geração de relatórios de execução e bloqueio de deploys falhos.', icon: 'RefreshCw', link: 'https://docs.github.com/en/actions', book: '/docs/qa/continuous_delivery.pdf', rating: 4 },
			{ title: 'Desafio Final: Automação da Esteira Corporativa', description: 'Projete e execute uma suíte de testes ponta-a-ponta para uma aplicação web real, cobrindo validações de banco de dados, contratos de API, UI reativa e simulação de carga pesada.', icon: 'Trophy', rating: 5 },
		]),
	},
	{
		id: 'dataeng',
		name: 'Data Engineering',
		title: 'Construtor de Pipelines',
		archetype: 'Ferreiro de Dados',
		accentColor: '#B45309',
		accentGlow: 'rgba(180,83,9,0.25)',
		icon: 'Database',
		stats: { nivel: 1, missoes: 2, progresso: 4, xp: 1200 },
		certificates: [
			{ title: 'Databricks Certified Data Engineer Associate', issuer: 'Databricks', link: 'https://www.databricks.com/learn/certification/data-engineer-associate' },
			{ title: 'Google Professional Data Engineer', issuer: 'Google Cloud', link: 'https://cloud.google.com/learn/certification/data-engineer' },
		],
		modules: makeModules('de', [
			{ requires: ['es-1'], title: 'Fundamentos & Arquiteturas de Dados', description: 'Evolução dos paradigmas de dados: do paradigma Batch ao Streaming. Conceituação e taxonomia de Data Lakes, Data Warehouses e a convergência para o Lakehouse.', icon: 'Database', link: 'https://www.youtube.com/playlist?list=PLs5wTEi6ddhBsgqe6Rs5NBb6rKc9y4tNW', book: '/docs/dataeng/fundamentals_data_engineering.pdf', rating: 2 },
			{ requires: ['ds-4'], title: 'SQL Avançado & Otimização Analítica', description: 'Domínio de Window Functions, Expressões de Tabela Comuns (CTEs), estratégias de particionamento, indexação e tunagem de queries complexas.', icon: 'Table', link: 'https://www.postgresql.org/docs/', book: '/docs/dataeng/sql_for_smarties.pdf', rating: 2 },
			{ title: 'Programação Reativa com Pandas & Ingestão', description: 'Scripts em Python para extração de dados estruturados e semi-estruturados (APIs, JSON, Parquet) e manipulação vetorial de alto desempenho com Pandas.', icon: 'Code', link: 'https://pandas.pydata.org/docs/', book: '/docs/dataeng/python_data_wrangling.pdf', rating: 3 },
			{ title: 'Docker & Infraestrutura para Engenharia de Dados', description: 'Isolamento de ambientes de dados. Configuração de redes internas, volumes persistentes e orquestração de múltiplos serviços locais (Postgres, MinIO) via Docker Compose.', icon: 'Component', link: 'https://docs.docker.com/', book: '/docs/dataeng/docker_for_data_science.pdf', rating: 3 },
			{ title: 'Orquestração de Workflows com Apache Airflow', description: 'Desenvolvimento de pipelines programáticos baseados em Grafos Acíclicos Dirigidos (DAGs). Agendamento controlado, gerenciamento de Tasks, XComs e monitoramento.', icon: 'GitBranch', link: 'https://airflow.apache.org/docs/', book: '/docs/dataeng/data_pipelines_with_airflow.pdf', rating: 3 },
			{ title: 'Processamento Distribuído com Apache Spark', description: 'Computação em larga escala (Big Data). Arquitetura de clusters (Driver/Workers), lazy evaluation, manipulação de DataFrames distribuídos e otimizações com PySpark.', icon: 'Zap', link: 'https://spark.apache.org/docs/latest/api/python/index.html', book: '/docs/dataeng/spark_definitive_guide.pdf', rating: 4 },
			{ title: 'Modern Data Warehouse & Cloud Storages', description: 'Armazenamento analítico na nuvem. Arquitetura massivamente paralela (MPP), organização de dados em camadas (Raw, Trusted, Refined) no BigQuery ou Snowflake.', icon: 'Layers', link: 'https://cloud.google.com/bigquery/docs', book: '/docs/dataeng/data_warehouse_toolkit.pdf', rating: 4 },
			{ title: 'Engenharia de Transformação com dbt', description: 'Aplicação de engenharia de software na camada de dados. Criação de modelos SQL modulares com dbt (Data Build Tool), testes de qualidade automatizados e linhagem do dado.', icon: 'RefreshCw', link: 'https://docs.getdbt.com/', book: '/docs/dataeng/analytics_engineering_dbt.pdf', rating: 4 },
			{ title: 'Streaming de Dados & Mensageria Computacional', description: 'Ingestão de dados em tempo real. Arquitetura baseada em eventos, conceitos de tópicos, partições, produtores e consumidores utilizando Apache Kafka ou RabbitMQ.', icon: 'Activity', link: 'https://kafka.apache.org/documentation/', book: '/docs/dataeng/designing_data_intensive_applications.pdf', rating: 4 },
			{ title: 'Desafio Final: Pipeline de Dados E2E', description: 'Construa um pipeline ELT completo: capture dados de uma API, processe de forma distribuída, armazene em um Data Warehouse na nuvem com transformações via dbt e orquestre tudo via Airflow.', icon: 'Trophy', rating: 5 },
		]),
	},
	{
		id: 'embedded',
		name: 'Embedded Systems',
		title: 'Espírito do Hardware',
		archetype: 'Mecânico Arcano',
		accentColor: '#94A3B8',
		accentGlow: 'rgba(148,163,184,0.25)',
		icon: 'Cpu',
		stats: { nivel: 1, missoes: 2, progresso: 4, xp: 1200 },
		certificates: [
			{ title: 'CLA – C Certified Associate Programmer', issuer: 'C++ Institute', link: 'https://cppinstitute.org/cla' },
		],
		modules: makeModules('em', [
			{ title: 'Fundamentos de Eletrônica Analógica & Digital', description: 'Leis de Ohm e Kirchhoff, análise de circuitos CC, comportamento de componentes passivos (resistores, capacitores, indutores) e lógica booleana em portas lógicas.', icon: 'Cpu', link: 'https://www.youtube.com/playlist?list=PLfdR3_dt2rbcv2CmrbeT8wu50Yga0fjE8', book: '/docs/embedded/practical_electronics_inventors.pdf', rating: 1 },
			{ requires: ['es-1'], title: 'Programação em C Embarcado & Manipulação de Memória', description: 'Ponteiros avançados, aritmética de ponteiros, alocação estática vs dinâmica, estruturas de dados otimizadas, modificador volatile e máscaras de bits.', icon: 'Code', link: 'https://www.youtube.com/playlist?list=PLIfZMtpPYFP5qaS2RFQxcNVkmJLGQwyKE', book: '/docs/embedded/embedded_c_coding_standard.pdf', rating: 2 },
			{ title: 'Prototipagem, Simulação & Design de PCB (KiCad)', description: 'Montagem física em matriz de contatos, simulação de circuitos com SPICE, desenvolvimento de esquemáticos e design de placas de circuito impresso usando o KiCad.', icon: 'Layout', link: 'https://www.youtube.com/playlist?list=PLZ8dBTV2_5HQpKzBt3nJex3Mbk7hmhFHl', book: '/docs/embedded/kicad_like_a_pro.pdf', rating: 2 },
			{ title: 'Arquitetura de Microcontroladores & ARM Cortex-M', description: 'Arquitetura interna de processadores RISC de 32 bits. Mapeamento de memória, registradores de propósito geral, GPIOs e programação Bare-Metal usando a família STM32.', icon: 'Box', link: 'https://www.youtube.com/playlist?list=PLMdNWywlSE5QPsEeT_cXisUT366NS3U8R', book: '/docs/embedded/mastering_stm32.pdf', rating: 3 },
			{ title: 'Sistemas de Interrupção, Timers & Periféricos', description: 'Configuração do controlador de interrupções vetoriais (NVIC), timers de hardware para contagem e geração de PWM, e amostragem de sinais via conversores ADC/DAC.', icon: 'Activity', link: 'https://www.youtube.com/playlist?list=PLMdNWywlSE5TtOxRm6frvH_om1NOyj33H', book: '/docs/embedded/definitive_guide_arm_cortex_m3_m4.pdf', rating: 3 },
			{ title: 'Protocolos de Comunicação Serial & Barramentos', description: 'Implementação de comunicação síncrona e assíncrona. Sinais, diagramas de tempo e barramentos de dados para sensores e periféricos: UART, SPI, I2C e barramento CAN.', icon: 'Radio', link: 'https://www.embedded.com/design/connectivity/', book: '/docs/embedded/serial_port_complete.pdf', rating: 3 },
			{ title: 'Conconectividade sem Fio & Soc ESP32', description: 'Arquitetura Dual-Core do chip ESP32, gerenciamento de energia, pilhas de rede sem fio integradas, sockets TCP/IP e comunicação via Bluetooth Low Energy (BLE).', icon: 'Wifi', link: 'https://www.youtube.com/playlist?list=PLZ8dBTV2_5HS79fVexGTtCMDUp7kjnumS', book: '/docs/embedded/esp32_programming_guide.pdf', rating: 3 },
			{ title: 'Redes de Longo Alcance & Protocolo LoRaWAN', description: 'Sistemas de comunicação IoT de baixa potência e longo alcance (LPWAN). Modulação por radiofrequência LoRa, topologia de rede LoRaWAN, gateways e criptografia de nós.', icon: 'Network', link: 'https://www.youtube.com/playlist?list=PLU15eSNTfwrnd1I835eFA124rd4CVGq3e', book: '/docs/embedded/lorawan_networks.pdf', rating: 4 },
			{ title: 'Sistemas Operacionais de Tempo Real (RTOS)', description: 'Programação multitarefa determinística usando FreeRTOS. Escalonamento de tarefas por prioridade, comunicação entre tarefas via filas, semáforos, mutexes e gerenciamento de ISRs.', icon: 'Clock', link: 'https://www.youtube.com/playlist?list=PLU15eSNTfwrnlzgvMmb1NK7l0qNo8UMKr', book: '/docs/embedded/freertos_practical_guide.pdf', rating: 4 },
			{ title: 'Desafio Final: Dispositivo de Telemetria Industrial', description: 'Desenvolva uma solução embarcada autônoma: leia dados de sensores por barramento industrial, processe em um firmware baseado em FreeRTOS e despache as métricas via rádio para um gateway de nuvem.', icon: 'Trophy', rating: 5 },
		]),
	},
	{
		id: 'automations',
		name: 'Automações',
		title: 'Maestro das Máquinas',
		archetype: 'Conjurador de Scripts',
		accentColor: '#2DD4BF',
		accentGlow: 'rgba(45,212,191,0.25)',
		icon: 'Bot',
		stats: { nivel: 1, missoes: 2, progresso: 4, xp: 1200 },
		certificates: [
			{ title: 'PCEP – Certified Entry-Level Python Programmer', issuer: 'Python Institute', link: 'https://pythoninstitute.org/pcep' },
			{ title: 'PCAP – Certified Associate Python Programmer', issuer: 'Python Institute', link: 'https://pythoninstitute.org/pcap' },
		],
		modules: makeModules('au', [
			{ requires: ['es-1'], title: 'Python Avançado para Automação de Sistemas', description: 'Manipulação avançada do sistema de arquivos (OS, Pathlib), gerenciamento de subprocessos, Expressões Regulares (Regex) e agendamento crontab nativo.', icon: 'Code', link: 'https://www.youtube.com/playlist?list=PLpdAy0tYrnKyjrY1Fr72DhmrRmeWI_5C8', book: '/docs/automations/automate_the_boring_stuff.pdf', rating: 1 },
			{ title: 'Web Scraping & Data Extraction Avançado', description: 'Raspagem estruturada de dados na web em escala. Manipulação de requisições HTTP com HTTPX, parsing de HTML com BeautifulSoup e extração robusta via framework Scrapy.', icon: 'Globe', link: 'https://docs.scrapy.org/en/latest/', book: '/docs/automations/web_scraping_python.pdf', rating: 2 },
			{ title: 'Automação de Interfaces (Web & Desktop)', description: 'Navegação automatizada Headless com Playwright para bypass de autenticações complexas e controle programático do sistema operacional via PyAutoGUI para sistemas legados.', icon: 'Monitor', link: 'https://playwright.dev/python/docs/intro', book: '/docs/automations/python_automation_cookbook.pdf', rating: 2 },
			{ title: 'Integração de APIs, Webhooks & REST', description: 'Conexão programática entre plataformas distribuídas. Construção de clientes HTTP resilientes, consumo de endpoints RESTful, manipulação de payloads JSON e ganchos de eventos (Webhooks).', icon: 'Link', link: 'https://www.youtube.com/playlist?list=PLpdAy0tYrnKy3TvpCT-x7kGqMQ5grk1Xq', book: '/docs/automations/working_with_apis.pdf', rating: 3 },
			{ title: 'Orquestração de Fluxos Low-Code (n8n & Make)', description: 'Integração visual de fluxos de processos entre aplicações SaaS corporativas, roteamento de lógica condicional e transformações de dados sem reescrever infraestrutura.', icon: 'GitBranch', link: 'https://www.youtube.com/playlist?list=PLPH5yL5ZVjjW7cRT4COVLiQqujaN3sHlG', book: '/docs/automations/n8n_workflows_guide.pdf', rating: 3 },
			{ title: 'Automação de Planilhas e Relatórios Corporativos', description: 'Leitura, processamento e geração em massa de arquivos corporativos dinâmicos (Excel, PDFs, CSVs) utilizando as bibliotecas OpenPyXL e ReportLab de forma otimizada.', icon: 'FileText', link: 'https://openpyxl.readthedocs.io/', book: '/docs/automations/python_excel_automation.pdf', rating: 3 },
			{ title: 'Sistemas Distribuidos de Tarefas com Celery & Redis', description: 'Execução de automações em background de forma assíncrona. Gerenciamento de filas de tarefas, concorrência e agendamentos complexos baseados em eventos com Celery.', icon: 'Layers', link: 'https://docs.celeryq.dev/en/stable/', book: '/docs/automations/distributed_tasks_python.pdf', rating: 4 },
			{ title: 'Empacotamento e Conteinerização de Robôs (Docker)', description: 'Isolamento completo do ambiente de execução das automações. Criação de Dockerfiles otimizados para scripts Python e gerenciamento de deploys estáveis em servidores VPS.', icon: 'Box', link: 'https://docs.docker.com/engine/reference/builder/', book: '/docs/automations/docker_for_developers.pdf', rating: 4 },
			{ title: 'Monitoramento, Logs & Tratamento de Falhas Resiliente', description: 'Implementação de telemetria nos scripts. Captura de exceções, rotação de logs estruturados com Loguru e envio automático de alertas de erros via Webhooks para Discord ou Telegram.', icon: 'Activity', link: 'https://loguru.readthedocs.io/', book: '/docs/automations/robust_python.pdf', rating: 4 },
			{ title: 'Desafio Final: Orquestrador de Processos', description: 'Construa um robô conteinerizado que raspe dados de um sistema web legado protegido, processe os dados em background via fila do Celery, atualize uma API REST e notifique os administradores.', icon: 'Trophy', rating: 5 },
		]),
	},
	{
		id: 'blockchain',
		name: 'Blockchain',
		title: 'Guardião do Ledger',
		archetype: 'Monge Criptográfico',
		accentColor: '#F97316',
		accentGlow: 'rgba(249,115,22,0.25)',
		icon: 'Link',
		stats: { nivel: 1, missoes: 2, progresso: 4, xp: 1200 },
		certificates: [
			{ title: 'Certified Blockchain Developer', issuer: 'Blockchain Council', link: 'https://www.blockchain-council.org/certifications/' },
		],
		modules: makeModules('bc', [
			{ requires: ['es-4'], title: 'Fundamentos de Redes Descentralizadas & P2P', description: 'Histórico dos sistemas distribuídos, arquitetura peer-to-peer (P2P), o problema dos generais bizantinos e a mecânica de livros-razão imutáveis (ledgers).', icon: 'Link', link: 'https://www.youtube.com/playlist?list=PL4PvbJTuGFzu1Xw5mMTvCLy4pY5S3ZBGO', book: '/docs/blockchain/mastering_bitcoin.pdf', rating: 2 },
			{ title: 'Criptografia Primitiva & Algoritmos de Consenso', description: 'Funções de hash (SHA-256, Keccak-256), criptografia de chave assimétrica (ECDSA), Árvores de Merkle e análise matemática de Proof-of-Work vs Proof-of-Stake.', icon: 'Key', link: 'https://ethereum.org/en/developers/docs/consensus-mechanisms/', book: '/docs/blockchain/blockchain_theoretical_foundations.pdf', rating: 2 },
			{ title: 'Ethereum Virtual Machine & Linguagem Solidity', description: 'A arquitetura da EVM, estrutura de um arquivo Solidity, tipos de dados estáticos, modificadores de função, escopos de visibilidade e ciclo de vida de transações.', icon: 'Code', link: 'https://docs.soliditylang.org/', book: '/docs/blockchain/mastering_ethereum.pdf', rating: 3 },
			{ title: 'Desenvolvimento de Smart Contracts & Padrões ERC', description: 'Implementação prática de contratos inteligentes modulares, gerenciamento de estados, tratamento de erros nativo e herança estruturada usando os padrões institucionais ERC-20 e ERC-721.', icon: 'FileCode', link: 'https://docs.openzeppelin.com/contracts/', book: '/docs/blockchain/solidity_programming_essentials.pdf', rating: 3 },
			{ title: 'Tooling Profissional com Foundry & Hardhat', description: 'Configuração de ambientes de desenvolvimento Web3 locais. Escrita de testes automatizados determinísticos, simulação de forks de redes reais e técnicas de Fuzz Testing com Foundry.', icon: 'Terminal', link: 'https://book.getfoundry.sh/', rating: 3 },
			{ title: 'EVM Internals & Otimização de Gas Avançada', description: 'Manipulação de memória profunda na EVM: Memory, Storage e Stack. Técnicas de empacotamento de variáveis (Variable Packing) e introdução a blocos inline de Assembly (Yul) para eficiência energética.', icon: 'Cpu', link: 'https://www.youtube.com/playlist?list=PLpaKFn4Q4GMNx8Ky143ycp2qCZ23WsFry', book: '/docs/blockchain/evm_insights.pdf', rating: 4 },
			{ title: 'Integrações Web3 & Engenharia de dApps', description: 'Ponte entre o protocolo descentralizado e a interface do usuário. Consumo do estado on-chain via provedores RPC, integração com carteiras (MetaMask, WalletConnect) utilizando Ethers.js e Wagmi.', icon: 'Globe', link: 'https://www.youtube.com/playlist?list=PLPPrIZLm5juZfG49vbjRVti1NwAZ_IrdA', book: '/docs/blockchain/building_web3_dapps.pdf', rating: 4 },
			{ title: 'Soluções de Escalabilidade L2 & Oráculos de Dados', description: 'Arquiteturas de escalabilidade de Camada 2 (Optimistic & ZK-Rollups) e pontes de liquidez. Ingestão segura de dados determinísticos do mundo real off-chain via Oráculos Chainlink.', icon: 'Network', link: 'https://docs.chain.link/', book: '/docs/blockchain/decentralized_oracles.pdf', rating: 4 },
			{ title: 'Segurança Defensiva & Auditoria de Código On-Chain', description: 'Vetores de ataque críticos em Smart Contracts: Reentrância, Overflows, ataques de manipulação de preço via Flash Loans e auditoria estática com Slither.', icon: 'Shield', link: 'https://github.com/crytic/slither', book: '/docs/blockchain/smart_contract_security.pdf', rating: 4 },
			{ title: 'Desafio Final: Ecossistema DeFi & Protocolo de Governança', description: 'Projete, teste e publique um ecossistema descentralizado ponta-a-ponta: implemente um cofre de liquidez acoplado a uma DAO (Governança On-Chain) automatizada e controlada por uma interface reativa.', icon: 'Trophy', rating: 5 },
		]),
	},
];

export const specialPaths: SpecialPath[] = [
	{
		id: 'essentials',
		name: 'Essenciais',
		title: 'A base que todo dev precisa dominar',
		archetype: 'Arcanjo dos Códigos',
		accentColor: '#00FF98',
		accentGlow: 'rgb(0 255 152 / 0.25)',
		icon: 'Sparkles',
		stats: { nivel: 1, missoes: 0, progresso: 0, xp: 0 },
		description: 'Conteúdos essenciais para a base da programação. Para quem está começando ou quer solidificar o alicerce.',
		buttonLabel: 'Despertar o Arcanjo',
		certificates: [
			{ title: 'GitHub Foundations', issuer: 'GitHub', link: 'https://learn.github.com/certification/GHF' },
			{ title: 'GitHub CI/CD', issuer: 'GitHub', link: 'https://learn.github.com/certification/ACTIONS' },
			{ title: 'Scrum Foundation Professional Certificate (SFPC)', issuer: 'CertiProf', link: 'https://certiprof.com/products/scrum-certification-free-exam-sfpc?_pos=1&_sid=f84b47870&_ss=r' },
		],
		modules: makeModules('es', [
			{ title: 'Lógica de Programação & Algoritmos', description: 'Variáveis, condicionais, loops, funções e o raciocínio lógico do zero', icon: 'Code', link: 'https://www.youtube.com/playlist?list=PLHz_AreHm4dmSj0MHol_aoNYCSGFqvfXV', book: '/docs/essentials/entendendo_algoritmos.pdf', rating: 1 },
			{ title: 'Estruturas de Dados', description: 'Busca binária, arrays, listas encadeadas, pilhas, filas, sets, dicionários e análise de complexidade na prática', icon: 'Layers', link: '', book: '/docs/essentials/introduction_algorithms.pdf', rating: 1 },
			{ title: 'Orientação a Objetos', description: 'Classes, herança, polimorfismo, encapsulamento e os princípios SOLID', icon: 'Brain', link: '', book: '/docs/essentials/head_first_oo.pdf', rating: 3 },
			{ title: 'Redes de Computadores', description: 'Modelo OSI, TCP/IP, DNS, HTTP, o que acontece quando você acessa um site', icon: 'Network', link: 'https://www.youtube.com/playlist?list=PLHz_AreHm4dkd4lr9G0Up-W-YaHYdTDuP', book: '/docs/essentials/redes_kurose.pdf', rating: 1 },
			{ title: 'Linhas de Comando', description: 'Terminal Linux e macOS, navegação, permissões e scripts básicos de shell', icon: 'Terminal', link: 'https://www.youtube.com/playlist?list=PLucm8g_ezqNp92MmkF9p_cj4yhT-fCTl7', book: '/docs/essentials/linux_command_line.pdf', rating: 2 },
			{ title: 'Git & GitHub', description: 'Commits, branches, merge, pull requests e trabalho colaborativo em time', icon: 'GitBranch', link: 'https://www.youtube.com/playlist?list=PLcoYAcR89n-qbO7YAVj5S0alABLis_QVU', book: '/docs/essentials/pro_git.pdf', rating: 2 },
			{ title: 'Consumo de APIs & HTTP', description: 'Protocolo HTTP/REST, verbos, headers, status codes e como lidar com chamadas assíncronas e tratamento de erros de rede.', icon: 'Globe', link: 'https://www.youtube.com/playlist?list=PL29TaWXah3iaaXDFPgTHiFMBF6wQahurP', book: '/docs/essentials/http_definitive.pdf',rating: 3 },
			{ title: 'Docker Essencial', description: 'Containers, imagens, volumes, redes e docker-compose do absoluto zero', icon: 'Box', link: 'https://www.youtube.com/playlist?list=PLViOsriojeLrdw5VByn96gphHFxqH3O_N', book: '/docs/essentials/docker_deep_dive.pdf', rating: 3 },
			{ title: 'CI/CD', description: 'Pipelines, GitHub Actions, automação de testes e como fazer deploy contínuo', icon: 'Zap', link: 'https://www.youtube.com/watch?v=df_WMXk7JxE', book: '/docs/essentials/continuous_delivery.pdf', rating: 4 },
			{ title: 'Desafio Final: CLI Tool Multi-ambiente', description: 'Crie uma ferramenta de linha de comando usando POO, faça chamadas de rede, encapsule tudo em Docker e versione no Git.', icon: 'Trophy', link: '', rating: 5 },
		]),
	},
	{
		id: 'advanced',
		name: 'Avançado',
		title: 'Para devs que querem ir além',
		archetype: 'Demônio dos Códigos',
		accentColor: '#D92639',
		accentGlow: 'rgb(217 38 57 / 0.25)',
		icon: 'Flame',
		stats: { nivel: 1, missoes: 0, progresso: 0, xp: 0 },
		description: 'Conteúdos avançados para devs experientes que querem dominar arquitetura, performance e engenharia de software.',
		buttonLabel: 'Invocar o Demônio',
		certificates: [
			{ title: 'CS50\'s Introduction to Computer Science', issuer: 'Harvard', link: 'https://learning.edx.org/course/course-v1:HarvardX+CS50+X/home' },
		],
		modules: makeModules('av', [
			{ requires: ['es-3'], title: 'Design Patterns & Padrões GoF de Código', description: 'Implementação de padrões de projeto criacionais, estruturais e comportamentais (GoF) com foco em desacoplamento, extensibilidade e legibilidade.', icon: 'Layers', link: 'https://refactoring.guru/design-patterns', book: '/docs/advanced/design_patterns_elements.pdf', rating: 3 },
			{ title: 'Domain-Driven Design (DDD) & Clean Architecture', description: 'Arquitetura em camadas, separação de conceitos, modelagem estratégica de domínios, contextos delimitados (Bounded Contexts), entidades, agregados e value objects.', icon: 'Box', link: 'https://martinfowler.com/tags/domain%20driven%20design.html', book: '/docs/advanced/domain_driven_design.pdf', rating: 3 },
			{ title: 'Engenharia de Requisitos & Modelagem de Sistemas', description: 'Mapeamento de sistemas complexos. Engenharia de requisitos arquiteturais, trade-offs de design, diagramação técnica estruturada e análise de viabilidade computacional.', icon: 'FileText', link: 'https://arc42.org/', book: '/docs/advanced/software_architecture_practice.pdf', rating: 3 },
			{ title: 'Sistemas Distribuídos & Padrões de Comunicação', description: 'Modelos de comunicação entre microsserviços. Implementação de gRPC de alta performance, GraphQL, contratos REST estáveis, Service Mesh e resiliência com Circuit Breakers.', icon: 'Network', link: 'https://gprc.io/', book: '/docs/advanced/distributed_systems.pdf', rating: 4 },
			{ title: 'Arquiteturas Event-Driven, Mensageria & CQRS', description: 'Acoplamento temporal zero. Processamento assíncrono de eventos, segregação de responsabilidade de leitura e escrita (CQRS), Event Sourcing e clusters com Apache Kafka.', icon: 'GitMerge', link: 'https://www.youtube.com/playlist?list=PL5aY_NrL1rjt_AZxj11kQjiTNLGg4ZaZA', book: '/docs/advanced/fundamentals_software_architecture.pdf', rating: 4 },
			{ title: 'Concorrência Avançada & Programação Paralela', description: 'Gerenciamento de processos do sistema operacional. Programação assíncrona profunda, threads nativas, exclusão mútua (Mutex), semáforos, deadlocks e race conditions.', icon: 'Cpu', link: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/', book: '/docs/advanced/concurrency_in_practice.pdf', rating: 4 },
			{ title: 'Estratégias de Caching & Bancos de Dados de Alta Performance', description: 'Otimização de persistência. Implementação de cache distribuído em memória com Redis, replicação de leitura/escrita, sharding horizontal e tunagem de bancos de dados.', icon: 'Database', link: 'https://redis.io/documentation', book: '/docs/advanced/high_performance_mysql.pdf', rating: 4 },
			{ title: 'Observabilidade, Telemetria & Engenharia de Confiabilidade', description: 'Métricas de sistemas distribuídos em escala (SRE). Implementação dos três pilares da observabilidade: Logs estruturados, Métricas com Prometheus e Rastreamento Distribuído (APM).', icon: 'Gauge', link: 'https://opentelemetry.io/docs/', book: '/docs/advanced/site_reliability_engineering.pdf', rating: 4 },
			{ title: 'Segurança Aplicada & Modelagem de Ameaças', description: 'Arquitetura corporativa defensiva. Mitigação prática do OWASP Top 10, criptografia em repouso e trânsito, auditoria de dependências e Threat Modeling de infraestrutura.', icon: 'Shield', link: 'https://owasp.org/www-project-top-ten/', book: '/docs/advanced/secure_by_design.pdf', rating: 4 },
			{ title: 'Desafio Final: Arquitetura Enterprise Altamente Disponível', description: 'Arquitete e implemente um ecossistema de microsserviços distribuídos resiliente, tolerante a falhas, orientado a eventos, com barramento de mensageria e telemetria ponta-a-ponta.', icon: 'Trophy', rating: 5 },
		]),
	},
	{
		id: 'math',
		name: 'Matemática',
		title: 'A matemática essencial do programador',
		archetype: 'Sábio dos Números',
		accentColor: '#1497b1',
		accentGlow: 'rgb(20 151 177 / 0.25)',
		icon: 'Sigma',
		stats: { nivel: 1, missoes: 0, progresso: 0, xp: 0 },
		description: 'A matemática e os algoritmos que todo programador precisa. Da lógica à criptografia.',
		buttonLabel: 'Consultar o Sábio',
		certificates: [
			{ title: 'FE – Fundamental Information Technology Engineer', issuer: 'IPA (Japão)', link: 'https://www.ipa.go.jp/en' },
		],
		modules: makeModules('mt', [
			{ title: 'Matemática Básica & Nivelamento Aritmético', description: 'Revisão de propriedades algébricas, produtos notáveis, fatoração de expressões, equações, inequações, potenciação e radiciação aplicadas à modelagem computacional.', icon: 'Diff', link: 'https://www.youtube.com/playlist?list=PLTPg64KdGgYgFpOFt2TETLdEuBB4fvxxf', book: '/docs/math/basic_mathematics.pdf', rating: 2 },
			{ title: 'Lógica Matemática & Proposicional', description: 'Conectivos lógicos, tabelas-verdade, tautologias, inferência, predicados, quantificadores e métodos de demonstração matemática aplicados a circuitos e condicionais.', icon: 'Binary', link: 'https://www.youtube.com/playlist?list=PLdFLgROzdbuIf5UsBA_VxTqDVDihXlIYN', book: '/docs/math/logic_for_computer_science.pdf', rating: 2 },
			{ title: 'Matemática Discreta & Estruturas Combinatórias', description: 'Teoria dos conjuntos, relações, funções injetoras e sobrejetoras, indução matemática, análise combinatória avançada, permutações e o princípio da casa dos pombos.', icon: 'Calculator', link: 'https://www.youtube.com/playlist?list=PLdFLgROzdbuIf5UsBA_VxTqDVDihXlIYN', book: '/docs/math/discrete_mathematics_applications.pdf', rating: 2 },
			{ title: 'Análise Combinatória & Probabilidade', description: 'Princípio fundamental da contagem, permutações, arranjos, combinações, binômio de Newton, espaço amostral e probabilidade condicional via Teorema de Bayes.', icon: 'BarChart', link: 'https://www.youtube.com/playlist?list=PLzvYXXKDUPquxp8QqYzd-_O5tzbC4HaJl', book: '/docs/math/concrete_mathematics.pdf', rating: 3 },
			{ title: 'Geometria Analítica & Vetores Espaciais', description: 'Coordenadas cartesianas, vetores no plano e no espaço, produto escalar, produto vetorial, equações de retas e planos, e distâncias em espaços euclidianos.', icon: 'Compass', link: 'https://www.youtube.com/playlist?list=PLTPg64KdGgYhy8stGM4z2_Hzb3zTfA77Z', book: '/docs/math/analytic_geometry.pdf', rating: 3 },
			{ title: 'Álgebra Linear para Computação', description: 'Matrizes, determinantes, sistemas de equações lineares, espaços vetoriais, transformações lineares, autovalores, autovetores e decomposição de matrizes.', icon: 'Grid', link: 'https://www.youtube.com/playlist?list=PLO3hBdfBc4pFef1zn1oZyYXLomL9MiX-C', book: '/docs/math/linear_algebra_applications.pdf', rating: 3 },
			{ title: 'Estatística Inferencial & Análise de Dados', description: 'Variáveis aleatórias, distribuições discretas e contínuas (Binomial, Normal), amostragem, intervalos de confiança e testes de hipóteses para tomada de decisão.', icon: 'BarChart2', link: 'https://www.youtube.com/playlist?list=PLA0675987914E07BB', book: '/docs/math/probability_statistics_engineers.pdf', rating: 3 },
			{ title: 'Pré-Cálculo & Teoria das Funções', description: 'Estudo aprofundado de funções polinomiais, racionais, exponenciais, logarítmicas e funções trigonométricas na circunferência unitária.', icon: 'Variable', link: 'https://www.youtube.com/playlist?list=PLa_2246N48_rIbheR_al4oqeFCP8dHoQR', book: '/docs/math/pre_calculus.pdf', rating: 4 },
			{ title: 'Cálculo Diferencial, Integral & Numérico', description: 'Conceito estrito de limites, derivadas (taxas de variação, descida de gradiente), integrais (acumulação, área sob a curva) e introdução a métodos numéricos de aproximação.', icon: 'Activity', link: 'https://www.youtube.com/playlist?list=PLTPg64KdGgYhACfQUtMf3CuhWOfLoTf_a', book: '/docs/math/calculus_early_transcendental.pdf', rating: 4 },
			{ title: 'Análise de Algoritmos & Complexidade Computacional', description: 'Análise assintótica, notação Big-O, Big-Omega, Big-Theta. Classes de complexidade P, NP, NP-Completo, e análise de recorrências e sorting avançado.', icon: 'Code', link: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/', book: '/docs/math/introduction_to_algorithms.pdf', rating: 3 },
			{ title: 'Teoria dos Grafos & Estruturas de Redes', description: 'Representação de grafos (matriz e lista de adjacência), algoritmos de busca (BFS, DFS), caminhos mínimos (Dijkstra, Bellman-Ford) e árvores geradoras mínimas.', icon: 'Network', link: 'https://www.youtube.com/playlist?list=PLrOyM49ctTx-xtyVeuO7ylclgXHd4ws9a', book: '/docs/math/introduction_to_graph_theory.pdf', rating: 4 },
			{ title: 'Criptografia Matemática & Teoria dos Números', description: 'Aritmética modular, números primos, Máximo Divisor Comum (MDC), Teorema de Fermat, algoritmo RSA, criptografia de curvas elípticas (ECC) e funções de hashing.', icon: 'Shield', link: 'https://crypto.stanford.edu/', book: '/docs/math/introduction_modern_cryptography.pdf', rating: 4 },
			{ title: 'Desafio Final: Motor Matemático Autônomo', description: 'Implemente do zero, utilizando apenas tipos primitivos da linguagem, um resolvedor de sistemas lineares por eliminação gaussiana ou um algoritmo criptográfico RSA funcional.', icon: 'Trophy', rating: 5 },
		]),
	},
];

// ————————————————————————————————————————————————————————————————
// Índice global de módulos + pré-requisitos entre trilhas
// ————————————————————————————————————————————————————————————————

/** Chave usada para persistir o progresso de cada trilha no localStorage. */
export const progressKey = (characterId: string) => `jornada-dev:progress:${characterId}`;

export interface ModuleRef {
	trackId: string;
	trackName: string;
	moduleTitle: string;
	accentColor: string;
}

const buildModuleIndex = (): Record<string, ModuleRef> => {
	const index: Record<string, ModuleRef> = {};
	for (const character of [...tracks, ...specialPaths]) {
		for (const module of character.modules) {
			index[module.id] = {
				trackId: character.id,
				trackName: character.name,
				moduleTitle: module.title,
				accentColor: character.accentColor,
			};
		}
	}
	return index;
};

/** Mapeia cada moduleId para a trilha dona e seus metadados. */
export const moduleIndex: Record<string, ModuleRef> = buildModuleIndex();

/** Lê o localStorage da trilha dona do módulo e diz se ele está concluído. */
export const isModuleCompleted = (moduleId: string): boolean => {
	const ref = moduleIndex[moduleId];
	if (!ref) return false;
	try {
		const raw = localStorage.getItem(progressKey(ref.trackId));
		if (!raw) return false;
		const saved = JSON.parse(raw) as Record<string, ModuleStatus>;
		return saved[moduleId] === 'concluído';
	} catch {
		return false;
	}
};
