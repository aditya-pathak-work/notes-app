<?php

use App\Http\Controllers\NoteController;
use Illuminate\Support\Facades\Route;


Route::redirect('/', '/notes', 301);

Route::get('/notes', [NoteController::class, "index"])->name('notes.index');

Route::get('/note/{note}', [NoteController::class, "editNote"])->name('notes.edit.view');


Route::put('/note/{note}', [NoteController::class, "updateNote"])->name('notes.update');

Route::delete('/note/{note}', [NoteController::class, "deleteNote"])->name('notes.delete');

Route::get('/notes/new', [NoteController::class, "addNote"])->name('notes.add');
