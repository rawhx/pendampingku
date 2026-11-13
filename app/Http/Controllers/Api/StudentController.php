<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Http\Resources\StudentResource;
use App\Models\Student;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        return StudentResource::collection(
            $request->user()->students()->latest()->get(),
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentRequest $request): JsonResponse
    {
        $student = $request->user()->students()->create($request->validated());

        return StudentResource::make($student)
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Display the authenticated user's student.
     */
    public function show(Request $request, Student $student): StudentResource
    {
        return StudentResource::make(
            $request->user()->students()->findOrFail($student->id),
        );
    }

    /**
     * Update the authenticated user's student.
     */
    public function update(UpdateStudentRequest $request, Student $student): StudentResource
    {
        $student = $request->user()->students()->findOrFail($student->id);
        $student->update($request->validated());

        return StudentResource::make($student);
    }
}
