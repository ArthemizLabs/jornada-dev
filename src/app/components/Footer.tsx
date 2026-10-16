import { Github } from 'lucide-react';

export const REPO_URL = 'https://github.com/ArthemizLabs/jornada-dev';

export function Footer() {
	return (
		<div className="text-center py-8 border-t" style={{borderColor: 'rgba(255,255,255,0.05)'}}>
			<p style={{fontFamily: "'Cinzel', serif", fontSize: '11px', color: '#334155', letterSpacing: '0.2em'}}>
				JORNADA DEV © 2026 · FORJE SEU DESTINO ·{' '}
				<a
					href={REPO_URL}
					target="_blank"
					rel="noopener noreferrer"
					title="Repositório do projeto no GitHub"
					style={{color: '#334155', padding: '2px 4px'}}
					className="uppercase hover:opacity-70 transition-opacity inline-flex items-center justify-center gap-0.5 whitespace-nowrap"
				>
					<Github size={12}/> Github
				</a>
			</p>
		</div>
	);
}
