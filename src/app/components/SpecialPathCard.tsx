import type { SpecialPath } from '../data/tracks';
import { getTrackIcon } from './trackIcons';

interface SpecialPathCardProps {
	path: SpecialPath;
	onClick: () => void;
}

export function SpecialPathCard({ path, onClick }: SpecialPathCardProps) {
	const Icon = getTrackIcon(path.icon);

	return (
		<div
			style={{
				background: `linear-gradient(135deg, rgba(13,21,38,0.95) 0%, rgba(20,30,55,0.9) 100%)`,
				border: `1px solid ${path.accentColor}40`,
				boxShadow: `0 0 30px ${path.accentGlow}`,
			}}
			className="flex flex-col items-center gap-4 p-6 rounded-2xl flex-1 min-w-[260px] max-w-[340px]"
		>
			<div
				style={{
					background: `radial-gradient(circle, ${path.accentGlow}, transparent 70%)`,
					border: `2px solid ${path.accentColor}60`,
				}}
				className="w-24 h-24 rounded-full flex items-center justify-center"
			>
				<Icon size={40} color={path.accentColor}/>
			</div>

			<div className="text-center">
				<p style={{fontFamily: "'Inter', sans-serif", fontSize: '11px', letterSpacing: '0.15em'}}
				   className="text-gray-500 uppercase mb-1">
					{path.archetype}
				</p>
				<h3
					style={{fontFamily: "'Cinzel', serif", color: path.accentColor, fontSize: '20px'}}
				>
					{path.name}
				</h3>
			</div>

			<p style={{fontFamily: "'Inter', sans-serif", fontSize: '13px'}}
			   className="text-gray-400 text-center leading-relaxed">
				{path.description}
			</p>

			<button
				onClick={onClick}
				style={{
					background: `linear-gradient(90deg, ${path.accentColor}22, ${path.accentColor}44)`,
					border: `1px solid ${path.accentColor}80`,
					color: path.accentColor,
					fontFamily: "'Cinzel', serif",
					fontSize: '12px',
					letterSpacing: '0.1em',
				}}
				className="px-6 py-2 rounded-lg uppercase cursor-pointer hover:opacity-80 transition-opacity"
			>
				✦ {path.buttonLabel} ✦
			</button>
		</div>
	);
}
