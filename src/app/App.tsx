import { useState } from 'react';
import { type Character, moduleIndex, specialPaths, tracks } from './data/tracks';
import { CharacterSelectPage } from './components/CharacterSelectPage';
import { LearningPathPage } from './components/LearningPathPage';

type Page = 'select' | 'path';

export default function App() {
	const [page, setPage] = useState<Page>('select');
	const [selected, setSelected] = useState<Character>(tracks[0]);

	const [focusModule, setFocusModule] = useState<{ id: string; n: number } | null>(null);

	const handleStart = () => {
		setFocusModule(null);
		setPage('path');
	};
	const handleBack = () => setPage('select');
	const handleSelect = (c: Character) => setSelected(c);
	const handleStartSpecial = (c: Character) => {
		setSelected(c);
		setFocusModule(null);
		setPage('path');
	};
	// Chip de requisito: abre a trilha dona do módulo e foca nele
	const handleNavigateToModule = (moduleId: string) => {
		const ref = moduleIndex[moduleId];
		const target = ref && [...tracks, ...specialPaths].find((c) => c.id === ref.trackId);
		if (!target) return;
		setSelected(target);
		setFocusModule((prev) => ({ id: moduleId, n: (prev?.n ?? 0) + 1 }));
		setPage('path');
	};

	return (
		<div className="size-full" style={{background: '#060B1A'}}>
			{page === 'select' ? (
				<CharacterSelectPage
					selected={selected}
					onSelect={handleSelect}
					onStart={handleStart}
					onStartSpecial={handleStartSpecial}
				/>
			) : (
				<LearningPathPage
					key={selected.id}
					character={selected}
					onBack={handleBack}
					onNavigateToModule={handleNavigateToModule}
					focusModule={focusModule}
				/>
			)}
		</div>
	);
}
