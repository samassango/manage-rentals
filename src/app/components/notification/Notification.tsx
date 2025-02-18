import React, { useEffect, useState } from 'react';
import styles from './Notification.module.css'
const notificationData = [
    {
        id: 1,
        name: "Sizwe Mabhayila",
        message: "Hi, I saw your ads on Construtech Properties, I was hoping to view the property. please reachout to me."
    },
    {
        id: 2,
        name: "Lee-Anny Van Wyk",
        message: "Hi, Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti sequi quos dicta quis nam eveniet voluptatibus temporibus mollitia enim? Tempore."
    },
    {
        id: 2,
        name: "Kwesi Madam",
        message: "Hi, Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque aut est sapiente voluptatem, quasi asperiores."
    }
]
export default function Nofications() {
    const [notifications, setNofications] = useState<any[]>([])
    useEffect(() => {
        setNofications(notificationData);
    }, [])
    return (
        <div className={styles.notificationsContainer}>
            {notifications.length ?
                (notifications.map(data => (
                    <div className={styles.content}>
                        <div className={styles.displayName}>
                            {data.name}
                        </div>
                        <div className={styles.message}>
                            {data.message}
                        </div>
                    </div>
                )))
                : 'No nofications as yet'
            }

        </div>
    );
}
