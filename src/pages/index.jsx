import React from "react";
import NavBar from "@/components/navbar";
import { Text, Dropdown, Grid, Popover, Button } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  const [selected, setSelected] = React.useState(new Set(["Subject"]));
  const [selected2, setSelected2] = React.useState(new Set(["Year"]));
  const [selected3, setSelected3] = React.useState(new Set(["Series"]));
  const [selected4, setSelected4] = React.useState(new Set(["2"]));

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  const selectedValue2 = React.useMemo(
    () => Array.from(selected2).join(", ").replaceAll("_", " "),
    [selected2]
  );
  const selectedValue3 = React.useMemo(
    () => Array.from(selected3).join(", ").replaceAll("_", " "),
    [selected3]
  );
  const selectedValue4 = React.useMemo(
    () => Array.from(selected4).join(", ").replaceAll("_", " "),
    [selected4]
  );

  function convertSubjectCode(inputString) {
    const arr = inputString.split(" ");
    if (arr.length === 4) {
      if (arr[0] == "" || arr[0] == "Subject") {
        return {
          ok: false,
          code: "Please Select A Subject",
        };
      } else if (arr[1] == "" || arr[1] == "Year") {
        return {
          ok: false,
          code: "Please Select A Year",
        };
      } else if (arr[2] === "Series") {
        return {
          ok: false,
          code: "Please Select A Series",
        };
      }
    } else if (arr.length === 5) {
      arr.shift();
      if (arr[0] == "" || arr[0] == "Subject") {
        return {
          ok: false,
          code: "Please Select A Subject",
        };
      } else if (arr[1] == "" || arr[1] == "Year") {
        return {
          ok: false,
          code: "Please Select A Year",
        };
      } else if (arr[2] === "Series") {
        return {
          ok: false,
          code: "Please Select A Series",
        };
      }
    }
    if (arr.length !== 4) {
      return "Something went wrong";
    }
    const code = `${arr[0]}/${arr[1].slice(-2)}/${arr[2]
      .split("/")
      .map((month) => month.slice(0, 1))
      .join("/")}/2${arr[3]}`;
    return {
      ok: true,
      code: code,
    };
  }

  return (
    <>
      <NavBar active="home"></NavBar>
      <Text
        h1
        size={60}
        css={{
          textGradient: "45deg, $blue600 -20%, $pink600 50%",
          display: "flex",
          justifyContent: "center",
          marginTop: "5rem",
        }}
        weight="bold"
      >
        Choose a paper:
      </Text>
      <Grid.Container
        gap={2}
        justify={"center"}
        css={{
          marginTop: "3rem",
        }}
      >
        <Grid>
          <Dropdown>
            <Dropdown.Button flat color="secondary">
              {selectedValue}
            </Dropdown.Button>
            <Dropdown.Menu
              color="secondary"
              aria-label="Actions"
              css={{ $$dropdownMenuWidth: "280px" }}
              selectionMode="single"
              selectedKeys={selected}
              onSelectionChange={setSelected}
            >
              <Dropdown.Section title="IGCSE">
                <Dropdown.Item
                  key="Physics 0625"
                  aria-label="Physics 0625"
                  description="0625"
                >
                  Physics
                </Dropdown.Item>
                <Dropdown.Item key="Chemistry 0620" description="0620">
                  Chemistry
                </Dropdown.Item>
                <Dropdown.Item key="Biology 0610" description="0610">
                  Biology
                </Dropdown.Item>
              </Dropdown.Section>
              <Dropdown.Section title="AS/A Level">
                <Dropdown.Item key="Physics 9702" description="9702">
                  Physics
                </Dropdown.Item>
              </Dropdown.Section>
            </Dropdown.Menu>
          </Dropdown>
        </Grid>
        <Grid>
          <Dropdown>
            <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
              {selectedValue2}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="secondary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selected2}
              onSelectionChange={setSelected2}
            >
              {[
                2015, 2016, 2017, 2018, 2019,
                2020, 2021,
              ].map((year) => (
                <Dropdown.Item key={year} textValue={year}>
                  {year}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Grid>
        <Grid>
          <Dropdown>
            <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
              {selectedValue3}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="secondary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selected3}
              onSelectionChange={setSelected3}
            >
              <Dropdown.Item key={"Feb/March"} textValue="March">
                March
              </Dropdown.Item>
              <Dropdown.Item key={"May/June"} textValue="May/June">
                May/June
              </Dropdown.Item>
              <Dropdown.Item key={"Oct/Nov"} textValue="Oct/Nov">
                Oct/Nov
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Grid>
        <Grid>
          <Dropdown>
            <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
              {selectedValue4}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="secondary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selected4}
              onSelectionChange={setSelected4}
            >
              <Dropdown.Item key={"1"}>1</Dropdown.Item>
              <Dropdown.Item key={"2"}>2</Dropdown.Item>
              <Dropdown.Item key={"3"}>3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Grid>
      </Grid.Container>
      <Popover isBordered disableShadow>
        {convertSubjectCode(
          `${selectedValue} ${selectedValue2} ${selectedValue3} ${selectedValue4}`
        ).ok ? (
          <Link
            href={`/qp?code=${encodeURIComponent(
              convertSubjectCode(
                `${selectedValue} ${selectedValue2} ${selectedValue3} ${selectedValue4}`
              ).code
            )}`}
          >
            <Button
              shadow
              bordered
              rounded
              color="gradient"
              auto
              size={"lg"}
              css={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5rem",
                marginLeft: "auto",
                marginRight: "auto",
                width: "10%",
              }}
              onPress={() => {
                console.log(
                  convertSubjectCode(
                    `${selectedValue} ${selectedValue2} ${selectedValue3} ${selectedValue4}`
                  )
                );
              }}
            >
              Start
            </Button>
          </Link>
        ) : (
          <>
            <Popover.Trigger>
              <Button
                shadow
                bordered
                rounded
                color="gradient"
                auto
                size={"lg"}
                css={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "5rem",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "10%",
                }}
                onPress={() => {
                  console.log(
                    convertSubjectCode(
                      `${selectedValue} ${selectedValue2} ${selectedValue3} ${selectedValue4}`
                    )
                  );
                }}
              >
                Start
              </Button>
            </Popover.Trigger>
            <Popover.Content>
              <Text css={{ p: "$10" }} color="error" weight={"extrabold"}>
                {
                  convertSubjectCode(
                    `${selectedValue} ${selectedValue2} ${selectedValue3} ${selectedValue4}`
                  ).code
                }
              </Text>
            </Popover.Content>
          </>
        )}
      </Popover>
    </>
  );
}
