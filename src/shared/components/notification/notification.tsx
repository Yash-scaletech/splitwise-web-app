import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Notification: React.FC = () => {
	return (
		<Toaster
			position="top-right"
			reverseOrder={false}
			containerStyle={{
				zIndex: 99999
			}}
		/>
	);
};

type NotificationType = 'success' | 'error';

export const notify = (message: string, type?: NotificationType, options: any = {}) => {
	const msg = `${message[0].toUpperCase()}${message.substr(1)}`;

	options = {
		duration: 3000,
		icon: null,
		style: {
			background: '#dc3545',
			color: '#FFFFFF',
			fontWeight: 500,
			zIndex: 99999
		},
		...options
	};

	if (type === 'success') {
		toast.success(msg, { ...options, style: { ...options.style, background: '#28a745' } });
	} else if (type === 'error') {
		toast.error(msg, { ...options, style: { ...options.style, background: '#dc3545' } });
	} else {
		toast(message, options);
	}
};

export default Notification;
