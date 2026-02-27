import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { Note } from "@/models/Note.model";
import { Head, router } from "@inertiajs/react";
import { CheckCircle, ChevronLeft, ChevronLeftCircle, FileExclamationPointIcon, OctagonX, PencilLineIcon, TriangleAlert } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props {
    note: Note;
}

const SAVE_INTERVAL = 3000; // 3 seconds

type SaveStatus = "idle" | "saving" | "saved" | "pending" | "error";

export default function NotesEdit({ note }: Props) {
    const [formData, setFormData] = useState({
        title: note.title,
        content: note.content,
    });
    const [status, setStatus] = useState<SaveStatus>("idle");

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (status === "idle") return;

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            saveToServer();
        }, SAVE_INTERVAL);
    }, [formData]);


    const saveToServer = async () => {
        if (status === "saving") return;

        setStatus("saving");

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        try {
            console.log("Saving...", formData);

            await new Promise((res, rej) => {
                router.put(`/notes/${note.id}`, formData, {
                    preserveScroll: true,
                    preserveState: true,
                    onError: rej,
                    onSuccess: res
                });
            });

            setStatus("saved");
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        setStatus("pending");
    }

    const Status = () => {
        switch (status) {
            case "pending":
                return (<div className="flex items-center gap-1 font-semibold text-sm me-2 text-yellow-500">
                    <TriangleAlert size={14} />
                    <span>Pending Changes</span>
                </div>);

            case "saved":
                return (<div className="flex items-center gap-1 font-semibold text-sm me-2 text-green-500">
                    <CheckCircle size={14} />
                    <span>Saved</span>
                </div>);

            case "saving":
                return (<div className="flex items-center gap-1 font-semibold text-sm me-2 text-gray-500">
                    <Spinner />
                    <span>Saving...</span>
                </div>);

            case "error":
                return (<div className="flex items-center gap-1 font-semibold text-sm me-2 text-red-500">
                    <OctagonX size={14} />
                    <span>Error</span>
                </div>);

            default:
                return;
        }
    }

    const handleSaveBtnClick = async () => {
        await saveToServer();
        router.get(`/notes`);
    }

    return (
        <>
            <Head title={`${note.title}`} />

            <div className="flex justify-between gap-x-2 mb-2 px-3 items-center">
                <div className="gap-4 flex items-center">
                    <Button variant="outline" size="icon-sm" className="cursor-pointer" onClick={() => router.get("/notes")}><ChevronLeft /></Button>
                    <h1 className="text-muted-foreground">Edit Note</h1>
                </div>
                <div className="gap-2 flex items-center">
                    <Status />
                    {status !== "idle" && <Button size="sm" onClick={handleSaveBtnClick} className="cursor-pointer bg-green-600 hover:bg-green-700 text-white" disabled={status === "saving"}>Save</Button>}
                    <Button size="sm" className="cursor-pointer bg-red-600 hover:bg-red-700 text-white" onClick={() => router.delete(`/notes/${note.id}`)}>Delete</Button>
                </div>
            </div >

            {/* display note */}
            < div className="w-full h-full flex flex-col" >
                <input name="title" placeholder="Title" className={`text-4xl focus-visible:bg-muted focus-visible:outline-none px-3 py-2 leading-0.5 w-full ${!formData.title && "italic"}`} value={formData.title} onChange={handleInput} />
                <hr className="my-2 border-gray-300" />
                <textarea name="content" placeholder="Content" className={`flex-1 focus-visible:bg-muted focus-visible:outline-none px-3 py-2 w-full resize-none ${!formData.content && "italic"}`} value={formData.content} onChange={handleInput} />
            </div >
        </>
    );
}