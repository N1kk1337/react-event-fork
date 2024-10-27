import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Providers from '~/app/Providers.tsx'
import '~/shared/styles/Global.css'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Providers></Providers>
	</StrictMode>
)
