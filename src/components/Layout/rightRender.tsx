import { auth } from '@/store/auth';
import { user } from '@/store/user';
import { SelectLang } from '@@/plugin-locale';
import { useNavigate, useSnapshot } from '@umijs/max';
import { Avatar, Dropdown, Menu, version } from 'antd';
import { LogoutOutlined } from '/home/laizn/aiweb-rev/node_modules/.pnpm/@ant-design+icons@4.8.3_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@ant-design/icons';

export function RightRender(
  initialState: any,
  //   setInitialState: any,
  //   runtimeConfig: any,
) {
  const { isLogin } = useSnapshot(auth.state);
  const { userName } = useSnapshot(user.state.profile);
  const showAvatar = true;
  const disableAvatarImg = initialState?.avatar === false;
  const nameClassName = disableAvatarImg
    ? 'umi-plugin-layout-name umi-plugin-layout-hide-avatar-img'
    : 'umi-plugin-layout-name';

  const navigate = useNavigate();
  const gotoLoginPage = () => {
    if (!isLogin) {
      navigate('/login');
    }
  };
  const avatar = showAvatar ? (
    <span className="umi-plugin-layout-action" onClick={gotoLoginPage}>
      {!disableAvatarImg ? (
        <Avatar
          size="small"
          className="umi-plugin-layout-avatar"
          src={
            initialState?.avatar ||
            'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
          }
          alt="avatar"
        />
      ) : null}
      <span className={nameClassName}>{isLogin ? userName : '点击登录'}</span>
    </span>
  ) : null;

  //   if (loading) {
  //     return (
  //       <div className="umi-plugin-layout-right">
  //         <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
  //       </div>
  //     );
  //   }
  const logout = () => {
    auth.actions.logoutAndClearAccessToken();
    navigate('/home');
  };

  // 如果没有打开Locale，并且头像为空就取消掉这个返回的内容

  const langMenu = {
    className: 'umi-plugin-layout-menu',
    selectedKeys: [],
    items: [
      {
        key: 'logout',
        label: (
          <>
            <LogoutOutlined />
            退出登录
          </>
        ),
        onClick: logout,
      },
    ],
  };
  // antd@5 和  4.24 之后推荐使用 menu，性能更好
  let dropdownProps;
  if (version.startsWith('5.') || version.startsWith('4.24.')) {
    dropdownProps = { menu: langMenu };
  } else if (version.startsWith('3.')) {
    dropdownProps = {
      overlay: (
        <Menu>
          {langMenu.items.map((item) => (
            <Menu.Item key={item.key} onClick={item.onClick}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      ),
    };
  } else {
    // 需要 antd 4.20.0 以上版本
    dropdownProps = { overlay: <Menu {...langMenu} /> };
  }

  return (
    <div className="umi-plugin-layout-right anticon">
      {isLogin ? (
        <Dropdown
          {...dropdownProps}
          overlayClassName="umi-plugin-layout-container"
        >
          {avatar}
        </Dropdown>
      ) : (
        avatar
      )}
      <SelectLang />
    </div>
  );
}
