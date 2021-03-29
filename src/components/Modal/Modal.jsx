import React from 'react';
import './Modal.css';

const Modal = (props) => {
	const findByKey = (name) => {
		return props.children.filter((child) => child.key === name);
	};

	const closeModal = (event) => {
		event.stopPropagation();

		if (event.target.classList.contains('modal-close')) {
			return props.click();
		}
	};

	return (
		<div
			className={
				props.className
					? `${props.className} modal-mask modal-close`
					: 'modal-mask modal-close'
			}
			onClick={closeModal}
		>
			<div className='modal-wrapper'>
				<div className='modal-container'>
					<div className='modal-header'>{findByKey('header')}</div>
					<div className='modal-body'>{findByKey('body')}</div>
					<div className='modal-footer'>
						<div className='button-container-theme-1'>
							<button
								className='modal-close element-theme-1 button-theme-3 border-radius-1rem'
								onClick={closeModal}
							>
								Close
							</button>
						</div>
						{findByKey('footer')}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
