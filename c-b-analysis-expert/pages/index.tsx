import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Survey from "../components/survey/Survey";
import ProgressProvider from "../components/contexts/ProgressProvider";
import packageJson from "../package.json";
const Home: NextPage = () => {
  return (
    <div style={{ marginLeft: "5vw", marginRight: "5vw" }}>
      <Head>
        <title>C-B Analysis Survey</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          position: "absolute",
          left: "4vw",
          top: "2vh",
          padding: "1em",
          border: "2px dotted black",
          borderRadius: "64px",
        }}
      >
        {packageJson.version}a
      </div>
      <ProgressProvider>
        <Survey></Survey>
      </ProgressProvider>
    </div>
  );
};

export default Home;
