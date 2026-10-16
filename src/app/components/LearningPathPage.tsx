import { useEffect, useState } from 'react';
import type React from 'react';
import {
	ArrowLeft, Award, ExternalLink, Github, Instagram,
	Server, Monitor, Layers, Cloud, BarChart2, Brain, GitBranch, ShieldAlert, ShieldBan,
	Gamepad2, Shield, Palette, Bug, Database, Cpu, Bot, Link, Box, Code,
	Sparkles, Sigma, Flame,
} from 'lucide-react';
import type { Character, Module } from '../data/tracks';
import { moduleIndex, isModuleCompleted, progressKey } from '../data/tracks';
import { StatsBar } from './StatsBar';
import { ModuleCard } from './ModuleCard';
import { Footer } from './Footer';

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
	Server, Monitor, Layers, Cloud, BarChart2, Brain, GitBranch, ShieldAlert, ShieldBan,
	Gamepad2, Shield, Palette, Bug, Database, Cpu, Bot, Link, Box, Code,
	Sparkles, Sigma, Flame,
};

const applyStoredProgress = (character: Character): Module[] => {
	try {
		const raw = localStorage.getItem(progressKey(character.id));
		if (!raw) return character.modules;
		const saved = JSON.parse(raw) as Record<string, Module['status']>;
		const sequential = character.sequential !== false;
		return character.modules.map((m) => {
			const status = saved[m.id];
			if (!status) return m;
			// Progresso salvo antes da trilha virar livre: 'bloqueado' nunca seria destravado
			return { ...m, status: !sequential && status === 'bloqueado' ? 'disponível' : status };
		});
	} catch {
		return character.modules;
	}
};

interface LearningPathPageProps {
	character: Character;
	onBack: () => void;
	/** Abre um módulo (de qualquer trilha) dentro do site. */
	onNavigateToModule: (moduleId: string) => void;
	/** Módulo a rolar/destacar ao entrar; `n` muda a cada clique para repetir o foco. */
	focusModule?: { id: string; n: number } | null;
}

