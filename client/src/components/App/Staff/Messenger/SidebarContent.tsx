import { useState, ChangeEvent, FC } from "react";
import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  Tabs,
  Tab,
  TextField,
  IconButton,
  InputAdornment,
  Avatar,
  List,
  Divider,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  lighten,
  styled,
} from "@mui/material";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import Label from "@/components/Label";
import CheckTwoToneIcon from "@mui/icons-material/CheckTwoTone";
import Link from "next/link";
import { IConversation } from "@/interfaces/Chat";

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
          background-color: ${theme.colors.success.lighter};
          color: ${theme.colors.success.main};
          width: ${theme.spacing(8)};
          height: ${theme.spacing(8)};
          margin-left: auto;
          margin-right: auto;
    `
);

const RootWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(2.5)};
  `
);

const ListItemWrapper = styled(ListItemButton)(
  ({ theme }) => `
        &.MuiButtonBase-root {
            margin: ${theme.spacing(1)} 0;
        }
  `
);

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTabs-indicator {
            min-height: 4px;
            height: 4px;
            box-shadow: none;
            border: 0;
        }

        .MuiTab-root {
            &.MuiButtonBase-root {
                padding: 0;
                margin-right: ${theme.spacing(3)};
                font-size: ${theme.typography.pxToRem(16)};
                color: ${theme.colors.alpha.black[50]};

                .MuiTouchRipple-root {
                    display: none;
                }
            }

            &.Mui-selected:hover,
            &.Mui-selected {
                color: ${theme.colors.alpha.black[100]};
            }
        }
  `
);

interface ISidebarContent {
  data?: IConversation[];
}

const SidebarContent: FC<ISidebarContent> = (props) => {
  const { data } = props;
  const user = {
    name: "Catherine Pike",
    avatar: "/static/images/avatars/1.jpg",
    jobtitle: "Software Developer",
  };

  const [state, setState] = useState({
    invisible: true,
  });

  const handleChange = (event: any) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const [currentTab, setCurrentTab] = useState<string>("all");

  const tabs = [
    { value: "all", label: "All" },
    { value: "unread", label: "Unread" },
    { value: "archived", label: "Archived" },
  ];

  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <RootWrapper>
      <Typography
        sx={{
          mb: 1,
          mt: 2,
        }}
        variant="h3"
      >
        Trò chuyện
      </Typography>

      <Box mt={2}>
        <List disablePadding component="div">
          {data?.map((item) => (
            <Link href="#" passHref key={item._id}>
              <ListItemWrapper selected>
                <ListItemAvatar>
                  <Avatar src="/static/images/avatars/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    mr: 1,
                  }}
                  primaryTypographyProps={{
                    color: "textPrimary",
                    variant: "h5",
                    noWrap: true,
                  }}
                  secondaryTypographyProps={{
                    color: "textSecondary",
                    noWrap: true,
                  }}
                  primary="Zain Baptista"
                  secondary="Hey there, how are you today? Is it ok if I call you?"
                />
                <Label color="primary">
                  <b>2</b>
                </Label>
              </ListItemWrapper>
            </Link>
          ))}
        </List>
      </Box>
    </RootWrapper>
  );
};

export default SidebarContent;
