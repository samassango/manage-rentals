import React, { useEffect, useState } from 'react';
import styles from './ModalDialog.module.css'
export interface IModalDialog {
    isModalOpen: boolean;
    enableCloseIcon: boolean;
    title: string;
    onIconClose: () => void
    children: React.ReactNode;
    titleBarDialogIcon: () => React.ReactNode;
}
export default function ModalDialog(dialog: IModalDialog) {
    const [isOpen, setIsOpen] = useState(false)

    const { children, enableCloseIcon, isModalOpen, title, onIconClose, titleBarDialogIcon } = dialog

    useEffect(() => {
        setIsOpen(isModalOpen)
    }, [isModalOpen])

    const closeModal = () => {
        setIsOpen(false)
        onIconClose()
    }
    if (isOpen) {
        return (
            <div className={styles.modalContainer}>

                <div className={styles.modalContent}>

                    <div className={styles.modalHeader}>
                        <div className='titleBar'>
                            {titleBarDialogIcon && titleBarDialogIcon()}
                            {title && <label htmlFor='titlle'>{title}</label>}
                        </div>
                        {enableCloseIcon && <span className={styles.close} onClick={closeModal}>&times;</span>}
                    </div>

                    {children}
                </div>

            </div>
        );
    }
    return <></>
}
