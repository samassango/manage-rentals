import React, { useEffect, useState } from 'react';
import styles from './MessageModel.module.css'
import { FaInfoCircle } from 'react-icons/fa';
import { MdOutlineError } from 'react-icons/md';

export enum MessageType {
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS',
    INFO = 'INFO'
}

export interface IMessageDialog {
    isModalOpen: boolean;
    title?: string;
    onIconClose?: (evt: any) => void;
    messageType: MessageType;
    message: string;
    isClosable?: boolean;
    closeBtnLabel?: string;
    isContainueActive?: boolean;
    containueBtnLabel?: string;
    onContinueHandler?: (evt: any) => void
}
export default function MessageModel(dialog: IMessageDialog) {
    const [isOpen, setIsOpen] = useState(false)

    const { isModalOpen, title, onIconClose, messageType, onContinueHandler, isClosable, isContainueActive } = dialog

    useEffect(() => {
        setIsOpen(isModalOpen)
    }, [isModalOpen])

    const closeModal = (evt: any) => {
        setIsOpen(false)
        onIconClose && onIconClose(evt)
    }

    const renderIconByMessageType = (messageType: MessageType) => {
        if (messageType === MessageType.INFO) return <FaInfoCircle />
        if (messageType === MessageType.ERROR) return <MdOutlineError />
        if (messageType === MessageType.SUCCESS) return <MdOutlineError />
        return <></>
    }

    const renderMessageContent = () => {
        const { message } = dialog
        if (message) {
            return <span className={styles.message}>
                {message}
            </span>
        }
        return <></>
    }

    const renderModelActions = () => {
        if (isClosable || isContainueActive) {
            const { closeBtnLabel, containueBtnLabel } = dialog
            return (
                <div className={styles.actions}>
                    {isClosable && <button className={styles.closeBtn} onClick={closeModal}>{closeBtnLabel || 'Close'}</button>}
                    {isContainueActive && <button className={styles.continueBtn} onClick={(evt) => onContinueHandler && onContinueHandler(evt)}>{containueBtnLabel || 'Continue'}</button>}
                </div>
            )
        }
        return <></>
    }
    
    if (isOpen) {
        return (
            <div className={styles.messageModelContainer}>

                <div className={styles.messageModelContent}>

                    <div className={styles.messageModelHeader}>
                        <div className={styles.titleBar}>
                            {
                                renderIconByMessageType(messageType)
                            }
                            {messageType && <label htmlFor='titlle'>{title || messageType}</label>}
                        </div>
                    </div>
                    <div className={styles.contentMessage}>
                        {renderMessageContent()}
                    </div>
                    
                    {renderModelActions()}
                </div>

            </div>
        );
    }
    return <></>
}
