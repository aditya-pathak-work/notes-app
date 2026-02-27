// export interface Note {
//     id: number;
//     title?: string | null;
//     content?: string | null;
//     created_at?: string;
//     updated_at?: string;
// }


export type Note =
    | {
        id: number;
        title: string | null;
        content: string;
        created_at?: string;
        updated_at?: string;
    }
    | {
        id: number;
        title: string;
        content: string | null;
        created_at?: string;
        updated_at?: string;
    };