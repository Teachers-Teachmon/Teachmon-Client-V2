import * as S from "./style";
import {useModalStore} from "@/stores/modal";
import {createPortal} from "react-dom";
import React, { useState} from "react";

interface ModalProps {
	children: React.ReactNode
	padding?: string
}

export default function Modal({children, padding}: ModalProps) {
	const {close, isOpen} = useModalStore();
	const [isClosing, setIsClosing] = useState(false)
	
	if (!isOpen && !isClosing) return null
	
	const closeModal = () => {
		setIsClosing(true)
		setTimeout(() => {
			close()
			setIsClosing(false)
		}, 100)
	}
	
    
	return createPortal(
		<S.Black
			$isClosing={isClosing}
			onClick={closeModal}
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