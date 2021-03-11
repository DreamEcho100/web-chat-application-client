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
		<div className='modal-mask modal-close' onClick={closeModal}>
			<div className='modal-wrapper'>
				<div className='modal-container'>
					<div className='modal-header'>{findByKey('header')}</div>
					<div className='modal-body'>{findByKey('body')}</div>
					<div className='modal-footer'>
						<button className='modal-close' onClick={closeModal}>
							Close
						</button>
						{findByKey('footer')}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
