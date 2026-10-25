"use client";

import CustomButton from "@/shared/components/custom-button";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Qwik-Konnect</h1>
        <p>Your personal instant meeting connector</p>

        <CustomButton>Sample Button</CustomButton>

        <CustomButton variant="primary">Primary-Btn</CustomButton>
        <CustomButton variant="secondary">Secondary-Btn</CustomButton>
        <CustomButton variant="tertiary">Tertiary-Btn</CustomButton>
        <CustomButton variant="plain">Plain-Btn</CustomButton>
      </main>
    </div>
  );
}
