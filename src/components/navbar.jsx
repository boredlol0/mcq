import {
  Navbar,
  Dropdown,
  useTheme,
  Button,
  Link,
  Text,
} from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ScaleIcon = ({ fill, size, width = 24, height = 24, ...props }) => {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7ZM18 6 6 18"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M18 10V6h-4M6 14v4h4"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

const icons = {
  scale: <ScaleIcon fill="var(--nextui-colors-warning)" size={30} />,
};

export default function NavBar(props) {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  return (
    <Navbar isBordered variant="static">
      <Navbar.Brand>
        {/* <AcmeLogo /> */}
        <Text b color="inherit" hideIn="xs">
          MCQs
        </Text>
      </Navbar.Brand>
      <Navbar.Content
        enableCursorHighlight
        activeColor="secondary"
        hideIn="xs"
        variant="highlight-rounded"
      >
        {props.active === "home" ? (
          <Navbar.Link isActive href="/">
            Home
          </Navbar.Link>
        ) : (
          <>
            <Navbar.Link href="/">Home</Navbar.Link>
            {props.results === true ? (
              <Navbar.Link isActive>Results: {props.active}</Navbar.Link>
            ) : (
              <Navbar.Link isActive>Solving: {props.active}</Navbar.Link>
            )}
          </>
        )}
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Item>
          <Button
            auto
            light
            as={Link}
            onPress={(e) => {
              setTheme(!isDark ? "dark" : "light");
            }}
          >
            {isDark ? <FaMoon></FaMoon> : <FaSun></FaSun>}
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}
