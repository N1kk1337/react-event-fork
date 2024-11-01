import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Providers from '~/app/Providers.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import '~/shared/styles/Global.css'
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<CssBaseline />
		<Providers />
	</StrictMode>
)
