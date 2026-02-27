<?php

use App\Http\Controllers\NotesController;
use Illuminate\Support\Facades\Route;


Route::get('/', fn() => redirect()->route('notes.index', [], 301));

Route::resource('notes', NotesController::class)->except(['create']);
