import type React from 'react';
import {
	Code, Database, Globe, Lock, Layers, Trophy, Monitor, Zap, Component,
	Palette, Gauge, GitBranch, Cloud, Calculator, BarChart2, Brain, Network,
	MessageSquare, Bot, Eye, Terminal, Box, Activity, Gamepad2, Layout, ShieldBan,
	Music, Shield, Search, Bug, CheckCircle, ClipboardList, Table, Radio, GitCommit,
	Clock, Link, Coins, Users, Cpu, FileCode, Star, Type, AtomIcon, FigmaIcon, ShieldAlert,
	Sliders, Smartphone, AlertCircle, RefreshCw, Wifi, FileText, Key, GitMerge,
	Binary, BarChart, Compass, Grid, Variable, Diff,
	BookOpen, Play, RotateCcw, Check, ExternalLink,
} from 'lucide-react';
import type { Module } from '../data/tracks';

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
	Code, Database, Globe, Lock, Layers, Trophy, Monitor, Zap, Component,
	Palette, Gauge, GitBranch, Cloud, Calculator, BarChart2, Brain, Network,
	MessageSquare, Bot, Eye, Terminal, Box, Activity, Gamepad2, Layout, ShieldBan,
	Music, Shield, Search, Bug, CheckCircle, ClipboardList, Table, Radio, GitCommit,
	Clock, Link, Coins, Users, Cpu, FileCode, Type, AtomIcon, FigmaIcon, ShieldAlert,
	Sliders, Smartphone, AlertCircle, RefreshCw, Wifi, FileText, Key, GitMerge,
	Binary, BarChart, Compass, Grid, Variable, Diff,
};

interface PrereqInfo {
	id: string;
	title: string;
	trackName: string;
	met: boolean;
	/** Link direto para o curso do requisito (playlist ou livro). */
	href?: string;
}

interface ModuleCardProps {
	module: Module;
	index: number;
	accentColor: string;
	accentGlow: string;
	isFeatured?: boolean;
	isLast?: boolean;
	prereqs?: PrereqInfo[];
	gated?: boolean;
	onComplete?: (moduleId: string) => void;
	onUndo?: (moduleId: string) => void;
}

