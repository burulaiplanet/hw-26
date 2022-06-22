import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Cart from './components/Cart/Cart'
import Layout from './components/Layout/Layout'
import Form from './components/Shop/Form'
import Notification from './components/UI/Notification'
import { getHandler } from './store/slices/cartActions'

import { uiActions } from './store/slices/uiSlice'

// let isInitial = true
function App() {
	const dispatch = useDispatch()
	const isShow = useSelector((state) => state.ui.cartIsVisible)
	const notification = useSelector((state) => state.ui.notification)
	const cartItems = useSelector((state) => state.cart.totalQuantity);

	useEffect(() => {
		let timer
		if (notification) {
			timer = setTimeout(() => {
				dispatch(uiActions.hideNotification())
			}, 3000)
		}

		return () => {
			clearTimeout(timer)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [notification])

	useEffect(()=>{
		dispatch(getHandler())
	  },[])
	


	return (
		<>
			{notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					message={notification.message}
				/>
			)}
			<Layout>
				{isShow && <Cart />}
				<Form />
				{/* <Product/> */}
			</Layout>
		</>
	)
}

export default App
