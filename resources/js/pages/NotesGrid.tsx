import AddNoteCard from "@/components/add-note-card";
import NoteCard from "@/components/note-card";
import { Button } from "@/components/ui/button";
import type { Note } from "@/models/Note.model";
import { Head } from "@inertiajs/react";
import { Plus } from "lucide-react";

interface Props {
    notes: Note[];
}

export default function Notes({ notes }: Props) {
    return (
        <>
            <Head title="Notes" />
            <div className="flex flex-row gap-x-5 items-center">
                <h1 className="text-4xl mb-2">Notes</h1>
                {notes.length > 0 && <Button className="cursor-pointer text-muted-foreground" size="icon" variant="outline"><Plus /></Button>}
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
