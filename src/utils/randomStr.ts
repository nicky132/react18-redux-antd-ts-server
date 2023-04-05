/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-04-28 17:13:38
 * @LastEditTime: 2022-04-28 17:13:39
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \nest-admin\src\utils\randomStr.ts
 */
export const randomStr = (length: number): string => {
  const seeder =
    'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  let randomStr = '';
  for (let i = 0; i < length; i++) {
    randomStr += seeder.charAt(Math.floor(Math.random() * seeder.length));
  }
  return randomStr;
};