export function ModuleCard({ module, index, accentColor, accentGlow, isFeatured, isLast, prereqs, gated, onComplete, onUndo }: ModuleCardProps) {
	const Icon = iconMap[module.icon] ?? Code;
	const isCompleted = module.status === 'concluído';
	const seqLocked = module.status === 'bloqueado';
	const gatedByPrereq = Boolean(gated) && !isCompleted;
	const isLocked = seqLocked || gatedByPrereq;
	const isAvailable = !isLocked;
	const hasBook = Boolean(module.book && module.book.trim());
	const hasLink = Boolean(module.link && module.link.trim());
	const hasPrereqs = Boolean(prereqs && prereqs.length > 0);

	// Badge de status na borda superior do card
	const badge = isCompleted
		? { label: '✓ Concluído', color: accentColor, border: `${accentColor}80`, shadow: `0 0 10px ${accentGlow}` }
		: seqLocked
			? { label: 'Bloqueado', color: '#64748B', border: 'rgba(255,255,255,0.15)', shadow: 'none' }
			: gatedByPrereq
				? { label: 'Requisitos', color: '#F59E0B', border: 'rgba(245,158,11,0.5)', shadow: 'none' }
				: isFeatured
					? { label: 'Em Andamento', color: accentColor, border: accentColor, shadow: `0 0 14px ${accentGlow}` }
					: { label: 'Disponível', color: accentColor, border: `${accentColor}50`, shadow: 'none' };

	// Botões secundários (Leitura/Iniciar) — contorno; só o Concluir do card em destaque é sólido
	const secondaryButtonStyle: React.CSSProperties = {
		background: `${accentColor}12`,
		border: `1px solid ${accentColor}${isCompleted ? '50' : '80'}`,
		color: accentColor,
		opacity: isCompleted ? 0.75 : 1,
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
	};

	return (
		<div className="flex gap-4 items-stretch">
			{/* Timeline connector */}
			<div className="flex flex-col items-center" style={{minWidth: '40px'}}>
				<div
					style={{
						width: '36px',
						height: '36px',
						borderRadius: '50%',
						border: `2px solid ${isAvailable ? accentColor : 'rgba(255,255,255,0.15)'}`,
						background: isCompleted
							? accentColor
							: isAvailable
								? `radial-gradient(circle, ${accentGlow}, transparent)`
								: 'rgba(13,21,38,0.8)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexShrink: 0,
						boxShadow: isAvailable && isFeatured ? `0 0 16px ${accentGlow}` : 'none',
					}}
					>
					{isCompleted ? (
						<Check size={16} color="#060B1A"/>
					) : (
						<span
							style={{
								fontFamily: "'Cinzel', serif",
								fontSize: '12px',
								color: isAvailable ? accentColor : '#4B5563'
							}}
							>
							{index + 1}
						</span>
					)}
				</div>
				{!isLast && (
					<div
						style={{
						width: '2px',
						flex: 1,
						background: `linear-gradient(to bottom, ${accentColor}40, transparent)`,
						minHeight: '20px'
						}}
					/>
				)}
			</div>
			{/* Card */}
			<div
				style={{
					position: 'relative',
					background: isFeatured
						? `linear-gradient(135deg, rgba(13,21,38,0.98), rgba(20,32,60,0.95))`
						: 'rgba(13,21,38,0.6)',
					border: isFeatured
						? `1px solid ${accentColor}60`
						: isCompleted
							? `1px solid ${accentColor}40`
							: '1px solid rgba(255,255,255,0.07)',
					boxShadow: isFeatured ? `0 0 30px ${accentGlow}, inset 0 0 20px ${accentGlow}30` : 'none',
					opacity: isLocked ? 0.5 : 1,
					marginBottom: '12px',
				}}
				className="flex-1 rounded-xl p-4"
				>
				{/* Badge de status */}
				<span
					style={{
						position: 'absolute',
						top: '-9px',
						right: '14px',
						background: '#0A1428',
						border: `1px solid ${badge.border}`,
						boxShadow: badge.shadow,
						color: badge.color,
						fontFamily: "'Cinzel', serif",
						fontSize: '9px',
						letterSpacing: '0.12em',
						padding: '2px 10px',
						borderRadius: '999px',
						lineHeight: '14px',
					}}
					className="uppercase"
					>
					{badge.label}
				</span>

				<div className="flex items-start gap-3">
					<div
						style={{
							background: `rgba(${isAvailable ? accentColor : '#9CA3AF'}22, 0.15)`,
							border: `1px solid ${isAvailable ? accentColor + '40' : 'rgba(255,255,255,0.1)'}`,
							padding: '8px',
							borderRadius: '8px',
							flexShrink: 0,
						}}
						>
						<Icon size={18} color={isAvailable ? accentColor : '#6B7280'}/>
					</div>
					<div className="flex-1">
						<h4
							style={{
								fontFamily: "'Cinzel', serif",
								fontSize: '13px',
								color: isAvailable ? '#F1F5F9' : '#6B7280',
								marginBottom: '4px',
							}}
							>
							{module.title}
						</h4>
						<p style={{fontFamily: "'Inter', sans-serif", fontSize: '12px'}}
						   className="text-gray-500 leading-snug">
							{module.description}
						</p>
						<div className="flex items-center gap-3 mt-2">
							<span
								style={{
									fontFamily: "'Inter', sans-serif",
									fontSize: '11px'
								}}
								className="text-gray-600">
								{module.lessonCount} aulas
							</span>
							<div className="flex gap-0.5">
								{Array.from({length: 5}).map((_, i) => (
									<Star key={i} size={10} color={i < module.rating ? accentColor : '#374151'}
								        fill={i < module.rating ? accentColor : 'transparent'}/>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Requisitos — pré-requisitos de outras trilhas */}
				{hasPrereqs && (
					<div style={{marginTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '8px'}}>
						<p
							style={{
								fontFamily: "'Cinzel', serif",
								fontSize: '9px',
								letterSpacing: '0.15em',
								color: '#64748B',
								marginBottom: '6px',
							}}
							className="uppercase"
						>
							Requisitos
						</p>
						<div className="flex flex-wrap gap-1.5">
							{prereqs!.map((p) => {
								const chipStyle: React.CSSProperties = {
									display: 'inline-flex',
									alignItems: 'center',
									gap: '4px',
									fontFamily: "'Inter', sans-serif",
									fontSize: '10px',
									padding: '3px 8px',
									borderRadius: '999px',
									color: p.met ? '#22C55E' : '#F59E0B',
									background: p.met ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)',
									border: `1px solid ${p.met ? 'rgba(34,197,94,0.3)' : 'rgba(245,158,11,0.3)'}`,
								};
								const content = (
									<>
										{p.met ? <Check size={10}/> : <Lock size={10}/>}
										{p.title} · {p.trackName}
										{p.href && <ExternalLink size={9}/>}
									</>
								);
								return p.href ? (
									<a
										key={p.id}
										href={p.href}
										target="_blank"
										rel="noopener noreferrer"
										title={`Abrir curso: ${p.title}`}
										style={{...chipStyle, cursor: 'pointer', textDecoration: 'none'}}
										className="hover:opacity-70 transition-opacity"
									>
										{content}
									</a>
								) : (
									<span key={p.id} style={chipStyle}>{content}</span>
								);
							})}
						</div>
					</div>
				)}

				{/* Ações — só aparecem quando o módulo está liberado */}
				{!isLocked && (
					<div className="flex items-center justify-end gap-2 flex-wrap mt-3">
						{hasBook && (
							<button
								onClick={() => window.open(module.book, '_blank', 'noopener,noreferrer')}
								style={secondaryButtonStyle}
								className="uppercase hover:opacity-80 transition-opacity"
								>
								<BookOpen size={12}/> {isCompleted ? 'Re-Ler' : 'Leitura'}
							</button>
						)}
						{hasLink && (
							<button
								onClick={() => window.open(module.link, '_blank', 'noopener,noreferrer')}
								style={secondaryButtonStyle}
								className="uppercase hover:opacity-80 transition-opacity"
								>
								<Play size={12}/> {isCompleted ? 'Rever' : 'Iniciar'}
							</button>
						)}
						{isCompleted ? (
							<button
								onClick={() => onUndo?.(module.id)}
								style={{
									background: 'transparent',
									border: '1px solid rgba(255,255,255,0.2)',
									color: '#94A3B8',
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
								}}
								className="uppercase hover:opacity-70 transition-opacity"
								>
								<RotateCcw size={12}/> Desfazer
							</button>
						) : (
							<button
								onClick={() => onComplete?.(module.id)}
								style={{
									background: isFeatured
										? `linear-gradient(90deg, ${accentColor}, ${accentColor}cc)`
										: 'transparent',
									border: `1px solid ${accentColor}80`,
									color: isFeatured ? '#000' : accentColor,
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
								}}
								className="uppercase hover:opacity-80 transition-opacity"
								>
								<Check size={12}/> Concluir
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
