import type React from 'react';
import {
	Server, Monitor, Layers, Cloud, BarChart2, Brain, Smartphone, Gamepad2, Cuboid,
	ShieldAlert, ShieldBan, Palette, Bug, Database, Cpu, Bot, Link,
	Sparkles, Flame, Sigma,
} from 'lucide-react';

type TrackIcon = React.ComponentType<{ size?: number; color?: string }>;

/** Único registro de ícones de trilha: seleção e página da trilha usam o mesmo, sem repetir ícone entre trilhas. */
const trackIconMap: Record<string, TrackIcon> = {
	Server, Monitor, Layers, Cloud, BarChart2, Brain, Smartphone, Gamepad2, Cuboid,
	ShieldAlert, ShieldBan, Palette, Bug, Database, Cpu, Bot, Link,
	Sparkles, Flame, Sigma,
};

export const getTrackIcon = (name: string): TrackIcon => trackIconMap[name] ?? Server;
