import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useCreateCandleMutation } from '../../../redux/api/chandelier.api'

interface CandleFormData {
	title: string
	price: string
	image: string
	category: string
	desc: string
	id: string
}

const Create = () => {
	const [formData, setFormData] = useState<CandleFormData>({
		title: '',
		price: '',
		image: '',
		category: 'Shaded',
		desc: '',
		id: '',
	})

	const [createCandle, { isLoading }] = useCreateCandleMutation()

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const payload = {
			title: formData.title,
			price: parseFloat(formData.price),
			image: formData.image,
			category: formData.category,
			desc: formData.desc,
		}

		console.log('Sending payload:', payload)

		try {
			const response = await createCandle(payload).unwrap()
			console.log('Response from API:', response)

			toast.success('Candle created successfully!')

			setFormData({
				title: '',
				price: '',
				image: '',
				category: 'Shaded',
				desc: '',
				id: '',
			})
		} catch (error) {
			console.error('API Error:', error)
			toast.error('Failed to create candle. Check console for details.')
		}
	}

	return (
		<div className='max-w-[620px] p-6'>
			<h1 className='text-2xl font-bold mb-8'>Create product</h1>

			<form className='space-y-6' onSubmit={handleSubmit}>
				<div>
					<label className='block mb-2 text-sm font-medium'>Title</label>
					<input
						type='text'
						name='title'
						value={formData.title}
						onChange={handleChange}
						className='w-full h-[58px] rounded-[10px] border border-gray-300 px-[16px] py-[8px] focus:outline-none focus:ring-2 focus:ring-[#ddd] bg-[#F8F8F8]'
						required
					/>
				</div>

				<div>
					<label className='block mb-2 text-sm font-medium'>Price</label>
					<input
						type='text'
						name='price'
						value={formData.price}
						onChange={handleChange}
						className='w-full h-[58px] rounded-[10px] border border-gray-300 px-[16px] py-[8px] focus:outline-none focus:ring-2 focus:ring-[#ddd] bg-[#F8F8F8]'
						required
					/>
				</div>

				<div>
					<label className='block mb-2 text-sm font-medium'>Image URL</label>
					<input
						type='url'
						name='image'
						value={formData.image}
						onChange={handleChange}
						className='w-full h-[58px] rounded-[10px] border border-gray-300 px-[16px] py-[8px] focus:outline-none focus:ring-2 focus:ring-[#ddd] bg-[#F8F8F8]'
						required
					/>
				</div>

				<div>
					<label className='block mb-2 text-sm font-medium'>Category</label>
					<select
						name='category'
						value={formData.category}
						onChange={handleChange}
						className='w-full h-[58px] rounded-[10px] border border-gray-300 px-[16px] py-[8px] focus:outline-none focus:ring-2 focus:ring-[#ddd] bg-[#F8F8F8]'
						required
					>
						<option value='Shaded'>Shaded</option>
						<option value='Sputnik'>Sputnik</option>
						<option value='Lantern'>Lantern</option>
						<option value='Candle-Style'>Candle-Style</option>
					</select>
				</div>

				<div>
					<label className='block mb-2 text-sm font-medium'>Description</label>
					<textarea
						name='desc'
						value={formData.desc}
						onChange={handleChange}
						className='w-full h-[120px] rounded-[10px] border border-gray-300 px-[16px] py-[12px] focus:outline-none focus:ring-2 focus:ring-[#ddd] bg-[#F8F8F8]'
						required
					/>
				</div>

				<button
					type='submit'
					disabled={isLoading}
					className='bg-[#454545] text-white rounded-[5px] px-16 py-2.5 hover:bg-[#353535] transition-colors font-medium disabled:opacity-50'
				>
					{isLoading ? 'Creating...' : 'Create'}
				</button>
			</form>
		</div>
	)
}

export default React.memo(Create)
