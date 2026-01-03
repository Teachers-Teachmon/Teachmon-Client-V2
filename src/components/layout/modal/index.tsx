import * as S from "./style";
import {createPortal} from "react-dom";
import React, { useState, useEffect} from "react";

interface ModalProps {
	children: React.ReactNode
	isOpen: boolean
	onClose: () => void
	padding?: string
}

export default function Modal({children, isOpen, onClose, padding}: ModalProps) {
	const [isClosing, setIsClosing] = useState(false)
	
	useEffect(() => {
		if (isOpen) {
			setIsClosing(false)
		}
	}, [isOpen])
	
	if (!isOpen && !isClosing) return null
	
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Escape') {
			closeModal()
		}
	}
	const closeModal = () => {
		setIsClosing(true)
		setTimeout(() => {
			onClose()
			setIsClosing(false)
		}, 100)
	}
	
    
	return createPortal(
		<S.Black
			$isClosing={isClosing}
			onClick={closeModal}
			onKeyDown={handleKeyDown}
			role="dialog"
			aria-modal="true"
			tabIndex={-1}
		>
			<S.Content $isClosing={isClosing} $padding={padding} onClick={(e) => e.stopPropagation()}>
				{children}
			</S.Content>
		</S.Black>,
		document.body
	)
}