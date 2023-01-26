export default (statusCode: number, message: string) => {
	const error: { message?: string; statusCode?: number } = new Error(message);
	error.statusCode = statusCode;
	return error;
};
