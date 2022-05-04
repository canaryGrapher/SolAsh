import styles from "@styles/pages/landing/Home.module.scss";
import RootLayout from "@layouts/Root";

export default function Home() {
  return (
    <RootLayout>
      <div className={styles.container}>
        <main className={styles.main}>
          <p>Nothing here</p>
        </main>
      </div>
    </RootLayout>
  );
}
