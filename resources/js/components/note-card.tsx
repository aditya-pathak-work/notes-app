import type { Note } from "@/models/Note.model";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  note: Note
}

export default function NoteCard({ note }: Props) {
  const truncateContent = (content: string) => content.length > 100 ? content.substring(0, 100) + "..." : content;

  return (
    <Card className="group/card overflow-hidden relative cursor-pointer hover:scale-103 transition hover:shadow-md gap-y-3 select-none">
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
        <CardAction className="hidden group-hover/card:block absolute top-0 right-0">
          <Button
            className="group/button group-hover/card:bg-black/10 group-hover/card:text-muted-foreground rounded-none rounded-bl-lg hover:bg-destructive cursor-pointer duration-50"
            size="icon"
            variant="ghost"
            onClick={() => alert("deleted")}
          >
            <Trash2 className="group-hover/button:text-white transition duration-50" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{truncateContent(note.content)}</p>
      </CardContent>
    </Card>
  );
}