<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NoteController extends Controller
{
    public function index()
    {
        return Inertia::render('NotesGrid', [
            "notes" => Note::all(),
        ]);
    }

    public function editNote(Note $note)
    {
        return Inertia::render('NoteEdit', [
            "note" => $note,
        ]);
    }

    public function updateNote(Request $request, Note $note)
    {
        // 1. Validate input
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        // 2. Update the note
        $note->update($data);

        // // 3. Optional: return JSON (Inertia will ignore unless using replace/visit)
        // return response()->json([
        //     'note' => $note,
        //     'message' => 'Saved successfully'
        // ]);
        return redirect(route('notes.edit.view', $note));
    }

    public function deleteNote(Note $note)
    {


        // 2. Update the note
        $note->delete();

        // // 3. Optional: return JSON (Inertia will ignore unless using replace/visit)
        // return response()->json([
        //     'note' => $note,
        //     'message' => 'Saved successfully'
        // ]);
        return redirect(route('notes.index'));
    }

    public function addNote()
    {
        $note = Note::create([
            'title' => '',
            'content' => '',
        ]);

        // // 3. Optional: return JSON (Inertia will ignore unless using replace/visit)
        // return response()->json([
        //     'note' => $note,
        //     'message' => 'Saved successfully'
        // ]);
        return redirect(route('notes.edit.view', $note));
    }
}
