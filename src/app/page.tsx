import Image from 'next/image'

import styles from "./page.module.css";
import PublicNavigation from "./components/publicNavigation/PublicNavigation";
import PublicFilterSearch from './components/publicFilterSearch/PublicFilterSearch';

export default function Home() {
  return (
    <div className={styles.page}>
      <PublicNavigation />
      <main className={styles.main}>
        <div className={styles.heading}>
          <h1>Experience Timeless <span>Property</span> Manangement</h1>
          <h4>Where property management made easily</h4>
          <div className={styles.btnContainer}>
            <a href="#" className={styles.exploreBtn}>Explore now</a>
          </div>
          <Image src={"/houses/bg-image.png"} alt={''} width="800" height="500" />
          <PublicFilterSearch/>
        </div>
        <div className={styles.listingContainer}>

        </div>
      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  );
}
