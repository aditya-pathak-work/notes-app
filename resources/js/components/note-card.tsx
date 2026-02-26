import type { Note } from "@/models/Note.model";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, router } from "@inertiajs/react";

interface Props {
  note: Note
}

export default function NoteCard({ note }: Props) {
  const truncateContent = (content: string) => content.length > 100 ? content.substring(0, 100) + "..." : content;

  return (
    <div className="group/card rounded-xl relative overflow-hidden cursor-pointer hover:scale-103 transition hover:shadow-md select-none">
      <div className="hidden group-hover/card:block absolute top-0 right-0">
        <Button
          className="group/button group-hover/card:bg-black/10 group-hover/card:text-muted-foreground rounded-none rounded-bl-lg hover:bg-destructive cursor-pointer duration-50"
          size="icon"
          variant="ghost"
          onClick={() => router.delete(`/note/${note.id}`)}
        >
          <Trash2 className="group-hover/button:text-white transition duration-50" />
        </Button>
      </div>

      <Link href={`/note/${note.id}`} className="">
        <Card className="h-full gap-y-3">
          <CardHeader>
            <CardTitle>{note.title}</CardTitle>
            {/* <CardAction className="">

            </CardAction> */}
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{truncateContent(note.content)}</p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}