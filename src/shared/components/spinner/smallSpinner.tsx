import React from 'react';

const SmallSpinner: React.FC<{ className?: string }> = (props) => {
	return (
		<svg viewBox="25 25 50 50" className={`circular width--30 height--30 solid-spinner ${props.className || ''}`}>
			<circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
		</svg>
	);
};

export default SmallSpinner;
