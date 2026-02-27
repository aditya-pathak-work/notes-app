import AddNoteCard from "@/components/add-note-card";
import NoteCard from "@/components/note-card";
import { Button } from "@/components/ui/button";
import type { Note } from "@/models/Note.model";
import { Head, router } from "@inertiajs/react";
import { Plus } from "lucide-react";

interface Props {
    notes: Note[];
}

export default function NotesIndex({ notes }: Props) {
    return (
        <>
            <Head title="Notes" />
            <div className="flex flex-row gap-x-5 items-center">
                <h1 className="text-4xl mb-2">Notes</h1>
                {notes.length > 0 && <Button className="cursor-pointer text-muted-foreground" size="icon" variant="outline" onClick={() => router.post("/notes")}><Plus /></Button>}
            </div>

            <div className="grid grid-cols-3 gap-4 p-3">
                {notes.length > 0 ? (
                    notes.map((note) => <NoteCard key={note.id} note={note} />)
                ) : (
                    <AddNoteCard />
                )}
            </div>
        </>
    );
}
