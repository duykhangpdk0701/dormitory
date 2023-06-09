import DesignServicesTwoToneIcon from "@mui/icons-material/DesignServicesTwoTone";
import BrightnessLowTwoToneIcon from "@mui/icons-material/BrightnessLowTwoTone";
import MmsTwoToneIcon from "@mui/icons-material/MmsTwoTone";

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
      {
        link: "/admin/request-change-room",
        starIcon: BrightnessLowTwoToneIcon,
        title: "Yêu cầu chuyển phòng",
      },
    ],
  },

  {
    subheader: "Cá nhân",
    child: [
      {
        link: "/profile",
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
        title: "Nhân viên",
      },
      {
        link: "/admin/task",
        starIcon: BrightnessLowTwoToneIcon,
        title: "Nhiệm vụ",
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
        link: "/staff/electronic-water/create",
        starIcon: MmsTwoToneIcon,
        title: "Ghi điện nước",
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
        link: "/user/service",
        starIcon: BrightnessLowTwoToneIcon,
        title: "Đăng ký dịch vụ",
      },
      {
        link: "/user/service/enrolled",
        starIcon: BrightnessLowTwoToneIcon,
        title: "Dịch vụ đã đăng ký",
      },
      {
        link: "/user/bill",
        starIcon: BrightnessLowTwoToneIcon,
        title: "Hoá đơn",
      },
      {
        link: "/user/request-change-room",
        starIcon: BrightnessLowTwoToneIcon,
        title: "Yêu cầu chuyển phòng",
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
