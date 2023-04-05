/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-04-28 15:07:53
 * @LastEditTime: 2022-06-14 15:59:51
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \nest-admin\src\utils\response.ts
 */
export const success = (data = {}, message = 'success') => {
  return {
    success: true,
    errorMessage: message,
    data,
  };
};
export const error = (message = 'error', data = {}) => {
  return {
    success: false,
    errorMessage: message,
    data,
  };
};
export function pagination<T>(
  list: T[],
  total: number,
  current = 1,
  pageSize = 15,
) {
  return {
    list,
    pageSize,
    total,
    totalPage: Math.ceil(total / pageSize),
    current,
  };
}
