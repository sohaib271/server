import { Request, Response } from "express";
interface Item {
    id: string;
}
declare function uploadItem(req: any, res: any): Promise<any>;
declare function getItems(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
declare function deleteItem(req: Request<Item>, res: Response): Promise<Response<any, Record<string, any>>>;
export { uploadItem, getItems, deleteItem };
//# sourceMappingURL=item.d.ts.map