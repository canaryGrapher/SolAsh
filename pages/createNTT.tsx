import styles from "@styles/pages/createNTT/NTTForm.module.scss";
import RootLayout from "@layouts/Root";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import Router from "next/router";
import { useMetaMask } from "metamask-react";
import { mintNTT, deployNTT } from "@graphAPI/createNTT";
import Waiting from "@components/modal/misc/Waiting";
// @ts-ignore
import WAValidator from "wallet-address-validator";
import { create } from "ipfs-http-client";
import {
  Form_Banner,
  Back_Button,
  Create_Certificate,
  Create_Token,
} from "@resources/exports";

const projectId = "26T71DQUMGsDqJcbmNzNdD2btBg";
const projectSecret = "e54718eac074f9920126927927c75b23";
const projectIdAndSecret = `${projectId}:${projectSecret}`;

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: `Basic ${Buffer.from(projectIdAndSecret).toString(
      "base64"
    )}`,
  },
});

const validateWalletInput = (wallet: string) => {
  const wallets = wallet.split(",");
  console.log(wallets);
  let isValid = true;
  for (let i = 0; i < wallets.length; i++) {
    const currentWallet = wallets[i].trim();
    console.log("Current Wallet: ", currentWallet);
    if (currentWallet.length > 0) {
      if (!WAValidator.validate(currentWallet, "ETH")) {
        isValid = false;
        console.log(`Wallet ${wallets[i]} is not valid`);
      } else {
        console.log(`Wallet ${wallets[i]} is valid`);
      }
    }
  }
  return isValid;
};

function containsDuplicates(wallets: string) {
  const array = wallets.split(",");
  const newArray = array.map((element: string) => {
    return element.trim();
  });
  if (newArray.length !== new Set(newArray).size) {
    return true;
  }
  return false;
}

const generateTimeStamp = () => {
  var tzoffset = new Date().getTimezoneOffset() * 60000;
  const today = new Date(Date.now() - tzoffset);
  const startDate = new Date(today.getTime());
  startDate.setTime(startDate.getTime() + 60 * 60 * 1000 * 2);
  const StartFormat = startDate
    .toISOString()
    .substring(0, ((startDate.toISOString().indexOf("T") | 0) + 6) | 0);
  const endDate = new Date(today.getTime() + 60 * 60 * 1000 * 2);

  const NextFormat = endDate
    .toISOString()
    .substring(0, ((endDate.toISOString().indexOf("T") | 0) + 6) | 0);
  return { StartFormat: StartFormat, NextFormat: NextFormat };
};

