import type { Character } from '../data/tracks';
import { getTrackIcon } from './trackIcons';

interface CharacterCardProps {
	character: Character;
	isSelected: boolean;
	onClick: () => void;
}

export function CharacterCard({ character, isSelected, onClick }: CharacterCardProps) {
	const Icon = getTrackIcon(character.icon);

	return (
		<button
			onClick={onClick}
			style={{
				borderColor: isSelected ? character.accentColor : 'rgba(255,255,255,0.1)',
				boxShadow: isSelected ? `0 0 24px ${character.accentGlow}, 0 0 8px ${character.accentGlow}` : 'none',
				background: isSelected ? `linear-gradient(135deg, rgba(13,21,38,0.95), rgba(13,21,38,0.8))` : 'rgba(13,21,38,0.6)',
				minWidth: '120px',
				maxWidth: '140px',
				transition: 'all 0.3s ease',
			}}
			className="flex flex-col items-center gap-2 p-4 rounded-xl border cursor-pointer flex-shrink-0"
			>
			<div
				style={{
					background: isSelected ? `radial-gradient(circle, ${character.accentGlow}, transparent)` : 'rgba(255,255,255,0.05)',
					border: `1px solid ${isSelected ? character.accentColor : 'rgba(255,255,255,0.1)'}`,
				}}
				className="w-14 h-14 rounded-full flex items-center justify-center"
				>
				<Icon size={24} color={isSelected ? character.accentColor : '#9CA3AF'}/>
			</div>
			<span
				style={{
					fontFamily: "'Cinzel', serif",
					color: isSelected ? character.accentColor : '#9CA3AF',
					fontSize: '11px',
				}}
				className="text-center leading-tight"
				>
				{character.name}
			</span>
			<span
				style={{fontFamily: "'Inter', sans-serif", fontSize: '9px'}}
				className="text-gray-500 text-center leading-tight"
				>
				{character.title}
			</span>
			{isSelected && (
				<div
					style={{backgroundColor: character.accentColor, width: '30px', height: '3px', borderRadius: '2px'}}
				/>
			)}
		</button>
	);
}
