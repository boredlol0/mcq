import React, { useState } from "react";
import NavBar from "@/components/navbar";
import { useRouter } from "next/router";
import { Button, Grid, Loading, Text, Tooltip } from "@nextui-org/react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import Link from "next/link";

GlobalWorkerOptions.workerSrc =
  "//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";

const series = {
  F: "m",
  M: "s",
  O: "w",
};

const baseUrls = {
  "0625": "https://papers.xtremepape.rs/CAIE/IGCSE/Physics%20(0625)/",
  "0620": "https://papers.gceguide.com/Cambridge%20IGCSE/Chemistry%20(0620)/",
  "0610": "https://papers.gceguide.com/Cambridge%20IGCSE/Biology%20(0610)/",
};

export default function Paper() {
  const [testFinished, setTestFinished] = useState(false);
  const [questionNum, setQuestionNum] = useState(1);
  const handleQuestion = (choice) => {
    if (questionNum >= 40) {
      setTestFinished(true);
      return;
    }
    if (choice === answers[questionNum - 1]) {
      setCorrectQuestions(correctQuestions + 1);
    } else {
      setIncorrectQuestions(incorrectQuestions + 1);
    }
    setQuestionNum(questionNum + 1);
  };
  const [correctQuestions, setCorrectQuestions] = useState(0);
  const [incorrectQuestions, setIncorrectQuestions] = useState(0);
  const [answers, setAnswers] = useState();
  const router = useRouter();
  const code = router.query.code;
  if (!code) {
    return <></>;
  }

  let codeFixed = code.split("/");
  const temp = codeFixed[1];
  codeFixed[1] = codeFixed[4];
  codeFixed[4] = temp;
  codeFixed = codeFixed.join("/");
  if (testFinished === true) {
    return (
      <>
        <NavBar active={codeFixed} results={true}></NavBar>
        <Text
          h1
          size={60}
          css={{
            textGradient: "45deg, $purple600 -20%, $pink600 100%",
            textAlign: "center",
          }}
          weight="bold"
        >
          Your Results.
        </Text>
        <br></br>
        <Text
          h2
          weight={"bold"}
          css={{
            textGradient: "45deg, $green600 -20%, $yellow600 100%",
            textAlign: "center",
          }}
        >
          {Math.round((correctQuestions / incorrectQuestions) * 100)}%
          <Text h6 weight={"bold"}>
            ({correctQuestions}/40 Correct)
          </Text>
        </Text>
        <Grid.Container gap={17} justify="center">
          <Grid>
            <Link href={"/"}>
              <Button size="lg" rounded color={"success"} ghost>
                Home
              </Button>
            </Link>
          </Grid>
          <Grid>
            <Button
              size="lg"
              rounded
              color={"warning"}
              ghost
              onPress={() => {
                router.reload();
              }}
            >
              Redo
            </Button>
          </Grid>
        </Grid.Container>
      </>
    );
  }

  const splitCode = code.split("/");
  const qpUrl =
    baseUrls[splitCode[0]] +
    `${splitCode[0]}_${series[splitCode[2]]}${splitCode[1]}_qp_${
      splitCode[4]
    }.pdf`;
  const msUrl =
    baseUrls[splitCode[0]] +
    `${splitCode[0]}_${series[splitCode[2]]}${splitCode[1]}_ms_${
      splitCode[4]
    }.pdf`;

  const fetchAnswers = async () => {
    try {
      let doc = await getDocument(msUrl).promise;
      let page1 = await doc.getPage(2);
      let content = await page1.getTextContent();
      let answers1 = content.items
        .map((item) => {
          return item.str;
        })
        .filter((item) => {
          // only return values that are exactly one alphabet long and capitalized
          return item.length === 1 && item.match(/[A-Z]/);
        });
      let page2 = await doc.getPage(3);
      let content2 = await page2.getTextContent();
      let answers2 = content2.items
        .map((item) => {
          return item.str;
        })
        .filter((item) => {
          // only return values that are exactly one alphabet long and capitalized
          return item.length === 1 && item.match(/[A-Z]/);
        });
      answers1.push(...answers2);
      setAnswers(answers1);
    } catch (e) {
      console.error(e);
    }
  };
  if (!answers) {
    fetchAnswers();
    return (
      <>
        <NavBar active={codeFixed}></NavBar>
        <Loading
          size="xl"
          css={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "50%",
            marginTop: "15%",
          }}
        />
      </>
    );
  }
  return (
    <>
      <NavBar active={codeFixed}></NavBar>
      {/* <iframe
        src={`https://docs.google.com/gview?embedded=true&url=${qpUrl}#view=FitH&page=2`}
        title="test"
        height={"493px"}
        width={"600px"}
        style={{
          position: "absolute",
          right: "20px",
        }}
      ></iframe>
      <Text h2>Solving Question {questionNum}</Text>
      <Text h4>Correct: {correctQuestions}</Text>
      <Text h4>Incorrect: {incorrectQuestions}</Text>
      <Grid.Container gap={2} css={{ marginLeft: "150px", marginTop: "6%" }}>
        <Grid>
          <Button
            color="primary"
            auto
            shadow
            size={"xl"}
            css={{ width: "100px" }}
            onPress={() => handleQuestion("A")}
          >
            A
          </Button>
        </Grid>
        <Grid>
          <Button
            color="primary"
            auto
            shadow
            size={"xl"}
            css={{ width: "100px" }}
            onPress={() => handleQuestion("B")}
          >
            B
          </Button>
        </Grid>
      </Grid.Container>
      <Grid.Container gap={2} css={{ marginLeft: "150px", marginTop: "15px" }}>
        <Grid>
          <Button
            color="primary"
            auto
            shadow
            size={"xl"}
            css={{ width: "100px" }}
            onPress={() => handleQuestion("C")}
          >
            C
          </Button>
        </Grid>
        <Grid>
          <Button
            color="primary"
            auto
            shadow
            size={"xl"}
            css={{ width: "100px" }}
            onPress={() => handleQuestion("D")}
          >
            D
          </Button>
        </Grid>
      </Grid.Container> */}
      <Text
        h2
        css={{
          textAlign: "center",
        }}
      >
        Question {questionNum}
      </Text>
      <Tooltip content={`${incorrectQuestions} incorrect answers`}>
        <Button flat ghost>Score: {correctQuestions} / 40</Button>
      </Tooltip>
      <Grid.Container gap={2} justify="center">
        <Grid>
          <Button
            color="primary"
            auto
            shadow
            size={"md"}
            css={{ width: "100px" }}
            onPress={() => handleQuestion("A")}
          >
            A
          </Button>
        </Grid>
        <Grid>
          <Button
            color="primary"
            auto
            shadow
            size={"md"}
            css={{ width: "100px" }}
            onPress={() => handleQuestion("B")}
          >
            B
          </Button>
        </Grid>
        <Grid>
          <Button
            color="primary"
            auto
            shadow
            size={"md"}
            css={{ width: "100px" }}
            onPress={() => handleQuestion("C")}
          >
            C
          </Button>
        </Grid>
        <Grid>
          <Button
            color="primary"
            auto
            shadow
            size={"md"}
            css={{ width: "100px" }}
            onPress={() => handleQuestion("D")}
          >
            D
          </Button>
        </Grid>
      </Grid.Container>
      <Grid.Container justify="center">
      <iframe
        src={`https://docs.google.com/gview?embedded=true&url=${qpUrl}#view=FitH&page=2`}
        title="test"
        height={"493px"}
        width={"600px"}
        style={{
          display: "block"
        }}
      ></iframe>
      </Grid.Container>
    </>
  );
}
