import classes from './Form.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { sendCartData } from '../../store/slices/cartActions'
import { getHandler } from '../../store/slices/cartActions'
const Form = () => {
	const dispatch = useDispatch()

	const [formState, setFromState] = useState({
		title: '',
		price: '',
		
	})

	const formHandler = (e) => {
		const value = e.target.value
		setFromState({
			...formState,
			id: Math.random().toString(),
			[e.target.name]: value,
		})
	}

	const submitHandler = (e) => {
		e.preventDefault()

		dispatch(sendCartData(formState))
		dispatch(getHandler())
		setFromState({
			title: '',
			price: '',
			
		})
	}

	return (
		<section className={classes.form}>

			<form onSubmit={submitHandler}>
				<div>
					<label htmlFor='title'>Title</label>
					<input
						type='text'
						name='title'
						onChange={formHandler}
						id='title'
						value={formState.name}
					/>
				</div>
				<div>
					<label htmlFor='price'>Price</label>
					<input
						type='number'
						name='price'
						onChange={formHandler}
						id='price'
						value={formState.price}
					/>
				</div>
			

				<button>Add To Cart</button>
			</form>
		</section>
	)
}

export default Form
