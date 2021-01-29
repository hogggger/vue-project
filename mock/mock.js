//引入mock模块
import Mock from "mockjs";
const Random = Mock.Random;
const token = Random.id();
const userList = {
  userName: "admin",
  passWord: "123ad"
};
const menuList = [
  {
    id: 101,
    authName: "用户管理",
    path: "user-management",
    children: [
      {
        id: 111,
        authName: "用户管理",
        path: "user-management",
        children: []
      }
    ]
  },
  {
    id: 102,
    authName: "系统管理",
    path: "sys-management",
    children: [
      {
        id: 121,
        authName: "系统设置",
        path: "sys-setting",
        children: []
      }
    ]
  }
];
const userInfoList = [
  {
    name: Random.cname(),
    userName: Random.name(),
    date: Random.datetime(),
    role: "管理员",
    status: Random.boolean()
  },
  {
    name: Random.cname(),
    userName: Random.name(),
    date: Random.datetime(),
    role: "用户",
    status: Random.boolean()
  },
  {
    name: Random.cname(),
    userName: Random.name(),
    date: Random.datetime(),
    role: "用户",
    status: Random.boolean()
  }
];

Mock.mock("/login", "post", option => {
  const { userName, passWord } = JSON.parse(option.body);
  if (userList.userName != userName || userList.passWord != passWord) {
    return {
      code: "1001",
      msg: "登陆失败"
    };
  }
  return {
    //输出数据
    code: "1000",
    data: {
      username: userName,
      name: Random.cname(), //随机生成姓名
      date: Random.date("yyyy-MM-dd"),
      age: Random.natural(22, 40),
      token: token,
    },
  };
});
Mock.mock("/menu", "post", option => {
  // console.log("option", option);
  const localToken = JSON.parse(option.body).Authorization;
  if (localToken != token)
    return {
      code: "1004",
      msg: "登陆过期,请重新登陆"
    };
  return {
    code: "1001",
    data: menuList,
    msg: "获取菜单列表成功!"
  };
  // return option
});

Mock.mock(RegExp("/user-list" + ".*"), "get", option => {
  // const dataBody = JSON.parse(option);
  console.log("打印一下数据", option);
  return {
    code: "1001",
    data: userInfoList,
    msg: "获取个人信息列表成功!"
  };
  // return option
});

// { //输出数据
//     code:'1000',
//     data:{
//         'name': Random.cname(), //随机生成姓名
//     'date':Random.date('yyyy-MM-dd'),
//     'age': Random.natural(22, 40),
//     'token':token
//     }
// }
