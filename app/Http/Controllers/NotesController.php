<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Note;

class NotesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() // GET /
    {
        Note::where(function ($query) {
            $query->where('title', '')
                ->orWhereNull('title');
        })
            ->where(function ($query) {
                $query->where('content', '')
                    ->orWhereNull('content');
            })
            ->delete();


        return Inertia::render('Notes/Index', [
            "notes" => Note::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() // GET /create
    {
        // 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) // POST /
    {
        $note = Note::create([
            'title' => '',
            'content' => '',
        ]);

        return redirect(route('notes.edit', $note));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) // GET /{id}
    {
        return redirect(route('notes.edit', $id));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Note $note) // GET /{id}/edit
    {
        return Inertia::render('Notes/Edit', [
            "note" => $note,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Note $note) // PUT/PATCH /{id}
    {
        // 1. Validate input
        $data = $request->validate([
            'title' => 'max:255',
            'content' => '',
        ]);

        // 2. Update the note
        $note->update($data);

        return redirect(route('notes.edit', $note));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note) // DELETE /{id}
    {
        $note->delete();

        return redirect(route('notes.index'));
    }
}