export default function CreateNTT({ parameters }: any) {
  const { ethereum } = useMetaMask();
  const [loading, setLoading] = useState(false);
  const [typeOfForm, setTypeOfForm] = useState<any>("Certificate");
  const [message, setMessage] = useState<any>(
    "Please wait while your transaction is being processed."
  );

  // form related states
  const [startDateValue, setStartDateValue] = useState<any>("");
  const [endDateValue, setEndDateValue] = useState<any>("");
  const [walletValue, setWalletValue] = useState<string>("");
  const [communityValue, setCommunityValue] = useState<string>("");
  const [descriptionValue, setDescriptionValue] = useState<string>("");
  const [nttTitleValue, setNTTTitleValue] = useState<string>("");
  const [websiteValue, setWebsiteValue] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [uploadMessage, setUploadMessage] = useState<string>("");

  const mintFunction = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validInput = validateWalletInput(
      // @ts-ignore
      e.target.elements.walletAddresses.value
    );
    if (validInput) {
      setLoading(true);
      mintNTT(
        nttTitleValue,
        descriptionValue,
        websiteValue,
        imageUrl,
        communityValue,
        startDateValue,
        endDateValue,
        walletValue,
        ethereum
      )
        .then((res) => {
          console.log(res);
          setMessage(
            "Your transaction was added to queue successfully! Check out your wallet for further actions"
          );
        })
        .catch((err) => {
          console.log(err);
          setMessage("There was an error minting your NTT. Please try again.");
        })
        .finally(() => {
          setLoading(false);
          // @ts-ignore
          document.getElementById("form-fields").reset();
          // Router.push("/dashboard");
        });
    } else {
      setErrorMessage("One or more wallet addresses isn't valid");
    }
  };

  const checkValidity = (value: string) => {
    console.log(value);
    setErrorMessage("");
    setWalletValue(value);
    const duplicates = containsDuplicates(value);
    if (duplicates) {
      setErrorMessage("One or more repeated wallet addresses");
    } else {
      if (value.length > 0) {
        const valid = validateWalletInput(value);
        if (!valid) {
          setErrorMessage("One or more wallet addresses isn't valid");
        } else {
          setErrorMessage("");
        }
      }
    }
  };

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    //upload image to IPFS
    // @ts-ignore
    const file = event.target.files[0];

    if (!file) return;
    setUploadMessage("Uploading image...");
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`Received: ${prog}`),
      });

      const url = `https://ipfs.io/ipfs/${added.path}`;
      setImageUrl(added.path);
      console.log("Added file to IPFS:" + imageUrl + " : " + url);
      setUploadMessage("Uploaded");
    } catch (error) {
      console.log("Error uploading file to IPFS: ", error);
    }
  };

  const { StartFormat, NextFormat } = generateTimeStamp();

  useEffect(() => {
    const route = parameters;
    if (route === "Certificate" || route === "Token") {
      setTypeOfForm(route);
    } else {
      alert("Invalid type in URL! Redirecting you back to the dashboard.");
      Router.push("/dashboard");
    }
  }),
    [];

  return (
    <Fragment>
      {loading ? <Waiting message={message} /> : null}
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
                  <form
                    id="form-fields"
                    onSubmit={(e: React.ChangeEvent<HTMLFormElement>) =>
                      mintFunction(e)
                    }
                  >
                    <div className={styles.form_component}>
                      <label>
                        Associated Community/Organization
                        <input
                          required={true}
                          className={styles.inputFields}
                          name="associatedCommunity"
                          id="associatedCommunity"
                          value={communityValue}
                          onChange={(e) => setCommunityValue(e.target.value)}
                          type="text"
                          placeholder="Search for a community/organization"
                        />
                      </label>
                      <label>
                        NTT Title
                        <input
                          required={true}
                          className={styles.inputFields}
                          name="nttTitle"
                          value={nttTitleValue}
                          onChange={(e) => setNTTTitleValue(e.target.value)}
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
                          value={descriptionValue}
                          onChange={(e) => setDescriptionValue(e.target.value)}
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
                            type="datetime-local"
                            required={true}
                            min={StartFormat}
                            value={startDateValue}
                            onChange={(e) => setStartDateValue(e.target.value)}
                            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                            placeholder="When should we make this NTT available?"
                          />
                        </label>
                        <label>
                          When should we stop redemption?
                          <input
                            className={styles.inputFields}
                            name="endDate"
                            id="endDate"
                            type="datetime-local"
                            value={endDateValue}
                            onChange={(e) => setEndDateValue(e.target.value)}
                            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                            min={NextFormat}
                            placeholder="When should we stop redemption?"
                          />
                        </label>
                      </div>
                      <label>
                        Associated website
                        <input
                          className={styles.inputFields}
                          name="associatedWebsite"
                          value={websiteValue}
                          onChange={(e) => setWebsiteValue(e.target.value)}
                          id="associatedWebsite"
                          type="text"
                          placeholder="Is this NTT associated with a website?"
                        />
                      </label>
                      <label>
                        Wallets to share with
                        <textarea
                          className={styles.inputFields}
                          rows={5}
                          required={true}
                          name="walletAddresses"
                          value={walletValue}
                          onChange={(e) => checkValidity(e.target.value)}
                          id="walletAddresses"
                          placeholder="Start typing..."
                        ></textarea>
                      </label>
                      <label>
                        Associated Image(s)
                        <input
                          className={styles.inputFields}
                          name="imageFile"
                          id="imageFile"
                          type="file"
                          accept="image/*"
                          onChange={onImageChange}
                        />
                        <p>{uploadMessage}</p>
                      </label>
                      <p className={styles.errorMessage}>
                        {errorMessage ? <span>Error: </span> : null}
                        {errorMessage}
                      </p>
                      <button className={styles.submit_button}>
                        {loading ? "Transacting..." : "Add to queue"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </RootLayout>
    </Fragment>
  );
}

export async function getServerSideProps({ query }: any) {
  const parameters = query.type;
  const mode = query.mode;
  const contractAddress = query.contractAddress ? query.contractAddress : "";
  return {
    props: {
      parameters,
      mode,
      contractAddress,
    },
  };
}
