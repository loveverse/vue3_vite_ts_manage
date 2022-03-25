import ajax from './ajax';

// 分页查询
export const reqPicData = (limit:number, page:number) => ajax('/picQuery', {limit,page})
// 图片上架下架
export const reqUpdatePic = (id:number, putaway:number) => ajax('/updatePic', {id,putaway})