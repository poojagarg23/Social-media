// import * as React from "react";
// import PropTypes from "prop-types";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import Newest from "./homepage/Newest";
// import Trending from "./homepage/Trending";

// import DiscoverPage from "./homepage/DiscoverPage";
// import DiscoverMainPage from "./homepage/DiscoverMain";
// import { Outlet } from "react-router";

// function CustomTabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// CustomTabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

// export default function Homepage() {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box
//       sx={{
//         height: "38.0067024230957px",

//         left: "250px",
//       }}
//     >
//       <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//         <Tabs
//           value={value}
//           onChange={handleChange}
//           aria-label="basic tabs example"
//         >
//           <Tab label="Newest" {...a11yProps(0)} />
//           <Tab label="Trending" {...a11yProps(1)} />
//           <Tab label="Discover" {...a11yProps(2)} />
//         </Tabs>
//       </Box>
//       <CustomTabPanel value={value} index={0}>
//         <Newest />
//       </CustomTabPanel>
//       <CustomTabPanel value={value} index={1}>
//         <Trending />
//       </CustomTabPanel>
//       <CustomTabPanel value={value} index={2}>
//         <DiscoverMainPage />
//       </CustomTabPanel>
//     </Box>

//   );
// }
import React from "react";

import { Tabs } from "antd";
import Newest from "./homepage/Newest";
import TrendingPage from "./homepage/Trending";
import DiscoverPage from "./homepage/CommentPage";
import DiscoverMainPage from "./homepage/DiscoverMain";
import Aboutus from "./Aboutus";

const Homepage = () => {
  const { TabPane } = Tabs;

  return (
    <div className="div-main">
      <Tabs>
        <TabPane tab="Newest" key="1">
          <Newest />
        </TabPane>
        <TabPane tab="Trending" key="2">
          <TrendingPage />
        </TabPane>
        <TabPane tab="Discover" key="3">
          <DiscoverMainPage />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Homepage;
