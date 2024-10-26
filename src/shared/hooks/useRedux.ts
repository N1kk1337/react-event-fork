import {
	type TypedUseSelectorHook,
	useDispatch,
	useSelector
} from 'react-redux'
import type { AppDispatch, RootState } from '~/app/index.ts'

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
