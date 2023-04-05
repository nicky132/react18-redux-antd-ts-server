/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-04-28 15:04:16
 * @LastEditTime: 2022-06-15 12:53:47
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \nest-admin\src\decorator\api.map.response.ts
 */
import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class ResponseMapDto {
  @ApiProperty({
    description: '状态：true表示成功；false表示失败',
    type: 'boolean',
    default: true,
  })
  success: boolean;
  @ApiProperty({
    description: '提示信息',
    required: false,
  })
  errorMessage: string;
}

export const ApiMapResponse = <TModel extends Type<any>>(model?: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseMapDto) },
          {
            properties: {
              data: {
                type: 'object',
                allOf: model ? [{ $ref: getSchemaPath(model) }] : [],
              },
            },
          },
        ],
      },
    }),
  );
};
