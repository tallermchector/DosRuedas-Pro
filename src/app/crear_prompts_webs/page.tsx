import { Metadata } from 'next';
import CrearPromptsWebsView from '@/components/paginas/crear_prompts_webs/CrearPromptsWebsView';

export const metadata: Metadata = {
  title: 'Crear Prompts Webs | Envíos DosRuedas',
  description: 'Optimizador de prompts en lenguaje natural con Genkit para componentes de interfaz de usuario basados en docs/contenido.',
};

export default function CrearPromptsWebsPage() {
  return <CrearPromptsWebsView />;
}
