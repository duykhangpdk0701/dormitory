import DesignServicesTwoToneIcon from "@mui/icons-material/DesignServicesTwoTone";
import BrightnessLowTwoToneIcon from "@mui/icons-material/BrightnessLowTwoTone";
import MmsTwoToneIcon from "@mui/icons-material/MmsTwoTone";
import TableChartTwoToneIcon from "@mui/icons-material/TableChartTwoTone";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import BallotTwoToneIcon from "@mui/icons-material/BallotTwoTone";
import BeachAccessTwoToneIcon from "@mui/icons-material/BeachAccessTwoTone";
import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";
import FilterVintageTwoToneIcon from "@mui/icons-material/FilterVintageTwoTone";
import HowToVoteTwoToneIcon from "@mui/icons-material/HowToVoteTwoTone";
import LocalPharmacyTwoToneIcon from "@mui/icons-material/LocalPharmacyTwoTone";
import RedeemTwoToneIcon from "@mui/icons-material/RedeemTwoTone";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import TrafficTwoToneIcon from "@mui/icons-material/TrafficTwoTone";
import CheckBoxTwoToneIcon from "@mui/icons-material/CheckBoxTwoTone";
import ChromeReaderModeTwoToneIcon from "@mui/icons-material/ChromeReaderModeTwoTone";
import WorkspacePremiumTwoToneIcon from "@mui/icons-material/WorkspacePremiumTwoTone";
import CameraFrontTwoToneIcon from "@mui/icons-material/CameraFrontTwoTone";
import DisplaySettingsTwoToneIcon from "@mui/icons-material/DisplaySettingsTwoTone";

const adminMenu = [
  {
    subheader: "Trang chủ",
    child: [
      {
        link: "/admin",
        starIcon: DesignServicesTwoToneIcon,
        title: "Dashboard",
      },
      {
        link: "/admin/messenger",
        starIcon: MmsTwoToneIcon,
        title: "Tin nhắn",
      },
    ],
  },

  {
    subheader: "Sinh viên",
    child: [
      {
        link: "/admin/awaiting-student",
        starIcon: BrightnessLowTwoToneIcon,
        title: "Danh sách sinh viên đợi duyệt",
      },
      {
        link: "/admin/booking",
        starIcon: BrightnessLowTwoToneIcon,
        title: "Danh sách đã duyệt",
      },
      {
        link: "/admin/civilian",
        starIcon: BrightnessLowTwoToneIcon,
        title: "Danh sách dân",
      },
    ],
  },

  {
    subheader: "Phòng",
    child: [
      {
        link: "/admin/room",
        starIcon: BrightnessLowTwoToneIcon,
        title: "Phòng",
      },
      {
        link: "/admin/room-type",
        starIcon: MmsTwoToneIcon,
        title: "Loại phòng",
      },
    ],
  },

  {
    subheader: "Cá nhân",
    child: [
      {
        link: "/admin/profile",
        starIcon: BrightnessLowTwoToneIcon,
        title: "Trang cá nhân",
      },
      {
        link: "/admin/setting",
        starIcon: BrightnessLowTwoToneIcon,
        title: "Cài đặt tài khoản",
      },
    ],
  },

  {
    subheader: "Khác",
    child: [
      {
        link: "/admin/priority",
        starIcon: BrightnessLowTwoToneIcon,
        title: "Điểm ưu tiên",
      },
      {
        link: "/admin/permission",
        starIcon: BrightnessLowTwoToneIcon,
        title: "Quyền",
      },
      {
        link: "/admin/job",
        starIcon: BrightnessLowTwoToneIcon,
        title: "Công việc",
      },
      {
        link: "/admin/service",
        starIcon: BrightnessLowTwoToneIcon,
        title: "Dịch vụ",
      },
      {
        link: "/admin/staff",
        starIcon: BrightnessLowTwoToneIcon,
        title: "nhân viên",
      },
      {
        link: "/admin/task",
        starIcon: BrightnessLowTwoToneIcon,
        title: "nhiệm vụ",
      },
      {
        link: "/admin/violation",
        starIcon: BrightnessLowTwoToneIcon,
        title: "Vi phạm",
      },
      {
        link: "/admin/complaint",
        starIcon: BrightnessLowTwoToneIcon,
        title: "Khiếu nại",
      },
      {
        link: "/admin/contract",
        starIcon: BrightnessLowTwoToneIcon,
        title: "Hợp đồng",
      },
      {
        link: "/admin/device",
        starIcon: BrightnessLowTwoToneIcon,
        title: "Thiết bị",
      },
      {
        link: "/admin/bill",
        starIcon: BrightnessLowTwoToneIcon,
        title: "Hoá đơn",
      },
    ],
  },
];

export const staffMenu = [
  {
    subheader: "Trang chủ",
    child: [
      {
        link: "/staff/messenger",
        starIcon: MmsTwoToneIcon,
        title: "Tin nhắn",
      },

      {
        link: "/staff/task",
        starIcon: MmsTwoToneIcon,
        title: "Công việc",
      },

      {
        link: "/staff/bill",
        starIcon: MmsTwoToneIcon,
        title: "Ghi Hoá đơn",
      },
    ],
  },
];

export const userMenu = [
  {
    subheader: "Trang chủ",
    child: [
      {
        link: "/user/messenger",
        starIcon: MmsTwoToneIcon,
        title: "Tin nhắn",
      },

      {
        link: "/user/complaint",
        starIcon: MmsTwoToneIcon,
        title: "Khiếu nại",
      },

      {
        link: "/user/room",
        starIcon: MmsTwoToneIcon,
        title: "Thông tin phòng",
      },
    ],
  },

  {
    subheader: "Cá nhân",
    child: [
      {
        link: "/user/profile",
        starIcon: BrightnessLowTwoToneIcon,
        title: "Trang cá nhân",
      },
      {
        link: "/user/contract",
        starIcon: BrightnessLowTwoToneIcon,
        title: "Hợp đồng",
      },

      {
        link: "/user/settings",
        starIcon: BrightnessLowTwoToneIcon,
        title: "Cài đặt tài khoản",
      },
    ],
  },
];

export default adminMenu;
