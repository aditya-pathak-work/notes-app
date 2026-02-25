import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";


export default function AddNoteCard() {
    return (
        <Card className="group cursor-pointer select-none h-45 hover:scale-103 ease-linear transition hover:shadow-md justify-center items-center ">
            <CardContent className="flex flex-col gap-2 items-center">
                <Plus className="text-gray-400 group-hover:text-gray-600 transition ease-linear duration-75" size={48} strokeWidth={1.2} />
                <span className="italic text-gray-400 group-hover:underline group-hover:text-gray-600 transition ease-linear duration-75">Add First Note</span>
            </CardContent>
        </Card>
    );
}