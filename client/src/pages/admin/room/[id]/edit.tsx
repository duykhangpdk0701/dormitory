import SidebarLayout from "@/layouts/SidebarLayout"
import {NextPageWithLayout} from "@/pages/_app"
import React, {ReactElement} from "react"

const EditRoomPage:NextPageWithLayout =() => {
  return <h1>hello my name is Khang</h1>
}

EditRoomPage.getLayout = function getLayout(page:ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>

};

export default EditRoomPage

