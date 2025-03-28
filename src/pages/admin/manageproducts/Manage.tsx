import React, { useState } from 'react'
import { BiSolidEditAlt } from 'react-icons/bi'
import { IoTrashOutline } from 'react-icons/io5'
import { motion } from 'framer-motion'
import {
	useDeleteCandleMutation,
	useGetCandlesQuery,
	useUpdateCandleMutation,
} from '../../..//redux/api/chandelier.api'

interface Candle {
	id: string
	title: string
	image: string
	price: number
}

const Manage = () => {
	const { data, isLoading, error } = useGetCandlesQuery()
	const candles: Candle[] = Array.isArray(data) ? (data as Candle[]) : []

	const [editingCandle, setEditingCandle] = useState<Candle | null>(null)

	if (isLoading) return <p>Loading...</p>
	if (error) return <p>Error fetching candles</p>

	return (
		<>
			<div>
				<h2 className='pt-5.5 text-[#454545] text-[28px] font-medium'>
					Manage Products
				</h2>
				<div className='flex flex-wrap items-center my-[43px] gap-6'>
					{candles.map(candle => (
						<div
							key={candle.id}
							className='flex flex-col gap-4 w-[326px] h-[395px] p-4'
						>
							<div className='pt-[11px] px-[68px] pb-[32px]'>
								<img
									src={candle.image}
									alt={candle.title}
									className='w-full h-[200px] object-cover rounded-lg'
								/>
							</div>
							<div className='flex flex-col gap-6'>
								<span className='text-[20px] text-[#454545] font-medium pl-[20px] pr-[72px]'>
									{candle.title}
								</span>
								<div className='flex items-center justify-between px-4'>
									<div className='flex flex-col'>
										<del className='text-[12px] text-[#9F9F9F] font-medium'>
											7 000₽
										</del>
										<span className='text-[#454545] text-[20px] font-bold'>
											{candle.price}₽
										</span>
									</div>
									<div className='flex items-center gap-2.5'>
										<button
											onClick={() => setEditingCandle(candle)}
											className='w-[55px] h-[33px] bg-[#454545] rounded-[100px] text-white hover:bg-white border hover:border-[#454545] hover:text-black transition-colors'
										>
											<BiSolidEditAlt className='text-2xl mx-auto' />
										</button>
										<DeleteButton id={candle.id} />
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Edit Modal */}
			{editingCandle && (
				<EditModal
					candle={editingCandle}
					onClose={() => setEditingCandle(null)}
				/>
			)}
		</>
	)
}

// delete section // delete section // delete section // delete section // delete section // delete section // delete section
const DeleteButton = ({ id }: { id: string }) => {
	const [deleteCandle, { isLoading }] = useDeleteCandleMutation()

	const handleDelete = async () => {
		if (window.confirm('Are you sure you want to delete this candle?')) {
			try {
				await deleteCandle(id).unwrap()
				console.log('Candle deleted successfully')
			} catch (error) {
				console.error('Error deleting candle:', error)
			}
		}
	}

	return (
		<button
			onClick={handleDelete}
			disabled={isLoading}
			className={`w-[55px] h-[33px] rounded-[100px] text-white transition-colors ${
				isLoading
					? 'bg-gray-500'
					: 'bg-[#454545] hover:bg-white hover:text-black border hover:border-[#454545]'
			}`}
		>
			<IoTrashOutline className='text-2xl mx-auto' />
		</button>
	)
}

// edit section // edit section // edit section // edit section // edit section // edit section // edit section
const EditModal = ({
	candle,
	onClose,
}: {
	candle: Candle
	onClose: () => void
}) => {
	const [title, setTitle] = useState(candle.title)
	const [image, setImage] = useState(candle.image)
	const [price, setPrice] = useState(candle.price)
	const [updateCandle, { isLoading }] = useUpdateCandleMutation()

	const handleUpdate = async () => {
		try {
			await updateCandle({ id: candle.id, title, image, price }).unwrap()
			alert('Candle updated successfully!')
			onClose()
		} catch (error) {
			console.error('Error updating candle:', error)
		}
	}

	return (
		<motion.div
			className='fixed inset-0 flex items-center justify-center bg-white bg-opacity-30 backdrop-blur-md'
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.9 }}
		>
			<motion.div
				className='bg-white bg-opacity-80 p-8 rounded-2xl shadow-xl w-[450px] backdrop-blur-lg'
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
			>
				<h2 className='text-2xl font-bold text-gray-800 mb-6'>Edit Candle</h2>

				<label className='block mb-4'>
					<span className='text-gray-700 font-medium'>Title:</span>
					<input
						type='text'
						value={title}
						onChange={e => setTitle(e.target.value)}
						className='w-full border border-gray-300 rounded-lg p-3 mt-2 bg-white bg-opacity-60 focus:ring-2 focus:ring-blue-500'
					/>
				</label>

				<label className='block mb-4'>
					<span className='text-gray-700 font-medium'>Image URL:</span>
					<input
						type='text'
						value={image}
						onChange={e => setImage(e.target.value)}
						className='w-full border border-gray-300 rounded-lg p-3 mt-2 bg-white bg-opacity-60 focus:ring-2 focus:ring-blue-500'
					/>
				</label>

				<label className='block mb-4'>
					<span className='text-gray-700 font-medium'>Price (₽):</span>
					<input
						type='number'
						value={price}
						onChange={e => setPrice(Number(e.target.value))}
						className='w-full border border-gray-300 rounded-lg p-3 mt-2 bg-white bg-opacity-60 focus:ring-2 focus:ring-blue-500'
					/>
				</label>

				<div className='flex justify-between mt-6'>
					<motion.button
						onClick={onClose}
						whileTap={{ scale: 0.95 }}
						className='px-5 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all'
					>
						Cancel
					</motion.button>
					<motion.button
						onClick={handleUpdate}
						disabled={isLoading}
						whileTap={{ scale: 0.95 }}
						className={`px-5 py-3 rounded-lg transition-all ${
							isLoading
								? 'bg-gray-400 cursor-not-allowed'
								: 'bg-blue-600 hover:bg-blue-700 text-white'
						}`}
					>
						{isLoading ? 'Updating...' : 'Update'}
					</motion.button>
				</div>
			</motion.div>
		</motion.div>
	)
}

export default React.memo(Manage)
