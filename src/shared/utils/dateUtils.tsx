export const displayDate = ({ date }: { date: string }) => {
	try {
		const convertedDate = new Date(date)
		return convertedDate.toLocaleDateString()
	} catch (e) {
		console.log(e)
		return date
	}
}
