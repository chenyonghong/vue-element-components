import { MockMethod } from "vite-plugin-mock";

const data = [
  {
    name: "cyh",
    gender: 1,
    age: 18,
    address: "深圳市",
    phone: "1234567",
    detail: "a sexy man",
    family: [
      {
        name: "Jerry",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114",
      },
      {
        name: "Spike",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114",
      },
      {
        name: "Tyke",
        state: "California",
        city: "San Francisco",
        address: "3650 21st St, San Francisco",
        zip: "CA 94114",
      },
    ],
  },
  {
    name: "马冬梅",
    gender: 2,
    age: 19,
    address: "广州市",
    phone: "1234567",
    detail: "a sexy girl",
  },
  {
    name: "cyh",
    gender: 1,
    age: 18,
    address: "深圳市",
    phone: "1234567",
    detail: "a sexy man",
  },
  {
    name: "cyh2",
    gender: 1,
    age: 28,
    address: "深圳市",
    phone: "1234567",
    detail: "a sexy man",
  },
  {
    name: "cyh",
    gender: 1,
    age: 18,
    address: "深圳市",
    phone: "1234567",
    detail: "a sexy man",
  }, {
    name: "cyh",
    gender: 1,
    age: 18,
    address: "深圳市",
    phone: "1234567",
    detail: "a sexy man",
  }, {
    name: "cyh",
    gender: 1,
    age: 18,
    address: "深圳市",
    phone: "1234567",
    detail: "a sexy man",
  }, {
    name: "cyh",
    gender: 1,
    age: 18,
    address: "深圳市",
    phone: "1234567",
    detail: "a sexy man",
  }, {
    name: "cyh",
    gender: 1,
    age: 18,
    address: "深圳市",
    phone: "1234567",
    detail: "a sexy man",
  }, {
    name: "cyh",
    gender: 1,
    age: 18,
    address: "深圳市",
    phone: "1234567",
    detail: "a sexy man",
  }, {
    name: "cyh",
    gender: 1,
    age: 18,
    address: "深圳市",
    phone: "1234567",
    detail: "a sexy man",
  }, {
    name: "cyh",
    gender: 1,
    age: 18,
    address: "深圳市",
    phone: "1234567",
    detail: "a sexy man",
  }, {
    name: "cyh",
    gender: 1,
    age: 18,
    address: "深圳市",
    phone: "1234567",
    detail: "a sexy man",
  }, {
    name: "cyh",
    gender: 1,
    age: 18,
    address: "深圳市",
    phone: "1234567",
    detail: "a sexy man",
  }, {
    name: "cyh",
    gender: 1,
    age: 18,
    address: "深圳市",
    phone: "1234567",
    detail: "a sexy man",
  }, {
    name: "cyh",
    gender: 1,
    age: 18,
    address: "深圳市",
    phone: "1234567",
    detail: "a sexy man",
  }, {
    name: "cyh",
    gender: 1,
    age: 18,
    address: "深圳市",
    phone: "1234567",
    detail: "a sexy man",
  }, {
    name: "cyh",
    gender: 1,
    age: 18,
    address: "深圳市",
    phone: "1234567",
    detail: "a sexy man",
  }, {
    name: "cyh",
    gender: 1,
    age: 18,
    address: "深圳市",
    phone: "1234567",
    detail: "a sexy man",
  }, {
    name: "cyh",
    gender: 1,
    age: 18,
    address: "深圳市",
    phone: "1234567",
    detail: "a sexy man",
  }, {
    name: "cyh",
    gender: 1,
    age: 18,
    address: "深圳市",
    phone: "1234567",
    detail: "a sexy man",
  }, {
    name: "cyh",
    gender: 1,
    age: 18,
    address: "深圳市",
    phone: "1234567",
    detail: "a sexy man",
  }, {
    name: "cyh",
    gender: 1,
    age: 18,
    address: "深圳市",
    phone: "1234567",
    detail: "a sexy man",
  }, {
    name: "cyh",
    gender: 1,
    age: 18,
    address: "深圳市",
    phone: "1234567",
    detail: "a sexy man",
  },
]
data.forEach((item,index)=> {
  (item as any).id = ++index;
})
export default [
  {
    url: "/api/table/getData", // 注意，这里只能是string格式
    method: "get",
    response: (d) => {
      // console.log(d)
      console.log(d.query)
      let resData = data.slice();
      let { gender, name, pageNum = 1, pageSize = 10 } = d.query;
      if (gender) resData = resData.filter(rd => rd.gender == gender);
      if (name) resData = resData.filter(rd => rd.name.includes(name));

      // 分页
      let pageData: any[] = [];
      pageNum = +pageNum;
      pageSize = +pageSize;

      const startIdx = (pageNum - 1) * pageSize;
      const endIdx = startIdx + pageSize;
      pageData = resData.slice(startIdx, endIdx)

      return {
        data: pageData,
        total: resData.length
      };
    },
  },
] as MockMethod[]; // 这里其实就是定义数据格式的，不了解的同学可以参考typescript的官方文档
