import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/api/table/getData", // 注意，这里只能是string格式
    method: "get",
    response: (d) => {
      console.log(d)
      return {
        data: [
          {
            name: "cyh",
            gender: "male",
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
            gender: "female",
            age: 19,
            address: "广州市",
            phone: "1234567",
            detail: "a sexy girl",
          },
          {
            name: "cyh",
            gender: "male",
            age: 18,
            address: "深圳市",
            phone: "1234567",
            detail: "a sexy man",
          },
        ],
        total: 120
      };
    },
  },
] as MockMethod[]; // 这里其实就是定义数据格式的，不了解的同学可以参考typescript的官方文档
