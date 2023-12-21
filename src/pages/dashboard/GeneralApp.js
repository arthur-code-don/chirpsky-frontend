import React from "react";
import Chats from "./Chats";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import SharedMessages from "../../components/SharedMessages";
import StarredMessages from "../../components/StarredMessages";
import NoChat from "../../assets/Illustration/NoChat";
import { Message } from "../../components/Conversation/Message";

const GeneralApp = () => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const { sidebar, chat_type, room_id } = useSelector((store) => store.app);

  console.log(sidebar, "sidebar");




  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      {/* Chats */}
      <Chats />

      <Box
        sx={{
          height: "100%",
          width: sidebar.open ? "calc(100vw - 740px)" : "calc(100vw - 420px)",
          backgroundColor: theme.palette.mode === "light" ? "#F0F4FA"
            : theme.palette.background.paper,
            borderBottom:
            searchParams.get("type") === "individual-chat" &&
            searchParams.get("id")
              ? "0px"
              : "6px solid #0162C4",
        }}
      >
        {/* Conversation */}


       {room_id == null && chat_type === "individual" ?  <Message /> :
       <Stack 
       spacing={2} 
       sx={{
        height: "100%", 
        width: "100%"}}
        alignItems="center"
        justifyContent={"center"}
        >
          <NoChat />
          <Typography variant="subtitle2">
                Select a conversation or start a{" "}
                <Link
                  style={{
                    color: theme.palette.primary.main,
                    textDecoration: "none",
                  }}
                  to="/"
                >
                  new one
                </Link>
              </Typography>

       </Stack>

       }
      </Box>
      {/* Contact */}
      {sidebar.open && (() => {
        switch (sidebar.type) {
          case "CONTACT":
            return <Contact />;

          case "STARRED":
            return <StarredMessages />;

          case "SHARED":
            return <SharedMessages />;


          default:
            break;
        }
      })()
      }
    </Stack>
  );
};

export default GeneralApp;
