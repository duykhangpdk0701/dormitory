import chatAPI from "@/api/chat";
import Messenger from "@/components/App/Messenger";
import SidebarContent from "@/components/App/Messenger/SidebarContent";
import PageHead from "@/components/PageHead";
import SidebarLayout from "@/layouts/SidebarLayout";
import { NextPageWithLayout } from "@/pages/_app";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";

const MessengerPage: NextPageWithLayout = () => {
  const conversationQuery = useQuery({
    queryKey: ["conversation"],
    queryFn: () => {
      return chatAPI.getConversationByUserId("64520cf564d7a8e71492cbad");
    },
  });

  return (
    <>
      <PageHead title="Tin nhắn | SGU domitory" />
      <Messenger
        conversation={conversationQuery.data}
        sidebarContent={<SidebarContent data={conversationQuery.data} />}
      />
    </>
  );
};

MessengerPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default MessengerPage;
