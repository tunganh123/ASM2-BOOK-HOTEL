
import React, { useState } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

function getItem(label, key, icon, children, type, onClick) {
  return {
    key,
    icon,
    children,
    label,
    type, onClick
  };
}


const App = () => {
  const navi = useNavigate()
  const items = [
    getItem('Dashboard', '1', <PieChartOutlined />, null, null, () => navi("/")),
    getItem('List', 'sub1', <AppstoreOutlined />, [
      getItem('LIST Hotels', '9', null, null, null, () => navi("/hotellist")),
      getItem('LIST Rooms', '10', null, null, null, () => navi("/roomlist")),
      getItem('LIST Transactions', '11', null, null, null, () => navi("/alltransaction")),

    ]),
    getItem('Add New', 'sub2', <AppstoreOutlined />, [
      getItem('New Hotel', '12', null, null, null, () => navi("/addnewhotel")),
      getItem('New Room', '13', null, null, null, () => navi("/addnewroom")),

    ]),
    getItem('Login', '2', <DesktopOutlined />, null, null, () => navi("/login")),

  ];
  return (
    <div style={{ width: 256 }}>
      <Menu
        mode="inline"
        theme="dark"
        items={items}
      />
    </div>
  );
};

export default App;