export function LearningPathPage({ character, onBack, onNavigateToModule, focusModule }: LearningPathPageProps) {
	const Icon = iconMap[character.icon] ?? Server;
	const sequential = character.sequential !== false;
	const [modules, setModules] = useState(() => applyStoredProgress(character));
	const [highlightId, setHighlightId] = useState<string | null>(null);

	useEffect(() => {
		setModules(applyStoredProgress(character));
	}, [character]);

	useEffect(() => {
		try {
			const map = Object.fromEntries(modules.map((m) => [m.id, m.status]));
			localStorage.setItem(progressKey(character.id), JSON.stringify(map));
		} catch {
			// storage indisponível (modo privado etc.) — progresso segue apenas em memória
		}
	}, [modules, character.id]);

	// Chegou por um chip de requisito: rola até o módulo e destaca por instantes
	useEffect(() => {
		if (!focusModule) return;
		const frame = requestAnimationFrame(() => {
			document.getElementById(`module-${focusModule.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
			setHighlightId(focusModule.id);
		});
		const timer = setTimeout(() => setHighlightId(null), 2200);
		return () => {
			cancelAnimationFrame(frame);
			clearTimeout(timer);
		};
	}, [focusModule]);

	// Resolve os pré-requisitos cross-trilha de cada módulo com o status de conclusão
	const resolvePrereqs = (module: Module) =>
		(module.requires ?? []).map((reqId) => {
			const ref = moduleIndex[reqId];
			const met = ref && ref.trackId === character.id
				? modules.find((m) => m.id === reqId)?.status === 'concluído'
				: isModuleCompleted(reqId);
			return {
				id: reqId,
				title: ref?.moduleTitle ?? reqId,
				trackName: ref?.trackName ?? '???',
				met: Boolean(met),
			};
		});

	const prereqsByModule = modules.map(resolvePrereqs);
	const isGated = (i: number) => prereqsByModule[i].some((p) => !p.met);

	// Módulo em destaque: primeiro disponível que não esteja travado por pré-requisitos
	const featuredModuleIndex = modules.findIndex(
		(module, i) => (module.status === 'disponível' || module.status === 'em-progresso') && !isGated(i),
	);

	// Stats reais da trilha, derivadas do andamento dos módulos
	const totalModules = modules.length;
	const completedCount = modules.filter((m) => m.status === 'concluído').length;
	const trackDone = completedCount === totalModules;
	const derivedStats = {
		nivel: Math.min(5, 1 + Math.floor(completedCount / 3)),
		missoes: Math.round((completedCount / totalModules) * 5),
		progresso: Math.round((completedCount / totalModules) * 5),
		xp: completedCount * 250,
	};

	const handleCompleteModule = (moduleId: string) => {
		const gateIndex = modules.findIndex((module) => module.id === moduleId);
		if (gateIndex !== -1 && isGated(gateIndex)) {
			return; // travado por pré-requisitos de outra trilha
		}
		setModules((currentModules) => {
			const currentIndex = currentModules.findIndex((module) => module.id === moduleId);
			if (currentIndex === -1) {
				return currentModules;
			}

			return currentModules.map((module, index) => {
				if (index === currentIndex) {
					return { ...module, status: 'concluído' };
				}

				if (sequential && index === currentIndex + 1 && module.status === 'bloqueado') {
					return { ...module, status: 'disponível' };
				}

				return module;
			});
		});
	};

	const handleUndoModule = (moduleId: string) => {
		setModules((currentModules) => {
			const currentIndex = currentModules.findIndex((module) => module.id === moduleId);
			if (currentIndex === -1) {
				return currentModules;
			}

			return currentModules.map((module, index) => {
				if (index === currentIndex) {
					return { ...module, status: 'disponível' };
				}

				// Re-bloqueia o próximo módulo se ele ainda não foi iniciado/concluído
				if (sequential && index === currentIndex + 1 && module.status === 'disponível') {
					return { ...module, status: 'bloqueado' };
				}

				return module;
			});
		});
	};

	return (
		<div
			style={{
				minHeight: '100vh',
				background: 'linear-gradient(180deg, #060B1A 0%, #080F20 60%, #060B1A 100%)',
				fontFamily: "'Inter', sans-serif",
			}}
		>
			{/* Top nav */}
			<div
				style={{
					borderBottom: '1px solid rgba(255,255,255,0.06)',
					background: 'rgba(6,11,26,0.9)',
					backdropFilter: 'blur(12px)',
					position: 'sticky',
					top: 0,
					zIndex: 50,
				}}
			>
				<div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
					<button
						onClick={onBack}
						style={{color: character.accentColor}}
						className="flex items-center gap-2 hover:opacity-70 transition-opacity cursor-pointer"
					>
						<ArrowLeft size={16}/>
						<span style={{fontFamily: "'Cinzel', serif", fontSize: '12px', letterSpacing: '0.1em'}}>
                      Selecionar Trilha
                    </span>
					</button>
					<span style={{color: 'rgba(255,255,255,0.2)'}}>/</span>
					<span style={{fontFamily: "'Cinzel', serif", fontSize: '12px', color: '#475569'}}>
                    {character.name}
                  </span>
				</div>
			</div>

			<div className="max-w-3xl mx-auto px-4 py-10 flex flex-col gap-8">
				{/* Character Header */}
				<div className="flex flex-col items-center gap-5 text-center">
					{/* Avatar */}
					<div
						style={{
							width: '100px',
							height: '100px',
							borderRadius: '50%',
							background: `radial-gradient(circle, ${character.accentGlow}, rgba(13,21,38,0.8))`,
							border: `2px solid ${character.accentColor}60`,
							boxShadow: `0 0 40px ${character.accentGlow}`,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Icon size={44} color={character.accentColor}/>
					</div>

					<div>
						<p
							style={{
								fontFamily: "'Cinzel', serif",
								fontSize: '11px',
								letterSpacing: '0.35em',
								color: '#475569',
							}}
							className="uppercase mb-1"
						>
							Trilha ·{' '}
							<span style={{color: character.accentColor}}>{character.title}</span>
						</p>
						<h1
							style={{
								fontFamily: "'Cinzel', serif",
								fontSize: 'clamp(28px, 5vw, 48px)',
								color: '#F1F5F9',
								letterSpacing: '0.05em',
								lineHeight: '1',
							}}
						>
							{character.name.toUpperCase()}
						</h1>
						<p style={{fontSize: '14px', color: '#64748B', marginTop: '6px'}}>
							{character.archetype}
						</p>
					</div>

					<div className="flex gap-2">
						<button
							onClick={() => window.open('https://instagram.com/arthur.mamedes', '_blank')}
							style={{
								border: `1px solid rgba(233,54,250,0.15)`,
								color: '#e936fa',
								fontFamily: "'Cinzel', serif",
								fontSize: '11px',
								letterSpacing: '0.1em',
								padding: '8px 16px',
								borderRadius: '8px',
								cursor: 'pointer',
								background: 'rgba(190,54,130,0.15)',
							}}
							className="uppercase hover:opacity-70 transition-opacity inline-flex items-center justify-center gap-2 whitespace-nowrap"
						>
							<Instagram size={14}/> @arthur.mamedes
						</button>

						<button
							onClick={() => window.open('https://github.com/A4thu4', '_blank')}
							style={{
								border: `1px solid ${character.accentColor}60`,
								color: character.accentColor,
								fontFamily: "'Cinzel', serif",
								fontSize: '11px',
								letterSpacing: '0.1em',
								padding: '8px 16px',
								borderRadius: '8px',
								cursor: 'pointer',
								background: `${character.accentColor}15`,
							}}
							className="uppercase hover:opacity-80 transition-opacity inline-flex items-center justify-center gap-2 whitespace-nowrap"
						>
							<Github size={14}/> Github
						</button>
					</div>
				</div>

				{/* Stats */}
				<StatsBar stats={derivedStats} accentColor={character.accentColor}/>

				{/* Módulos header */}
				<div className="flex items-center gap-3">
					<div style={{flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)'}}/>
					<p
						style={{
							fontFamily: "'Cinzel', serif",
							fontSize: '11px',
							letterSpacing: '0.3em',
							color: '#475569',
						}}
						className="uppercase"
					>
						✦ Módulos ✦
					</p>
					<div style={{flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)'}}/>
				</div>

				{/* Module list */}
				<div className="flex flex-col">
					{modules.map((module, i) => (
						<ModuleCard
							key={module.id}
							module={module}
							index={i}
							accentColor={character.accentColor}
							accentGlow={character.accentGlow}
							isFeatured={i === featuredModuleIndex}
							isLast={i === modules.length - 1}
							prereqs={prereqsByModule[i]}
							gated={isGated(i)}
							highlighted={module.id === highlightId}
							onNavigatePrereq={onNavigateToModule}
							onComplete={handleCompleteModule}
							onUndo={handleUndoModule}
						/>
					))}
				</div>

				{/* Certificações da trilha */}
				{character.certificates && character.certificates.length > 0 && (
					<>
						<div className="flex items-center gap-3">
							<div style={{flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)'}}/>
							<p
								style={{
									fontFamily: "'Cinzel', serif",
									fontSize: '11px',
									letterSpacing: '0.3em',
									color: '#475569',
								}}
								className="uppercase"
							>
								✦ Certificações ✦
							</p>
							<div style={{flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)'}}/>
						</div>

						<div className="flex flex-col gap-3">
							{character.certificates.map((cert) => (
								<div
									key={cert.title}
									style={{
										background: trackDone
											? `linear-gradient(135deg, rgba(13,21,38,0.98), rgba(20,32,60,0.95))`
											: 'rgba(13,21,38,0.6)',
										border: trackDone
											? `1px solid ${character.accentColor}60`
											: '1px solid rgba(255,255,255,0.07)',
										boxShadow: trackDone ? `0 0 24px ${character.accentGlow}` : 'none',
										opacity: trackDone ? 1 : 0.75,
									}}
									className="rounded-xl p-4 flex items-center gap-3"
								>
									<div
										style={{
											background: `rgba(${character.accentColor}22, 0.15)`,
											border: `1px solid ${character.accentColor}40`,
											padding: '10px',
											borderRadius: '10px',
											flexShrink: 0,
										}}
									>
										<Award size={20} color={character.accentColor}/>
									</div>
									<div className="flex-1 min-w-0">
										<h4
											style={{
												fontFamily: "'Cinzel', serif",
												fontSize: '13px',
												color: '#F1F5F9',
												marginBottom: '2px',
											}}
										>
											{cert.title}
										</h4>
										<p style={{fontFamily: "'Inter', sans-serif", fontSize: '11px'}} className="text-gray-500">
											{cert.issuer}
										</p>
									</div>
									{cert.link && (
										<button
											onClick={() => window.open(cert.link, '_blank', 'noopener,noreferrer')}
											style={{
												background: `${character.accentColor}12`,
												border: `1px solid ${character.accentColor}80`,
												color: character.accentColor,
												fontFamily: "'Cinzel', serif",
												fontSize: '10px',
												letterSpacing: '0.05em',
												padding: '6px 14px',
												borderRadius: '6px',
												cursor: 'pointer',
												whiteSpace: 'nowrap',
												display: 'inline-flex',
												alignItems: 'center',
												gap: '5px',
												flexShrink: 0,
											}}
											className="uppercase hover:opacity-80 transition-opacity"
										>
											<ExternalLink size={12}/> Ver Certificação
										</button>
									)}
								</div>
							))}
						</div>

						{!trackDone && (
							<p style={{fontSize: '12px', color: '#475569', textAlign: 'center', marginTop: '-12px'}}>
								🏆 Conclua todos os módulos da trilha para forjar suas certificações.
							</p>
						)}
					</>
				)}

				{/* Locked notice */}
				<div
					style={{
						background: 'rgba(13,21,38,0.5)',
						border: '1px solid rgba(255,255,255,0.06)',
						borderRadius: '12px',
						padding: '16px',
						textAlign: 'center',
					}}
				>
					<p style={{fontSize: '12px', color: '#475569'}}>
						{sequential
							? '🔒 Os próximos módulos são desbloqueados conforme você avança na jornada.'
							: '🔒 Estude na ordem que preferir: cada módulo é liberado ao concluir os seus requisitos.'}
					</p>
				</div>
			</div>

			<Footer/>
		</div>
	);
}
