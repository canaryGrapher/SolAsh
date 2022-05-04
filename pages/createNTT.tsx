import styles from "@styles/pages/createNTT/NTTForm.module.scss";
import RootLayout from "@layouts/Root";
import Image from "next/image";
var tagsInput = require("tags-input");
import { useEffect } from "react";

import {
  Form_Banner,
  Back_Button,
  Create_Certificate,
  Create_Token,
} from "@resources/exports";

export default function CreateNTT() {
  const typeOfForm: string = "Certificate";

  useEffect(() => {
    tagsInput(document.querySelector("#walletAddresses"));
  }, []);

  return (
    <RootLayout>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.banner_container}>
            <Image
              src={Form_Banner}
              alt="NTT Form Banner"
              layout="responsive"
            />
          </div>
          <div className={styles.form_container}>
            <div className={styles.form_header_container}>
              <div className={styles.form_header}>
                <h1 className={styles.form_title}>Issue NTT</h1>
                <p className={styles.form_subtitle}>
                  {"Issue a new NTT of type '" +
                    typeOfForm.toLocaleLowerCase() +
                    "' using the form"}
                </p>
              </div>
              <div className={styles.form_close_container}>
                <Image src={Back_Button} alt="Close" height={50} width={50} />
                <p>Go back</p>
              </div>
            </div>
            <div className={styles.form_body}>
              <div className={styles.form_body_header_container}>
                <div className={styles.form_body_header}>
                  <h2>Issue new NTT</h2>
                  <p>{typeOfForm}</p>
                </div>
                <div className={styles.form_body_header_image}>
                  <Image
                    src={
                      typeOfForm === "Certificate"
                        ? Create_Certificate
                        : Create_Token
                    }
                    alt="Representation of form type"
                    height={100}
                    width={100}
                  />
                </div>
              </div>
              <div className={styles.form_wrapper}>
                <form>
                  <div className={styles.form_component}>
                    <label>
                      Associated Community/Organization
                      <input
                        className={styles.inputFields}
                        name="associatedCommunity"
                        id="associatedCommunity"
                        type="text"
                        placeholder="Search for a community/organization"
                      />
                    </label>
                    <label>
                      NTT Title
                      <input
                        className={styles.inputFields}
                        name="nttTitle"
                        id="nttTitle"
                        type="text"
                        placeholder="Give a title to your NTT"
                      />
                    </label>
                    <label>
                      Description
                      <textarea
                        className={styles.inputFields}
                        name="nttDescription"
                        id="nttDescription"
                        placeholder="What is this NTT about?"
                        rows={5}
                      ></textarea>
                    </label>
                    <div className={styles.split_forms}>
                      <label>
                        When should we make this NTT available?
                        <input
                          className={styles.inputFields}
                          name="startDate"
                          id="startDate"
                          type="date"
                          placeholder="When should we make this NTT available?"
                        />
                      </label>
                      <label>
                        When should we stop redemption?
                        <input
                          className={styles.inputFields}
                          name="endDate"
                          id="endDate"
                          type="date"
                          placeholder="When should we stop redemption?"
                        />
                      </label>
                    </div>
                    <label>
                      Associated website
                      <input
                        className={styles.inputFields}
                        name="associatedWebsite"
                        id="associatedWebsite"
                        type="text"
                        placeholder="Is this NTT associated with a website?"
                      />
                    </label>
                    <label>
                      Wallets to share with
                      <div className={styles.wallet_input_container}>
                        <input
                          type="text"
                          name="walletAddresses"
                          id="walletAddresses"
                          placeholder="Start typing..."
                        />
                      </div>
                    </label>
                    <label>
                      Associated Image(s)
                      <input
                        className={styles.inputFields}
                        name="imageFile"
                        id="imageFile"
                        type="file"
                        accept="image/*"
                      />
                    </label>

                    <button className={styles.submit_button}>
                      Add to queue
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </RootLayout>
  );
}