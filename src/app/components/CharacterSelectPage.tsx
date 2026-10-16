import React, { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Instagram } from 'lucide-react';
import { type Character, specialPaths, tracks } from '../data/tracks';
import { Footer } from './Footer';
import { CharacterCard } from './CharacterCard';
import { SpecialPathCard } from './SpecialPathCard';
import { ImageWithFallback } from './shared/ImageWithFallback';

interface CharacterSelectPageProps {
	selected: Character;
	onSelect: (c: Character) => void;
	onStart: () => void;
	onStartSpecial: (c: Character) => void;
}

const HERO_IMG = '/assets/banner.png';

export function CharacterSelectPage({ selected, onSelect, onStart, onStartSpecial }: CharacterSelectPageProps) {
	const scrollRef = useRef<HTMLDivElement>(null);
	const recentering = useRef(false);

	// Carrossel infinito: renderiza a lista 3x e mantém a rolagem na cópia central,
	// reposicionando de forma invisível ao se aproximar das bordas.
	const loop = [...tracks, ...tracks, ...tracks];

	const recenter = () => {
		const el = scrollRef.current;
		if (!el || recentering.current) return;
		const third = el.scrollWidth / 3;
		if (el.scrollLeft <= third * 0.25) {
			recentering.current = true;
			el.scrollLeft += third;
			requestAnimationFrame(() => { recentering.current = false; });
		} else if (el.scrollLeft >= third * 1.75) {
			recentering.current = true;
			el.scrollLeft -= third;
			requestAnimationFrame(() => { recentering.current = false; });
		}
	};

	// Posiciona no início da cópia central após montar
	useEffect(() => {
		const el = scrollRef.current;
		if (el) el.scrollLeft = el.scrollWidth / 3;
	}, []);

	const scrollBy = (dir: 'left' | 'right') => {
		if(scrollRef.current) {
			scrollRef.current.scrollBy({left: dir === 'left' ? -320 : 320, behavior: 'smooth'});
		}
	};

	return (
		<div
			style={{
				minHeight: '100vh',
				background: 'linear-gradient(180deg, #060B1A 0%, #0A1428 50%, #060B1A 100%)',
				fontFamily: "'Inter', sans-serif",
			}}
			>
			{/* Hero Banner */}
			<div className="relative overflow-hidden" style={{height: '380px'}}>
				<ImageWithFallback
					src={HERO_IMG}
					alt="Heróis da JornadaDev"
					className="w-full h-full object-cover object-center"
					style={{filter: 'brightness(0.35) saturate(0.8)'}}
				/>
				{/* Gradient overlay */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background: 'linear-gradient(to bottom, transparent 70%, #060B1A 100%)',
					}}
				/>
				{/* Stars/particle effect overlay */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background: 'radial-gradient(ellipse at 50% 30%, rgba(0,100,200,0.15) 0%, transparent 70%)',
					}}
				/>
				{/* Title */}
				<div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
					<p
						style={{
							fontFamily: "'Cinzel', serif",
							fontSize: '14px',
							letterSpacing: '0.4em',
							color: '#94A3B8',
						}}
						className="uppercase"
						>
						✦ Bem-vindo à ✦
					</p>
					<h1
						style={{
							fontFamily: "'Cinzel', serif",
							fontSize: 'clamp(36px, 6vw, 72px)',
							background: 'linear-gradient(135deg, #60A5FA, #A78BFA, #60A5FA)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							backgroundClip: 'text',
							letterSpacing: '0.05em',
							textAlign: 'center',
							lineHeight: '1.1',
						}}
						>
						JORNADA DEV ARTHEMIZ
					</h1>
					<p
						style={{
							fontFamily: "'Inter', sans-serif",
							fontSize: '15px',
							color: '#94A3B8',
							textAlign: 'center',
							maxWidth: '480px',
						}}
						>
						Escolha seu caminho. Forje suas habilidades. Torne-se uma lenda do código.
					</p>
				</div>
			</div>

			{/* Character Selection Section */}
			<div className="flex flex-col items-center gap-6 px-4 py-10">
				<div className="text-center">
					<p
						style={{
							fontFamily: "'Cinzel', serif",
							fontSize: '11px',
							letterSpacing: '0.4em',
							color: '#475569',
						}}
						className="uppercase mb-2"
						>
						✦ Selecione sua trilha ✦
					</p>
					<h2
						style={{
							fontFamily: "'Cinzel', serif",
							fontSize: 'clamp(22px, 4vw, 38px)',
							color: '#60A5FA',
							letterSpacing: '0.05em',
						}}
						>
						SELECIONE SEU DESTINO
					</h2>
					<p style={{fontSize: '13px'}} className="text-gray-500 mt-2">
						Cada trilha é uma jornada única. Escolha um personagem para descobrir seu caminho.
					</p>
				</div>

				{/* Carousel */}
				<div className="w-full max-w-5xl relative">
					<button
						onClick={() => scrollBy('left')}
						style={{background: 'rgba(13,21,38,0.9)', border: '1px solid rgba(255,255,255,0.1)'}}
						className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
						>
						<ChevronLeft size={18} color="#9CA3AF"/>
					</button>

					<div
						ref={scrollRef}
						onScroll={recenter}
						className="flex gap-3 overflow-x-auto pb-3"
						style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
						>
						{loop.map((c, i) => (
							<CharacterCard
								key={`${c.id}-${i}`}
								character={c}
								isSelected={selected.id === c.id}
								onClick={() => onSelect(c)}
							/>
						))}
					</div>

					<button
						onClick={() => scrollBy('right')}
						style={{background: 'rgba(13,21,38,0.9)', border: '1px solid rgba(255,255,255,0.1)'}}
						className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
						>
						<ChevronRight size={18} color="#9CA3AF"/>
					</button>
				</div>

				{/* Selected character info + CTA */}
				<div className="flex flex-col items-center gap-4">
					<div className="text-center">
						<p style={{
							fontFamily: "'Cinzel', serif",
							fontSize: '12px',
							color: '#475569',
							letterSpacing: '0.2em'
						}}
						   className="uppercase">
							{selected.archetype}
						</p>
						<h3
							style={{
								fontFamily: "'Cinzel', serif",
								fontSize: '24px',
								color: selected.accentColor,
							}}
							>
							{selected.title}
						</h3>
					</div>

					{/* Progress dots */}
					<div className="flex gap-1.5">
						{tracks.map((c, i) => (
							<div
								key={c.id}
								onClick={() => onSelect(tracks[i])}
								style={{
									width: selected.id === c.id ? '20px' : '6px',
									height: '6px',
									borderRadius: '3px',
									backgroundColor: selected.id === c.id ? selected.accentColor : 'rgba(255,255,255,0.15)',
									transition: 'all 0.3s ease',
									cursor: 'pointer',
								}}
							/>
						))}
					</div>

					<button
						onClick={onStart}
						style={{
							background: `linear-gradient(90deg, ${selected.accentColor}, ${selected.accentColor}99)`,
							color: '#000',
							fontFamily: "'Cinzel', serif",
							fontSize: '13px',
							letterSpacing: '0.15em',
							boxShadow: `0 0 24px ${selected.accentGlow}`,
						}}
						className="px-8 py-3 rounded-xl uppercase cursor-pointer hover:opacity-90 transition-opacity"
						>
						✦ Iniciar Jornada — {selected.name} ✦
					</button>
				</div>

				{/* Special Paths */}
				<div className="w-full max-w-3xl mt-8">
					<div className="text-center mb-6">
						<p
							style={{
								fontFamily: "'Cinzel', serif",
								fontSize: '11px',
								letterSpacing: '0.4em',
								color: '#475569',
							}}
							className="uppercase"
							>
							✦ Caminho Especial ✦
						</p>
					</div>
					<div className="flex flex-wrap justify-center gap-6">
						{specialPaths.map((sp) => (
							<SpecialPathCard key={sp.id} path={sp} onClick={() => onStartSpecial(sp)}/>
						))}
					</div>
				</div>
			</div>

			<Footer/>
		</div>
	);
}
