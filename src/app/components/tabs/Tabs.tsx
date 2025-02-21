import React, { useEffect, useState } from 'react'
import styles from './Tabs.module.css'

interface ITabsSetting {
    onTabChange: (tabName: string)=> void;
    children: React.ReactNode;
}

const TabsSettings = ({onTabChange, children}: ITabsSetting) => {
    const [activeTab, setActiveTab] = useState("TabBuy")

    useEffect(()=>{
        onTabChange(activeTab)
    },[activeTab])
    const changeTabBuy = (e: any) => {
        e.preventDefault()
        setActiveTab('TabBuy')
    }
    const changeTabRent = (e: any) => {
        e.preventDefault()
        setActiveTab('TabRent')
    }

    return (
        <div className={styles.tabContainer}>
            <div className={styles.btnContainer}>
                <button className={styles.createTabBtn} onClick={changeTabBuy}>Buy</button>
                <button className={styles.createTabBtn} onClick={changeTabRent}>Rent</button>
            </div>
            <div className={styles.tabContent}>
                {
                    activeTab === 'TabBuy' && (
                        <div>{children}</div>
                    )
                }
                {
                    activeTab === 'TabRent' && (
                        <div>{children}</div>
                    )
                }
            </div>

        </div>
    )
}
export default TabsSettings